const CATS = {
  alk: ["Alkali Metal", 355],
  ake: ["Alkaline Earth", 20],
  trn: ["Transition Metal", 220],
  ptm: ["Post-Transition", 170],
  mtd: ["Metalloid", 245],
  nm: ["Nonmetal", 140],
  hal: ["Halogen", 195],
  nob: ["Noble Gas", 270],
  lan: ["Lanthanide", 325],
  act: ["Actinide", 305],
};

const RAW =
  "H Hydrogen 1.008|He Helium 4.0026|Li Lithium 6.94|Be Beryllium 9.0122|B Boron 10.81|C Carbon 12.011|N Nitrogen 14.007|O Oxygen 15.999|F Fluorine 18.998|Ne Neon 20.180|Na Sodium 22.990|Mg Magnesium 24.305|Al Aluminium 26.982|Si Silicon 28.085|P Phosphorus 30.974|S Sulfur 32.06|Cl Chlorine 35.45|Ar Argon 39.948|K Potassium 39.098|Ca Calcium 40.078|Sc Scandium 44.956|Ti Titanium 47.867|V Vanadium 50.942|Cr Chromium 51.996|Mn Manganese 54.938|Fe Iron 55.845|Co Cobalt 58.933|Ni Nickel 58.693|Cu Copper 63.546|Zn Zinc 65.38|Ga Gallium 69.723|Ge Germanium 72.630|As Arsenic 74.922|Se Selenium 78.971|Br Bromine 79.904|Kr Krypton 83.798|Rb Rubidium 85.468|Sr Strontium 87.62|Y Yttrium 88.906|Zr Zirconium 91.224|Nb Niobium 92.906|Mo Molybdenum 95.95|Tc Technetium 98|Ru Ruthenium 101.07|Rh Rhodium 102.91|Pd Palladium 106.42|Ag Silver 107.87|Cd Cadmium 112.41|In Indium 114.82|Sn Tin 118.71|Sb Antimony 121.76|Te Tellurium 127.60|I Iodine 126.90|Xe Xenon 131.29|Cs Caesium 132.91|Ba Barium 137.33|La Lanthanum 138.91|Ce Cerium 140.12|Pr Praseodymium 140.91|Nd Neodymium 144.24|Pm Promethium 145|Sm Samarium 150.36|Eu Europium 151.96|Gd Gadolinium 157.25|Tb Terbium 158.93|Dy Dysprosium 162.50|Ho Holmium 164.93|Er Erbium 167.26|Tm Thulium 168.93|Yb Ytterbium 173.05|Lu Lutetium 174.97|Hf Hafnium 178.49|Ta Tantalum 180.95|W Tungsten 183.84|Re Rhenium 186.21|Os Osmium 190.23|Ir Iridium 192.22|Pt Platinum 195.08|Au Gold 196.97|Hg Mercury 200.59|Tl Thallium 204.38|Pb Lead 207.2|Bi Bismuth 208.98|Po Polonium 209|At Astatine 210|Rn Radon 222|Fr Francium 223|Ra Radium 226|Ac Actinium 227|Th Thorium 232.04|Pa Protactinium 231.04|U Uranium 238.03|Np Neptunium 237|Pu Plutonium 244|Am Americium 243|Cm Curium 247|Bk Berkelium 247|Cf Californium 251|Es Einsteinium 252|Fm Fermium 257|Md Mendelevium 258|No Nobelium 259|Lr Lawrencium 266|Rf Rutherfordium 267|Db Dubnium 268|Sg Seaborgium 269|Bh Bohrium 270|Hs Hassium 277|Mt Meitnerium 278|Ds Darmstadtium 281|Rg Roentgenium 282|Cn Copernicium 285|Nh Nihonium 286|Fl Flerovium 289|Mc Moscovium 290|Lv Livermorium 293|Ts Tennessine 294|Og Oganesson 294";

const has = (a, z) => a.includes(z);

function cat(z) {
  if (has([3, 11, 19, 37, 55, 87], z)) return "alk";
  if (has([4, 12, 20, 38, 56, 88], z)) return "ake";
  if (has([2, 10, 18, 36, 54, 86, 118], z)) return "nob";
  if (has([9, 17, 35, 53, 85, 117], z)) return "hal";
  if (has([5, 14, 32, 33, 51, 52], z)) return "mtd";
  if (has([1, 6, 7, 8, 15, 16, 34], z)) return "nm";
  if (z >= 57 && z <= 71) return "lan";
  if (z >= 89 && z <= 103) return "act";
  if (has([13, 31, 49, 50, 81, 82, 83, 84, 113, 114, 115, 116], z)) return "ptm";
  return "trn";
}

