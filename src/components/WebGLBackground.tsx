import React from 'react';

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

export default WebGLBackground;
