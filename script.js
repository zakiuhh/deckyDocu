/* ==========================================================================
   DECKY CAP — Option B: Technical Monograph & Aerospace Paper Engine
   Interactive Telemetry · Deep Linking · Lightbox · Hotspots · Audio Engine
   ========================================================================== */

const sectionMap = {
  overview: "sec-overview",
  propulsion: "sec-propulsion",
  stealth: "sec-stealth",
  control: "sec-control",
  missile: "sec-missile",
  cyber: "sec-cyber",
  sensory: "sec-sensory",
  missions: "sec-missions",
  compat: "sec-compat",
};

const sectionMetadata = {
  overview: { category: "Architecture Overview", title: "DECKY CAP Drone Platform" },
  propulsion: { category: "Core Engineering", title: "XH-800 Hydra Hypersonic Engine" },
  stealth: { category: "Core Engineering", title: "Chameleon-Wing Stealth Body" },
  control: { category: "Core Engineering", title: "HCFS-X Fire Control Matrix" },
  missile: { category: "Core Engineering", title: "VALKYRIE-X Hypersonic Interceptor" },
  cyber: { category: "Defense Architectures", title: "Tri-Tier Cyber Hardening" },
  sensory: { category: "Defense Architectures", title: "Integrated Sensory Dominance" },
  missions: { category: "Operational Deployment", title: "Tactical Mission Profiles" },
  compat: { category: "Operational Deployment", title: "Platform Compatibility Matrix" },
};

// ── Searchable Command Palette Index ───────────────────
const SEARCH_INDEX = [
  { id: "overview", category: "overview", icon: "📐", title: "DECKY CAP Platform Overview", desc: "Sixth-gen autonomous combat drone reference architecture." },
  { id: "propulsion", category: "propulsion", icon: "🚀", title: "XH-800 Hydra Hypersonic Engine", desc: "Combined-cycle turbofan, ramjet, RDRE, scramjet & rocket." },
  { id: "propulsion", category: "propulsion", icon: "⚡", title: "Rotating Detonation Combustion (RDRE)", desc: "Continuous supersonic detonation waves for Mach 3.5–8.0 flight." },
  { id: "propulsion", category: "propulsion", icon: "🔥", title: "Fuel & Propellant Specifications", desc: "JP-10 synthetic jet fuel, cryogenic methane, HTP oxidizer." },
  { id: "stealth", category: "stealth", icon: "🛡️", title: "Chameleon-Wing Stealth Geometry", desc: "Biomimetic continuous-curvature blended-wing airframe." },
  { id: "stealth", category: "stealth", icon: "🧲", title: "NanoIronCloak RAM Coating", desc: "Multi-layered carbon nanotube microwave RF absorption." },
  { id: "stealth", category: "stealth", icon: "📡", title: "Active Coherent Wave Cancellation", desc: "Anti-phase radar pulse emission nullifying reflections." },
  { id: "stealth", category: "stealth", icon: "🎨", title: "SolarFlux Photochromic Skin", desc: "Dynamic electrochromic daytime & dusk horizon camouflage." },
  { id: "control", category: "avionics", icon: "🧠", title: "HCFS-X AI Combat Matrix", desc: "Edge-AI neuromorphic tensor processor for autonomous battle decisions." },
  { id: "control", category: "avionics", icon: "📡", title: "MURAD++ Conformal AESA Radar", desc: "360° Gallium Nitride (GaN) LPI track-while-scan radar." },
  { id: "control", category: "avionics", icon: "⚡", title: "65kW Directed Energy Laser Turret", desc: "Fiber laser point-defense against incoming AAM missiles." },
  { id: "control", category: "avionics", icon: "🛰️", title: "Quantum Key Enclave Datalink", desc: "Photonic entangled cryptographic anti-hijack communication." },
  { id: "missile", category: "weapons", icon: "🎯", title: "VALKYRIE-X Hypersonic Missile", desc: "Mach 6.5 AI-linked kinetic interceptor with 280+ km range." },
  { id: "missile", category: "weapons", icon: "💥", title: "Kinetic & EMP Warhead Configurations", desc: "Selectable shaped-charge, high-frag, or EMP pulse modules." },
  { id: "cyber", category: "avionics", icon: "🔒", title: "Tri-Tier Cyberdefense Envelope", desc: "Optical air-gap isolation and cryptographic zeroize fail-safe." },
  { id: "sensory", category: "avionics", icon: "👁️", title: "Conformal EOTS & Spherical DAS", desc: "360° multi-spectrum electro-optical/infrared thermal imaging." },
  { id: "missions", category: "missions", icon: "⚔️", title: "SEAD / DEAD Air Defense Suppression", desc: "Hypersonic strikes neutralizing S-400 / S-500 SAM radars." },
  { id: "missions", category: "missions", icon: "🤖", title: "Collaborative Swarm Command", desc: "Airborne command node orchestrating expendable loitering munitions." },
  { id: "missions", category: "missions", icon: "⚡", title: "Hypersonic Time-Critical Interdiction", desc: "Mach 7.0+ rapid dash against mobile ballistic targets." },
  { id: "compat", category: "missions", icon: "🚢", title: "Naval & Ground VLS Launch Integration", desc: "Mark 41 / 57 VLS canister deployment and containerized RATO." },
  // Quick Actions
  { action: "theme", category: "actions", icon: "🌗", title: "Toggle Monograph Theme", desc: "Switch between Light Whitepaper and Dark Carbon Monograph." },
  { action: "export", category: "actions", icon: "📄", title: "Export Machine-Readable Spec", desc: "View and copy standardized JSON defense specifications." },
  { action: "lightbox", category: "actions", icon: "🔍", title: "Open Blueprint Inspector", desc: "Inspect current section schematic in high-res lightbox." },
  { action: "invert", category: "actions", icon: "💡", title: "Invert Blueprint Schematic", desc: "Toggle inverted night-vision schematic contrast filter." }
];

