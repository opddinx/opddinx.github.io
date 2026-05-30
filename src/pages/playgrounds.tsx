import * as React from 'react';
import { Helmet } from 'react-helmet';
import type { HeadFC, PageProps } from 'gatsby';
import { PageShell, SectionHeading } from '../components/PortfolioLayout';
import Footer from '../components/Footer';
import { T } from '../styles/theme';
import '../styles/global.css';

// ─── Shared GLSL preamble ──────────────────────────────────────────────────

const VERT = `attribute vec2 a; void main(){ gl_Position=vec4(a,0.,1.); }`;

const FRAG_HEAD = `
precision highp float;
uniform vec2  uRes;
uniform float uT;
uniform vec2  uMouse;
#define PI 3.14159265
`;

const NOISE = `
float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p),f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
             mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
}
float fbm(vec2 p){ float v=0.,a=0.5; for(int i=0;i<5;i++){ v+=a*noise(p); p*=2.03; a*=0.5; } return v; }
`;

// ─── Shader definitions ────────────────────────────────────────────────────

const SHADERS = [
  {
    id: 'iridescence',
    title: 'Iridescence',
    note: 'Thin-film interference · gloss perception',
    src: `${FRAG_HEAD}${NOISE}
      vec3 spectrum(float t){
        return 0.5 + 0.5 * cos(2.0*PI*(vec3(0.0,0.33,0.67) + t));
      }
      void main(){
        vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
        float r = length(uv);
        float a = atan(uv.y, uv.x);
        float thick = fbm(uv*2.5 + uT*0.06) + 0.4*sin(a*3.0 + uT*0.4);
        vec3 col = spectrum(thick + r*0.6);
        col = mix(vec3(0.07,0.06,0.12), col, 0.55 + 0.45*fbm(uv*4.0+uT*0.1));
        col += (hash(gl_FragCoord.xy + uT)-0.5)*0.04;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  },
  {
    id: 'caustics',
    title: 'Caustics',
    note: 'Wavefront focusing · light through fluid',
    src: `${FRAG_HEAD}${NOISE}
      void main(){
        vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
        vec2 p = uv*3.0;
        float t = uT*0.4;
        vec2 d1 = vec2(fbm(p+t),       fbm(p-t+5.7));
        vec2 d2 = vec2(fbm(p*1.7-t),   fbm(p*1.7+t+11.3));
        float c = abs(d1.x-d2.x) + abs(d1.y-d2.y);
        c = pow(1.0 - clamp(c*1.5, 0.0, 1.0), 6.0);
        vec3 col = mix(vec3(0.04,0.08,0.16), vec3(1.0,0.96,0.82), c);
        col += (hash(gl_FragCoord.xy+uT)-0.5)*0.03;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  },
  {
    id: 'subsurface',
    title: 'Subsurface',
    note: 'Translucency · skin / silicone · move cursor',
    src: `${FRAG_HEAD}${NOISE}
      void main(){
        vec2 uv = (gl_FragCoord.xy - 0.5*uRes) / uRes.y;
        float r2 = dot(uv,uv);
        if(r2>0.72){
          vec3 bg=mix(vec3(0.92,0.86,0.78),vec3(0.86,0.78,0.74),uv.y+0.5);
          bg+=(hash(gl_FragCoord.xy+uT)-0.5)*0.03;
          gl_FragColor=vec4(bg,1.0); return;
        }
        float z=sqrt(0.72-r2);
        vec3 n=normalize(vec3(uv,z));
        vec2 mp=(uMouse.x<0.0)?vec2(0.5,0.7):uMouse;
        vec3 L=normalize(vec3((mp.x*2.0-1.0)*1.2,(mp.y*2.0-1.0)*1.2,0.8));
        float diff=max(dot(n,L),0.0);
        float back=max(0.0,dot(-n,normalize(L*vec3(-1,-1,1))));
        back=pow(back,2.0);
        vec3 base=vec3(0.96,0.66,0.62);
        vec3 deep=vec3(0.6,0.12,0.10);
        vec3 col=base*diff+deep*back*0.7+0.06;
        float spec=pow(max(dot(reflect(-L,n),vec3(0,0,1)),0.0),64.0);
        col+=spec*0.9;
        col+=(hash(gl_FragCoord.xy+uT)-0.5)*0.025;
        gl_FragColor=vec4(col,1.0);
      }
    `,
  },
  {
    id: 'thermal',
    title: 'Thermal',
    note: 'Heat field · hand–object contact · move cursor',
    src: `${FRAG_HEAD}${NOISE}
      vec3 ramp(float t){
        t=clamp(t,0.0,1.0);
        vec3 c=vec3(0.001,0.005,0.05);
        c=mix(c,vec3(0.30,0.04,0.30),smoothstep(0.0,0.45,t));
        c=mix(c,vec3(0.99,0.42,0.20),smoothstep(0.35,0.75,t));
        c=mix(c,vec3(1.00,0.92,0.60),smoothstep(0.75,1.00,t));
        return c;
      }
      void main(){
        vec2 uv=(gl_FragCoord.xy-0.5*uRes)/uRes.y;
        vec2 mp=(uMouse.x<0.0)?vec2(sin(uT*0.4)*0.2,cos(uT*0.3)*0.18):(uMouse-0.5)*vec2(uRes.x/uRes.y,1.0);
        float heat=exp(-length(uv-mp)*3.5)+0.6*exp(-length(uv-mp*0.4-vec2(0.2,-0.1))*5.0);
        heat+=fbm(uv*3.0+uT*0.2)*0.3;
        gl_FragColor=vec4(ramp(heat),1.0);
      }
    `,
  },
  {
    id: 'rough',
    title: 'Rough Surface',
    note: 'Microfacet BRDF · drag cursor to move light',
    src: `${FRAG_HEAD}${NOISE}
      vec3 normalAt(vec2 p){
        float e=0.0035;
        float h0=fbm(p*9.0),hx=fbm(p*9.0+vec2(e,0.0)),hy=fbm(p*9.0+vec2(0.0,e));
        return normalize(vec3((h0-hx)*4.5,(h0-hy)*4.5,1.0));
      }
      void main(){
        vec2 uv=(gl_FragCoord.xy-0.5*uRes)/uRes.y;
        vec3 n=normalAt(uv+uT*0.02);
        vec2 mp=(uMouse.x<0.0)?vec2(cos(uT*0.5)*0.6,sin(uT*0.5)*0.4):(uMouse-0.5)*1.8;
        vec3 L=normalize(vec3(mp,0.85));
        vec3 H=normalize(L+vec3(0,0,1));
        vec3 albedo=vec3(0.86,0.72,0.56);
        albedo=mix(albedo,vec3(0.62,0.50,0.42),fbm(uv*1.5+11.7)*0.6);
        float NdL=max(dot(n,L),0.0),NdH=max(dot(n,H),0.0);
        vec3 sky=vec3(0.78,0.84,0.95),ground=vec3(0.30,0.22,0.18);
        vec3 ambient=mix(ground,sky,n.y*0.5+0.5)*0.18;
        float spec=pow(NdH,12.0)*0.32;
        vec3 col=albedo*(NdL*0.92)+ambient+vec3(spec);
        col+=(hash(gl_FragCoord.xy*1.7+uT)-0.5)*0.04;
        gl_FragColor=vec4(col,1.0);
      }
    `,
  },
] as const;

// ─── ShaderTile ─────────────────────────────────────────────────────────────

function compileShader(gl: WebGLRenderingContext, type: number, src: string): WebGLShader | null {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('[ShaderTile]', gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

interface TileProps { title: string; note: string; src: string; }

function ShaderTile({ title, note, src }: TileProps) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouseRef = React.useRef<[number, number]>([-1, -1]);
  const visibleRef = React.useRef(false);

  React.useEffect(() => {
    const c = canvasRef.current;
    const wrap = wrapRef.current;
    if (!c || !wrap) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const gl = c.getContext('webgl', { antialias: false, premultipliedAlpha: false });
    if (!gl) return;

    const v = compileShader(gl, gl.VERTEX_SHADER, VERT);
    const f = compileShader(gl, gl.FRAGMENT_SHADER, src);
    if (!v || !f) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('[ShaderTile] link', gl.getProgramInfoLog(prog)); return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aLoc = gl.getAttribLocation(prog, 'a');
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes   = gl.getUniformLocation(prog, 'uRes');
    const uT     = gl.getUniformLocation(prog, 'uT');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');

    const setSize = (w: number) => {
      if (w === 0) return;
      c.width  = Math.round(w * dpr);
      c.height = Math.round(w * dpr);
      gl.viewport(0, 0, c.width, c.height);
    };

    const ro = new ResizeObserver((entries) => {
      for (const e of entries) setSize(e.contentRect.width);
    });
    ro.observe(wrap);

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) visibleRef.current = e.isIntersecting;
    }, { threshold: 0.01 });
    io.observe(wrap);

    const t0 = performance.now();
    let raf: number;
    const tick = () => {
      if (visibleRef.current) {
        gl.uniform2f(uRes, c.width, c.height);
        gl.uniform1f(uT, (performance.now() - t0) / 1000);
        gl.uniform2f(uMouse, mouseRef.current[0], mouseRef.current[1]);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(v);
      gl.deleteShader(f);
      gl.deleteBuffer(buf);
    };
  }, [src]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseRef.current = [
      (e.clientX - r.left) / r.width,
      1 - (e.clientY - r.top) / r.height,
    ];
  };
  const onMouseLeave = () => { mouseRef.current = [-1, -1]; };

  return (
    <figure style={{ margin: 0 }}>
      <div
        ref={wrapRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: 4, cursor: 'crosshair', background: '#000' }}
      >
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
      </div>
      <figcaption style={{ marginTop: 14 }}>
        <div style={{ fontFamily: T.serif, fontSize: 17, fontWeight: 400, color: T.fg }}>{title}</div>
        <div style={{ fontFamily: T.serif, fontSize: 14, color: T.fgMute, marginTop: 3, lineHeight: 1.4 }}>{note}</div>
      </figcaption>
    </figure>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────

const PlaygroundsPage: React.FC<PageProps> = () => (
  <PageShell active="playgrounds">
    <Helmet>
      <meta charSet="utf-8" />
      <link rel="canonical" href="https://opddinx.github.io/playgrounds" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,200..700&family=Allura&family=Shippori+Mincho&display=swap" rel="stylesheet" />
      <title>Playgrounds — Kohei Miura</title>
    </Helmet>

    <section style={{ marginTop: 72, marginBottom: 24 }}>
      <SectionHeading>Playgrounds.</SectionHeading>
      <p style={{ color: T.fgMute, fontFamily: T.serif, fontSize: 15, margin: '-12px 0 48px', lineHeight: 1.6, maxWidth: 560 }}>
        A working notebook on visual materiality — interactive GLSL sketches. Move the cursor over each tile to interact.
      </p>

      <div className="l-shader-grid">
        {SHADERS.map((s) => (
          <ShaderTile key={s.id} title={s.title} note={s.note} src={s.src} />
        ))}
      </div>
    </section>

    <Footer />
  </PageShell>
);

export default PlaygroundsPage;
export const Head: HeadFC = () => <title>Playgrounds — Kohei Miura</title>;
