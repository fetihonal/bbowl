/*
  Kendi bowlunu oluştur: animasyonlu bowl çizimi.
  Seçilen her malzeme kendi şekli ve rengiyle bowl'un içine düşer.
  Yeni bir malzeme eklenirse aşağıdaki MALZEME tablosuna bir satır eklemek yeterli;
  tabloda olmayan malzemeler varsayılan şekille çizilir.
*/
(function () {
  const NS = "http://www.w3.org/2000/svg";

  // ── Şekiller (0,0 merkezli SVG parçaları) ──────────────────────
  const S = {
    grain: (c) => `<ellipse rx="4.6" ry="1.9" fill="${c}" stroke="rgba(85,6,31,.12)" stroke-width=".6"/>`,
    noodle: (c) => `<path d="M-11 0q2.75-5 5.5 0t5.5 0 5.5 0 5.5 0" fill="none" stroke="${c}" stroke-width="3" stroke-linecap="round"/>`,
    dot: (c, r = 1.8) => `<circle r="${r}" fill="${c}"/>`,
    cube: (c, s = 8) => `<rect x="${-s / 2}" y="${-s / 2}" width="${s}" height="${s}" rx="1.6" fill="${c}" stroke="rgba(0,0,0,.12)" stroke-width=".8"/>`,
    ring: (c, i = "#e9f5c8") => `<circle r="6.5" fill="${c}"/><circle r="4.6" fill="${i}"/><circle r="1" fill="${c}" opacity=".5"/>`,
    pepperRing: (c) => `<circle r="5.5" fill="none" stroke="${c}" stroke-width="2.6"/><circle r="1.2" fill="#f4f1d0"/>`,
    shred: (c) => `<path d="M-8 0q8-5 16 0" fill="none" stroke="${c}" stroke-width="2.6" stroke-linecap="round"/>`,
    ball: (c, r = 8.5) => `<circle r="${r}" fill="${c}"/><circle cx="${-r / 3}" cy="${-r / 3}" r="${r / 3.2}" fill="#fff" opacity=".18"/>`,
    falafel: (c) => `<circle r="8.5" fill="${c}"/><circle cx="-3" cy="-2" r="1.2" fill="#4c2a12"/><circle cx="2.5" cy="1.5" r="1" fill="#4c2a12"/><circle cx="1" cy="-4" r=".9" fill="#7aa83a"/>`,
    kofte: (c) => `<ellipse rx="10" ry="7.5" fill="${c}"/><path d="M-7-2q7-5 14 0" fill="none" stroke="#c9341f" stroke-width="3" stroke-linecap="round" opacity=".9"/>`,
    chunk: (c) => `<rect x="-8" y="-5.5" width="16" height="11" rx="4.5" fill="${c}" stroke="rgba(85,6,31,.15)" stroke-width=".8"/><path d="M-4-1h8" stroke="rgba(85,6,31,.18)" stroke-width="1.2" stroke-linecap="round"/>`,
    flake: (c) => `<path d="M-7 1q2-6 7-5t7 4q-3 4-7 3t-7-2z" fill="${c}" stroke="rgba(85,6,31,.15)" stroke-width=".7"/>`,
    leaf: (c) => `<path d="M-11 0Q0-9 11 0Q0 9-11 0z" fill="${c}"/><path d="M-9 0H9" stroke="rgba(255,255,255,.25)" stroke-width="1"/>`,
    chip: (c) => `<path d="M0-8 8 6H-8z" fill="${c}" stroke="#d29b20" stroke-width="1" stroke-linejoin="round"/>`,
    egg: () => `<ellipse rx="7.5" ry="5.6" fill="#fffaf0" stroke="rgba(85,6,31,.12)" stroke-width=".8"/><circle cx=".5" r="3.2" fill="#f6b81a"/>`,
    floret: (c) => `<rect x="-1.4" y="1" width="2.8" height="7" rx="1.2" fill="#8bbf5a"/><circle cx="-4" cy="-1" r="4.2" fill="${c}"/><circle cx="4" cy="-1" r="4.2" fill="${c}"/><circle cy="-5" r="4.6" fill="${c}"/><circle cx="2" cy="-1" r="1" fill="#c9a26a"/>`,
    dollop: (c) => `<circle r="13" fill="${c}"/><path d="M-6-2a6 6 0 1 1 6 6" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-linecap="round"/><circle cx="3" cy="-4" r="1.3" fill="#7aa83a"/>`,
    wedge: (c) => `<path d="M-7 3A7.5 7.5 0 0 1 7 3z" fill="${c}"/><path d="M-4 1.5h8" stroke="#ffd2b8" stroke-width="1.2" stroke-dasharray="1.5 2"/>`,
    kernel: (c) => `<rect x="-2.6" y="-3" width="5.2" height="6" rx="2" fill="${c}" stroke="#e8a800" stroke-width=".6"/>`,
    bean: (c) => `<ellipse rx="3.6" ry="2.2" fill="${c}"/><path d="M-1.5-.3h3" stroke="#f4f7d0" stroke-width=".8" stroke-linecap="round"/>`,
  };

  // ── Malzeme → şekil, renk, adet ───────────────────────────────
  const MALZEME = {
    // Tahıllar
    "Basmati": { s: "grain", c: "#fffaf0", n: 46 },
    "Erişte": { s: "noodle", c: "#e9c27b", n: 14 },
    "Karabuğday": { s: "grain", c: "#9a6a44", n: 46 },
    // Proteinler
    "Falafel": { s: "falafel", c: "#9a6431", n: 5 },
    "Tavuk": { s: "chunk", c: "#e6b97c", n: 7 },
    "Domates soslu köfte": { s: "kofte", c: "#6b3220", n: 5 },
    "Ton balığı": { s: "flake", c: "#dcb79b", n: 8 },
    // Tavuk türleri
    "Körili": { c: "#e8a82e" },
    "Kremalı mantarlı": { c: "#eadcc0" },
    "Sweet chili": { c: "#df6a3a" },
    "Biberli salçalı": { c: "#c2462a" },
    "Tiftik": { c: "#ecd3ab" },
    // Garnitürler
    "Kinoa": { s: "dot", c: "#f1dfb3", n: 30, r: 1.7 },
    "Cevizli brokoli": { s: "floret", c: "#3f8a3a", n: 4 },
    "Maş fasulyesi": { s: "bean", c: "#8cbf3f", n: 12 },
    "Bıldırcın yumurtası": { s: "egg", n: 3 },
    "Humus": { s: "dollop", c: "#e8cf95", n: 1 },
    "Kırmızı lahana": { s: "shred", c: "#7a2e7d", n: 10 },
    "Domates": { s: "wedge", c: "#e2382f", n: 5 },
    "Salatalık": { s: "ring", c: "#3d8a3a", n: 5 },
    "Mısır": { s: "kernel", c: "#ffcc2e", n: 14 },
    "Kuru domates": { s: "shred", c: "#a3241c", n: 7 },
    "Pancar": { s: "cube", c: "#9b1747", n: 7 },
    "Kısır": { s: "dot", c: "#d9772d", n: 26, r: 2 },
    "Kuru cacık": { s: "dollop", c: "#fbf6ea", n: 1 },
    "Kornişon turşu": { s: "ring", c: "#6f8a26", n: 5, i: "#d6e39a" },
    "Jalapeno": { s: "pepperRing", c: "#2f8f3a", n: 5 },
    "Kruton": { s: "cube", c: "#d9a557", n: 6, size: 7 },
    "Tortilla cips": { s: "chip", c: "#f0c040", n: 5 },
    // Soslar
    "Roast sarımsaklı yoğurt": { c: "#fff4e0" },
    "Limon-tahin": { c: "#e6cd8f" },
    "Sezar": { c: "#f3ead0" },
    "Pesto": { c: "#5a9a2e" },
    "Chipotle-lime": { c: "#c8582b" },
    "Acı yoğurt": { c: "#f2a77e" },
    "Ballı hardal": { c: "#e8b21e" },
  };
  const VARSAYILAN = { s: "ball", c: "#c9a26a", n: 5 };

  const draw = (key, opt = {}) => {
    const m = { ...VARSAYILAN, ...(MALZEME[key] || {}), ...opt };
    const f = S[m.s] || S.ball;
    return { m, html: () => f(m.c, m.s === "ring" ? (m.i || undefined) : m.s === "cube" ? m.size : m.r) };
  };

  // ── Yerleşim ──────────────────────────────────────────────────
  // Kase ağzı: merkez (200,150), yarıçap 152×38. Malzemeler bu elipsin içine ve üstündeki tümseğe dizilir.
  const ZONE = {
    yesil: { cx: 200, cy: 150, rx: 144, ry: 34 },
    tahil: [{ cx: 200, cy: 134, rx: 80, ry: 16 }],
    tahil2: [{ cx: 150, cy: 134, rx: 52, ry: 15 }, { cx: 252, cy: 134, rx: 52, ry: 15 }],
    protein: { cx: 200, cy: 163, rx: 52, ry: 13 },
    garnitur: [
      { cx: 100, cy: 146 }, { cx: 300, cy: 146 }, { cx: 126, cy: 172 }, { cx: 274, cy: 172 },
      { cx: 136, cy: 124 }, { cx: 264, cy: 124 }, { cx: 200, cy: 182 }, { cx: 80, cy: 162 },
      { cx: 320, cy: 162 }, { cx: 200, cy: 116 },
    ],
  };


  // Malzeme adından tekrarlanabilir rastgelelik: her açılışta aynı yerleşim
  const rng = (seed) => {
    let h = 2166136261;
    for (const ch of seed) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
    return () => ((h = Math.imul(h ^ (h >>> 15), 2246822507), h = Math.imul(h ^ (h >>> 13), 3266489909), (h ^= h >>> 16) >>> 0) / 4294967296);
  };
  const inEllipse = (r, z) => {
    const a = r() * Math.PI * 2, d = Math.sqrt(r());
    return [z.cx + Math.cos(a) * z.rx * d, z.cy + Math.sin(a) * z.ry * d];
  };

  const pieces = (key, zone, opt = {}, baseDelay = 0) => {
    const { m, html } = draw(key, opt);
    const r = rng(key + zone.cx + zone.cy);
    const shape = html();
    let out = "";
    for (let i = 0; i < m.n; i++) {
      const [x, y] = m.n === 1 ? [zone.cx, zone.cy] : inEllipse(r, zone);
      const rot = Math.round(r() * 360);
      const d = (baseDelay + i * (0.5 / m.n) + r() * 0.06).toFixed(3);
      out += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot})"><g class="pc" style="--d:${d}s">${shape}</g></g>`;
    }
    return out;
  };

  const drizzle = (color, i) => {
    const r = rng("sos" + color + i);
    const y0 = 140 + i * 14;
    // Yumuşak dalgalı sos çizgisi: ilk tepe Q ile, devamı T ile simetrik akar
    let d = `M${92 + r() * 10} ${y0} Q105 ${y0 - 10} 118 ${y0}`;
    for (let x = 144; x <= 312; x += 26) d += ` T${x} ${y0 + r() * 4 - 2}`;
    return `<path class="sauce" d="${d}" pathLength="1" fill="none" stroke="${color}" stroke-width="4.2" stroke-linecap="round" stroke-linejoin="round"/>` +
           `<path class="sauce" d="${d}" pathLength="1" fill="none" stroke="#fff" stroke-opacity=".3" stroke-width="1.2" stroke-linecap="round" transform="translate(-.8 -1.2)"/>`;
  };

  // ── Bileşen ───────────────────────────────────────────────────
  let uid = 0;
  function mount(host) {
    const id = ++uid; // aynı sayfada birden çok çizim olabilir
    host.innerHTML = `
      <svg class="bowl-svg" viewBox="20 40 360 270" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Senin bowlun">
        <defs>
          <clipPath id="bowl-clip-${id}"><path d="M48 150A152 38 0 0 0 352 150C344 72 56 72 48 150z"/></clipPath>
        </defs>
        <ellipse cx="200" cy="292" rx="132" ry="11" fill="rgba(85,6,31,.14)" class="bowl-shadow"/>
        <mask id="bowl-logo-${id}" style="mask-type:alpha"><image href="assets/logo-wordmark.png" x="146" y="214" width="108" height="33"/></mask>
        <g class="bowl-body">
          <!-- Arka: bowl ve kova gövdeleri -->
          <g class="vessel v-bowl">
            <path d="M40 150C46 236 112 286 200 286S354 236 360 150z" fill="#55061f"/>
            <path d="M70 196C96 250 150 272 200 272" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="10" stroke-linecap="round"/>
            <ellipse cx="200" cy="150" rx="160" ry="44" fill="#3d0416"/>
          </g>
          <!-- Malzemeler -->
          <g class="contents">
            <g clip-path="url(#bowl-clip-${id})">
              <g data-layer="yesil"></g><g data-layer="tahil"></g><g data-layer="garnitur"></g><g data-layer="protein"></g><g data-layer="sos"></g>
            </g>
          </g>
          <!-- Ön: ağız kenarları ve logo -->
          <g class="vessel v-bowl">
            <path d="M40 150A160 44 0 0 0 360 150" fill="none" stroke="#6d1534" stroke-width="9" stroke-linecap="round"/>
            <path d="M40 150A160 44 0 0 1 360 150" fill="none" stroke="#6d1534" stroke-width="5" stroke-linecap="round" opacity=".7"/>
            <rect x="146" y="214" width="108" height="33" fill="#fcf1e7" mask="url(#bowl-logo-${id})"/>
          </g>
        </g>
      </svg>
      <div class="bowl-pops" aria-hidden="true"></div>`;

    const svg = host.querySelector("svg");
    const layer = (n) => svg.querySelector(`[data-layer="${n}"]`);
    const body = svg.querySelector(".bowl-body");
    const pops = host.querySelector(".bowl-pops");
    const live = new Map(); // key -> element
    const slots = new Map(); // garnitür -> slot no

    const wiggle = () => { body.classList.remove("wiggle"); void body.getBBox(); body.classList.add("wiggle"); };

    const pop = (text) => {
      const el = document.createElement("span");
      el.textContent = "+ " + text;
      el.style.left = 30 + Math.random() * 40 + "%";
      pops.appendChild(el);
      setTimeout(() => el.remove(), 1100);
    };

    const add = (key, layerName, markup, label) => {
      const g = document.createElementNS(NS, "g");
      g.setAttribute("class", "ing");
      g.innerHTML = markup;
      layer(layerName).appendChild(g);
      live.set(key, g);
      if (label) { pop(label); setTimeout(wiggle, 380); }
    };
    const remove = (key) => {
      const g = live.get(key);
      if (!g) return;
      live.delete(key);
      g.classList.add("out");
      setTimeout(() => g.remove(), 260);
    };

    const leaves = () =>
      pieces("yesil-a", ZONE.yesil, { s: "leaf", c: "#5aa33d", n: 30 }) +
      pieces("yesil-b", ZONE.yesil, { s: "leaf", c: "#3f7f2e", n: 24 }, 0.1) +
      pieces("yesil-c", ZONE.yesil, { s: "leaf", c: "#8cc152", n: 14 }, 0.2);
    let yesillik = true;

    const sync = (st) => {
      const kova = st.kap === "Kova";
      // Kova = aynı kase, yeşilliksiz
      if (yesillik === kova) {
        yesillik = !kova;
        if (kova) remove("yesil"); else add("yesil", "yesil", leaves());
        pop(kova ? "Yeşilliksiz" : "Yeşillik");
        setTimeout(wiggle, 300);
      }
      const want = new Map();
      // Tahıl(lar)
      // Kovada yeşillik yok; tahıl (kova pilav gibi) tüm tabanı kaplar
      const tz = kova
        ? (st.tahil.length > 1 ? [{ ...ZONE.yesil, cx: 140, rx: 82 }, { ...ZONE.yesil, cx: 260, rx: 82 }] : [ZONE.yesil])
        : (st.tahil.length > 1 ? ZONE.tahil2 : ZONE.tahil);
      const dense = (t) => (kova ? { n: Math.round((MALZEME[t] || VARSAYILAN).n * 2.4 / st.tahil.length) } : {});
      st.tahil.forEach((t, i) => want.set(`tahil:${t}@${st.tahil.length}:${i}:${kova}`, ["tahil", () => pieces(t, tz[i], dense(t)), t]));
      // Protein
      if (st.protein && st.protein !== "Proteinsiz") {
        const tint = st.tur && MALZEME[st.tur] ? { c: MALZEME[st.tur].c } : {};
        want.set(`protein:${st.protein}:${st.tur || ""}`, ["protein", () => pieces(st.protein, ZONE.protein, tint),
          st.tur ? `${st.tur} tavuk` : st.protein]);
      }
      // Garnitürler: her biri sabit bir yuvaya oturur
      for (const [g] of slots) if (!st.garnitur.includes(g)) slots.delete(g);
      st.garnitur.forEach((g) => {
        if (!slots.has(g)) {
          const used = new Set(slots.values());
          let i = 0;
          while (used.has(i % ZONE.garnitur.length) && i < 50) i++;
          slots.set(g, i % ZONE.garnitur.length);
        }
        const z = { ...ZONE.garnitur[slots.get(g)], rx: 28, ry: 11 };
        want.set(`garnitur:${g}@${slots.get(g)}`, ["garnitur", () => pieces(g, z), g]);
      });
      // Soslar
      st.sos.forEach((x, i) => want.set(`sos:${x}@${i}`, ["sos", () => drizzle((MALZEME[x] || {}).c || "#f3ead0", i), x]));

      for (const k of [...live.keys()]) if (!want.has(k) && !k.startsWith("yesil")) remove(k);
      for (const [k, [ly, mk, label]] of want) if (!live.has(k)) add(k, ly, mk(), label);
    };

    // Açılışta yeşillik (bowl ise) yeniden serpilir, seçili malzemeler tekrar düşer
    const refill = () => {
      remove("yesil");
      if (yesillik) add("yesil", "yesil", leaves());
      for (const [k, g] of live) if (k !== "yesil") {
        g.querySelectorAll(".pc, .sauce").forEach((el) => { el.style.animation = "none"; void el.getBBox(); el.style.animation = ""; });
      }
    };

    return { sync, refill };
  }

  window.BowlArt = { mount };
})();
