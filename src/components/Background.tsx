import React from 'react';


const vertexSource = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentSource = `
precision highp float;

uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_time;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float circle(vec2 uv, vec2 center, float radius, float softness) {
    float d = length(uv - center);
    return smoothstep(radius, radius - softness, d);
}

float ring(vec2 uv, vec2 center, float radius, float thickness, float softness) {
    float d = length(uv - center);
    float inner = radius - thickness;
    float outer = radius + thickness;
    float innerEdge = smoothstep(inner - softness, inner + softness, d);
    float outerEdge = 1.0 - smoothstep(outer - softness, outer + softness, d);
    return innerEdge * outerEdge;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 pointer = u_pointer;
    vec2 center = vec2(0.5);
    vec2 dir = normalize(center - pointer);

    float dist = length(uv - pointer);
    float core = exp(-dist * dist * 14.0);

    float streak = exp(-abs(uv.y - pointer.y) * 20.0) * exp(-abs(uv.x - pointer.x) * 2.1);

    float ghost1 = circle(uv, mix(pointer, center, 0.2), 0.16, 0.1);
    float ghost2 = circle(uv, mix(pointer, center, 0.55) + dir * 0.08, 0.12, 0.08);
    float ghost3 = circle(uv, mix(pointer, center, 0.78) - dir * 0.12, 0.2, 0.12);

    vec2 arcCenter = mix(pointer, center, 0.32) + vec2(-0.1, 0.06);
    float arc = ring(uv, arcCenter, 0.5, 0.12, 0.08);

    vec3 leakColor = vec3(0.42, 0.86, 0.78);
    vec3 pink = vec3(0.78, 0.42, 0.62);
    vec3 violet = vec3(0.35, 0.44, 0.74);

    vec3 color = leakColor * core * 0.9;
    color += violet * streak * 0.55;
    color += pink * ghost1 * 0.45;
    color += leakColor * ghost2 * 0.42;
    color += violet * ghost3 * 0.38;

    float bokeh = 0.0;
    for (int i = 0; i < 3; i++) {
        float fi = float(i);
        vec2 seed = vec2(fi * 1.31, fi * 2.71);
        vec2 pos = vec2(hash(seed + 0.1), hash(seed + 0.7));
        pos += vec2(sin(u_time * 0.15 + fi), cos(u_time * 0.12 + fi)) * 0.02;
        float size = 0.08 + hash(seed + 1.3) * 0.06;
        bokeh += circle(uv, pos, size, size * 0.9) * 0.18;
    }
    color += leakColor * bokeh * 0.35;
    color += vec3(0.82, 0.8, 0.92) * arc * 0.5;

    float alpha = clamp(core * 0.6 + streak * 0.4 + ghost1 * 0.6 + ghost2 * 0.5 + ghost3 * 0.5 + bokeh * 0.5 + arc * 0.55, 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
}
`;

const LensFlareOverlay: React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return undefined;
        }

        const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
        if (!gl) {
            return undefined;
        }

        const compile = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) {
                return null;
            }
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = compile(gl.VERTEX_SHADER, vertexSource);
        const fragmentShader = compile(gl.FRAGMENT_SHADER, fragmentSource);
        if (!vertexShader || !fragmentShader) {
            return undefined;
        }

        const program = gl.createProgram();
        if (!program) {
            return undefined;
        }
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            gl.deleteProgram(program);
            return undefined;
        }

        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const positionLoc = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(positionLoc);
        gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

        const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
        const pointerLoc = gl.getUniformLocation(program, 'u_pointer');
        const timeLoc = gl.getUniformLocation(program, 'u_time');

        let width = 0;
        let height = 0;
        let pointerX = 0.35;
        let pointerY = 0.6;
        let rafId = 0;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
            width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
            height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
            canvas.width = width;
            canvas.height = height;
            gl.viewport(0, 0, width, height);
        };

        window.addEventListener('resize', resize);

        resize();

        gl.useProgram(program);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE);

        let lastFrame = 0;
        const render = (time: number) => {
            if (time - lastFrame < 33) {
                rafId = window.requestAnimationFrame(render);
                return;
            }
            lastFrame = time;
            const t = time * 0.00014;
            pointerX = 0.35 + Math.sin(t * 2.2) * 0.22;
            pointerY = 0.55 + Math.cos(t * 1.7) * 0.18;
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.uniform2f(resolutionLoc, width, height);
            gl.uniform2f(pointerLoc, pointerX, 1.0 - pointerY);
            gl.uniform1f(timeLoc, time * 0.001);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            rafId = window.requestAnimationFrame(render);
        };

        rafId = window.requestAnimationFrame(render);

        return () => {
            window.removeEventListener('resize', resize);
            if (rafId) {
                window.cancelAnimationFrame(rafId);
            }
            gl.disable(gl.BLEND);
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            if (buffer) {
                gl.deleteBuffer(buffer);
            }
        };
    }, []);

    return <canvas ref={canvasRef} className="lensflare-canvas" aria-hidden="true" />;
};

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