// ── Defense Acronym Data Dictionary ───────────────────
const ACRONYM_REGISTRY = {
  "RDRE": {
    full: "Rotating Detonation Rocket Engine",
    domain: "Hypersonic Propulsion",
    desc: "Pressure-gain combustion creating continuous supersonic detonation waves around an annular channel for 15–25% higher thermodynamic efficiency than deflagration engines."
  },
  "AESA": {
    full: "Active Electronically Scanned Array",
    domain: "Sensory & Fire Control",
    desc: "Solid-state radar transmitter/receiver module array capable of instantaneous multi-target 360° track-while-scan, beam steering, and electronic warfare jamming."
  },
  "SEAD": {
    full: "Suppression of Enemy Air Defenses",
    domain: "Tactical Operations",
    desc: "Offensive military mission profile dedicated to neutralizing enemy surface-to-air missile (SAM) batteries, early-warning radar arrays, and C4ISR nodes."
  },
  "DRFM": {
    full: "Digital Radio Frequency Memory",
    domain: "Electronic Warfare",
    desc: "High-speed digital sampling and re-transmission system that digitizes incoming radar signals and emits coherent false Doppler/range target decoys."
  },
  "EO/IR": {
    full: "Electro-Optical / Infrared",
    domain: "Passive Targeting Suite",
    desc: "Multi-spectrum multispectral imaging providing passive day/night visual detection, long-wave thermal tracking, and laser target designation without RF emission."
  },
  "VLS": {
    full: "Vertical Launching System",
    domain: "Naval & Ground Compatibility",
    desc: "Standardized multi-cell canister missile launch architecture allowing rapid launch sequences from naval warships, submarines, and containerized mobile ground units."
  },
  "CMC": {
    full: "Ceramic Matrix Composites",
    domain: "Materials Science",
    desc: "Silicon carbide fiber-reinforced ceramic materials capable of withstanding extreme thermal environments (>1,600°C) during sustained Mach 6–8 atmospheric flight."
  },
  "RAM": {
    full: "Radar-Absorbent Material",
    domain: "Stealth & Low Observability",
    desc: "Specialized carbon-nanotube and magnetic dipole coatings designed to absorb and attenuate incoming radar electromagnetic waves into thermal dissipation."
  },
  "UCAV": {
    full: "Unmanned Combat Aerial Vehicle",
    domain: "Airframe Platform",
    desc: "Autonomous or remotely commanded military aircraft engineered to conduct high-risk tactical strikes, electronic warfare, and air-to-air engagements."
  },
  "EMP": {
    full: "Electromagnetic Pulse",
    domain: "Directed Energy & Warhead",
    desc: "High-intensity transient electromagnetic field burst engineered to induce destructive voltage spikes and disable enemy microelectronics and sensor arrays."
  },
  "PTZ": {
    full: "Pan-Tilt-Zoom",
    domain: "Optical Surveillance",
    desc: "Directional optical camera mount offering continuous 360° azimuth sweep, rapid elevation articulation, and deep optical magnification for target tracking."
  }
};

// ── Blueprint Hotspot Coordinates & Metadata ──────────
const BLUEPRINT_HOTSPOTS = {
  "sec-overview": [
    { top: 22, left: 48, title: "MURAD++ GaN Nose Radome", tag: "Sensor Hub", desc: "Wideband GaN AESA with subterranean and sea-surface multi-mode tracking." },
    { top: 48, left: 32, title: "Conformal Internal Bay", tag: "Kinetic Bay", desc: "Flush rotary launcher housing 4x VALKYRIE-X hypersonic missiles." },
    { top: 58, left: 74, title: "Combined-Cycle Hypersonic Core", tag: "Propulsion", desc: "XH-800 Hydra combined turbofan, RDRE, and scramjet propulsion channels." },
    { top: 38, left: 82, title: "Chameleon-Wing Leading Edge", tag: "Aero/Stealth", desc: "Nano-ceramic continuous curvature edge with dynamic thermal dissipation." }
  ],
  "sec-propulsion": [
    { top: 35, left: 24, title: "Variable Compression Inlet", tag: "Aerodynamics", desc: "Active ramp geometry tailoring shockwave angle from Mach 1.5 to 8.0." },
    { top: 52, left: 52, title: "Annular RDRE Detonation Ring", tag: "Combustion", desc: "Continuous rotating detonation front delivering peak pressure-gain thrust." },
    { top: 62, left: 78, title: "Exo-Atmospheric Aerospike Bell", tag: "Rocket Module", desc: "Self-compensating altitude aerospike nozzle for high-altitude pop-up dashes." }
  ],
  "sec-stealth": [
    { top: 40, left: 30, title: "NanoIronCloak Dipole Layer", tag: "RAM Surface", desc: "Frequency-selective microwave absorption converting RF pulses to thermal micro-diffusion." },
    { top: 60, left: 65, title: "Active Coherent Wave Nullifier", tag: "Counter-RF", desc: "Emits 180° inverted phase waveforms canceling residual ground radar echoes." }
  ],
  "sec-control": [
    { top: 32, left: 45, title: "Edge Neuromorphic Core", tag: "AI Matrix", desc: "Sub-millisecond sensor fusion processing 12.8 TFLOPS of battlespace telemetry." },
    { top: 55, left: 70, title: "65kW Phased Laser Turret", tag: "Directed Energy", desc: "Solid-state fiber laser delivering instantaneous point-defense against AAMs." }
  ],
  "sec-missile": [
    { top: 30, left: 25, title: "Tri-Mode Millimeter Seeker", tag: "Guidance", desc: "Combines active AESA radar, imaging infrared (IIR), and optical scene matching." },
    { top: 50, left: 55, title: "Kinetic-EMP Multi-Warhead", tag: "Warhead", desc: "Selectable shaped kinetic penetrator or high-intensity EMP pulse module." },
    { top: 68, left: 80, title: "Grid Fin Aerodynamic Actuators", tag: "Flight Control", desc: "High-angle-of-attack grid control surfaces enabling 60G terminal intercept maneuvers." }
  ]
};

