import React, { useEffect, useRef } from 'react';

const LL_VERT = `attribute vec2 a; void main(){ gl_Position=vec4(a,0.,1.); }`;
const LL_FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uT;
uniform vec3 uBase;
uniform vec3 uC1; uniform vec2 uP1; uniform vec2 uS1;
uniform vec3 uC2; uniform vec2 uP2; uniform vec2 uS2;
uniform vec3 uC3; uniform vec2 uP3; uniform vec2 uS3;
uniform vec3 uC4; uniform vec2 uP4; uniform vec2 uS4;
uniform float uInt;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float blob(vec2 p, vec2 c, vec2 s){
  float d = length(p - c) / s.x;
  return exp(-d*d*s.y);
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
  float t = uT * 0.045;

  vec2 d1 = vec2(sin(t*1.10), cos(t*0.80)) * 0.07;
  vec2 d2 = vec2(cos(t*0.90), sin(t*1.20)) * 0.06;
  vec2 d3 = vec2(sin(t*1.30 + 1.0), cos(t*0.70 + 2.0)) * 0.05;
  vec2 d4 = vec2(cos(t*0.60 - 0.5), sin(t*1.40 + 1.5)) * 0.06;

  vec3 col = uBase;
  col = mix(col, uC1, blob(uv, uP1 + d1, uS1) * uInt);
  col = mix(col, uC2, blob(uv, uP2 + d2, uS2) * uInt);
  col = mix(col, uC3, blob(uv, uP3 + d3, uS3) * uInt);
  col = mix(col, uC4, blob(uv, uP4 + d4, uS4) * uInt * 0.7);

  col += (hash(gl_FragCoord.xy + uT*0.1) - 0.5) * 0.008;
  gl_FragColor = vec4(col, 1.0);
}
`;

export interface LLPalette {
  base: [number, number, number];
  palette: [[number, number, number], [number, number, number], [number, number, number], [number, number, number]];
  positions: [[number, number], [number, number], [number, number], [number, number]];
  sizes: [[number, number], [number, number], [number, number], [number, number]];
}

// Reproduces the reference namecard graphic: deep navy field,
// large magenta blob on the left, warm tan arc upper-right, mint highlight lower-left.
export const DIFFRACTION_PALETTE: LLPalette = {
  base: [0.10, 0.15, 0.30],
  palette: [
    [0.49, 0.16, 0.33],
    [0.78, 0.66, 0.55],
    [0.65, 0.91, 0.82],
    [0.20, 0.28, 0.50],
  ],
  positions: [
    [-0.60, -0.10],
    [ 0.30,  0.45],
    [-0.55, -0.55],
    [ 0.60, -0.30],
  ],
  sizes: [
    [1.30, 1.4],
    [1.05, 2.3],
    [0.55, 3.4],
    [1.40, 1.2],
  ],
};

function llCompile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('[LightLeakBG] shader error', gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

interface LightLeakBGProps {
  palette?: LLPalette;
  intensity?: number;
  grain?: number;
  style?: React.CSSProperties;
}

const LightLeakBG: React.FC<LightLeakBGProps> = ({
  palette = DIFFRACTION_PALETTE,
  intensity = 0.95,
  grain = 0.18,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
    const gl = c.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const v = llCompile(gl, gl.VERTEX_SHADER, LL_VERT);
    const f = llCompile(gl, gl.FRAGMENT_SHADER, LL_FRAG);
    if (!v || !f) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, v);
    gl.attachShader(prog, f);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('[LightLeakBG] link error', gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aLoc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);

    // Set blob colors, positions, sizes (static uniforms)
    gl.uniform3fv(u('uBase'), palette.base);
    for (let i = 0; i < 4; i++) {
      const idx = (i + 1).toString();
      gl.uniform3fv(u(`uC${idx}`), palette.palette[i]);
      gl.uniform2fv(u(`uP${idx}`), palette.positions[i]);
      gl.uniform2fv(u(`uS${idx}`), palette.sizes[i]);
    }
    gl.uniform1f(u('uInt'), intensity);

    const uResLoc = u('uRes');
    const uTLoc = u('uT');

    const resize = () => {
      const parent = c.parentElement;
      if (!parent) return;
      c.width = Math.floor(parent.clientWidth * dpr);
      c.height = Math.floor(parent.clientHeight * dpr);
      gl.viewport(0, 0, c.width, c.height);
      gl.uniform2f(uResLoc, c.width, c.height);
    };
    resize();

    const t0 = performance.now();
    let raf: number;
    const tick = () => {
      gl.uniform1f(uTLoc, (performance.now() - t0) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(prog);
      gl.deleteShader(v);
      gl.deleteShader(f);
      gl.deleteBuffer(buf);
    };
  }, [palette, intensity]);

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      <svg
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          mixBlendMode: 'overlay',
          opacity: grain,
          pointerEvents: 'none',
        }}
      >
        <filter id="ll-grain-bg">
          <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#ll-grain-bg)" />
      </svg>
    </div>
  );
};

export default LightLeakBG;
