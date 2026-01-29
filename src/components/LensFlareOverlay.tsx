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

export default LensFlareOverlay;