// ── Synthetic Tactical Audio Feedback Engine ──────────
let audioCtx = null;
let isAudioMuted = localStorage.getItem("tacticalAudio") === "0";

function playTacticalSound(type = "click") {
  if (isAudioMuted) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;
    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.035);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.035);
      osc.start(now);
      osc.stop(now + 0.035);
    } else if (type === "hum") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.linearRampToValueAtTime(220, now + 0.08);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (e) {
    // Audio context may be restricted before user gesture
  }
}

function initAudioToggle() {
  const btn = document.getElementById("audioToggle");
  const label = document.getElementById("audioLabel");
  if (!btn || !label) return;

  function updateAudioUI() {
    label.textContent = isAudioMuted ? "Audio: Muted" : "Tactical Audio: Active";
    btn.style.borderColor = isAudioMuted ? "var(--border)" : "var(--accent)";
  }

  btn.addEventListener("click", () => {
    isAudioMuted = !isAudioMuted;
    localStorage.setItem("tacticalAudio", isAudioMuted ? "0" : "1");
    updateAudioUI();
    if (!isAudioMuted) playTacticalSound("hum");
  });

  updateAudioUI();
}

// ── Section Switching & URL Hash Deep-Linking ─────────
function show(key, updateHash = true) {
  const targetId = sectionMap[key];
  if (!targetId) return;

  playTacticalSound("click");

  document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(targetId);
  if (!target) return;

  target.style.animation = "none";
  void target.offsetHeight;
  target.style.animation = "";
  target.classList.add("active");

  document.querySelectorAll(".nav-item").forEach((n) => {
    n.classList.toggle("active", n.getAttribute("onclick")?.includes(`'${key}'`));
  });

  updateBreadcrumbs(key);
  window.scrollTo({ top: 0, behavior: "smooth" });
  applyAnimations(target);
  buildSubTOC(target);

  if (key === "overview" || key === "propulsion") {
    setTimeout(initFlightEnvelopeCanvas, 100);
  }

  if (updateHash && window.location.hash !== `#${key}`) {
    history.pushState({ section: key }, `DECKY CAP - ${key}`, `#${key}`);
  }

  if (window.innerWidth < 769) {
    document.body.classList.remove("sidebar-open");
  }
}

// ── Breadcrumb Generator ──────────────────────────────
function updateBreadcrumbs(sectionKey) {
  const meta = sectionMetadata[sectionKey] || { category: "Engineering Monograph", title: "Specification" };
  document.querySelectorAll(".breadcrumb-trail").forEach((bc) => {
    bc.innerHTML = `
      <span class="bc-root" onclick="show('overview')">Monograph</span>
      <span class="bc-sep">/</span>
      <span class="bc-cat">${meta.category}</span>
      <span class="bc-sep">/</span>
      <span class="bc-current">${meta.title}</span>
    `;
  });
}

// Listen to browser Back/Forward navigation
window.addEventListener("popstate", (e) => {
  const hash = window.location.hash.replace("#", "");
  if (hash && sectionMap[hash]) {
    show(hash, false);
  } else {
    show("overview", false);
  }
});

// ── Interactive Hotspot Blueprint Overlay System ──────
function initBlueprintHotspots() {
  document.querySelectorAll(".section").forEach((section) => {
    const secId = section.id;
    const hotspots = BLUEPRINT_HOTSPOTS[secId];
    if (!hotspots || hotspots.length === 0) return;

    const bpContainer = section.querySelector(".blueprint-img");
    if (!bpContainer || bpContainer.dataset.hotspotized) return;
    bpContainer.dataset.hotspotized = "true";

    bpContainer.classList.add("blueprint-hotspot-container");

    let callout = bpContainer.querySelector(".hotspot-callout-card");
    if (!callout) {
      callout = document.createElement("div");
      callout.className = "hotspot-callout-card";
      bpContainer.appendChild(callout);
    }

    hotspots.forEach((hs) => {
      const pin = document.createElement("div");
      pin.className = "hotspot-pin";
      pin.style.top = `${hs.top}%`;
      pin.style.left = `${hs.left}%`;
      pin.title = hs.title;

      pin.addEventListener("mouseenter", (e) => {
        e.stopPropagation();
        playTacticalSound("click");
        pin.classList.add("active");
        callout.innerHTML = `
          <div class="hotspot-card-header">
            <span class="hotspot-card-title">${hs.title}</span>
            <span class="hotspot-card-tag">${hs.tag}</span>
          </div>
          <p class="hotspot-card-desc">${hs.desc}</p>
        `;

        let top = hs.top + 5;
        let left = hs.left;
        if (left > 65) left = hs.left - 30;
        if (top > 70) top = hs.top - 20;

        callout.style.top = `${top}%`;
        callout.style.left = `${left}%`;
        callout.classList.add("visible");
      });

      pin.addEventListener("mouseleave", () => {
        pin.classList.remove("active");
        callout.classList.remove("visible");
      });

      bpContainer.appendChild(pin);
    });
  });
}

