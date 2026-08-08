/* ==========================================================================
   DECKY CAP — Option B: Technical Monograph & Aerospace Paper Engine
   Interactive Telemetry · Deep Linking · Lightbox · Acronym Registry · Cmd+K
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

// ── Section Switching & URL Hash Deep-Linking ─────────
function show(key, updateHash = true) {
  const targetId = sectionMap[key];
  if (!targetId) return;

  // Toggle sections
  document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));
  const target = document.getElementById(targetId);
  if (!target) return;

  target.style.animation = "none";
  void target.offsetHeight;
  target.style.animation = "";
  target.classList.add("active");

  // Toggle active sidebar navigation items
  document.querySelectorAll(".nav-item").forEach((n) => {
    n.classList.toggle("active", n.getAttribute("onclick")?.includes(`'${key}'`));
  });

  // Update Breadcrumbs
  updateBreadcrumbs(key);

  // Smooth scroll to top of section
  window.scrollTo({ top: 0, behavior: "smooth" });
  applyAnimations(target);
  buildSubTOC(target);

  // Update URL Hash for deep linking & history navigation
  if (updateHash && window.location.hash !== `#${key}`) {
    history.pushState({ section: key }, `DECKY CAP - ${key}`, `#${key}`);
  }

  // Close mobile sidebar
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

  // Global Keyboard Shortcuts (Cmd+K, Ctrl+K, /)
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
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentPaletteFilter = btn.dataset.filter;
      renderPaletteResults(input.value.trim().toLowerCase());
    });
  });

  // Arrow & Enter Key Navigation
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
      resultsList.innerHTML = `<li style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">No matching subsystems or specifications found for "${query}".</li>`;
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

function initBlueprintLightbox() {
  const lightbox = document.getElementById("blueprint-lightbox");
  if (!lightbox) return;

  const lbImg = document.getElementById("lightbox-img");
  const lbTitle = document.getElementById("lightbox-title-text");

  // Attach click handler to all blueprint containers
  document.querySelectorAll(".blueprint-img").forEach((bp) => {
    const img = bp.querySelector("img");
    if (!img) return;

    // Add visual indicator
    if (!bp.querySelector(".blueprint-overlay-btn")) {
      const btn = document.createElement("div");
      btn.className = "blueprint-overlay-btn";
      btn.innerHTML = `<span>🔍 Inspect Schematic</span>`;
      bp.appendChild(btn);
    }

    bp.addEventListener("click", () => {
      if (lbImg) lbImg.src = img.src;
      if (lbTitle) lbTitle.textContent = img.alt || "DECKY CAP Technical Schematic";
      currentZoom = 1;
      if (lbImg) lbImg.style.transform = `scale(1)`;
      lightbox.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Lightbox Controls
  const closeBtn = document.getElementById("lb-close");
  if (closeBtn) closeBtn.onclick = closeLightbox;

  const zoomIn = document.getElementById("lb-zoom-in");
  if (zoomIn) {
    zoomIn.onclick = () => {
      currentZoom = Math.min(currentZoom + 0.25, 3);
      if (lbImg) lbImg.style.transform = `scale(${currentZoom})`;
    };
  }

  const zoomOut = document.getElementById("lb-zoom-out");
  if (zoomOut) {
    zoomOut.onclick = () => {
      currentZoom = Math.max(currentZoom - 0.25, 0.75);
      if (lbImg) lbImg.style.transform = `scale(${currentZoom})`;
    };
  }

  const invertBtn = document.getElementById("lb-invert");
  if (invertBtn) {
    invertBtn.onclick = () => {
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
    if (node.dataset.acronymized) return;
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
    const magneticEl = e.target.closest(".spec-card, .module-card, .mission-card, .cmd-result-item");
    const clickableEl = e.target.closest("a, .nav-item, .fnav-btn, .sb-toggle, .theme-btn, .blueprint-img, .acronym-tag, .search-trigger, .cmd-filter-btn");
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
    const magneticEl = e.target.closest(".spec-card, .module-card, .mission-card, .cmd-result-item");
    const clickableEl = e.target.closest("a, .nav-item, .fnav-btn, .sb-toggle, .theme-btn, .blueprint-img, .acronym-tag, .search-trigger, .cmd-filter-btn");
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
  initAcronymTooltips();
  initCommandPalette();

  const overlay = document.getElementById("sidebar-overlay");
  if (overlay) overlay.addEventListener("click", () => document.body.classList.remove("sidebar-open"));
});