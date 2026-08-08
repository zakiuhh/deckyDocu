/* ==========================================================================
   DECKY CAP — Option B: Technical Monograph & Aerospace Paper Engine
   Interactive Telemetry · Deep Linking · Lightbox · Monograph Tabs · Audio
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

// ── Responsive Lucide SVG Icon Registry ────────────────
const LUCIDE_ICONS = {
  overview: `<svg class="lucide-icon" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
  propulsion: `<svg class="lucide-icon" viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  zap: `<svg class="lucide-icon" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  flame: `<svg class="lucide-icon" viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  stealth: `<svg class="lucide-icon" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  magnet: `<svg class="lucide-icon" viewBox="0 0 24 24"><path d="m6 15-4-4 6.75-6.77a7.79 7.79 0 0 1 11 11L13 22l-4-4 6.39-6.36a2.14 2.14 0 0 0-3-3L6 15"/><path d="m5 8 4 4"/><path d="m12 15 4 4"/></svg>`,
  radar: `<svg class="lucide-icon" viewBox="0 0 24 24"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.1 19.1 19"/></svg>`,
  palette: `<svg class="lucide-icon" viewBox="0 0 24 24"><circle cx="13.5" cy="6.5" r=".5"/><circle cx="17.5" cy="10.5" r=".5"/><circle cx="8.5" cy="7.5" r=".5"/><circle cx="6.5" cy="12.5" r=".5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>`,
  cpu: `<svg class="lucide-icon" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>`,
  satellite: `<svg class="lucide-icon" viewBox="0 0 24 24"><path d="M13 7 9 3 5 7l4 4"/><path d="m17 11 4 4-4 4-4-4"/><path d="m8 12 4 4 6-6-4-4Z"/><path d="m16 8 3-3"/><path d="M9 21a6 6 0 0 0-6-6"/></svg>`,
  crosshair: `<svg class="lucide-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>`,
  bomb: `<svg class="lucide-icon" viewBox="0 0 24 24"><circle cx="11" cy="13" r="9"/><path d="M14.35 4.65 16.3 2.7a2.41 2.41 0 0 1 3.4 0l1.6 1.6a2.4 2.4 0 0 1 0 3.4l-1.95 1.95"/><path d="m22 2-1.5 1.5"/></svg>`,
  lock: `<svg class="lucide-icon" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  eye: `<svg class="lucide-icon" viewBox="0 0 24 24"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  swords: `<svg class="lucide-icon" viewBox="0 0 24 24"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" y1="19" x2="19" y2="13"/><line x1="16" y1="16" x2="20" y2="20"/><line x1="19" y1="21" x2="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" y1="14" x2="9" y2="18"/><line x1="7" y1="17" x2="4" y2="20"/><line x1="3" y1="19" x2="5" y2="21"/></svg>`,
  bot: `<svg class="lucide-icon" viewBox="0 0 24 24"><rect width="18" height="12" x="3" y="6" rx="2"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><path d="M12 2v4"/><path d="m4.5 2 1.5 4"/><path d="m19.5 2-1.5 4"/></svg>`,
  ship: `<svg class="lucide-icon" viewBox="0 0 24 24"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 10V2"/></svg>`,
  contrast: `<svg class="lucide-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 18a6 6 0 0 0 0-12v12z"/></svg>`,
  fileText: `<svg class="lucide-icon" viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  search: `<svg class="lucide-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  sun: `<svg class="lucide-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
};

function getLucideIcon(key) {
  return LUCIDE_ICONS[key] || `<svg class="lucide-icon" viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/></svg>`;
}

// ── Searchable Command Palette Index ───────────────────
const SEARCH_INDEX = [
  { id: "overview", category: "overview", iconKey: "overview", title: "DECKY CAP Platform Overview", desc: "Sixth-gen autonomous combat drone reference architecture." },
  { id: "propulsion", category: "propulsion", iconKey: "propulsion", title: "XH-800 Hydra Hypersonic Engine", desc: "Combined-cycle turbofan, ramjet, RDRE, scramjet & rocket." },
  { id: "propulsion", category: "propulsion", iconKey: "zap", title: "Rotating Detonation Combustion (RDRE)", desc: "Continuous supersonic detonation waves for Mach 3.5–8.0 flight." },
  { id: "propulsion", category: "propulsion", iconKey: "flame", title: "Fuel & Propellant Specifications", desc: "JP-10 synthetic jet fuel, cryogenic methane, HTP oxidizer." },
  { id: "stealth", category: "stealth", iconKey: "stealth", title: "Chameleon-Wing Stealth Geometry", desc: "Biomimetic continuous-curvature blended-wing airframe." },
  { id: "stealth", category: "stealth", iconKey: "magnet", title: "NanoIronCloak RAM Coating", desc: "Multi-layered carbon nanotube microwave RF absorption." },
  { id: "stealth", category: "stealth", iconKey: "radar", title: "Active Coherent Wave Cancellation", desc: "Anti-phase radar pulse emission nullifying reflections." },
  { id: "stealth", category: "stealth", iconKey: "palette", title: "SolarFlux Photochromic Skin", desc: "Dynamic electrochromic daytime & dusk horizon camouflage." },
  { id: "control", category: "avionics", iconKey: "cpu", title: "HCFS-X AI Combat Matrix", desc: "Edge-AI neuromorphic tensor processor for autonomous battle decisions." },
  { id: "control", category: "avionics", iconKey: "radar", title: "MURAD++ Conformal AESA Radar", desc: "360° Gallium Nitride (GaN) LPI track-while-scan radar." },
  { id: "control", category: "avionics", iconKey: "zap", title: "65kW Directed Energy Laser Turret", desc: "Fiber laser point-defense against incoming AAM missiles." },
  { id: "control", category: "avionics", iconKey: "satellite", title: "Quantum Key Enclave Datalink", desc: "Photonic entangled cryptographic anti-hijack communication." },
  { id: "missile", category: "weapons", iconKey: "crosshair", title: "VALKYRIE-X Hypersonic Missile", desc: "Mach 6.5 AI-linked kinetic interceptor with 280+ km range." },
  { id: "missile", category: "weapons", iconKey: "bomb", title: "Kinetic & EMP Warhead Configurations", desc: "Selectable shaped-charge, high-frag, or EMP pulse modules." },
  { id: "cyber", category: "avionics", iconKey: "lock", title: "Tri-Tier Cyberdefense Envelope", desc: "Optical air-gap isolation and cryptographic zeroize fail-safe." },
  { id: "sensory", category: "avionics", iconKey: "eye", title: "Conformal EOTS & Spherical DAS", desc: "360° multi-spectrum electro-optical/infrared thermal imaging." },
  { id: "missions", category: "missions", iconKey: "swords", title: "SEAD / DEAD Air Defense Suppression", desc: "Hypersonic strikes neutralizing S-400 / S-500 SAM radars." },
  { id: "missions", category: "missions", iconKey: "bot", title: "Collaborative Swarm Command", desc: "Airborne command node orchestrating expendable loitering munitions." },
  { id: "missions", category: "missions", iconKey: "zap", title: "Hypersonic Time-Critical Interdiction", desc: "Mach 7.0+ rapid dash against mobile ballistic targets." },
  { id: "compat", category: "missions", iconKey: "ship", title: "Naval & Ground VLS Launch Integration", desc: "Mark 41 / 57 VLS canister deployment and containerized RATO." },
  // Quick Actions
  { action: "theme", category: "actions", iconKey: "contrast", title: "Toggle Monograph Theme", desc: "Switch between Light Whitepaper and Dark Carbon Monograph." },
  { action: "export", category: "actions", iconKey: "fileText", title: "Export Machine-Readable Spec", desc: "View and copy standardized JSON defense specifications." },
  { action: "lightbox", category: "actions", iconKey: "search", title: "Open Blueprint Inspector", desc: "Inspect current section schematic in high-res lightbox." },
  { action: "invert", category: "actions", iconKey: "sun", title: "Invert Blueprint Schematic", desc: "Toggle inverted night-vision schematic contrast filter." }
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
    // Audio context restricted prior to user interaction
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
        copyBtn.innerHTML = `
          <svg class="lucide-icon" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          <span>Copied</span>
        `;
        setTimeout(() => {
          copyBtn.innerHTML = `
            <svg class="lucide-icon" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy JSON</span>
          `;
        }, 2000);
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
    const isShiftS = e.shiftKey && (e.key === "S" || e.key === "s") && !["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName);
    const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
    const isSlash = e.key === "/" && !["INPUT", "TEXTAREA", "SELECT"].includes(e.target.tagName);

    if (isShiftS || isCmdK || isSlash) {
      e.preventDefault();
      if (modal.classList.contains("active")) {
        closePalette();
      } else {
        openPalette();
      }
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
          <div class="cmd-item-icon">${getLucideIcon(item.iconKey)}</div>
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
    "h3, p, .hero-box, .callout, .table-wrap, .spec-card, .doc-list li, .module-card, .mission-card, .authors-strip, .divider, .math-card"
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
}

function updateThemeLabel(isDark) {
  const label = document.getElementById("themeLabel");
  if (label) label.textContent = isDark ? "Dark Monograph" : "Light Monograph";
}

// ── Interactive Blueprint Lightbox Modal ──────────────
let currentZoom = 1;
let panX = 0;
let panY = 0;
let isPanActive = false;
let isDragging = false;
let startDragX = 0;
let startDragY = 0;

function initBlueprintLightbox() {
  const lightbox = document.getElementById("blueprint-lightbox");
  if (!lightbox) return;

  const lbImg = document.getElementById("lightbox-img");
  const lbTitle = document.getElementById("lightbox-title-text");
  const viewport = lightbox.querySelector(".lightbox-viewport");
  const panBtn = document.getElementById("lb-pan");
  const resetBtn = document.getElementById("lb-reset");
  const zoomIn = document.getElementById("lb-zoom-in");
  const zoomOut = document.getElementById("lb-zoom-out");
  const invertBtn = document.getElementById("lb-invert");
  const closeBtn = document.getElementById("lb-close");

  function applyLightboxTransform() {
    if (!lbImg) return;
    lbImg.style.transform = `translate(${panX}px, ${panY}px) scale(${currentZoom})`;
    if (viewport) {
      viewport.classList.toggle("pan-enabled", isPanActive || currentZoom > 1.05);
    }
  }

  function resetLightboxView() {
    currentZoom = 1;
    panX = 0;
    panY = 0;
    isDragging = false;
    if (viewport) {
      viewport.classList.remove("is-panning");
      viewport.classList.toggle("pan-enabled", isPanActive);
    }
    applyLightboxTransform();
  }

  function togglePanTool() {
    playTacticalSound("click");
    isPanActive = !isPanActive;
    if (panBtn) {
      panBtn.classList.toggle("active", isPanActive);
      panBtn.setAttribute("aria-pressed", isPanActive);
    }
    if (viewport) {
      viewport.classList.toggle("pan-enabled", isPanActive || currentZoom > 1.05);
    }
  }

  if (panBtn) {
    panBtn.onclick = togglePanTool;
  }

  if (resetBtn) {
    resetBtn.onclick = () => {
      playTacticalSound("click");
      resetLightboxView();
    };
  }

  document.querySelectorAll(".blueprint-img").forEach((bp) => {
    const img = bp.querySelector("img");
    if (!img) return;

    if (!bp.querySelector(".blueprint-overlay-btn")) {
      const btn = document.createElement("div");
      btn.className = "blueprint-overlay-btn";
      btn.innerHTML = `
        <svg class="lucide-icon" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <span>Inspect Schematic</span>
      `;
      bp.appendChild(btn);
    }

    bp.addEventListener("click", () => {
      playTacticalSound("click");
      if (lbImg) {
        lbImg.src = img.src;
        lbImg.classList.remove("invert-blueprint");
      }
      if (lbTitle) lbTitle.textContent = img.alt || "DECKY CAP Technical Schematic";
      resetLightboxView();
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  if (closeBtn) closeBtn.onclick = closeLightbox;

  if (zoomIn) {
    zoomIn.onclick = () => {
      playTacticalSound("click");
      currentZoom = Math.min(currentZoom + 0.35, 4);
      applyLightboxTransform();
    };
  }

  if (zoomOut) {
    zoomOut.onclick = () => {
      playTacticalSound("click");
      currentZoom = Math.max(currentZoom - 0.35, 0.6);
      applyLightboxTransform();
    };
  }

  if (invertBtn) {
    invertBtn.onclick = () => {
      playTacticalSound("click");
      if (lbImg) lbImg.classList.toggle("invert-blueprint");
    };
  }

  // ── Drag / Pan Events (Mouse & Touch) ───────────────
  if (viewport) {
    viewport.addEventListener("mousedown", (e) => {
      if (e.target.closest(".lightbox-controls") || e.target.closest(".lightbox-header")) return;
      if (isPanActive || currentZoom > 1.05 || e.button === 1 || e.shiftKey) {
        isDragging = true;
        startDragX = e.clientX - panX;
        startDragY = e.clientY - panY;
        viewport.classList.add("is-panning");
        e.preventDefault();
      }
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      panX = e.clientX - startDragX;
      panY = e.clientY - startDragY;
      applyLightboxTransform();
    });

    window.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        if (viewport) viewport.classList.remove("is-panning");
      }
    });

    // Touch support
    viewport.addEventListener("touchstart", (e) => {
      if (e.touches.length === 1 && (isPanActive || currentZoom > 1.05)) {
        isDragging = true;
        startDragX = e.touches[0].clientX - panX;
        startDragY = e.touches[0].clientY - panY;
        viewport.classList.add("is-panning");
      }
    }, { passive: true });

    window.addEventListener("touchmove", (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      panX = e.touches[0].clientX - startDragX;
      panY = e.touches[0].clientY - startDragY;
      applyLightboxTransform();
    }, { passive: true });

    window.addEventListener("touchend", () => {
      isDragging = false;
      if (viewport) viewport.classList.remove("is-panning");
    });

    // Mouse Wheel Zoom
    viewport.addEventListener("wheel", (e) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 0.2 : -0.2;
      currentZoom = Math.min(Math.max(currentZoom + zoomFactor, 0.6), 4);
      applyLightboxTransform();
    }, { passive: false });
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;
    if (e.key === "Escape") {
      closeLightbox();
    } else if (e.key === "h" || e.key === "H") {
      togglePanTool();
    } else if (e.key === "0") {
      resetLightboxView();
    } else if (e.key === "+" || e.key === "=") {
      if (zoomIn) zoomIn.click();
    } else if (e.key === "-" || e.key === "_") {
      if (zoomOut) zoomOut.click();
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
    if (node.dataset.acronymized || node.closest(".cmd-palette-container") || node.closest("#json-export-modal")) return;
    node.dataset.acronymized = "true";

    let html = node.innerHTML;
    Object.keys(ACRONYM_REGISTRY).forEach((acr) => {
      const regex = new RegExp(`\\b(${acr})\\b(?![^<]*>|[^<>]*<\\/)`, "g");
      html = html.replace(regex, `<span class="acronym-tag" data-acronym="$1">$1</span>`);
    });
    node.innerHTML = html;
  });

  document.querySelectorAll(".acronym-tag").forEach((tag) => {
    tag.addEventListener("mouseenter", () => {
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
    const magneticEl = e.target.closest(".spec-card, .module-card, .mission-card, .cmd-result-item, .mono-tab-btn");
    const clickableEl = e.target.closest("a, .nav-item, .fnav-btn, .sb-toggle, .theme-btn, .blueprint-img, .acronym-tag, .search-trigger, .cmd-filter-btn, .export-spec-btn, .audio-btn");
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
    const magneticEl = e.target.closest(".spec-card, .module-card, .mission-card, .cmd-result-item, .mono-tab-btn");
    const clickableEl = e.target.closest("a, .nav-item, .fnav-btn, .sb-toggle, .theme-btn, .blueprint-img, .acronym-tag, .search-trigger, .cmd-filter-btn, .export-spec-btn, .audio-btn");
    if (magneticEl || clickableEl) {
      hoverTarget = null;
      cursor.classList.remove("magnetic", "hover");
    }
  });
}

// ── Tactical Deep-Link Toast System ───────────────────
let toastTimeout = null;
const CANONICAL_BASE_URL = "https://decky-docu.vercel.app/";

function showToast(message, url = "") {
  const toast = document.getElementById("tactical-toast");
  const msgEl = document.getElementById("toast-message");
  const urlEl = document.getElementById("toast-url");
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  if (urlEl) {
    urlEl.textContent = url;
    urlEl.style.display = url ? "inline" : "none";
  }

  toast.classList.add("visible");
  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("visible");
  }, 2600);
}

// ── One-Click Heading Deep-Link Sharing ───────────────
function initHeadingDeepLinks() {
  document.querySelectorAll(".section").forEach((section) => {
    const secId = section.id;
    const secKey = Object.keys(sectionMap).find((k) => sectionMap[k] === secId) || "overview";

    // 1. Section Main Title
    const mainTitle = section.querySelector(".sec-title");
    if (mainTitle && !mainTitle.querySelector(".heading-anchor-link")) {
      const anchor = document.createElement("a");
      anchor.className = "heading-anchor-link";
      anchor.innerHTML = `<span>#</span>`;
      anchor.title = `Copy direct link: ${CANONICAL_BASE_URL}#${secKey}`;
      anchor.setAttribute("aria-label", `Copy deep link to ${secKey}`);

      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        const deepUrl = `${CANONICAL_BASE_URL}#${secKey}`;
        navigator.clipboard.writeText(deepUrl).then(() => {
          playTacticalSound("click");
          if (window.location.hash !== `#${secKey}`) {
            history.pushState(null, "", `#${secKey}`);
          }
          showToast("Direct Link Copied", `#${secKey}`);
        });
      });

      mainTitle.appendChild(anchor);
    }

    // 2. Sub-headings (h3)
    section.querySelectorAll("h3").forEach((h3) => {
      if (!h3.querySelector(".heading-anchor-link")) {
        const anchor = document.createElement("a");
        anchor.className = "heading-anchor-link";
        anchor.innerHTML = `<span>#</span>`;
        anchor.title = `Copy direct link to section`;

        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const deepUrl = `${CANONICAL_BASE_URL}#${secKey}`;
          navigator.clipboard.writeText(deepUrl).then(() => {
            playTacticalSound("click");
            if (window.location.hash !== `#${secKey}`) {
              history.pushState(null, "", `#${secKey}`);
            }
            showToast("Section Link Copied", `#${secKey}`);
          });
        });

        h3.appendChild(anchor);
      }
    });

    // 3. Mathematical Formula Cards
    section.querySelectorAll(".math-card").forEach((card) => {
      const header = card.querySelector(".math-header");
      if (header && !header.querySelector(".heading-anchor-link")) {
        const anchor = document.createElement("a");
        anchor.className = "heading-anchor-link";
        anchor.innerHTML = `<span>#</span>`;
        anchor.title = `Copy direct link to formula`;

        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          const deepUrl = `${CANONICAL_BASE_URL}#${secKey}`;
          navigator.clipboard.writeText(deepUrl).then(() => {
            playTacticalSound("click");
            showToast("Formula Card Copied", `#${secKey}`);
          });
        });

        header.appendChild(anchor);
      }
    });
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
  if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
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
  initAcronymTooltips();
  initCommandPalette();
  initMonographTabs();
  initSpecExporter();
  initAudioToggle();
  initHeadingDeepLinks();

  const overlay = document.getElementById("sidebar-overlay");
  if (overlay) overlay.addEventListener("click", () => document.body.classList.remove("sidebar-open"));
});