const WebGLBackground: React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            return;
        }

        const gl = canvas.getContext('webgl', { alpha: true, antialias: false });
        if (!gl) {
            return;
        }

        let animationFrame: number | null = null;
        let isVisible = true;
        let isRunning = true;

        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        const settings = {
            iterationsPoisson: 32,
            mouseForce: 20,
            resolution: 0.5,
            cursorSize: 100,
            dt: 0.014,
            isBounce: false,
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

        const getExtension = (name: string) => gl.getExtension(name);
        const halfFloat = getExtension('OES_texture_half_float');
        const floatTex = getExtension('OES_texture_float');
        getExtension('OES_texture_half_float_linear');
        getExtension('OES_texture_float_linear');

        const textureType = halfFloat ? halfFloat.HALF_FLOAT_OES : floatTex ? gl.FLOAT : gl.UNSIGNED_BYTE;
        const textureFilter = halfFloat || floatTex ? gl.NEAREST : gl.LINEAR;

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                // eslint-disable-next-line no-console
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const createProgram = (vsSource: string, fsSource: string) => {
            const vs = createShader(gl.VERTEX_SHADER, vsSource);
            const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
            if (!vs || !fs) return null;
            const program = gl.createProgram();
            if (!program) return null;
            gl.attachShader(program, vs);
            gl.attachShader(program, fs);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                // eslint-disable-next-line no-console
                console.error(gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                return null;
            }
            return program;
        };

        const faceVert = `
attribute vec3 position;
uniform vec2 px;
uniform vec2 boundarySpace;
varying vec2 uv;
precision highp float;
void main(){
    vec3 pos = position;
    vec2 scale = 1.0 - boundarySpace * 2.0;
    pos.xy = pos.xy * scale;
    uv = vec2(0.5) + (pos.xy) * 0.5;
    gl_Position = vec4(pos, 1.0);
}
`;

        const mouseVert = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
uniform vec2 center;
uniform vec2 scale;
uniform vec2 px;
varying vec2 vUv;
void main(){
    vec2 pos = position.xy * scale * 2.0 * px + center;
    vUv = uv;
    gl_Position = vec4(pos, 0.0, 1.0);
}
`;

        const advectionFrag = `
precision highp float;
uniform sampler2D velocity;
uniform float dt;
uniform bool isBFECC;
uniform vec2 fboSize;
uniform vec2 px;
varying vec2 uv;
void main(){
    vec2 ratio = max(fboSize.x, fboSize.y) / fboSize;
    if(isBFECC == false){
        vec2 vel = texture2D(velocity, uv).xy;
        vec2 uv2 = uv - vel * dt * ratio;
        vec2 newVel = texture2D(velocity, uv2).xy;
        gl_FragColor = vec4(newVel, 0.0, 0.0);
    } else {
        vec2 spot_new = uv;
        vec2 vel_old = texture2D(velocity, uv).xy;
        vec2 spot_old = spot_new - vel_old * dt * ratio;
        vec2 vel_new1 = texture2D(velocity, spot_old).xy;
        vec2 spot_new2 = spot_old + vel_new1 * dt * ratio;
        vec2 error = spot_new2 - spot_new;
        vec2 spot_new3 = spot_new - error / 2.0;
        vec2 vel_2 = texture2D(velocity, spot_new3).xy;
        vec2 spot_old2 = spot_new3 - vel_2 * dt * ratio;
        vec2 newVel2 = texture2D(velocity, spot_old2).xy; 
        gl_FragColor = vec4(newVel2, 0.0, 0.0);
    }
}
`;

        const divergenceFrag = `
precision highp float;
uniform sampler2D velocity;
uniform float dt;
uniform vec2 px;
varying vec2 uv;
void main(){
    float x0 = texture2D(velocity, uv-vec2(px.x, 0)).x;
    float x1 = texture2D(velocity, uv+vec2(px.x, 0)).x;
    float y0 = texture2D(velocity, uv-vec2(0, px.y)).y;
    float y1 = texture2D(velocity, uv+vec2(0, px.y)).y;
    float divergence = (x1-x0 + y1-y0) / 2.0;
    gl_FragColor = vec4(divergence / dt);
}
`;

        const poissonFrag = `
precision highp float;
uniform sampler2D pressure;
uniform sampler2D divergence;
uniform vec2 px;
varying vec2 uv;
void main(){    
    float p0 = texture2D(pressure, uv+vec2(px.x * 2.0,  0)).r;
    float p1 = texture2D(pressure, uv-vec2(px.x * 2.0, 0)).r;
    float p2 = texture2D(pressure, uv+vec2(0, px.y * 2.0 )).r;
    float p3 = texture2D(pressure, uv-vec2(0, px.y * 2.0 )).r;
    float div = texture2D(divergence, uv).r;
    float newP = (p0 + p1 + p2 + p3) / 4.0 - div;
    gl_FragColor = vec4(newP);
}
`;

        const pressureFrag = `
precision highp float;
uniform sampler2D pressure;
uniform sampler2D velocity;
uniform vec2 px;
uniform float dt;
varying vec2 uv;
void main(){
    float step = 1.0;
    float p0 = texture2D(pressure, uv+vec2(px.x * step, 0)).r;
    float p1 = texture2D(pressure, uv-vec2(px.x * step, 0)).r;
    float p2 = texture2D(pressure, uv+vec2(0, px.y * step)).r;
    float p3 = texture2D(pressure, uv-vec2(0, px.y * step)).r;
    vec2 v = texture2D(velocity, uv).xy;
    vec2 gradP = vec2(p0 - p1, p2 - p3) * 0.5;
    v = v - gradP * dt;
    gl_FragColor = vec4(v, 0.0, 1.0);
}
`;

        const externalForceFrag = `
precision highp float;
uniform vec2 force;
uniform vec2 center;
uniform vec2 scale;
uniform vec2 px;
varying vec2 vUv;
void main(){
    vec2 circle = (vUv - 0.5) * 2.0;
    float d = 1.0-min(length(circle), 1.0);
    d *= d;
    gl_FragColor = vec4(force * d, 0, 1);
}
`;

        const colorFrag = `
precision highp float;
uniform sampler2D velocity;
varying vec2 uv;
void main(){
    vec2 vel = texture2D(velocity, uv).xy;
    float len = length(vel);
    vel = vel * 0.5 + 0.5;
    vec3 color = vec3(vel.x, vel.y, 1.0);
    color = mix(vec3(1.0), color, len);
    gl_FragColor = vec4(color,  1.0);
}
`;

        const quadVertices = new Float32Array([
            -1, -1, 0,
            1, -1, 0,
            -1, 1, 0,
            -1, 1, 0,
            1, -1, 0,
            1, 1, 0,
        ]);

        const mouseVertices = new Float32Array([
            -0.5, -0.5, 0, 0, 0,
            0.5, -0.5, 0, 1, 0,
            -0.5, 0.5, 0, 0, 1,
            -0.5, 0.5, 0, 0, 1,
            0.5, -0.5, 0, 1, 0,
            0.5, 0.5, 0, 1, 1,
        ]);

        const createBuffer = (data: Float32Array) => {
            const buffer = gl.createBuffer();
            if (!buffer) return null;
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
            return buffer;
        };

        const quadBuffer = createBuffer(quadVertices);
        const mouseBuffer = createBuffer(mouseVertices);

        const createTexture = (width: number, height: number) => {
            const texture = gl.createTexture();
            if (!texture) return null;
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, textureFilter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, textureFilter);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, textureType, null);
            return texture;
        };

        const createFBO = (texture: WebGLTexture | null) => {
            const fbo = gl.createFramebuffer();
            if (!fbo || !texture) return null;
            gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
            return fbo;
        };

        const advectionProgram = createProgram(faceVert, advectionFrag);
        const divergenceProgram = createProgram(faceVert, divergenceFrag);
        const poissonProgram = createProgram(faceVert, poissonFrag);
        const pressureProgram = createProgram(faceVert, pressureFrag);
        const outputProgram = createProgram(faceVert, colorFrag);
        const externalProgram = createProgram(mouseVert, externalForceFrag);

        if (!advectionProgram || !divergenceProgram || !poissonProgram || !pressureProgram || !outputProgram || !externalProgram || !quadBuffer || !mouseBuffer) {
            return;
        }

        let width = 1;
        let height = 1;
        let fboWidth = 1;
        let fboHeight = 1;
        let vel0: WebGLTexture | null = null;
        let vel1: WebGLTexture | null = null;
        let div: WebGLTexture | null = null;
        let pressure0: WebGLTexture | null = null;
        let pressure1: WebGLTexture | null = null;
        let vel0FBO: WebGLFramebuffer | null = null;
        let vel1FBO: WebGLFramebuffer | null = null;
        let divFBO: WebGLFramebuffer | null = null;
        let pressure0FBO: WebGLFramebuffer | null = null;
        let pressure1FBO: WebGLFramebuffer | null = null;

        const setCommonUniforms = (program: WebGLProgram, px: [number, number], fboSize: [number, number], boundary: [number, number]) => {
            const pxLoc = gl.getUniformLocation(program, 'px');
            const fboLoc = gl.getUniformLocation(program, 'fboSize');
            const boundaryLoc = gl.getUniformLocation(program, 'boundarySpace');
            if (pxLoc) gl.uniform2f(pxLoc, px[0], px[1]);
            if (fboLoc) gl.uniform2f(fboLoc, fboSize[0], fboSize[1]);
            if (boundaryLoc) gl.uniform2f(boundaryLoc, boundary[0], boundary[1]);
        };

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
            height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
            canvas.width = width;
            canvas.height = height;
            gl.viewport(0, 0, width, height);

            fboWidth = Math.max(1, Math.round(settings.resolution * width));
            fboHeight = Math.max(1, Math.round(settings.resolution * height));

            vel0 = createTexture(fboWidth, fboHeight);
            vel1 = createTexture(fboWidth, fboHeight);
            div = createTexture(fboWidth, fboHeight);
            pressure0 = createTexture(fboWidth, fboHeight);
            pressure1 = createTexture(fboWidth, fboHeight);

            vel0FBO = createFBO(vel0);
            vel1FBO = createFBO(vel1);
            divFBO = createFBO(div);
            pressure0FBO = createFBO(pressure0);
            pressure1FBO = createFBO(pressure1);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        };

        const bindQuad = (program: WebGLProgram) => {
            const posLoc = gl.getAttribLocation(program, 'position');
            gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 0, 0);
        };

        const bindMouse = (program: WebGLProgram) => {
            const posLoc = gl.getAttribLocation(program, 'position');
            const uvLoc = gl.getAttribLocation(program, 'uv');
            gl.bindBuffer(gl.ARRAY_BUFFER, mouseBuffer);
            gl.enableVertexAttribArray(posLoc);
            gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, 20, 0);
            gl.enableVertexAttribArray(uvLoc);
            gl.vertexAttribPointer(uvLoc, 2, gl.FLOAT, false, 20, 12);
        };

        const drawFullScreen = (program: WebGLProgram, target: WebGLFramebuffer | null) => {
            gl.bindFramebuffer(gl.FRAMEBUFFER, target);
            gl.viewport(0, 0, fboWidth, fboHeight);
            gl.useProgram(program);
            bindQuad(program);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        };

        const render = () => {
            if (!vel0 || !vel1 || !div || !pressure0 || !pressure1 || !vel0FBO || !vel1FBO || !divFBO || !pressure0FBO || !pressure1FBO) {
                return;
            }

            const px = [1 / fboWidth, 1 / fboHeight] as [number, number];
            const boundary = settings.isBounce ? [0, 0] as [number, number] : px;

            mouse.diff.x = mouse.coords.x - mouse.prev.x;
            mouse.diff.y = mouse.coords.y - mouse.prev.y;
            mouse.prev.x = mouse.coords.x;
            mouse.prev.y = mouse.coords.y;
            if (mouse.prev.x === 0 && mouse.prev.y === 0) {
                mouse.diff.x = 0;
                mouse.diff.y = 0;
            }

            gl.disable(gl.BLEND);

            gl.useProgram(advectionProgram);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, vel0);
            gl.uniform1i(gl.getUniformLocation(advectionProgram, 'velocity'), 0);
            gl.uniform1f(gl.getUniformLocation(advectionProgram, 'dt'), settings.dt);
            gl.uniform1i(gl.getUniformLocation(advectionProgram, 'isBFECC'), settings.BFECC ? 1 : 0);
            setCommonUniforms(advectionProgram, px, [fboWidth, fboHeight], boundary);
            drawFullScreen(advectionProgram, vel1FBO);

            gl.enable(gl.BLEND);
            gl.blendFunc(gl.ONE, gl.ONE);
            gl.useProgram(externalProgram);
            gl.bindFramebuffer(gl.FRAMEBUFFER, vel1FBO);
            gl.viewport(0, 0, fboWidth, fboHeight);
            bindMouse(externalProgram);

            const forceX = (mouse.diff.x / 2) * settings.mouseForce;
            const forceY = (mouse.diff.y / 2) * settings.mouseForce;
            const cursorSizeX = settings.cursorSize * px[0];
            const cursorSizeY = settings.cursorSize * px[1];
            const centerX = Math.min(Math.max(mouse.coords.x, -1 + cursorSizeX + px[0] * 2), 1 - cursorSizeX - px[0] * 2);
            const centerY = Math.min(Math.max(mouse.coords.y, -1 + cursorSizeY + px[1] * 2), 1 - cursorSizeY - px[1] * 2);

            gl.uniform2f(gl.getUniformLocation(externalProgram, 'force'), forceX, forceY);
            gl.uniform2f(gl.getUniformLocation(externalProgram, 'center'), centerX, centerY);
            gl.uniform2f(gl.getUniformLocation(externalProgram, 'scale'), settings.cursorSize, settings.cursorSize);
            gl.uniform2f(gl.getUniformLocation(externalProgram, 'px'), px[0], px[1]);
            gl.drawArrays(gl.TRIANGLES, 0, 6);

            gl.disable(gl.BLEND);

            gl.useProgram(divergenceProgram);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, vel1);
            gl.uniform1i(gl.getUniformLocation(divergenceProgram, 'velocity'), 0);
            gl.uniform1f(gl.getUniformLocation(divergenceProgram, 'dt'), settings.dt);
            gl.uniform2f(gl.getUniformLocation(divergenceProgram, 'px'), px[0], px[1]);
            setCommonUniforms(divergenceProgram, px, [fboWidth, fboHeight], boundary);
            drawFullScreen(divergenceProgram, divFBO);

            let pressureIn = pressure0;
            let pressureOut = pressure1;
            let pressureInFBO = pressure0FBO;
            let pressureOutFBO = pressure1FBO;

            for (let i = 0; i < settings.iterationsPoisson; i += 1) {
                gl.useProgram(poissonProgram);
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, pressureIn);
                gl.uniform1i(gl.getUniformLocation(poissonProgram, 'pressure'), 0);
                gl.activeTexture(gl.TEXTURE1);
                gl.bindTexture(gl.TEXTURE_2D, div);
                gl.uniform1i(gl.getUniformLocation(poissonProgram, 'divergence'), 1);
                gl.uniform2f(gl.getUniformLocation(poissonProgram, 'px'), px[0], px[1]);
                setCommonUniforms(poissonProgram, px, [fboWidth, fboHeight], boundary);
                drawFullScreen(poissonProgram, pressureOutFBO);

                const tmpTex = pressureIn;
                pressureIn = pressureOut;
                pressureOut = tmpTex;
                const tmpFBO = pressureInFBO;
                pressureInFBO = pressureOutFBO;
                pressureOutFBO = tmpFBO;
            }

            gl.useProgram(pressureProgram);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, pressureIn);
            gl.uniform1i(gl.getUniformLocation(pressureProgram, 'pressure'), 0);
            gl.activeTexture(gl.TEXTURE1);
            gl.bindTexture(gl.TEXTURE_2D, vel1);
            gl.uniform1i(gl.getUniformLocation(pressureProgram, 'velocity'), 1);
            gl.uniform1f(gl.getUniformLocation(pressureProgram, 'dt'), settings.dt);
            gl.uniform2f(gl.getUniformLocation(pressureProgram, 'px'), px[0], px[1]);
            setCommonUniforms(pressureProgram, px, [fboWidth, fboHeight], boundary);
            drawFullScreen(pressureProgram, vel0FBO);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, width, height);
            gl.useProgram(outputProgram);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, vel0);
            gl.uniform1i(gl.getUniformLocation(outputProgram, 'velocity'), 0);
            setCommonUniforms(outputProgram, px, [fboWidth, fboHeight], boundary);
            bindQuad(outputProgram);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        };

        const tick = () => {
            if (!isVisible || !isRunning) return;
            render();
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

        resize();
        observer.observe(canvas);
        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', handleVisibility);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('touchmove', handleTouchMove, { passive: true });

        tick();

        return () => {
            isRunning = false;
            observer.disconnect();
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', handleVisibility);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('touchmove', handleTouchMove);
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, []);

    return <canvas ref={canvasRef} className="webgpu-canvas" aria-hidden="true" />;
};

const Background: React.FC = () => {
    const [mode, setMode] = React.useState<'webgpu' | 'webgl' | null>(null);

    React.useEffect(() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const supportsWebGPU = 'gpu' in navigator && !isIOS;
        setMode(supportsWebGPU ? 'webgpu' : 'webgl');
    }, []);

    React.useEffect(() => {
        const root = document.documentElement;
        let rafId = 0;
        let start = 0;
        let lastFrame = 0;

        const animate = (time: number) => {
            if (!start) {
                start = time;
            }
            if (time - lastFrame < 33) {
                rafId = window.requestAnimationFrame(animate);
                return;
            }
            lastFrame = time;
            const t = (time - start) * 0.00012;
            const x = 35 + Math.sin(t * 3.1) * 24;
            const y = 60 + Math.cos(t * 2.6) * 18;
            root.style.setProperty('--leak-x', `${x.toFixed(2)}%`);
            root.style.setProperty('--leak-y', `${y.toFixed(2)}%`);
            rafId = window.requestAnimationFrame(animate);
        };

        rafId = window.requestAnimationFrame(animate);

        return () => {
            if (rafId) {
                window.cancelAnimationFrame(rafId);
            }
        };
    }, []);

    if (!mode) {
        return null;
    }

    return (
        <>
            {mode === 'webgpu' ? <WebGPUBackground /> : <WebGLBackground />}
            <LensFlareOverlay />
        </>
    );
};

export default Background;
