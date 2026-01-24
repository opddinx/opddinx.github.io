import React from 'react';

type TextureSet = {
    texture: GPUTexture;
    view: GPUTextureView;
    width: number;
    height: number;
};

type SimResources = {
    velocityA: TextureSet;
    velocityB: TextureSet;
    velocityForce: TextureSet;
    velocityViscousA: TextureSet;
    velocityViscousB: TextureSet;
    divergence: TextureSet;
    pressureA: TextureSet;
    pressureB: TextureSet;
    fboWidth: number;
    fboHeight: number;
};

const WebGPUBackground: React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !('gpu' in navigator)) {
            return;
        }

        let device: GPUDevice | null = null;
        let context: GPUCanvasContext | null = null;
        let format: GPUTextureFormat | null = null;
        let animationFrame: number | null = null;
        let cleanup: (() => void) | null = null;
        let isVisible = true;
        let isRunning = true;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const settings = {
            iterationsPoisson: 32,
            iterationsViscous: 32,
            mouseForce: 20,
            resolution: 0.5,
            cursorSize: 100,
            viscous: 30,
            dt: 0.014,
            isBounce: false,
            isViscous: false,
            BFECC: true,
        };

        const mouse = {
            coords: { x: 0, y: 0 },
            prev: { x: 0, y: 0 },
            diff: { x: 0, y: 0 },
            timer: null as number | null,
        };

        const updateMouseCoords = (clientX: number, clientY: number) => {
            const width = window.innerWidth || 1;
            const height = window.innerHeight || 1;
            mouse.coords.x = (clientX / width) * 2 - 1;
            mouse.coords.y = -(clientY / height) * 2 + 1;
            if (mouse.timer) {
                window.clearTimeout(mouse.timer);
            }
            mouse.timer = window.setTimeout(() => {
                mouse.diff.x = 0;
                mouse.diff.y = 0;
            }, 100);
        };

        const handlePointerMove = (event: PointerEvent) => {
            updateMouseCoords(event.clientX, event.clientY);
        };

        const handleTouchMove = (event: TouchEvent) => {
            if (event.touches.length === 1) {
                updateMouseCoords(event.touches[0].pageX, event.touches[0].pageY);
            }
        };

        const clearWGSL = `
@group(0) @binding(0) var dst: texture_storage_2d<rgba16float, write>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let size = textureDimensions(dst);
    if (gid.x >= size.x || gid.y >= size.y) {
        return;
    }
    textureStore(dst, vec2<i32>(gid.xy), vec4<f32>(0.0));
}
`;

        const advectionWGSL = `
struct SimUniforms {
    params0: vec4<f32>,
    params1: vec4<f32>,
};

@group(0) @binding(0) var<uniform> uniforms: SimUniforms;
@group(0) @binding(1) var velocitySampler: sampler;
@group(0) @binding(2) var velocityTex: texture_2d<f32>;
@group(0) @binding(3) var velocityOut: texture_storage_2d<rgba16float, write>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let fboSize = uniforms.params1.xy;
    let width = u32(fboSize.x);
    let height = u32(fboSize.y);
    if (gid.x >= width || gid.y >= height) {
        return;
    }

    let dt = uniforms.params0.x;
    let isBFECC = uniforms.params0.y;
    let boundary = uniforms.params1.zw;
    let uv = boundary + (vec2<f32>(gid.xy) + vec2<f32>(0.5)) / fboSize * (vec2<f32>(1.0, 1.0) - boundary * 2.0);
    let maxSize = max(fboSize.x, fboSize.y);
    let ratio = vec2<f32>(maxSize / fboSize.x, maxSize / fboSize.y);

    if (isBFECC < 0.5) {
        let vel = textureSampleLevel(velocityTex, velocitySampler, uv, 0.0).xy;
        let uv2 = uv - vel * dt * ratio;
        let newVel = textureSampleLevel(velocityTex, velocitySampler, uv2, 0.0).xy;
        textureStore(velocityOut, vec2<i32>(gid.xy), vec4<f32>(newVel, 0.0, 0.0));
        return;
    }

    let spotNew = uv;
    let velOld = textureSampleLevel(velocityTex, velocitySampler, uv, 0.0).xy;
    let spotOld = spotNew - velOld * dt * ratio;
    let velNew1 = textureSampleLevel(velocityTex, velocitySampler, spotOld, 0.0).xy;
    let spotNew2 = spotOld + velNew1 * dt * ratio;
    let error = spotNew2 - spotNew;
    let spotNew3 = spotNew - error * 0.5;
    let vel2 = textureSampleLevel(velocityTex, velocitySampler, spotNew3, 0.0).xy;
    let spotOld2 = spotNew3 - vel2 * dt * ratio;
    let newVel2 = textureSampleLevel(velocityTex, velocitySampler, spotOld2, 0.0).xy;

    textureStore(velocityOut, vec2<i32>(gid.xy), vec4<f32>(newVel2, 0.0, 0.0));
}
`;

        const divergenceWGSL = `
struct SimUniforms {
    params0: vec4<f32>,
    params1: vec4<f32>,
};

@group(0) @binding(0) var<uniform> uniforms: SimUniforms;
@group(0) @binding(1) var velocitySampler: sampler;
@group(0) @binding(2) var velocityTex: texture_2d<f32>;
@group(0) @binding(3) var divergenceOut: texture_storage_2d<rgba16float, write>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let fboSize = uniforms.params1.xy;
    let width = u32(fboSize.x);
    let height = u32(fboSize.y);
    if (gid.x >= width || gid.y >= height) {
        return;
    }

    let dt = uniforms.params0.x;
    let px = uniforms.params0.zw;
    let boundary = uniforms.params1.zw;
    let uv = boundary + (vec2<f32>(gid.xy) + vec2<f32>(0.5)) / fboSize * (vec2<f32>(1.0, 1.0) - boundary * 2.0);

    let x0 = textureSampleLevel(velocityTex, velocitySampler, uv - vec2<f32>(px.x, 0.0), 0.0).x;
    let x1 = textureSampleLevel(velocityTex, velocitySampler, uv + vec2<f32>(px.x, 0.0), 0.0).x;
    let y0 = textureSampleLevel(velocityTex, velocitySampler, uv - vec2<f32>(0.0, px.y), 0.0).y;
    let y1 = textureSampleLevel(velocityTex, velocitySampler, uv + vec2<f32>(0.0, px.y), 0.0).y;
    let div = (x1 - x0 + y1 - y0) * 0.5;

    textureStore(divergenceOut, vec2<i32>(gid.xy), vec4<f32>(div / dt, 0.0, 0.0, 0.0));
}
`;

        const poissonWGSL = `
struct SimUniforms {
    params0: vec4<f32>,
    params1: vec4<f32>,
};

@group(0) @binding(0) var<uniform> uniforms: SimUniforms;
@group(0) @binding(1) var pressureSampler: sampler;
@group(0) @binding(2) var pressureTex: texture_2d<f32>;
@group(0) @binding(3) var divergenceTex: texture_2d<f32>;
@group(0) @binding(4) var pressureOut: texture_storage_2d<rgba16float, write>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let fboSize = uniforms.params1.xy;
    let width = u32(fboSize.x);
    let height = u32(fboSize.y);
    if (gid.x >= width || gid.y >= height) {
        return;
    }

    let px = uniforms.params0.zw;
    let boundary = uniforms.params1.zw;
    let uv = boundary + (vec2<f32>(gid.xy) + vec2<f32>(0.5)) / fboSize * (vec2<f32>(1.0, 1.0) - boundary * 2.0);

    let p0 = textureSampleLevel(pressureTex, pressureSampler, uv + vec2<f32>(px.x * 2.0, 0.0), 0.0).r;
    let p1 = textureSampleLevel(pressureTex, pressureSampler, uv - vec2<f32>(px.x * 2.0, 0.0), 0.0).r;
    let p2 = textureSampleLevel(pressureTex, pressureSampler, uv + vec2<f32>(0.0, px.y * 2.0), 0.0).r;
    let p3 = textureSampleLevel(pressureTex, pressureSampler, uv - vec2<f32>(0.0, px.y * 2.0), 0.0).r;
    let div = textureSampleLevel(divergenceTex, pressureSampler, uv, 0.0).r;

    let newP = (p0 + p1 + p2 + p3) * 0.25 - div;
    textureStore(pressureOut, vec2<i32>(gid.xy), vec4<f32>(newP, 0.0, 0.0, 0.0));
}
`;

        const pressureWGSL = `
struct SimUniforms {
    params0: vec4<f32>,
    params1: vec4<f32>,
};

@group(0) @binding(0) var<uniform> uniforms: SimUniforms;
@group(0) @binding(1) var pressureSampler: sampler;
@group(0) @binding(2) var pressureTex: texture_2d<f32>;
@group(0) @binding(3) var velocityTex: texture_2d<f32>;
@group(0) @binding(4) var velocityOut: texture_storage_2d<rgba16float, write>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let fboSize = uniforms.params1.xy;
    let width = u32(fboSize.x);
    let height = u32(fboSize.y);
    if (gid.x >= width || gid.y >= height) {
        return;
    }

    let dt = uniforms.params0.x;
    let px = uniforms.params0.zw;
    let boundary = uniforms.params1.zw;
    let uv = boundary + (vec2<f32>(gid.xy) + vec2<f32>(0.5)) / fboSize * (vec2<f32>(1.0, 1.0) - boundary * 2.0);

    let p0 = textureSampleLevel(pressureTex, pressureSampler, uv + vec2<f32>(px.x, 0.0), 0.0).r;
    let p1 = textureSampleLevel(pressureTex, pressureSampler, uv - vec2<f32>(px.x, 0.0), 0.0).r;
    let p2 = textureSampleLevel(pressureTex, pressureSampler, uv + vec2<f32>(0.0, px.y), 0.0).r;
    let p3 = textureSampleLevel(pressureTex, pressureSampler, uv - vec2<f32>(0.0, px.y), 0.0).r;

    var v = textureSampleLevel(velocityTex, pressureSampler, uv, 0.0).xy;
    let gradP = vec2<f32>(p0 - p1, p2 - p3) * 0.5;
    v = v - gradP * dt;

    textureStore(velocityOut, vec2<i32>(gid.xy), vec4<f32>(v, 0.0, 1.0));
}
`;

        const viscousWGSL = `
struct SimUniforms {
    params0: vec4<f32>,
    params1: vec4<f32>,
};

@group(0) @binding(0) var<uniform> uniforms: SimUniforms;
@group(0) @binding(1) var velocitySampler: sampler;
@group(0) @binding(2) var velocityTex: texture_2d<f32>;
@group(0) @binding(3) var velocityNewTex: texture_2d<f32>;
@group(0) @binding(4) var velocityOut: texture_storage_2d<rgba16float, write>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let fboSize = uniforms.params1.xy;
    let width = u32(fboSize.x);
    let height = u32(fboSize.y);
    if (gid.x >= width || gid.y >= height) {
        return;
    }

    let dt = uniforms.params0.x;
    let viscous = uniforms.params0.y;
    let px = uniforms.params0.zw;
    let boundary = uniforms.params1.zw;
    let uv = boundary + (vec2<f32>(gid.xy) + vec2<f32>(0.5)) / fboSize * (vec2<f32>(1.0, 1.0) - boundary * 2.0);

    let old = textureSampleLevel(velocityTex, velocitySampler, uv, 0.0).xy;
    let new0 = textureSampleLevel(velocityNewTex, velocitySampler, uv + vec2<f32>(px.x * 2.0, 0.0), 0.0).xy;
    let new1 = textureSampleLevel(velocityNewTex, velocitySampler, uv - vec2<f32>(px.x * 2.0, 0.0), 0.0).xy;
    let new2 = textureSampleLevel(velocityNewTex, velocitySampler, uv + vec2<f32>(0.0, px.y * 2.0), 0.0).xy;
    let new3 = textureSampleLevel(velocityNewTex, velocitySampler, uv - vec2<f32>(0.0, px.y * 2.0), 0.0).xy;

    var next = 4.0 * old + viscous * dt * (new0 + new1 + new2 + new3);
    next = next / (4.0 * (1.0 + viscous * dt));

    textureStore(velocityOut, vec2<i32>(gid.xy), vec4<f32>(next, 0.0, 0.0));
}
`;

        const externalForceWGSL = `
struct ForceUniforms {
    params0: vec4<f32>,
    params1: vec4<f32>,
};

@group(0) @binding(0) var<uniform> uniforms: ForceUniforms;
@group(0) @binding(1) var velocityTex: texture_2d<f32>;
@group(0) @binding(2) var velocityOut: texture_storage_2d<rgba16float, write>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3<u32>) {
    let size = textureDimensions(velocityOut);
    if (gid.x >= size.x || gid.y >= size.y) {
        return;
    }

    let force = uniforms.params0.xy;
    let center = uniforms.params0.zw;
    let scale = uniforms.params1.xy;
    let px = uniforms.params1.zw;

    let uv = (vec2<f32>(gid.xy) + vec2<f32>(0.5)) / vec2<f32>(size);
    let clip = uv * 2.0 - vec2<f32>(1.0, 1.0);
    let local = (clip - center) / (scale * 2.0 * px) + vec2<f32>(0.5, 0.5);

    var outVel = textureLoad(velocityTex, vec2<i32>(gid.xy), 0).xy;

    if (all(local >= vec2<f32>(0.0, 0.0)) && all(local <= vec2<f32>(1.0, 1.0))) {
        let circle = (local - vec2<f32>(0.5, 0.5)) * 2.0;
        var d = 1.0 - min(length(circle), 1.0);
        d = d * d;
        outVel = outVel + force * d;
    }

    textureStore(velocityOut, vec2<i32>(gid.xy), vec4<f32>(outVel, 0.0, 1.0));
}
`;

        const outputWGSL = `
struct VertexOut {
    @builtin(position) position: vec4<f32>,
    @location(0) uv: vec2<f32>,
};

@vertex
fn vs_main(@builtin(vertex_index) idx: u32) -> VertexOut {
    var positions = array<vec2<f32>, 3>(
        vec2<f32>(-1.0, -1.0),
        vec2<f32>(3.0, -1.0),
        vec2<f32>(-1.0, 3.0)
    );
    let pos = positions[idx];

    var out: VertexOut;
    out.position = vec4<f32>(pos, 0.0, 1.0);
    out.uv = pos * 0.5 + vec2<f32>(0.5, 0.5);
    return out;
}

@group(0) @binding(0) var velocitySampler: sampler;
@group(0) @binding(1) var velocityTex: texture_2d<f32>;

@fragment
fn fs_main(input: VertexOut) -> @location(0) vec4<f32> {
    let vel = textureSampleLevel(velocityTex, velocitySampler, input.uv, 0.0).xy;
    let len = length(vel);
    let velNorm = vel * 0.5 + vec2<f32>(0.5, 0.5);

    let color = vec3<f32>(velNorm.x, velNorm.y, 1.0);
    let mixed = mix(vec3<f32>(1.0, 1.0, 1.0), color, len);

    return vec4<f32>(mixed, 1.0);
}
`;

        const createTexture = (width: number, height: number): TextureSet => {
            if (!device) {
                throw new Error('WebGPU device not initialized');
            }
            const texture = device.createTexture({
                size: { width, height },
                format: 'rgba16float',
                usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.STORAGE_BINDING,
            });
            return { texture, view: texture.createView(), width, height };
        };

        const init = async () => {
            const adapter = await navigator.gpu.requestAdapter();
            if (!adapter) return;

            device = await adapter.requestDevice();
            device.onuncapturederror = (event) => {
                // eslint-disable-next-line no-console
                console.error('WebGPU error:', event.error);
            };
            device.lost.then((info) => {
                // eslint-disable-next-line no-console
                console.error('WebGPU device lost:', info);
            });
            context = canvas.getContext('webgpu');
            if (!context) return;
            format = navigator.gpu.getPreferredCanvasFormat();

            const sampler = device.createSampler({
                magFilter: 'linear',
                minFilter: 'linear',
                addressModeU: 'clamp-to-edge',
                addressModeV: 'clamp-to-edge',
            });

            const simUniformBuffer = device.createBuffer({
                size: 32,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });
            const divergenceUniformBuffer = device.createBuffer({
                size: 32,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });
            const poissonUniformBuffer = device.createBuffer({
                size: 32,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });
            const pressureUniformBuffer = device.createBuffer({
                size: 32,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });
            const viscousUniformBuffer = device.createBuffer({
                size: 32,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });
            const externalUniformBuffer = device.createBuffer({
                size: 32,
                usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
            });

            const computeLayout = device.createBindGroupLayout({
                entries: [
                    { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
                    { binding: 1, visibility: GPUShaderStage.COMPUTE, sampler: { type: 'filtering' } },
                    { binding: 2, visibility: GPUShaderStage.COMPUTE, texture: { sampleType: 'float' } },
                    { binding: 3, visibility: GPUShaderStage.COMPUTE, storageTexture: { access: 'write-only', format: 'rgba16float' } },
                ],
            });

            const poissonLayout = device.createBindGroupLayout({
                entries: [
                    { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
                    { binding: 1, visibility: GPUShaderStage.COMPUTE, sampler: { type: 'filtering' } },
                    { binding: 2, visibility: GPUShaderStage.COMPUTE, texture: { sampleType: 'float' } },
                    { binding: 3, visibility: GPUShaderStage.COMPUTE, texture: { sampleType: 'float' } },
                    { binding: 4, visibility: GPUShaderStage.COMPUTE, storageTexture: { access: 'write-only', format: 'rgba16float' } },
                ],
            });

            const viscousLayout = device.createBindGroupLayout({
                entries: [
                    { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
                    { binding: 1, visibility: GPUShaderStage.COMPUTE, sampler: { type: 'filtering' } },
                    { binding: 2, visibility: GPUShaderStage.COMPUTE, texture: { sampleType: 'float' } },
                    { binding: 3, visibility: GPUShaderStage.COMPUTE, texture: { sampleType: 'float' } },
                    { binding: 4, visibility: GPUShaderStage.COMPUTE, storageTexture: { access: 'write-only', format: 'rgba16float' } },
                ],
            });

            const externalLayout = device.createBindGroupLayout({
                entries: [
                    { binding: 0, visibility: GPUShaderStage.COMPUTE, buffer: { type: 'uniform' } },
                    { binding: 1, visibility: GPUShaderStage.COMPUTE, texture: { sampleType: 'float' } },
                    { binding: 2, visibility: GPUShaderStage.COMPUTE, storageTexture: { access: 'write-only', format: 'rgba16float' } },
                ],
            });

            const clearLayout = device.createBindGroupLayout({
                entries: [
                    { binding: 0, visibility: GPUShaderStage.COMPUTE, storageTexture: { access: 'write-only', format: 'rgba16float' } },
                ],
            });

            const outputLayout = device.createBindGroupLayout({
                entries: [
                    { binding: 0, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'filtering' } },
                    { binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } },
                ],
            });

            const createComputePipeline = (code: string, layout: GPUBindGroupLayout) => {
                if (!device) return null;
                return device.createComputePipeline({
                    layout: device.createPipelineLayout({ bindGroupLayouts: [layout] }),
                    compute: {
                        module: device.createShaderModule({ code }),
                        entryPoint: 'main',
                    },
                });
            };

            const createRenderPipeline = (code: string, layout: GPUBindGroupLayout) => {
                if (!device || !format) return null;
                return device.createRenderPipeline({
                    layout: device.createPipelineLayout({ bindGroupLayouts: [layout] }),
                    vertex: {
                        module: device.createShaderModule({ code }),
                        entryPoint: 'vs_main',
                    },
                    fragment: {
                        module: device.createShaderModule({ code }),
                        entryPoint: 'fs_main',
                        targets: [{ format }],
                    },
                    primitive: {
                        topology: 'triangle-list',
                    },
                });
            };

            const clearPipeline = createComputePipeline(clearWGSL, clearLayout);
            const advectionPipeline = createComputePipeline(advectionWGSL, computeLayout);
            const divergencePipeline = createComputePipeline(divergenceWGSL, computeLayout);
            const poissonPipeline = createComputePipeline(poissonWGSL, poissonLayout);
            const pressurePipeline = createComputePipeline(pressureWGSL, poissonLayout);
            const viscousPipeline = createComputePipeline(viscousWGSL, viscousLayout);
            const externalPipeline = createComputePipeline(externalForceWGSL, externalLayout);
            const outputPipeline = createRenderPipeline(outputWGSL, outputLayout);

            if (!clearPipeline || !advectionPipeline || !divergencePipeline || !poissonPipeline || !pressurePipeline || !viscousPipeline || !externalPipeline || !outputPipeline) {
                return;
            }

            let resources: SimResources | null = null;

            const writeSimUniforms = (buffer: GPUBuffer, dt: number, paramY: number, px: { x: number; y: number }, fbo: { x: number; y: number }, boundary: { x: number; y: number }) => {
                if (!device) return;
                const data = new Float32Array([
                    dt,
                    paramY,
                    px.x,
                    px.y,
                    fbo.x,
                    fbo.y,
                    boundary.x,
                    boundary.y,
                ]);
                device.queue.writeBuffer(buffer, 0, data);
            };

            const writeExternalUniforms = (px: { x: number; y: number }) => {
                if (!device) return;
                const cursorSizeX = settings.cursorSize * px.x;
                const cursorSizeY = settings.cursorSize * px.y;
                const centerX = Math.min(
                    Math.max(mouse.coords.x, -1 + cursorSizeX + px.x * 2),
                    1 - cursorSizeX - px.x * 2
                );
                const centerY = Math.min(
                    Math.max(mouse.coords.y, -1 + cursorSizeY + px.y * 2),
                    1 - cursorSizeY - px.y * 2
                );

                const forceX = (mouse.diff.x / 2) * settings.mouseForce;
                const forceY = (mouse.diff.y / 2) * settings.mouseForce;

                const data = new Float32Array([
                    forceX,
                    forceY,
                    centerX,
                    centerY,
                    settings.cursorSize,
                    settings.cursorSize,
                    px.x,
                    px.y,
                ]);
                device.queue.writeBuffer(externalUniformBuffer, 0, data);
            };

            const createResources = () => {
                if (!device || !context || !format) return null;
                const dpr = Math.min(window.devicePixelRatio || 1, 2);
                const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
                const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
                canvas.width = width;
                canvas.height = height;
                context.configure({ device, format, alphaMode: 'opaque' });

                const fboWidth = Math.max(1, Math.round(settings.resolution * width));
                const fboHeight = Math.max(1, Math.round(settings.resolution * height));
                const px = { x: 1 / fboWidth, y: 1 / fboHeight };
                const boundary = settings.isBounce ? { x: 0, y: 0 } : px;

                writeSimUniforms(simUniformBuffer, settings.dt, settings.BFECC ? 1 : 0, px, { x: fboWidth, y: fboHeight }, boundary);
                writeSimUniforms(divergenceUniformBuffer, settings.dt, 0, px, { x: fboWidth, y: fboHeight }, boundary);
                writeSimUniforms(poissonUniformBuffer, 0, 0, px, { x: fboWidth, y: fboHeight }, boundary);
                writeSimUniforms(pressureUniformBuffer, settings.dt, 0, px, { x: fboWidth, y: fboHeight }, boundary);
                writeSimUniforms(viscousUniformBuffer, settings.dt, settings.viscous, px, { x: fboWidth, y: fboHeight }, boundary);

                return {
                    velocityA: createTexture(fboWidth, fboHeight),
                    velocityB: createTexture(fboWidth, fboHeight),
                    velocityForce: createTexture(fboWidth, fboHeight),
                    velocityViscousA: createTexture(fboWidth, fboHeight),
                    velocityViscousB: createTexture(fboWidth, fboHeight),
                    divergence: createTexture(fboWidth, fboHeight),
                    pressureA: createTexture(fboWidth, fboHeight),
                    pressureB: createTexture(fboWidth, fboHeight),
                    fboWidth,
                    fboHeight,
                };
            };

            const clearTexture = (encoder: GPUCommandEncoder, texture: TextureSet) => {
                if (!device) return;
                const bindGroup = device.createBindGroup({
                    layout: clearLayout,
                    entries: [{ binding: 0, resource: texture.view }],
                });
                const pass = encoder.beginComputePass();
                pass.setPipeline(clearPipeline);
                pass.setBindGroup(0, bindGroup);
                pass.dispatchWorkgroups(Math.ceil(texture.width / 8), Math.ceil(texture.height / 8));
                pass.end();
            };

            const buildBindGroups = (res: SimResources) => {
                if (!device) return null;

                const buildFor = (currentIsA: boolean) => {
                    const velocityCurrent = currentIsA ? res.velocityA : res.velocityB;
                    const velocityNext = currentIsA ? res.velocityB : res.velocityA;

                    const advectionBindGroup = device.createBindGroup({
                        layout: computeLayout,
                        entries: [
                            { binding: 0, resource: { buffer: simUniformBuffer } },
                            { binding: 1, resource: sampler },
                            { binding: 2, resource: velocityCurrent.view },
                            { binding: 3, resource: velocityNext.view },
                        ],
                    });

                    const divergenceBindGroup = device.createBindGroup({
                        layout: computeLayout,
                        entries: [
                            { binding: 0, resource: { buffer: divergenceUniformBuffer } },
                            { binding: 1, resource: sampler },
                            { binding: 2, resource: res.velocityForce.view },
                            { binding: 3, resource: res.divergence.view },
                        ],
                    });

                    const divergenceViscousBindGroup = device.createBindGroup({
                        layout: computeLayout,
                        entries: [
                            { binding: 0, resource: { buffer: divergenceUniformBuffer } },
                            { binding: 1, resource: sampler },
                            { binding: 2, resource: res.velocityViscousA.view },
                            { binding: 3, resource: res.divergence.view },
                        ],
                    });

                    const divergenceViscousAltBindGroup = device.createBindGroup({
                        layout: computeLayout,
                        entries: [
                            { binding: 0, resource: { buffer: divergenceUniformBuffer } },
                            { binding: 1, resource: sampler },
                            { binding: 2, resource: res.velocityViscousB.view },
                            { binding: 3, resource: res.divergence.view },
                        ],
                    });

                    const poissonBindGroupA = device.createBindGroup({
                        layout: poissonLayout,
                        entries: [
                            { binding: 0, resource: { buffer: poissonUniformBuffer } },
                            { binding: 1, resource: sampler },
                            { binding: 2, resource: res.pressureA.view },
                            { binding: 3, resource: res.divergence.view },
                            { binding: 4, resource: res.pressureB.view },
                        ],
                    });

                    const poissonBindGroupB = device.createBindGroup({
                        layout: poissonLayout,
                        entries: [
                            { binding: 0, resource: { buffer: poissonUniformBuffer } },
                            { binding: 1, resource: sampler },
                            { binding: 2, resource: res.pressureB.view },
                            { binding: 3, resource: res.divergence.view },
                            { binding: 4, resource: res.pressureA.view },
                        ],
                    });

                    const pressureBindGroupA = device.createBindGroup({
                        layout: poissonLayout,
                        entries: [
                            { binding: 0, resource: { buffer: pressureUniformBuffer } },
                            { binding: 1, resource: sampler },
                            { binding: 2, resource: res.pressureA.view },
                            { binding: 3, resource: res.velocityForce.view },
                            { binding: 4, resource: velocityCurrent.view },
                        ],
                    });

                    const pressureBindGroupB = device.createBindGroup({
                        layout: poissonLayout,
                        entries: [
                            { binding: 0, resource: { buffer: pressureUniformBuffer } },
                            { binding: 1, resource: sampler },
                            { binding: 2, resource: res.pressureB.view },
                            { binding: 3, resource: res.velocityForce.view },
                            { binding: 4, resource: velocityCurrent.view },
                        ],
                    });

                    const pressureViscousBindGroupA = device.createBindGroup({
                        layout: poissonLayout,
                        entries: [
                            { binding: 0, resource: { buffer: pressureUniformBuffer } },
                            { binding: 1, resource: sampler },
                            { binding: 2, resource: res.pressureA.view },
                            { binding: 3, resource: res.velocityViscousA.view },
                            { binding: 4, resource: velocityCurrent.view },
                        ],
                    });

                    const pressureViscousBindGroupB = device.createBindGroup({
                        layout: poissonLayout,
                        entries: [
                            { binding: 0, resource: { buffer: pressureUniformBuffer } },
                            { binding: 1, resource: sampler },
                            { binding: 2, resource: res.pressureB.view },
                            { binding: 3, resource: res.velocityViscousA.view },
                            { binding: 4, resource: velocityCurrent.view },
                        ],
                    });

                    const pressureViscousAltBindGroupA = device.createBindGroup({
                        layout: poissonLayout,
                        entries: [
                            { binding: 0, resource: { buffer: pressureUniformBuffer } },
                            { binding: 1, resource: sampler },
                            { binding: 2, resource: res.pressureA.view },
                            { binding: 3, resource: res.velocityViscousB.view },
                            { binding: 4, resource: velocityCurrent.view },
                        ],
                    });

                    const pressureViscousAltBindGroupB = device.createBindGroup({
                        layout: poissonLayout,
                        entries: [
                            { binding: 0, resource: { buffer: pressureUniformBuffer } },
                            { binding: 1, resource: sampler },
                            { binding: 2, resource: res.pressureB.view },
                            { binding: 3, resource: res.velocityViscousB.view },
                            { binding: 4, resource: velocityCurrent.view },
                        ],
                    });

                    const viscousBindGroupA = device.createBindGroup({
                        layout: viscousLayout,
                        entries: [
                            { binding: 0, resource: { buffer: viscousUniformBuffer } },
                            { binding: 1, resource: sampler },
                            { binding: 2, resource: res.velocityForce.view },
                            { binding: 3, resource: res.velocityViscousA.view },
                            { binding: 4, resource: res.velocityViscousB.view },
                        ],
                    });

                    const viscousBindGroupB = device.createBindGroup({
                        layout: viscousLayout,
                        entries: [
                            { binding: 0, resource: { buffer: viscousUniformBuffer } },
                            { binding: 1, resource: sampler },
                            { binding: 2, resource: res.velocityForce.view },
                            { binding: 3, resource: res.velocityViscousB.view },
                            { binding: 4, resource: res.velocityViscousA.view },
                        ],
                    });

                    const externalBindGroup = device.createBindGroup({
                        layout: externalLayout,
                        entries: [
                            { binding: 0, resource: { buffer: externalUniformBuffer } },
                            { binding: 1, resource: velocityNext.view },
                            { binding: 2, resource: res.velocityForce.view },
                        ],
                    });

                    const outputBindGroupCurrent = device.createBindGroup({
                        layout: outputLayout,
                        entries: [
                            { binding: 0, resource: sampler },
                            { binding: 1, resource: velocityCurrent.view },
                        ],
                    });

                    const outputBindGroupNext = device.createBindGroup({
                        layout: outputLayout,
                        entries: [
                            { binding: 0, resource: sampler },
                            { binding: 1, resource: velocityCurrent.view },
                        ],
                    });

                    return {
                        advectionBindGroup,
                        divergenceBindGroup,
                        divergenceViscousBindGroup,
                        divergenceViscousAltBindGroup,
                        poissonBindGroupA,
                        poissonBindGroupB,
                        pressureBindGroupA,
                        pressureBindGroupB,
                        pressureViscousBindGroupA,
                        pressureViscousBindGroupB,
                        pressureViscousAltBindGroupA,
                        pressureViscousAltBindGroupB,
                        viscousBindGroupA,
                        viscousBindGroupB,
                        externalBindGroup,
                        outputBindGroupCurrent,
                        outputBindGroupNext,
                    };
                };

                return {
                    currentA: buildFor(true),
                };
            };

            const buildResources = () => {
                resources = createResources();
                if (!resources || !device) return null;

                const encoder = device.createCommandEncoder();
                [
                    resources.velocityA,
                    resources.velocityB,
                    resources.velocityForce,
                    resources.velocityViscousA,
                    resources.velocityViscousB,
                    resources.divergence,
                    resources.pressureA,
                    resources.pressureB,
                ].forEach((texture) => clearTexture(encoder, texture));
                device.queue.submit([encoder.finish()]);

                return buildBindGroups(resources);
            };

            let bindGroups = buildResources();
            if (!resources || !bindGroups) return;

            const handleResize = () => {
                bindGroups = buildResources();
            };

            const stepSimulation = () => {
                if (!device || !context || !resources || !bindGroups) return;

                const activeGroups = bindGroups.currentA;

                mouse.diff.x = mouse.coords.x - mouse.prev.x;
                mouse.diff.y = mouse.coords.y - mouse.prev.y;
                mouse.prev.x = mouse.coords.x;
                mouse.prev.y = mouse.coords.y;
                if (mouse.prev.x === 0 && mouse.prev.y === 0) {
                    mouse.diff.x = 0;
                    mouse.diff.y = 0;
                }

                const px = { x: 1 / resources.fboWidth, y: 1 / resources.fboHeight };
                writeExternalUniforms(px);

                const encoder = device.createCommandEncoder();
                const dispatchX = Math.ceil(resources.fboWidth / 8);
                const dispatchY = Math.ceil(resources.fboHeight / 8);

                const advectionPass = encoder.beginComputePass();
                advectionPass.setPipeline(advectionPipeline);
                advectionPass.setBindGroup(0, activeGroups.advectionBindGroup);
                advectionPass.dispatchWorkgroups(dispatchX, dispatchY);
                advectionPass.end();

                const externalPass = encoder.beginComputePass();
                externalPass.setPipeline(externalPipeline);
                externalPass.setBindGroup(0, activeGroups.externalBindGroup);
                externalPass.dispatchWorkgroups(dispatchX, dispatchY);
                externalPass.end();

                let velocityForSolve = resources.velocityForce;
                if (settings.isViscous) {
                    for (let i = 0; i < settings.iterationsViscous; i += 1) {
                        const viscousPass = encoder.beginComputePass();
                        viscousPass.setPipeline(viscousPipeline);
                        viscousPass.setBindGroup(0, i % 2 === 0 ? activeGroups.viscousBindGroupA : activeGroups.viscousBindGroupB);
                        viscousPass.dispatchWorkgroups(dispatchX, dispatchY);
                        viscousPass.end();
                    }
                    velocityForSolve = settings.iterationsViscous % 2 === 0 ? resources.velocityViscousA : resources.velocityViscousB;
                }

                const divergencePass = encoder.beginComputePass();
                divergencePass.setPipeline(divergencePipeline);
                divergencePass.setBindGroup(
                    0,
                    settings.isViscous
                        ? velocityForSolve === resources.velocityViscousA
                            ? activeGroups.divergenceViscousBindGroup
                            : activeGroups.divergenceViscousAltBindGroup
                        : activeGroups.divergenceBindGroup
                );
                divergencePass.dispatchWorkgroups(dispatchX, dispatchY);
                divergencePass.end();

                let pressureOutIsA = true;
                for (let i = 0; i < settings.iterationsPoisson; i += 1) {
                    const poissonPass = encoder.beginComputePass();
                    poissonPass.setPipeline(poissonPipeline);
                    poissonPass.setBindGroup(0, i % 2 === 0 ? activeGroups.poissonBindGroupA : activeGroups.poissonBindGroupB);
                    poissonPass.dispatchWorkgroups(dispatchX, dispatchY);
                    poissonPass.end();
                    pressureOutIsA = i % 2 !== 0;
                }

                const pressurePass = encoder.beginComputePass();
                pressurePass.setPipeline(pressurePipeline);
                if (settings.isViscous) {
                    if (velocityForSolve === resources.velocityViscousA) {
                        pressurePass.setBindGroup(0, pressureOutIsA ? activeGroups.pressureViscousBindGroupA : activeGroups.pressureViscousBindGroupB);
                    } else {
                        pressurePass.setBindGroup(0, pressureOutIsA ? activeGroups.pressureViscousAltBindGroupA : activeGroups.pressureViscousAltBindGroupB);
                    }
                } else {
                    pressurePass.setBindGroup(0, pressureOutIsA ? activeGroups.pressureBindGroupA : activeGroups.pressureBindGroupB);
                }
                pressurePass.dispatchWorkgroups(dispatchX, dispatchY);
                pressurePass.end();

                const renderPass = encoder.beginRenderPass({
                    colorAttachments: [
                        {
                            view: context.getCurrentTexture().createView(),
                            clearValue: { r: 0.97, g: 0.98, b: 1.0, a: 1.0 },
                            loadOp: 'clear',
                            storeOp: 'store',
                        },
                    ],
                });
                renderPass.setPipeline(outputPipeline);
                renderPass.setBindGroup(0, activeGroups.outputBindGroupCurrent);
                renderPass.draw(3, 1, 0, 0);
                renderPass.end();

                device.queue.submit([encoder.finish()]);
            };

            const tick = () => {
                if (!isVisible || !isRunning) return;
                stepSimulation();
                if (!prefersReducedMotion) {
                    animationFrame = requestAnimationFrame(tick);
                }
            };

            const handleVisibility = () => {
                isVisible = document.visibilityState === 'visible';
                if (isVisible && !prefersReducedMotion) {
                    tick();
                }
            };

            const observer = new IntersectionObserver((entries) => {
                isVisible = entries[0]?.isIntersecting ?? true;
                if (isVisible && !prefersReducedMotion) {
                    tick();
                }
            });

            observer.observe(canvas);
            window.addEventListener('resize', handleResize);
            document.addEventListener('visibilitychange', handleVisibility);
            window.addEventListener('pointermove', handlePointerMove);
            window.addEventListener('touchmove', handleTouchMove, { passive: true });

            tick();

            cleanup = () => {
                observer.disconnect();
                window.removeEventListener('resize', handleResize);
                document.removeEventListener('visibilitychange', handleVisibility);
                window.removeEventListener('pointermove', handlePointerMove);
                window.removeEventListener('touchmove', handleTouchMove);
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
            };
        };

        init();

        return () => {
            isRunning = false;
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
            if (cleanup) {
                cleanup();
            }
        };
    }, []);

    return <canvas ref={canvasRef} className="webgpu-canvas" aria-hidden="true" />;
};

export default WebGPUBackground;
