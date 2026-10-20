/*
  Kendi bowlunu oluştur: 3D bowl (Three.js r128). Kova (yeşilliksiz) aynı kasede gösterilir.
  bowl.js ile aynı arayüzü sunar: BowlArt3D.mount(host) → { sync(state), refill() }.
  Malzemeler bowl.js'deki gibi tanımlanır; burada her şeklin 3D karşılığı üretilir.
*/
(function () {
  const T = window.THREE;
  if (!T) return;

  const supported = () => {
    try {
      const c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl")));
    } catch (e) { return false; }
  };

  const REDUCED = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const BORDO = 0x55061f, KREM = 0xfcf1e7, MAVI = 0xc4dff4;

  // ── Malzeme tablosu (şekil, renk, adet) ───────────────────────
  const MALZEME = {
    "Basmati": { s: "grain", c: "#fffaf0", n: 70 },
    "Erişte": { s: "noodle", c: "#e9c27b", n: 14 },
    "Karabuğday": { s: "grain", c: "#9a6a44", n: 70 },
    "Falafel": { s: "falafel", c: "#9a6431", n: 5 },
    "Tavuk": { s: "chunk", c: "#e6b97c", n: 7 },
    "Domates soslu köfte": { s: "kofte", c: "#6b3220", n: 5 },
    "Ton balığı": { s: "flake", c: "#dcb79b", n: 9 },
    "Körili": { c: "#e8a82e" }, "Kremalı mantarlı": { c: "#eadcc0" }, "Sweet chili": { c: "#df6a3a" },
    "Biberli salçalı": { c: "#c2462a" }, "Tiftik": { c: "#ecd3ab" },
    "Kinoa": { s: "dot", c: "#f1dfb3", n: 40 },
    "Cevizli brokoli": { s: "floret", c: "#3f8a3a", n: 4 },
    "Maş fasulyesi": { s: "bean", c: "#8cbf3f", n: 14 },
    "Bıldırcın yumurtası": { s: "egg", n: 3 },
    "Humus": { s: "dollop", c: "#e8cf95", n: 1 },
    "Kırmızı lahana": { s: "shred", c: "#7a2e7d", n: 12 },
    "Domates": { s: "wedge", c: "#e2382f", n: 5 },
    "Salatalık": { s: "ring", c: "#3d8a3a", i: "#e9f5c8", n: 5 },
    "Mısır": { s: "kernel", c: "#ffcc2e", n: 18 },
    "Kuru domates": { s: "shred", c: "#a3241c", n: 8 },
    "Pancar": { s: "cube", c: "#9b1747", n: 8 },
    "Kısır": { s: "dot", c: "#d9772d", n: 36, r: 1.3 },
    "Kuru cacık": { s: "dollop", c: "#fbf6ea", n: 1 },
    "Kornişon turşu": { s: "ring", c: "#6f8a26", i: "#d6e39a", n: 5 },
    "Jalapeno": { s: "pepperRing", c: "#2f8f3a", n: 6 },
    "Kruton": { s: "cube", c: "#d9a557", n: 7, size: .85 },
    "Tortilla cips": { s: "chip", c: "#f0c040", n: 5 },
    "Roast sarımsaklı yoğurt": { c: "#fff4e0" }, "Limon-tahin": { c: "#e6cd8f" }, "Sezar": { c: "#f3ead0" },
    "Pesto": { c: "#5a9a2e" }, "Chipotle-lime": { c: "#c8582b" }, "Acı yoğurt": { c: "#f2a77e" }, "Ballı hardal": { c: "#e8b21e" },
  };
  const VARSAYILAN = { s: "ball", c: "#c9a26a", n: 5 };

  // ── Paylaşılan geometri ve malzemeler ─────────────────────────
  const mats = new Map();
  const mat = (c, extra = {}) => {
    const k = c + JSON.stringify(extra);
    if (!mats.has(k)) mats.set(k, new T.MeshStandardMaterial({ color: new T.Color(c), roughness: .62, metalness: 0, ...extra }));
    return mats.get(k);
  };
  const geo = {};
  const G = (k, f) => geo[k] || (geo[k] = f());
  const leafShape = () => {
    const s = new T.Shape();
    s.moveTo(-.2, 0); s.quadraticCurveTo(0, .16, .2, 0); s.quadraticCurveTo(0, -.16, -.2, 0);
    return new T.ShapeGeometry(s, 6).rotateX(-Math.PI / 2); // yatay dursun
  };
  const triShape = () => {
    const s = new T.Shape();
    s.moveTo(0, .15); s.lineTo(.14, -.11); s.lineTo(-.14, -.11); s.closePath();
    return new T.ShapeGeometry(s).rotateX(-Math.PI / 2);
  };
  const wave = (len, amp, n) => {
    const pts = [];
    for (let i = 0; i <= n; i++) pts.push(new T.Vector3(-len / 2 + (len * i) / n, Math.sin(i * 1.7) * amp * .4, Math.sin(i * 1.3) * amp));
    return new T.CatmullRomCurve3(pts);
  };

  // Her şekil 0,0,0 merkezli bir Object3D döndürür
  const SHAPES = {
    grain: (m) => new T.Mesh(G("grain", () => new T.SphereGeometry(.05, 8, 6).scale(1.9, .7, .7)), mat(m.c, { roughness: .45 })),
    noodle: (m) => new T.Mesh(G("noodle", () => new T.TubeGeometry(wave(.55, .06, 6), 24, .022, 6)), mat(m.c, { roughness: .4 })),
    dot: (m) => new T.Mesh(G("dot" + (m.r || 1), () => new T.SphereGeometry(.028 * (m.r || 1), 6, 5)), mat(m.c)),
    cube: (m) => new T.Mesh(G("cube" + (m.size || 1), () => new T.BoxGeometry(.15, .15, .15).scale(m.size || 1, m.size || 1, m.size || 1)), mat(m.c, { roughness: .5 })),
    ring: (m) => {
      const g = new T.Group();
      g.add(new T.Mesh(G("ringO", () => new T.CylinderGeometry(.14, .14, .035, 20)), mat(m.c)));
      const i = new T.Mesh(G("ringI", () => new T.CylinderGeometry(.115, .115, .04, 20)), mat(m.i || "#e9f5c8", { roughness: .35 }));
      g.add(i);
      return g;
    },
    pepperRing: (m) => new T.Mesh(G("pepper", () => new T.TorusGeometry(.1, .032, 8, 18).rotateX(Math.PI / 2)), mat(m.c, { roughness: .35 })),
    shred: (m) => new T.Mesh(G("shred", () => new T.TorusGeometry(.17, .022, 5, 14, Math.PI * .8).rotateX(Math.PI / 2)), mat(m.c, { roughness: .45 })),
    ball: (m) => new T.Mesh(G("ball", () => new T.SphereGeometry(.18, 16, 12)), mat(m.c, { roughness: .8 })),
    falafel: (m) => new T.Mesh(G("falafel", () => {
      const g = new T.SphereGeometry(.19, 14, 10); const p = g.attributes.position;
      for (let i = 0; i < p.count; i++) { const f = 1 + (Math.sin(i * 12.9898) * 43758.5453 % 1) * .08; p.setXYZ(i, p.getX(i) * f, p.getY(i) * f * .85, p.getZ(i) * f); }
      g.computeVertexNormals(); return g;
    }), mat(m.c, { roughness: .95 })),
    kofte: (m) => {
      const g = new T.Group();
      g.add(new T.Mesh(G("kofte", () => new T.SphereGeometry(.21, 14, 10).scale(1.25, .7, 1)), mat(m.c, { roughness: .85 })));
      const s = new T.Mesh(G("kofteSos", () => new T.SphereGeometry(.16, 12, 8).scale(1.2, .35, .9).translate(0, .11, 0)), mat("#c9341f", { roughness: .3 }));
      g.add(s);
      return g;
    },
    chunk: (m) => new T.Mesh(G("chunk", () => new T.BoxGeometry(.32, .17, .22)), mat(m.c, { roughness: .7 })),
    flake: (m) => new T.Mesh(G("flake", () => new T.DodecahedronGeometry(.13, 0).scale(1.3, .5, 1)), mat(m.c, { roughness: .8 })),
    leaf: (m) => new T.Mesh(G("leaf", leafShape), mat(m.c, { side: T.DoubleSide, roughness: .55 })),
    chip: (m) => new T.Mesh(G("chip", triShape), mat(m.c, { side: T.DoubleSide, roughness: .5 })),
    egg: () => {
      const g = new T.Group();
      g.add(new T.Mesh(G("eggW", () => new T.SphereGeometry(.15, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2).scale(1.2, .9, 1)), mat("#fffaf0", { roughness: .35 })));
      g.add(new T.Mesh(G("eggY", () => new T.SphereGeometry(.07, 12, 8).scale(1, .55, 1).translate(0, .1, 0)), mat("#f6b81a", { roughness: .4 })));
      return g;
    },
    floret: (m) => {
      const g = new T.Group();
      g.add(new T.Mesh(G("stem", () => new T.CylinderGeometry(.04, .05, .18, 8).translate(0, .06, 0)), mat("#8bbf5a")));
      const top = G("flor", () => new T.SphereGeometry(.09, 10, 8));
      [[0, .2, 0], [.08, .16, .03], [-.07, .16, .04], [0, .16, -.08]].forEach((p) => {
        const s = new T.Mesh(top, mat(m.c, { roughness: .95 })); s.position.set(...p); g.add(s);
      });
      return g;
    },
    dollop: (m) => {
      const g = new T.Group();
      g.add(new T.Mesh(G("dollop", () => new T.SphereGeometry(.34, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2).scale(1, .55, 1)), mat(m.c, { roughness: .4 })));
      g.add(new T.Mesh(G("dollopTop", () => new T.ConeGeometry(.12, .14, 12).translate(0, .22, 0)), mat(m.c, { roughness: .4 })));
      return g;
    },
    wedge: (m) => new T.Mesh(G("wedge", () => new T.CylinderGeometry(.15, .15, .1, 16, 1, false, 0, Math.PI).rotateZ(Math.PI / 2)), mat(m.c, { roughness: .35 })),
    kernel: (m) => new T.Mesh(G("kernel", () => new T.BoxGeometry(.07, .06, .07)), mat(m.c, { roughness: .4 })),
    bean: (m) => new T.Mesh(G("bean", () => new T.SphereGeometry(.06, 8, 6).scale(1.4, .8, .9)), mat(m.c, { roughness: .5 })),
  };

  // ── Kaplar ────────────────────────────────────────────────────
  const V = (pts) => pts.map(([x, y]) => new T.Vector2(x, y));
  const VESSEL = {
    bowl: {
      R: 1.92, base: 1.2, dome: .32,
      outer: V([[0, 0], [.95, 0], [1.02, .08], [1.55, .32], [1.98, .78], [2.2, 1.38], [2.24, 1.5]]),
      inner: V([[2.12, 1.5], [2.07, 1.32], [1.84, .82], [1.42, .44], [.9, .27], [0, .24]]),
    },
  };

  // Logo: b'bowl wordmark'ı krem renge boyanmış doku
  let logoTex = null;
  const logoTexture = () => {
    if (logoTex) return logoTex;
    const c = document.createElement("canvas"); c.width = 1024; c.height = 320;
    logoTex = new T.CanvasTexture(c);
    const img = new Image();
    img.onload = () => {
      const x = c.getContext("2d");
      const w = 860, h = 264;
      x.drawImage(img, (c.width - w) / 2, (c.height - h) / 2, w, h);
      x.globalCompositeOperation = "source-in";
      x.fillStyle = "#fcf1e7"; x.fillRect(0, 0, c.width, c.height);
      logoTex.needsUpdate = true;
    };
    img.src = "assets/logo-wordmark.png";
    logoTex.anisotropy = 4;
    return logoTex;
  };

  const buildVessel = () => {
    const v = VESSEL.bowl;
    const g = new T.Group();
    const body = mat("#55061f", { roughness: .38, metalness: .05 });
    const inside = mat("#3d0416", { roughness: .7, side: T.DoubleSide });
    const outer = new T.Mesh(new T.LatheGeometry(v.outer, 72), body);
    outer.castShadow = true;
    g.add(outer);
    g.add(new T.Mesh(new T.LatheGeometry(v.inner, 72), inside));
    // Ağız kenarı
    const rimR = (v.outer[v.outer.length - 1].x + v.inner[0].x) / 2;
    const rim = new T.Mesh(new T.TorusGeometry(rimR, .07, 10, 80).rotateX(Math.PI / 2), mat("#6d1534", { roughness: .35 }));
    rim.position.y = v.inner[0].y;
    g.add(rim);
    // Logo: kasenin ön yüzüne bükülmüş etiket
    const lg = new T.PlaneGeometry(1.75, .54, 24, 1);
    const lr = 2.06, lp = lg.attributes.position;
    for (let k = 0; k < lp.count; k++) {
      const a = lp.getX(k) / lr;
      lp.setXYZ(k, Math.sin(a) * lr, lp.getY(k), Math.cos(a) * lr - lr);
    }
    lg.rotateX(.46); // kase duvarının eğimi
    lg.translate(0, .95, lr + .02);
    const logo = new T.Mesh(lg, new T.MeshBasicMaterial({ map: logoTexture(), transparent: true, depthWrite: false }));
    g.add(logo);
    g.userData.v = v;
    return g;
  };

  // ── Yerleşim (bowl.js ile aynı bölgeler, diske çevrilmiş) ────
  const ZONE = {
    yesil: { x: 0, z: 0, rx: .95, rz: .95 },
    tahil: [{ x: 0, z: -.3, rx: .6, rz: .45 }],
    tahil2: [{ x: -.35, z: -.3, rx: .38, rz: .4 }, { x: .35, z: -.3, rx: .38, rz: .4 }],
    tahilKova: [{ x: 0, z: 0, rx: .95, rz: .95 }],
    tahilKova2: [{ x: -.45, z: 0, rx: .5, rz: .9 }, { x: .45, z: 0, rx: .5, rz: .9 }],
    protein: { x: 0, z: .3, rx: .38, rz: .3 },
    garnitur: [
      [-.68, -.1], [.68, -.1], [-.5, .5], [.5, .5], [-.42, -.62], [.42, -.62], [0, .72], [-.82, .3], [.82, .3], [0, -.78],
    ].map(([x, z]) => ({ x, z, rx: .2, rz: .2 })),
  };

  const rng = (seed) => {
    let h = 2166136261;
    for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507), h = Math.imul(h ^ (h >>> 13), 3266489909), (h ^= h >>> 16) >>> 0) / 4294967296);
  };

  // ── Bileşen ───────────────────────────────────────────────────
  function mount(host) {
    host.innerHTML = `<div class="bowl3d"></div><div class="bowl-pops" aria-hidden="true"></div><span class="bowl-hint">↔ çevir</span>`;
    const wrap = host.querySelector(".bowl3d");
    const pops = host.querySelector(".bowl-pops");

    const renderer = new T.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = T.PCFSoftShadowMap;
    wrap.appendChild(renderer.domElement);

    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(32, 1, .1, 100);
    scene.add(new T.HemisphereLight(0xfff6ea, 0x55061f, .75));
    const sun = new T.DirectionalLight(0xfff1dc, .95);
    sun.position.set(3.5, 7, 4.5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -4, right: 4, top: 4, bottom: -4 });
    scene.add(sun);
    const fill = new T.DirectionalLight(0xc4dff4, .35);
    fill.position.set(-5, 3, -2);
    scene.add(fill);

    const ground = new T.Mesh(new T.PlaneGeometry(14, 14), new T.ShadowMaterial({ opacity: .16 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    const turn = new T.Group(); // döndürülen ana grup
    scene.add(turn);
    turn.add(buildVessel());
    const contents = new T.Group();
    turn.add(contents);
    let kova = false; // kova = yeşilliksiz; kase aynı kalır

    // Kamera kadrajı: kap her en-boy oranında sığsın
    const fit = () => {
      const w = wrap.clientWidth || 1, h = wrap.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const r = 2.75;
      const vf = T.MathUtils.degToRad(camera.fov);
      const hf = 2 * Math.atan(Math.tan(vf / 2) * camera.aspect);
      const d = r / Math.sin(Math.min(vf, hf) / 2);
      const el = T.MathUtils.degToRad(30);
      camera.position.set(0, 1 + d * Math.sin(el), d * Math.cos(el));
      camera.lookAt(0, .95, 0);
      camera.updateProjectionMatrix();
    };
    new ResizeObserver(fit).observe(wrap);
    fit();

    // ── Animasyon zaman çizelgesi ──
    const tweens = new Set();
    const tween = (dur, delay, fn, done) => {
      if (REDUCED) { fn(1); done && done(); return; }
      tweens.add({ start: performance.now() + delay * 1000, dur: dur * 1000, fn, done });
    };
    const bounce = (t) => {
      const n = 7.5625, d = 2.75;
      if (t < 1 / d) return n * t * t;
      if (t < 2 / d) return n * (t -= 1.5 / d) * t + .75;
      if (t < 2.5 / d) return n * (t -= 2.25 / d) * t + .9375;
      return n * (t -= 2.625 / d) * t + .984375;
    };
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    // Yüzey yüksekliği: hafif tümsek
    const surf = (x, z, lift = 0) => {
      const v = VESSEL.bowl;
      const d2 = Math.min(1, x * x + z * z);
      return [x * v.R, v.base + v.dome * (1 - d2) + lift, z * v.R];
    };

    const live = new Map();
    const slots = new Map();

    // Taban tümseği: iç karanlık kalmasın diye yeşillik/tahıl renginde dolgu
    const V0 = VESSEL.bowl;
    const baseMat = new T.MeshStandardMaterial({ color: new T.Color("#3c6e2a"), roughness: .85 });
    const mound = new T.Mesh(new T.SphereGeometry(1, 40, 14, 0, Math.PI * 2, 0, Math.PI / 2), baseMat);
    mound.scale.set(V0.R * 1.04, .001, V0.R * 1.04);
    mound.position.y = V0.base - .04;
    mound.receiveShadow = true;
    contents.add(mound);
    const moundTo = (hex, visible) => {
      const from = baseMat.color.clone(), to = new T.Color(hex);
      const s0 = mound.scale.y, s1 = visible ? V0.dome + .05 : .001;
      tween(.45, 0, (t) => {
        baseMat.color.copy(from).lerp(to, t);
        mound.scale.y = s0 + (s1 - s0) * easeOut(t);
      });
    };

    const pop = (text) => {
      const el = document.createElement("span");
      el.textContent = "+ " + text;
      el.style.left = 30 + Math.random() * 40 + "%";
      pops.appendChild(el);
      setTimeout(() => el.remove(), 1100);
    };

    let wob = 0;
    const wiggle = () => { wob = 1; };

    const placePieces = (key, zone, lift, opt = {}, baseDelay = 0) => {
      const m = { ...VARSAYILAN, ...(MALZEME[key] || {}), ...opt };
      const make = SHAPES[m.s] || SHAPES.ball;
      const r = rng(key + zone.x + zone.z);
      const g = new T.Group();
      for (let i = 0; i < m.n; i++) {
        const a = r() * Math.PI * 2, dd = m.n === 1 ? 0 : Math.sqrt(r());
        let x = zone.x + Math.cos(a) * zone.rx * dd, z = zone.z + Math.sin(a) * zone.rz * dd;
        const len = Math.hypot(x, z);
        if (len > .93) { x *= .93 / len; z *= .93 / len; }
        const [px, py, pz] = surf(x, z, lift + r() * .05);
        const o = make(m);
        o.rotation.set((r() - .5) * .6, r() * Math.PI * 2, (r() - .5) * .6);
        o.position.set(px, py, pz);
        g.add(o);
        const fall = 2.6 + r() * 1.2, spin = (r() - .5) * 3, rot0 = o.rotation.y;
        o.position.y = py + fall; o.scale.setScalar(.6);
        tween(.75, baseDelay + i * (.45 / m.n) + r() * .05, (t) => {
          o.position.y = py + fall * (1 - bounce(t));
          o.scale.setScalar(.6 + .4 * easeOut(Math.min(1, t * 1.6)));
          o.rotation.y = rot0 + spin * (1 - easeOut(t));
        });
      }
      return g;
    };

    const sauce = (color, i) => {
      const r = rng("sos" + color + i);
      const zc = -.25 + i * .28;
      const pts = [];
      for (let k = 0; k <= 14; k++) {
        const x = -.78 + (1.56 * k) / 14;
        const z = zc + Math.sin(k * 1.5 + r() * .4) * .16;
        const [px, py, pz] = surf(x, z, .2);
        pts.push(new T.Vector3(px, py, pz));
      }
      const geom = new T.TubeGeometry(new T.CatmullRomCurve3(pts), 140, .045, 8);
      const mesh = new T.Mesh(geom, mat(color, { roughness: .25 }));
      const total = geom.index.count;
      geom.setDrawRange(0, 0);
      tween(.8, .1, (t) => geom.setDrawRange(0, Math.floor(total * easeOut(t) / 3) * 3), () => geom.setDrawRange(0, Infinity));
      const g = new T.Group(); g.add(mesh);
      return g;
    };

    const add = (key, obj, label) => {
      contents.add(obj);
      live.set(key, obj);
      if (label) { pop(label); setTimeout(wiggle, 420); }
    };
    const remove = (key) => {
      const g = live.get(key);
      if (!g) return;
      live.delete(key);
      tween(.25, 0, (t) => g.scale.setScalar(1 - easeOut(t) * .999), () => contents.remove(g));
    };

    const leaves = () => {
      const g = new T.Group();
      [["yesil-a", "#5aa33d", 40, 0], ["yesil-b", "#3f7f2e", 32, .1], ["yesil-c", "#8cc152", 20, .2]].forEach(([k, c, n, dl]) =>
        g.add(placePieces(k, ZONE.yesil, .02, { s: "leaf", c, n }, dl)));
      return g;
    };

    const sync = (st) => {
      const nextKova = st.kap === "Kova";
      if (nextKova !== kova) { kova = nextKova; pop(kova ? "Yeşilliksiz" : "Yeşillik"); setTimeout(wiggle, 300); }
      if (!kova && !live.has("yesil")) add("yesil", leaves());
      if (kova && live.has("yesil")) remove("yesil");
      // Bowl'da yeşil taban; kovada seçili tahılın rengi (tahıl yoksa boş)
      const moundHex = kova ? (st.tahil[0] ? (MALZEME[st.tahil[0]] || VARSAYILAN).c : null) : "#3c6e2a";
      if (mound.userData.k !== (moundHex || "none")) { mound.userData.k = moundHex || "none"; moundTo(moundHex || "#3d0416", !!moundHex); }

      const want = new Map();
      const tz = kova ? (st.tahil.length > 1 ? ZONE.tahilKova2 : ZONE.tahilKova) : (st.tahil.length > 1 ? ZONE.tahil2 : ZONE.tahil);
      st.tahil.forEach((t, i) => {
        const base = (MALZEME[t] || VARSAYILAN).n;
        const n = Math.round(base * (kova ? 2.4 : 1) / st.tahil.length);
        want.set(`tahil:${t}@${st.tahil.length}:${i}:${kova}`, [() => placePieces(t, tz[i], .06, { n }), t]);
      });
      if (st.protein && st.protein !== "Proteinsiz") {
        const tint = st.tur && MALZEME[st.tur] ? { c: MALZEME[st.tur].c } : {};
        want.set(`protein:${st.protein}:${st.tur || ""}`, [() => placePieces(st.protein, ZONE.protein, .16, tint),
          st.tur ? `${st.tur} tavuk` : st.protein]);
      }
      for (const [g] of slots) if (!st.garnitur.includes(g)) slots.delete(g);
      st.garnitur.forEach((g) => {
        if (!slots.has(g)) {
          const used = new Set(slots.values());
          let i = 0;
          while (used.has(i % ZONE.garnitur.length) && i < 50) i++;
          slots.set(g, i % ZONE.garnitur.length);
        }
        want.set(`garnitur:${g}@${slots.get(g)}`, [() => placePieces(g, ZONE.garnitur[slots.get(g)], .1), g]);
      });
      st.sos.forEach((x, i) => want.set(`sos:${x}@${i}`, [() => sauce((MALZEME[x] || {}).c || "#f3ead0", i), x]));

      for (const k of [...live.keys()]) if (!want.has(k) && k !== "yesil") remove(k);
      for (const [k, [mk, label]] of want) if (!live.has(k)) add(k, mk(), label);
    };

    // Açılışta: tabanı ve seçili malzemeleri yeniden düşür
    let lastState = null;
    const refill = () => {
      for (const k of [...live.keys()]) { contents.remove(live.get(k)); live.delete(k); }
      mound.userData.k = null; mound.scale.y = .001;
      if (lastState) sync(lastState);
      else add("yesil", leaves());
    };
    const syncAndRemember = (st) => { lastState = JSON.parse(JSON.stringify(st)); sync(st); };

    // ── Döndürme: sürükle + kendiliğinden yavaş dönüş ──
    let angle = -.35, vel = 0, dragging = false, lastX = 0, idle = 0;
    const el = renderer.domElement;
    el.style.touchAction = "pan-y";
    el.addEventListener("pointerdown", (e) => { dragging = true; lastX = e.clientX; el.setPointerCapture(e.pointerId); host.classList.add("grabbing"); });
    el.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const dx = e.clientX - lastX; lastX = e.clientX;
      vel = dx * .012; angle += vel; idle = 0;
    });
    const up = () => { dragging = false; host.classList.remove("grabbing"); };
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);

    // Sadece görünürken çiz
    let visible = true;
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(wrap);

    let prev = performance.now();
    const loop = (now) => {
      requestAnimationFrame(loop);
      const dt = Math.min(.05, (now - prev) / 1000); prev = now;
      if (!visible || document.hidden) return;
      for (const tw of [...tweens]) {
        const t = (now - tw.start) / tw.dur;
        if (t < 0) continue;
        tw.fn(Math.min(1, t));
        if (t >= 1) { tweens.delete(tw); tw.done && tw.done(); }
      }
      if (!dragging) {
        idle += dt;
        vel *= .92;
        angle += vel + (REDUCED || idle < 1.5 ? 0 : dt * .25);
      }
      turn.rotation.y = angle;
      // Malzeme düşünce kap hafifçe sallanır
      if (wob > .001) {
        wob *= .9;
        turn.rotation.z = Math.sin(now / 55) * .035 * wob;
        turn.position.y = -Math.abs(Math.sin(now / 70)) * .05 * wob;
      }
      renderer.render(scene, camera);
    };
    requestAnimationFrame(loop);

    return { sync: syncAndRemember, refill };
  }

  window.BowlArt3D = { mount, supported };
})();