// ── Interactive Flight Envelope Chart (Canvas Engine) ──
function initFlightEnvelopeCanvas() {
  const canvas = document.getElementById("envelope-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const rect = canvas.getBoundingClientRect();
  const dpr = window.devicePixelRatio || 1;
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;
  const padLeft = 55;
  const padBottom = 40;
  const padTop = 20;
  const padRight = 25;

  const chartW = w - padLeft - padRight;
  const chartH = h - padTop - padBottom;

  ctx.clearRect(0, 0, w, h);

  const isDark = document.body.classList.contains("dark-theme");
  const textColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(15,23,42,0.06)";
  const accentColor = isDark ? "#38bdf8" : "#0284c7";

  ctx.lineWidth = 1;
  ctx.strokeStyle = gridColor;
  ctx.fillStyle = textColor;
  ctx.font = "10px Fira Code, monospace";

  for (let m = 0; m <= 8; m += 1) {
    const x = padLeft + (m / 8) * chartW;
    ctx.beginPath();
    ctx.moveTo(x, padTop);
    ctx.lineTo(x, padTop + chartH);
    ctx.stroke();
    ctx.textAlign = "center";
    ctx.fillText(`M${m}`, x, padTop + chartH + 18);
  }

  for (let alt = 0; alt <= 150; alt += 30) {
    const y = padTop + chartH - (alt / 150) * chartH;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(padLeft + chartW, y);
    ctx.stroke();
    ctx.textAlign = "right";
    ctx.fillText(`${alt}k ft`, padLeft - 8, y + 3);
  }

  const envelopePoints = [
    { m: 0.2, alt: 0 },
    { m: 0.8, alt: 35 },
    { m: 1.5, alt: 48 },
    { m: 3.5, alt: 75 },
    { m: 6.0, alt: 110 },
    { m: 7.5, alt: 135 },
    { m: 8.0, alt: 150 },
    { m: 6.5, alt: 150 },
    { m: 4.0, alt: 100 },
    { m: 2.0, alt: 60 },
    { m: 0.9, alt: 0 }
  ];

  ctx.beginPath();
  envelopePoints.forEach((pt, i) => {
    const px = padLeft + (pt.m / 8) * chartW;
    const py = padTop + chartH - (pt.alt / 150) * chartH;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  });
  ctx.closePath();

  const fillGradient = ctx.createLinearGradient(padLeft, padTop, padLeft + chartW, padTop + chartH);
  fillGradient.addColorStop(0, isDark ? "rgba(56, 189, 248, 0.25)" : "rgba(2, 132, 199, 0.18)");
  fillGradient.addColorStop(0.5, isDark ? "rgba(96, 165, 250, 0.18)" : "rgba(29, 78, 216, 0.12)");
  fillGradient.addColorStop(1, isDark ? "rgba(245, 158, 11, 0.15)" : "rgba(217, 119, 6, 0.1)");
  ctx.fillStyle = fillGradient;
  ctx.fill();

  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.font = "9px Fira Code, monospace";
  ctx.fillStyle = isDark ? "#38bdf8" : "#0284c7";
  ctx.textAlign = "left";
  ctx.fillText("Stage 1: Turbofan", padLeft + (0.5 / 8) * chartW, padTop + chartH - (20 / 150) * chartH);
  ctx.fillText("Stage 2: Ramjet", padLeft + (2.0 / 8) * chartW, padTop + chartH - (55 / 150) * chartH);
  ctx.fillText("Stage 3: RDRE + Scramjet Corridor", padLeft + (4.2 / 8) * chartW, padTop + chartH - (95 / 150) * chartH);
  ctx.fillText("Stage 4: Exo-Rocket (150k ft)", padLeft + (6.2 / 8) * chartW, padTop + chartH - (142 / 150) * chartH);

  canvas.onmousemove = (e) => {
    const cRect = canvas.getBoundingClientRect();
    const mx = e.clientX - cRect.left;
    const my = e.clientY - cRect.top;

    if (mx >= padLeft && mx <= padLeft + chartW && my >= padTop && my <= padTop + chartH) {
      const calcMach = ((mx - padLeft) / chartW) * 8;
      const calcAlt = ((padTop + chartH - my) / chartH) * 150;

      initFlightEnvelopeCanvas();

      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = isDark ? "#f59e0b" : "#d97706";
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(mx, padTop);
      ctx.lineTo(mx, padTop + chartH);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(padLeft, my);
      ctx.lineTo(padLeft + chartW, my);
      ctx.stroke();
      ctx.restore();

      const altitudeMeters = calcAlt * 304.8;
      const rho = 1.225 * Math.exp(-altitudeMeters / 7400);
      const speedOfSound = 340.29 * Math.sqrt(Math.max(216.65, 288.15 - 0.0065 * altitudeMeters) / 288.15);
      const velocityMs = calcMach * speedOfSound;
      const dynamicPressureKPa = (0.5 * rho * velocityMs * velocityMs) / 1000;
      const stagTempC = (216.65 * (1 + 0.2 * calcMach * calcMach)) - 273.15;

      const telMach = document.getElementById("tel-mach");
      const telAlt = document.getElementById("tel-alt");
      const telQ = document.getElementById("tel-q");
      const telTemp = document.getElementById("tel-temp");

      if (telMach) telMach.textContent = `Mach ${calcMach.toFixed(2)} (${Math.round(velocityMs * 3.6)} km/h)`;
      if (telAlt) telAlt.textContent = `${Math.round(calcAlt * 1000).toLocaleString()} ft (${(altitudeMeters / 1000).toFixed(1)} km)`;
      if (telQ) telQ.textContent = `${dynamicPressureKPa.toFixed(1)} kPa`;
      if (telTemp) telTemp.textContent = `${Math.round(stagTempC)} °C`;
    }
  };
}

// ── Subsystem 6th-Gen Comparison Matrix Engine ─────────
function initComparisonMatrix() {
  const filterBtns = document.querySelectorAll(".compare-filter-btn");
  const rows = document.querySelectorAll("#compare-table-body tr");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      playTacticalSound("click");
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.compareFilter;

      rows.forEach((row) => {
        if (category === "all" || row.dataset.compareCategory?.includes(category)) {
          row.style.display = "";
        } else {
          row.style.display = "none";
        }
      });
    });
  });
}