function pos(z) {
  if (z == 1) return [1, 1];
  if (z == 2) return [1, 18];

  if (z <= 10) return [2, z <= 4 ? z - 2 : z + 8];
  if (z <= 18) return [3, z <= 12 ? z - 10 : z];

  if (z <= 54) {
    const p = z <= 36 ? 4 : 5;
    const s = z <= 36 ? 18 : 36;
    return [p, z - s];
  }

  const p = z <= 86 ? 6 : 7;
  const b = z <= 86 ? 54 : 86;

  if (z - b <= 2) return [p, z - b];
  if (z >= 57 && z <= 71) return [9, z - 57 + 3];
  if (z >= 89 && z <= 103) return [10, z - 89 + 3];
  return [p, z - b - 14];
}

const ORD = [
  [1, 2], [2, 2], [2, 6], [3, 2], [3, 6], [4, 2], [3, 10], [4, 6], [5, 2], [4, 10],
  [5, 6], [6, 2], [4, 14], [5, 10], [6, 6], [7, 2], [5, 14], [6, 10], [7, 6],
];

function shells(z) {
  const s = [];
  for (const [n, c] of ORD) {
    if (z <= 0) break;
    const t = Math.min(c, z);
    s[n - 1] = (s[n - 1] || 0) + t;
    z -= t;
  }
  return s.map((x) => x || 0);
}

const EL = RAW.split("|").map((r, i) => {
  const [s, n, m] = r.split(" ");
  const z = i + 1;
  const [row, col] = pos(z);
  return { z, s, n, m, c: cat(z), row, col, sh: shells(z) };
});

const pt = document.getElementById("pt");
const lg = document.getElementById("lg");
const q = document.getElementById("q");

let active = null;
let cur = 0;

const hue = (c) => CATS[c][1];

EL.forEach((e, i) => {
  const d = document.createElement("div");
  d.className = "el";
  d.tabIndex = 0;
  d.dataset.z = e.z;
  d.style.cssText = `grid-row:${e.row};grid-column:${e.col};--h:${hue(e.c)};--i:${i}`;
  d.innerHTML = `<span class="n">${e.z}</span><span class="s">${e.s}</span><span class="m">${e.n}</span>`;

  d.addEventListener("pointermove", (ev) => {
    const r = d.getBoundingClientRect();
    d.style.setProperty("--ry", ((ev.clientX - r.left) / r.width - 0.5) * 30 + "deg");
    d.style.setProperty("--rx", (0.5 - (ev.clientY - r.top) / r.height) * 30 + "deg");
  });

  d.addEventListener("pointerleave", () => {
    d.style.setProperty("--rx", "0deg");
    d.style.setProperty("--ry", "0deg");
  });

  d.addEventListener("mouseenter", () => hov(e));
  d.addEventListener("focus", () => hov(e));
  d.addEventListener("click", () => openD(e.z));
  d.addEventListener("keydown", (k) => {
    if (k.key == "Enter") openD(e.z);
  });

  e.el = d;
  pt.appendChild(d);
});

[
  ["57–71", 6, 3, "lan"],
  ["89–103", 7, 3, "act"],
].forEach(([t, r, c, k]) => {
  const p = document.createElement("div");
  p.className = "ph";
  p.style.cssText = `grid-row:${r};grid-column:${c};color:hsl(${hue(k)} 85% var(--l))`;
  p.textContent = t;
  pt.appendChild(p);
});

function hov(e) {
  ib.textContent = `${e.n} (${e.s})`;
  is.textContent = `${CATS[e.c][0]} · Atomic mass ${e.m}`;
}

[["all", ["All", 230]], ...Object.entries(CATS)].forEach(([k, [l, h]]) => {
  const b = document.createElement("button");
  b.className = "chip";
  b.style.setProperty("--h", h);
  b.textContent = l;
  b.onclick = () => {
    if (k == "all") {
      active = null;
      q.value = "";
    } else {
      active = active == k ? null : k;
    }
    filter();
  };
  b.dataset.k = k;
  lg.appendChild(b);
});

