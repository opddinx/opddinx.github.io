/* <fluid-circle> — 2D stable-fluids simulation rendered as posterized contour bands
   (morpho-butterfly / holographic palette). Stirred by pointer hover & drag. */
(function () {
  if (customElements.get('fluid-circle')) return;

  const VERT = 'attribute vec2 a;varying vec2 vUv;void main(){vUv=a*0.5+0.5;gl_Position=vec4(a,0.,1.);}';
  const FRAG = {
    advect: 'precision highp float;varying vec2 vUv;uniform sampler2D uVel;uniform sampler2D uSrc;uniform float uDt;uniform float uDiss;\nvoid main(){vec2 c=vUv-uDt*texture2D(uVel,vUv).xy;gl_FragColor=uDiss*texture2D(uSrc,c);}',
    splat: 'precision highp float;varying vec2 vUv;uniform sampler2D uTgt;uniform vec2 uPoint;uniform vec3 uVal;uniform float uRadius;\nvoid main(){vec2 p=vUv-uPoint;float d=exp(-dot(p,p)/uRadius);gl_FragColor=texture2D(uTgt,vUv)+vec4(uVal*d,0.);}',
    div: 'precision highp float;varying vec2 vUv;uniform sampler2D uVel;uniform vec2 uTexel;\nvoid main(){float L=texture2D(uVel,vUv-vec2(uTexel.x,0.)).x;float R=texture2D(uVel,vUv+vec2(uTexel.x,0.)).x;float B=texture2D(uVel,vUv-vec2(0.,uTexel.y)).y;float T=texture2D(uVel,vUv+vec2(0.,uTexel.y)).y;gl_FragColor=vec4(0.5*(R-L+T-B),0.,0.,1.);}',
    press: 'precision highp float;varying vec2 vUv;uniform sampler2D uPre;uniform sampler2D uDiv;uniform vec2 uTexel;\nvoid main(){float L=texture2D(uPre,vUv-vec2(uTexel.x,0.)).x;float R=texture2D(uPre,vUv+vec2(uTexel.x,0.)).x;float B=texture2D(uPre,vUv-vec2(0.,uTexel.y)).x;float T=texture2D(uPre,vUv+vec2(0.,uTexel.y)).x;float d=texture2D(uDiv,vUv).x;gl_FragColor=vec4((L+R+B+T-d)*0.25,0.,0.,1.);}',
    grad: 'precision highp float;varying vec2 vUv;uniform sampler2D uPre;uniform sampler2D uVel;uniform vec2 uTexel;\nvoid main(){float L=texture2D(uPre,vUv-vec2(uTexel.x,0.)).x;float R=texture2D(uPre,vUv+vec2(uTexel.x,0.)).x;float B=texture2D(uPre,vUv-vec2(0.,uTexel.y)).x;float T=texture2D(uPre,vUv+vec2(0.,uTexel.y)).x;vec2 v=texture2D(uVel,vUv).xy-0.5*vec2(R-L,T-B);gl_FragColor=vec4(v,0.,1.);}',
    show: 'precision highp float;varying vec2 vUv;uniform sampler2D uDye;uniform float uBands;uniform float uT;uniform float uPal;\n' +
      'vec3 palL(float x){\n' +
      ' vec3 col=mix(vec3(0.14,0.12,0.11),vec3(0.32,0.19,0.14),smoothstep(0.,0.24,x));\n' +
      ' col=mix(col,vec3(0.60,0.29,0.18),smoothstep(0.22,0.46,x));\n' +
      ' col=mix(col,vec3(0.85,0.44,0.26),smoothstep(0.44,0.66,x));\n' +
      ' col=mix(col,vec3(0.95,0.67,0.42),smoothstep(0.64,0.84,x));\n' +
      ' col=mix(col,vec3(0.98,0.89,0.68),smoothstep(0.82,1.0,x));\n' +
      ' return col;}\n' +
      'vec3 palD(float x){\n' +
      ' vec3 col=mix(vec3(0.07,0.08,0.14),vec3(0.17,0.15,0.42),smoothstep(0.,0.24,x));\n' +
      ' col=mix(col,vec3(0.40,0.25,0.64),smoothstep(0.22,0.46,x));\n' +
      ' col=mix(col,vec3(0.70,0.36,0.62),smoothstep(0.44,0.66,x));\n' +
      ' col=mix(col,vec3(0.94,0.60,0.48),smoothstep(0.64,0.84,x));\n' +
      ' col=mix(col,vec3(0.99,0.87,0.63),smoothstep(0.82,1.0,x));\n' +
      ' return col;}\n' +
      'vec3 pal(float x){x=clamp(x,0.,1.);return mix(palL(x),palD(x),uPal);}\n' +
      'void main(){float d=clamp(texture2D(uDye,vUv).r,0.,1.);\n' +
      ' float b=floor(d*uBands)/max(uBands-1.,1.);\n' +
      ' float sh=0.05*sin(uT*0.35+(vUv.x+vUv.y)*2.6);\n' +
      ' vec3 col=pal(b+sh);\n' +
      ' float e=fract(d*uBands);float rim=1.-smoothstep(0.,0.12,min(e,1.-e));\n' +
      ' col+=rim*0.05;\n' +
      ' gl_FragColor=vec4(col,1.);}',
  };

  const FALLBACK_LIGHT = 'radial-gradient(circle at 42% 38%, #f8e9c9 0 12%, #f2ab6b 12% 26%, #d96e42 26% 42%, #99492e 42% 60%, #52301f 60% 78%, #241d18 78%)';
  const FALLBACK_DARK  = 'radial-gradient(circle at 42% 38%, #fce0a0 0 12%, #f19f7c 12% 26%, #ba6397 26% 42%, #834fa3 42% 60%, #1e1d4c 60% 78%, #12141f 78%)';

  function isDarkTheme() {
    const t = document.documentElement.dataset.theme;
    return t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches);
  }

  class FluidCircle extends HTMLElement {
    static get observedAttributes() { return ['bands', 'speed', 'palette']; }
    constructor() {
      super();
      this._bands = 7; this._speed = 1; this._palTarget = 0; this._palCur = 0;
      this._raf = 0; this._visible = true; this._moves = [];
      this._halfFloatType = 0; // 0 = WebGL2 native, non-zero = WebGL1 OES constant
    }
    attributeChangedCallback(n, _o, v) {
      if (n === 'bands') this._bands = parseFloat(v) || 7;
      if (n === 'speed') this._speed = parseFloat(v) || 1;
      if (n === 'palette') this._palTarget = v === 'dark' ? 1 : 0;
    }
    get palette() { return this._palTarget ? 'dark' : 'light'; } set palette(v) { this._palTarget = v === 'dark' ? 1 : 0; }
    get bands() { return this._bands; } set bands(v) { this._bands = parseFloat(v) || 7; }
    get speed() { return this._speed; } set speed(v) { this._speed = parseFloat(v) || 1; }

    connectedCallback() {
      this.style.display = 'block';
      if (!this.style.width) this.style.width = '100%';
      if (!this.style.height) this.style.height = '100%';
      const c = document.createElement('canvas');
      c.style.cssText = 'width:100%;height:100%;display:block;cursor:crosshair;touch-action:none';
      this.appendChild(c);
      this._canvas = c;

      const CTX = { antialias: false, premultipliedAlpha: false, depth: false, stencil: false };
      let gl = null;

      // 1. Try WebGL2 + EXT_color_buffer_float (best path)
      const gl2 = c.getContext('webgl2', CTX);
      if (gl2 && gl2.getExtension('EXT_color_buffer_float')) {
        gl = gl2;
      }

      // 2. Try WebGL1 + OES_texture_half_float + WEBGL_color_buffer_half_float
      if (!gl) {
        const gl1 = c.getContext('webgl', CTX);
        if (gl1) {
          const hfExt = gl1.getExtension('OES_texture_half_float');
          gl1.getExtension('OES_texture_half_float_linear');
          const cbExt = gl1.getExtension('WEBGL_color_buffer_half_float') ||
                        gl1.getExtension('EXT_color_buffer_half_float');
          if (hfExt && cbExt) {
            gl = gl1;
            this._halfFloatType = hfExt.HALF_FLOAT_OES;
          }
        }
      }

      // 3. Static CSS fallback matching the correct palette
      if (!gl) {
        this.style.background = isDarkTheme() ? FALLBACK_DARK : FALLBACK_LIGHT;
        c.remove();
        return;
      }

      this._gl = gl;
      this._init(gl);
      this._bindPointer(c);
      this._io = new IntersectionObserver((es) => { for (const e of es) this._visible = e.isIntersecting; }, { threshold: 0.01 });
      this._io.observe(this);
      this._reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
      // warm start so the circle is never empty
      for (let i = 0; i < 8; i++) this._seed();
      for (let i = 0; i < 70; i++) this._step(1 / 60, performance.now() / 1000 - (70 - i) / 60);
      this._t0 = performance.now(); this._last = this._t0; this._frames = 0;
      const loop = (now) => {
        this._raf = requestAnimationFrame(loop);
        if (!this._visible || document.hidden) { this._last = now; return; }
        const dt = Math.min((now - this._last) / 1000, 1 / 40) * this._speed;
        this._last = now;
        if (dt <= 0) return;
        if (this._reduced && this._frames > 2) { cancelAnimationFrame(this._raf); return; }
        this._resize();
        this._step(dt, (now - this._t0) / 1000);
        this._frames++;
      };
      this._raf = requestAnimationFrame(loop);
    }
    disconnectedCallback() {
      cancelAnimationFrame(this._raf);
      if (this._io) this._io.disconnect();
    }

    _compile(gl, type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error('[fluid-circle]', gl.getShaderInfoLog(s));
      return s;
    }
    _program(gl, frag) {
      const p = gl.createProgram();
      gl.attachShader(p, this._vert); gl.attachShader(p, this._compile(gl, gl.FRAGMENT_SHADER, frag));
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) console.error('[fluid-circle] link', gl.getProgramInfoLog(p));
      const u = {};
      const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) { const info = gl.getActiveUniform(p, i); u[info.name] = gl.getUniformLocation(p, info.name); }
      return { p, u };
    }
    _fbo(gl, w, h) {
      const tex = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      if (this._halfFloatType) {
        // WebGL1: RGBA format + HALF_FLOAT_OES type (no sized internal format)
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, this._halfFloatType, null);
      } else {
        // WebGL2: RGBA16F sized internal format
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
      }
      const fb = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
      gl.clearColor(0, 0, 0, 1); gl.clear(gl.COLOR_BUFFER_BIT);
      return { tex, fb, w, h };
    }
    _double(gl, w, h) {
      let a = this._fbo(gl, w, h), b = this._fbo(gl, w, h);
      return { get read() { return a; }, get write() { return b; }, swap() { const t = a; a = b; b = t; }, w, h };
    }
    _init(gl) {
      this._vert = this._compile(gl, gl.VERTEX_SHADER, VERT);
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
      gl.enableVertexAttribArray(0);
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
      this._prog = {
        advect: this._program(gl, FRAG.advect), splat: this._program(gl, FRAG.splat),
        div: this._program(gl, FRAG.div), press: this._program(gl, FRAG.press),
        grad: this._program(gl, FRAG.grad), show: this._program(gl, FRAG.show),
      };
      const SIM = 144, DYE = 480;
      this._vel = this._double(gl, SIM, SIM);
      this._pre = this._double(gl, SIM, SIM);
      this._divT = this._fbo(gl, SIM, SIM);
      this._dye = this._double(gl, DYE, DYE);
      this._simTexel = [1 / SIM, 1 / SIM];
    }
    _blit(target) {
      const gl = this._gl;
      gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.fb : null);
      gl.viewport(0, 0, target ? target.w : this._canvas.width, target ? target.h : this._canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }
    _bindTex(loc, tex, unit) {
      const gl = this._gl;
      gl.activeTexture(gl.TEXTURE0 + unit); gl.bindTexture(gl.TEXTURE_2D, tex); gl.uniform1i(loc, unit);
    }
    _splat(field, x, y, vx, vy, vz, radius) {
      const gl = this._gl, pr = this._prog.splat;
      gl.useProgram(pr.p);
      this._bindTex(pr.u.uTgt, field.read.tex, 0);
      gl.uniform2f(pr.u.uPoint, x, y);
      gl.uniform3f(pr.u.uVal, vx, vy, vz);
      gl.uniform1f(pr.u.uRadius, radius);
      this._blit(field.write); field.swap();
    }
    _seed() {
      const x = 0.25 + Math.random() * 0.5, y = 0.25 + Math.random() * 0.5, a = Math.random() * 6.283;
      this._splat(this._dye, x, y, 0.25 + Math.random() * 0.45, 0, 0, 0.012);
      this._splat(this._vel, x, y, Math.cos(a) * 0.6, Math.sin(a) * 0.6, 0, 0.008);
    }
    _bindPointer(c) {
      let last = null;
      c.addEventListener('pointermove', (e) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width, y = 1 - (e.clientY - r.top) / r.height;
        if (last) {
          const dx = x - last[0], dy = y - last[1];
          const drag = e.buttons > 0;
          this._moves.push([x, y, dx, dy, drag]);
          if (this._moves.length > 12) this._moves.shift();
        }
        last = [x, y];
      });
      c.addEventListener('pointerleave', () => { last = null; });
      c.addEventListener('pointerdown', (e) => { c.setPointerCapture(e.pointerId); });
    }
    _resize() {
      const c = this._canvas, dpr = Math.min(devicePixelRatio || 1, 2);
      const w = Math.min(Math.round(c.clientWidth * dpr), 800) || 300;
      if (c.width !== w) { c.width = w; c.height = w; }
    }
    _step(dt, t) {
      const gl = this._gl, P = this._prog;
      // autonomous stirring: two slow orbiting emitters
      for (let i = 0; i < 2; i++) {
        const ph = i * Math.PI + t * (0.22 + i * 0.06);
        const ex = 0.5 + 0.30 * Math.cos(ph), ey = 0.5 + 0.30 * Math.sin(ph);
        const tx = -Math.sin(ph), ty = Math.cos(ph);
        this._splat(this._vel, ex, ey, tx * 2.4 * dt * 60 * 0.02, ty * 2.4 * dt * 60 * 0.02, 0, 0.006);
        const amt = (0.5 + 0.5 * Math.sin(t * 0.5 + i * 2.4)) * 0.9 * dt;
        this._splat(this._dye, ex, ey, amt, 0, 0, 0.010);
      }
      // pointer splats
      for (const [x, y, dx, dy, drag] of this._moves) {
        const f = drag ? 9 : 3.5;
        this._splat(this._vel, x, y, dx * f, dy * f, 0, 0.004);
        this._splat(this._dye, x, y, (drag ? 0.30 : 0.10) * Math.min(Math.hypot(dx, dy) * 40, 1), 0, 0, 0.005);
      }
      this._moves.length = 0;
      // advect velocity
      gl.useProgram(P.advect.p);
      gl.uniform1f(P.advect.u.uDt, dt);
      gl.uniform1f(P.advect.u.uDiss, Math.exp(-0.55 * dt));
      this._bindTex(P.advect.u.uVel, this._vel.read.tex, 0);
      this._bindTex(P.advect.u.uSrc, this._vel.read.tex, 1);
      this._blit(this._vel.write); this._vel.swap();
      // divergence
      gl.useProgram(P.div.p);
      gl.uniform2f(P.div.u.uTexel, this._simTexel[0], this._simTexel[1]);
      this._bindTex(P.div.u.uVel, this._vel.read.tex, 0);
      this._blit(this._divT);
      // pressure jacobi
      gl.useProgram(P.press.p);
      gl.uniform2f(P.press.u.uTexel, this._simTexel[0], this._simTexel[1]);
      for (let i = 0; i < 22; i++) {
        this._bindTex(P.press.u.uPre, this._pre.read.tex, 0);
        this._bindTex(P.press.u.uDiv, this._divT.tex, 1);
        this._blit(this._pre.write); this._pre.swap();
      }
      // subtract gradient
      gl.useProgram(P.grad.p);
      gl.uniform2f(P.grad.u.uTexel, this._simTexel[0], this._simTexel[1]);
      this._bindTex(P.grad.u.uPre, this._pre.read.tex, 0);
      this._bindTex(P.grad.u.uVel, this._vel.read.tex, 1);
      this._blit(this._vel.write); this._vel.swap();
      // advect dye
      gl.useProgram(P.advect.p);
      gl.uniform1f(P.advect.u.uDt, dt);
      gl.uniform1f(P.advect.u.uDiss, Math.exp(-0.16 * dt));
      this._bindTex(P.advect.u.uVel, this._vel.read.tex, 0);
      this._bindTex(P.advect.u.uSrc, this._dye.read.tex, 1);
      this._blit(this._dye.write); this._dye.swap();
      // display
      this._palCur += (this._palTarget - this._palCur) * Math.min(1, dt * 4);
      gl.useProgram(P.show.p);
      gl.uniform1f(P.show.u.uBands, Math.max(3, this._bands));
      gl.uniform1f(P.show.u.uT, t);
      gl.uniform1f(P.show.u.uPal, this._palCur);
      this._bindTex(P.show.u.uDye, this._dye.read.tex, 0);
      this._blit(null);
    }
  }
  customElements.define('fluid-circle', FluidCircle);
})();