// ── Valkyrie-X Missile Mission & Payload Configurator ──
function initValkyrieConfigurator() {
  const missionBtns = document.querySelectorAll(".config-mission-btn");
  const warheadBtns = document.querySelectorAll(".config-warhead-btn");

  let currentMission = "intercept";
  let currentWarhead = "kinetic";

  const MISSION_PARAMS = {
    intercept: { name: "Air-to-Air Intercept", baseWeight: 85, mach: 6.5, range: 280, baseYield: 207 },
    sead: { name: "SEAD Radar Suppression", baseWeight: 110, mach: 5.8, range: 340, baseYield: 260 },
    armor: { name: "Naval Armor Penetration", baseWeight: 140, mach: 5.2, range: 240, baseYield: 380 },
    swarm: { name: "Swarm EMP Disruption", baseWeight: 95, mach: 6.2, range: 310, baseYield: 180 }
  };

  const WARHEAD_MODIFIERS = {
    kinetic: { weightAdd: 0, machMult: 1.0, yieldMult: 1.0 },
    emp: { weightAdd: 15, machMult: 0.95, yieldMult: 0.85 },
    frag: { weightAdd: 25, machMult: 0.92, yieldMult: 1.35 },
    tandem: { weightAdd: 40, machMult: 0.88, yieldMult: 1.75 }
  };

  function updateConfigMetrics() {
    const m = MISSION_PARAMS[currentMission];
    const w = WARHEAD_MODIFIERS[currentWarhead];

    const totalWeight = m.baseWeight + w.weightAdd;
    const finalMach = (m.mach * w.machMult).toFixed(2);
    const finalRange = Math.round(m.range * (100 / totalWeight) * 0.9);
    const finalYield = Math.round(m.baseYield * w.yieldMult);

    const elWeight = document.getElementById("cfg-weight");
    const elSpeed = document.getElementById("cfg-speed");
    const elRange = document.getElementById("cfg-range");
    const elYield = document.getElementById("cfg-yield");
    const elBar = document.getElementById("cfg-yield-bar");

    if (elWeight) elWeight.innerHTML = `${totalWeight} <span>kg</span>`;
    if (elSpeed) elSpeed.innerHTML = `Mach ${finalMach}`;
    if (elRange) elRange.innerHTML = `${finalRange} <span>km</span>`;
    if (elYield) elYield.innerHTML = `${finalYield} <span>MJ</span>`;
    if (elBar) elBar.style.width = `${Math.min((finalYield / 450) * 100, 100)}%`;
  }

  missionBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      playTacticalSound("click");
      missionBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentMission = btn.dataset.mission;
      updateConfigMetrics();
    });
  });

  warheadBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      playTacticalSound("click");
      warheadBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentWarhead = btn.dataset.warhead;
      updateConfigMetrics();
    });
  });

  updateConfigMetrics();
}

// ── Monograph Subsystem Tabs Engine ────────────────────
function initMonographTabs() {
  document.querySelectorAll(".monograph-tabs").forEach((tabGroup) => {
    const buttons = tabGroup.querySelectorAll(".mono-tab-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        playTacticalSound("click");
        const targetTab = btn.dataset.tab;
        const parent = btn.closest(".section");
        if (!parent) return;

        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        parent.querySelectorAll(".mono-tab-panel").forEach((panel) => {
          panel.classList.toggle("active", panel.dataset.panel === targetTab);
        });
      });
    });
  });
}