function filter() {
  const t = q.value.trim().toLowerCase();

  lg.querySelectorAll(".chip").forEach((c) => {
    c.classList.toggle("on", c.dataset.k == (active || "all"));
  });

  EL.forEach((e) => {
    const okC = !active || e.c == active;
    const okT =
      !t ||
      e.n.toLowerCase().includes(t) ||
      e.s.toLowerCase() == t ||
      String(e.z) == t ||
      e.s.toLowerCase().startsWith(t);
    e.el.classList.toggle("dim", !(okC && okT));
  });
}

q.oninput = filter;
filter();

q.addEventListener("keydown", (k) => {
  if (k.key == "Enter") {
    const f = EL.find((e) => !e.el.classList.contains("dim"));
    if (f) openD(f.z);
  }
});

const dlg = document.getElementById("dlg");
const cd = document.getElementById("cd");

function bohr(e) {
  let g = "";
  const h = e.sh.length;

  e.sh.forEach((n, i) => {
    const r = 24 + i * (70 / Math.max(h, 3) + 1.5) * (h > 5 ? 0.85 : 1);
    let el = "";

    for (let k = 0; k < n; k++) {
      const a = (k / n) * 6.2832;
      el += `<circle class="e" r="2.6" cx="${(100 + r * Math.cos(a)).toFixed(1)}" cy="${(100 + r * Math.sin(a)).toFixed(1)}"/>`;
    }

    g += `<circle class="orb" cx="100" cy="100" r="${r.toFixed(1)}"/><g class="sh" style="animation-duration:${6 + i * 4}s;animation-direction:${i % 2 ? "reverse" : "normal"}">${el}</g>`;
  });

  return `<svg viewBox="0 0 200 200"><circle class="nuc" cx="100" cy="100" r="9"/>${g}</svg>`;
}

function openD(z) {
  cur = z;
  const e = EL[z - 1];
  const blk =
    e.z >= 57 && e.z <= 71
      ? "f-block (Lanthanide)"
      : e.z >= 89 && e.z <= 103
        ? "f-block (Actinide)"
        : "Group " + e.col + " · Period " + e.row;

  cd.style.setProperty("--h", hue(e.c));
  cd.innerHTML = `<div><div class="big">${e.s}</div><h2>${e.n}</h2><span class="tag">${CATS[e.c][0]}</span>
 <dl><dt>Atomic number</dt><dd>${e.z}</dd><dt>Atomic mass</dt><dd>${e.m} u</dd><dt>Position</dt><dd>${blk}</dd><dt>Electrons / shell</dt><dd>${e.sh.join(" · ")}</dd><dt>Protons</dt><dd>${e.z}</dd></dl></div>
 <div>${bohr(e)}<p style="text-align:center;color:var(--mut);font-size:.75rem;margin:4px">Bohr model (simplified)</p></div>
 <div class="nav"><button class="btn" id="pv">← Previous</button><button class="btn" id="cl">✕ Close</button><button class="btn" id="nx">Next →</button></div>`;

  dlg.classList.add("open");

  pv.onclick = () => openD(z > 1 ? z - 1 : 118);
  nx.onclick = () => openD(z < 118 ? z + 1 : 1);
  cl.onclick = close;
}

function close() {
  dlg.classList.remove("open");
}

dlg.addEventListener("click", (e) => {
  if (e.target == dlg) close();
});

document.addEventListener("keydown", (k) => {
  if (k.key == "/" && document.activeElement != q) {
    k.preventDefault();
    q.focus();
    return;
  }

  if (!dlg.classList.contains("open")) return;

  if (k.key == "Escape") close();
  if (k.key == "ArrowRight") nx.click();
  if (k.key == "ArrowLeft") pv.click();
});

rnd.onclick = () => openD(1 + Math.floor(Math.random() * 118));

// Theme toggle: dark (indigo) is the default, "light" is set via data-theme.
// Pehle yahan --bg ko "#080b14" se compare kiya ja raha tha; naye dark theme
// mein wo value badal gayi, isliye ab data-theme se check karte hain.
th.onclick = () => {
  const r = document.documentElement;
  const isLight = r.dataset.theme === "light";
  r.dataset.theme = isLight ? "dark" : "light";
};