// ── JSON Machine-Readable Spec Exporter ────────────────
function initSpecExporter() {
  const modal = document.getElementById("json-export-modal");
  const openBtns = document.querySelectorAll(".export-spec-btn");
  const closeBtn = document.getElementById("json-close-btn");
  const copyBtn = document.getElementById("json-copy-btn");
  const dlBtn = document.getElementById("json-dl-btn");
  const codeView = document.getElementById("json-code-output");

  if (!modal || !codeView) return;

  const DEFENSE_SPEC_DATA = {
    $schema: "https://defense.mil-spec.org/schemas/ucav/v2.0.json",
    platform: {
      designation: "DECKY CAP (UCAV)",
      type: "Sixth-Generation Autonomous Combat Air Vehicle",
      classification: "LEVEL-6 MONOGRAPH // UNCLASSIFIED FOR RESEARCH",
      authors: ["Umar Khattab Malik", "Zaki Ul Hassan"],
      year: 2026,
      version: "2.0-spec"
    },
    aerodynamics: {
      airframe: "Chameleon-Wing Continuous Curvature Blended Wing-Body",
      frontal_rcs_dbsm: -40.0,
      frontal_rcs_m2: 0.0001,
      peak_operating_ceiling_ft: 150000,
      max_mach: 8.0
    },
    propulsion: {
      engine: "XH-800 Hydra Multi-Mode Combined Cycle",
      stages: [
        { regime: "Subsonic - Mach 1.5", architecture: "Adaptive High-Bypass Turbofan", isp_sec: 3800 },
        { regime: "Mach 1.5 - 3.5", architecture: "Subsonic-Combustion Ramjet", isp_sec: 2200 },
        { regime: "Mach 3.5 - 8.0", architecture: "Dual-Mode RDRE + Scramjet", isp_sec: 1650 },
        { regime: "Exo-Atmospheric (120k+ ft)", architecture: "Integrated Rocket Augmenter", isp_sec: 455 }
      ],
      primary_fuels: ["JP-10", "Synthetic Jet-A", "Cryogenic Liquid Methane"]
    },
    armament: {
      missile: "VALKYRIE-X AI-Linked Hypersonic Kinetic Interceptor",
      terminal_speed_mach: 6.5,
      effective_range_km: 280,
      kinetic_energy_yield_mj: 207.5,
      directed_energy: "65kW Optically Phased Fiber Laser Turret + HPM Horn"
    },
    avionics_and_c2: {
      fire_control: "HCFS-X Neuromorphic AI Combat Coordinator",
      radar: "MURAD++ 360-deg Gallium Nitride (GaN) AESA",
      datalink: "Photonic Quantum Key Distribution (PQC Kyber/Dilithium)",
      cyber_resilience: "Tri-Tier Optical Air-Gap Isolation with Tamper Zeroization"
    }
  };

  const formattedJson = JSON.stringify(DEFENSE_SPEC_DATA, null, 2);

  function openSpecModal() {
    playTacticalSound("click");
    codeView.textContent = formattedJson;
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSpecModal() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  openBtns.forEach((btn) => btn.addEventListener("click", openSpecModal));
  if (closeBtn) closeBtn.onclick = closeSpecModal;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeSpecModal();
  });

  if (copyBtn) {
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(formattedJson).then(() => {
        copyBtn.textContent = "✓ Copied to Clipboard";
        setTimeout(() => (copyBtn.textContent = "📋 Copy JSON"), 2000);
      });
    };
  }

  if (dlBtn) {
    dlBtn.onclick = () => {
      const blob = new Blob([formattedJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "decky-cap-defense-spec-v2.0.json";
      a.click();
      URL.revokeObjectURL(url);
    };
  }
}

// ── Command Palette (Cmd+K) Engine ────────────────────
let selectedPaletteIndex = 0;
let currentPaletteFilter = "all";
let filteredPaletteResults = [];

function initCommandPalette() {
  const modal = document.getElementById("cmd-palette-modal");
  const input = document.getElementById("cmd-search-input");
  const trigger = document.getElementById("searchTrigger");
  const resultsList = document.getElementById("cmd-results-list");
  const filterBtns = document.querySelectorAll(".cmd-filter-btn");

  if (!modal || !input) return;

  function openPalette() {
    modal.classList.add("active");
    input.value = "";
    currentPaletteFilter = "all";
    filterBtns.forEach((b) => b.classList.toggle("active", b.dataset.filter === "all"));
    renderPaletteResults("");
    setTimeout(() => input.focus(), 50);
    document.body.style.overflow = "hidden";
  }

  function closePalette() {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (trigger) trigger.addEventListener("click", openPalette);

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if (modal.classList.contains("active")) {
        closePalette();
      } else {
        openPalette();
      }
    } else if (e.key === "/" && !["INPUT", "TEXTAREA"].includes(e.target.tagName)) {
      e.preventDefault();
      openPalette();
    } else if (e.key === "Escape" && modal.classList.contains("active")) {
      closePalette();
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closePalette();
  });

  input.addEventListener("input", () => {
    renderPaletteResults(input.value.trim().toLowerCase());
  });

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      playTacticalSound("click");
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentPaletteFilter = btn.dataset.filter;
      renderPaletteResults(input.value.trim().toLowerCase());
    });
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      selectedPaletteIndex = (selectedPaletteIndex + 1) % Math.max(filteredPaletteResults.length, 1);
      updatePaletteSelection();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      selectedPaletteIndex = (selectedPaletteIndex - 1 + filteredPaletteResults.length) % Math.max(filteredPaletteResults.length, 1);
      updatePaletteSelection();
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filteredPaletteResults[selectedPaletteIndex];
      if (item) executePaletteItem(item);
    }
  });

  function renderPaletteResults(query) {
    filteredPaletteResults = SEARCH_INDEX.filter((item) => {
      const matchesFilter = currentPaletteFilter === "all" || item.category === currentPaletteFilter;
      if (!matchesFilter) return false;
      if (!query) return true;
      const haystack = `${item.title} ${item.desc} ${item.category} ${item.id || ""}`.toLowerCase();
      return haystack.includes(query);
    });

    resultsList.innerHTML = "";
    selectedPaletteIndex = 0;

    if (filteredPaletteResults.length === 0) {
      resultsList.innerHTML = `<li style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">No matching subsystems found for "${query}".</li>`;
      return;
    }

    filteredPaletteResults.forEach((item, idx) => {
      const li = document.createElement("li");
      li.className = `cmd-result-item ${idx === 0 ? "selected" : ""}`;
      li.innerHTML = `
        <div class="cmd-result-left">
          <div class="cmd-item-icon">${item.icon}</div>
          <div class="cmd-item-text">
            <span class="cmd-item-title">${item.title}</span>
            <span class="cmd-item-desc">${item.desc}</span>
          </div>
        </div>
        <span class="cmd-item-badge">${item.category}</span>
      `;

      li.addEventListener("click", () => executePaletteItem(item));
      li.addEventListener("mouseenter", () => {
        selectedPaletteIndex = idx;
        updatePaletteSelection();
      });

      resultsList.appendChild(li);
    });
  }

  function updatePaletteSelection() {
    const items = resultsList.querySelectorAll(".cmd-result-item");
    items.forEach((item, idx) => {
      item.classList.toggle("selected", idx === selectedPaletteIndex);
      if (idx === selectedPaletteIndex) {
        item.scrollIntoView({ block: "nearest" });
      }
    });
  }

  function executePaletteItem(item) {
    closePalette();
    if (item.id) {
      show(item.id);
    } else if (item.action === "theme") {
      toggleTheme();
    } else if (item.action === "export") {
      const exportBtn = document.querySelector(".export-spec-btn");
      if (exportBtn) exportBtn.click();
    } else if (item.action === "lightbox") {
      const activeSection = document.querySelector(".section.active");
      const bp = activeSection?.querySelector(".blueprint-img img");
      if (bp) {
        const lb = document.getElementById("blueprint-lightbox");
        const lbImg = document.getElementById("lightbox-img");
        if (lb && lbImg) {
          lbImg.src = bp.src;
          lb.classList.add("active");
        }
      }
    } else if (item.action === "invert") {
      const lbImg = document.getElementById("lightbox-img");
      if (lbImg) lbImg.classList.toggle("invert-blueprint");
    }
  }
}

// ── On-Page Floating Sub-TOC Generator ────────────────
function buildSubTOC(section) {
  const tocContainer = document.getElementById("on-page-toc");
  if (!tocContainer) return;

  const list = tocContainer.querySelector(".toc-list");
  if (!list) return;
  list.innerHTML = "";

  const headings = section.querySelectorAll("h3, .hero-title");
  if (headings.length === 0) {
    tocContainer.style.display = "none";
    return;
  }
  tocContainer.style.display = "";

  headings.forEach((heading, idx) => {
    if (!heading.id) {
      heading.id = `heading-${section.id}-${idx}`;
    }
    const cleanText = heading.textContent.replace(/^§\s*/, "").trim();
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${heading.id}`;
    a.className = "toc-link";
    a.textContent = cleanText;
    a.onclick = (e) => {
      e.preventDefault();
      heading.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    li.appendChild(a);
    list.appendChild(li);
  });

  initScrollSpy(section);
}

function initScrollSpy(section) {
  const headings = section.querySelectorAll("h3, .hero-title");
  const links = document.querySelectorAll(".toc-link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach((l) => {
            l.classList.toggle("active", l.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-80px 0px -70% 0px" }
  );

  headings.forEach((h) => observer.observe(h));
}

// ── Scroll Reveal Animations ──────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
);

function applyAnimations(section) {
  const elements = section.querySelectorAll(
    "h3, p, .hero-box, .callout, .table-wrap, .spec-card, .doc-list li, .module-card, .mission-card, .authors-strip, .divider, .math-card, .flight-envelope-widget, .compare-widget, .valkyrie-config-widget"
  );
  elements.forEach((el, index) => {
    el.classList.remove("reveal", "visible");
    void el.offsetWidth;
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(index * 0.03, 0.35)}s`;
    revealObserver.observe(el);
  });
}

// ── Sidebar Toggle ────────────────────────────────────
function toggleSidebar() {
  if (window.innerWidth < 769) {
    document.body.classList.toggle("sidebar-open");
  } else {
    const isCollapsed = document.body.classList.toggle("sidebar-collapsed");
    localStorage.setItem("sidebarCollapsed", isCollapsed ? "1" : "0");
  }
}

// ── Dark / Light Theme Toggle ─────────────────────────
function toggleTheme() {
  playTacticalSound("hum");
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeLabel(isDark);
  setTimeout(initFlightEnvelopeCanvas, 50);
}

function updateThemeLabel(isDark) {
  const label = document.getElementById("themeLabel");
  if (label) label.textContent = isDark ? "Dark Monograph" : "Light Monograph";
}

// ── Interactive Blueprint Lightbox Modal ──────────────
let currentZoom = 1;

function initBlueprintLightbox() {
  const lightbox = document.getElementById("blueprint-lightbox");
  if (!lightbox) return;

  const lbImg = document.getElementById("lightbox-img");
  const lbTitle = document.getElementById("lightbox-title-text");

  document.querySelectorAll(".blueprint-img").forEach((bp) => {
    const img = bp.querySelector("img");
    if (!img) return;

    if (!bp.querySelector(".blueprint-overlay-btn")) {
      const btn = document.createElement("div");
      btn.className = "blueprint-overlay-btn";
      btn.innerHTML = `<span>🔍 Inspect Schematic</span>`;
      bp.appendChild(btn);
    }

    bp.addEventListener("click", (e) => {
      if (e.target.classList.contains("hotspot-pin") || e.target.closest(".hotspot-callout-card")) return;
      playTacticalSound("click");
      if (lbImg) lbImg.src = img.src;
      if (lbTitle) lbTitle.textContent = img.alt || "DECKY CAP Technical Schematic";
      currentZoom = 1;
      if (lbImg) lbImg.style.transform = `scale(1)`;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  const closeBtn = document.getElementById("lb-close");
  if (closeBtn) closeBtn.onclick = closeLightbox;

  const zoomIn = document.getElementById("lb-zoom-in");
  if (zoomIn) {
    zoomIn.onclick = () => {
      playTacticalSound("click");
      currentZoom = Math.min(currentZoom + 0.25, 3);
      if (lbImg) lbImg.style.transform = `scale(${currentZoom})`;
    };
  }

  const zoomOut = document.getElementById("lb-zoom-out");
  if (zoomOut) {
    zoomOut.onclick = () => {
      playTacticalSound("click");
      currentZoom = Math.max(currentZoom - 0.25, 0.75);
      if (lbImg) lbImg.style.transform = `scale(${currentZoom})`;
    };
  }

  const invertBtn = document.getElementById("lb-invert");
  if (invertBtn) {
    invertBtn.onclick = () => {
      playTacticalSound("click");
      if (lbImg) lbImg.classList.toggle("invert-blueprint");
    };
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox-viewport")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

function closeLightbox() {
  const lightbox = document.getElementById("blueprint-lightbox");
  if (lightbox) {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }
}

// ── Interactive Defense Acronym Tooltips ──────────────
function initAcronymTooltips() {
  let popover = document.getElementById("acronym-popover");
  if (!popover) {
    popover = document.createElement("div");
    popover.id = "acronym-popover";
    popover.className = "acronym-popover";
    document.body.appendChild(popover);
  }

  document.querySelectorAll("p, td, li, .callout p, .mc-desc").forEach((node) => {
    if (node.dataset.acronymized || node.closest(".hotspot-callout-card") || node.closest(".cmd-palette-container") || node.closest("#json-export-modal")) return;
    node.dataset.acronymized = "true";

    let html = node.innerHTML;
    Object.keys(ACRONYM_REGISTRY).forEach((acr) => {
      const regex = new RegExp(`\\b(${acr})\\b(?![^<]*>|[^<>]*<\\/)`, "g");
      html = html.replace(regex, `<span class="acronym-tag" data-acronym="$1">$1</span>`);
    });
    node.innerHTML = html;
  });

  document.querySelectorAll(".acronym-tag").forEach((tag) => {
    tag.addEventListener("mouseenter", (e) => {
      const code = tag.dataset.acronym;
      const data = ACRONYM_REGISTRY[code];
      if (!data) return;

      popover.innerHTML = `
        <div class="acr-header">
          <span class="acr-code">${code}</span>
          <span class="acr-domain">${data.domain}</span>
        </div>
        <div class="acr-full">${data.full}</div>
        <div class="acr-desc">${data.desc}</div>
      `;

      const rect = tag.getBoundingClientRect();
      let top = rect.bottom + 8;
      let left = rect.left + rect.width / 2 - 140;

      if (left < 10) left = 10;
      if (left + 280 > window.innerWidth) left = window.innerWidth - 290;
      if (top + 160 > window.innerHeight) top = rect.top - 170;

      popover.style.top = `${top}px`;
      popover.style.left = `${left}px`;
      popover.classList.add("visible");
    });

    tag.addEventListener("mouseleave", () => {
      popover.classList.remove("visible");
    });
  });
}

// ── Custom Cursor ─────────────────────────────────────
function initCustomCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let hoverTarget = null;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function renderCursor() {
    if (hoverTarget) {
      const rect = hoverTarget.getBoundingClientRect();
      const targetX = rect.left + rect.width / 2;
      const targetY = rect.top + rect.height / 2;
      cursorX += (targetX - cursorX) * 0.35;
      cursorY += (targetY - cursorY) * 0.35;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      cursor.style.width = `${rect.width + 8}px`;
      cursor.style.height = `${rect.height + 8}px`;
      cursor.style.borderRadius = "6px";
    } else {
      cursor.style.width = "8px";
      cursor.style.height = "8px";
      cursor.style.borderRadius = "50%";
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  document.body.addEventListener("mouseover", (e) => {
    const magneticEl = e.target.closest(".spec-card, .module-card, .mission-card, .cmd-result-item, .config-btn, .compare-filter-btn, .mono-tab-btn");
    const clickableEl = e.target.closest("a, .nav-item, .fnav-btn, .sb-toggle, .theme-btn, .blueprint-img, .acronym-tag, .search-trigger, .cmd-filter-btn, .hotspot-pin, .export-spec-btn, .audio-btn");
    if (magneticEl) {
      hoverTarget = magneticEl;
      cursor.classList.add("magnetic");
      cursor.classList.remove("hover");
    } else if (clickableEl) {
      hoverTarget = null;
      cursor.classList.add("hover");
      cursor.classList.remove("magnetic");
    }
  });

  document.body.addEventListener("mouseout", (e) => {
    const magneticEl = e.target.closest(".spec-card, .module-card, .mission-card, .cmd-result-item, .config-btn, .compare-filter-btn, .mono-tab-btn");
    const clickableEl = e.target.closest("a, .nav-item, .fnav-btn, .sb-toggle, .theme-btn, .blueprint-img, .acronym-tag, .search-trigger, .cmd-filter-btn, .hotspot-pin, .export-spec-btn, .audio-btn");
    if (magneticEl || clickableEl) {
      hoverTarget = null;
      cursor.classList.remove("magnetic", "hover");
    }
  });
}

// ── Reading Progress Bar ──────────────────────────────
function initProgressBar() {
  const bar = document.getElementById("progress-bar");
  if (!bar) return;
  window.addEventListener("scroll", () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(pct, 100)}%`;
  }, { passive: true });
}

// ── Keyboard Navigation ───────────────────────────────
function initKeyboardNav() {
  const keyMap = {
    "0": "overview", "1": "propulsion", "2": "stealth", "3": "control",
    "4": "missile", "5": "cyber", "6": "sensory", "7": "missions", "8": "compat"
  };
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (keyMap[e.key]) show(keyMap[e.key]);
  });
}

// ── Init & Initial Hash Handler ───────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark-theme");
  }
  updateThemeLabel(document.body.classList.contains("dark-theme"));

  if (window.innerWidth >= 769 && localStorage.getItem("sidebarCollapsed") === "1") {
    document.body.classList.add("sidebar-collapsed");
  }

  const hash = window.location.hash.replace("#", "");
  if (hash && sectionMap[hash]) {
    show(hash, false);
  } else {
    const initialSection = document.querySelector(".section.active");
    if (initialSection) {
      applyAnimations(initialSection);
      buildSubTOC(initialSection);
      updateBreadcrumbs("overview");
    }
  }

  initCustomCursor();
  initProgressBar();
  initKeyboardNav();
  initBlueprintLightbox();
  initBlueprintHotspots();
  initAcronymTooltips();
  initCommandPalette();
  initFlightEnvelopeCanvas();
  initComparisonMatrix();
  initValkyrieConfigurator();
  initMonographTabs();
  initSpecExporter();
  initAudioToggle();

  window.addEventListener("resize", () => {
    initFlightEnvelopeCanvas();
  });

  const overlay = document.getElementById("sidebar-overlay");
  if (overlay) overlay.addEventListener("click", () => document.body.classList.remove("sidebar-open"));
});