/* ==========================================================================
   DECKY CAP — Option B: Technical Monograph & Aerospace Paper Engine
   Interactive Telemetry · Deep Linking · Lightbox · Acronym Registry
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

// Listen to browser Back/Forward navigation
window.addEventListener("popstate", (e) => {
  const hash = window.location.hash.replace("#", "");
  if (hash && sectionMap[hash]) {
    show(hash, false);
  } else {
    show("overview", false);
  }
});

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
  // Create shared popover if not exists
  let popover = document.getElementById("acronym-popover");
  if (!popover) {
    popover = document.createElement("div");
    popover.id = "acronym-popover";
    popover.className = "acronym-popover";
    document.body.appendChild(popover);
  }

  // Scan text and wrap known acronyms
  document.querySelectorAll("p, td, li, .callout p, .mc-desc").forEach((node) => {
    if (node.dataset.acronymized) return;
    node.dataset.acronymized = "true";

    let html = node.innerHTML;
    Object.keys(ACRONYM_REGISTRY).forEach((acr) => {
      // Regex boundary avoiding existing tags
      const regex = new RegExp(`\\b(${acr})\\b(?![^<]*>|[^<>]*<\\/)`, "g");
      html = html.replace(regex, `<span class="acronym-tag" data-acronym="$1">$1</span>`);
    });
    node.innerHTML = html;
  });

  // Attach hover events to tags
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

      // Viewport bounds check
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
    const magneticEl = e.target.closest(".spec-card, .module-card, .mission-card");
    const clickableEl = e.target.closest("a, .nav-item, .fnav-btn, .sb-toggle, .theme-btn, .blueprint-img, .acronym-tag");
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
    const magneticEl = e.target.closest(".spec-card, .module-card, .mission-card");
    const clickableEl = e.target.closest("a, .nav-item, .fnav-btn, .sb-toggle, .theme-btn, .blueprint-img, .acronym-tag");
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
  // Theme check
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark-theme");
  }
  updateThemeLabel(document.body.classList.contains("dark-theme"));

  // Sidebar collapse check
  if (window.innerWidth >= 769 && localStorage.getItem("sidebarCollapsed") === "1") {
    document.body.classList.add("sidebar-collapsed");
  }

  // Initial Section from Hash
  const hash = window.location.hash.replace("#", "");
  if (hash && sectionMap[hash]) {
    show(hash, false);
  } else {
    const initialSection = document.querySelector(".section.active");
    if (initialSection) {
      applyAnimations(initialSection);
      buildSubTOC(initialSection);
    }
  }

  initCustomCursor();
  initProgressBar();
  initKeyboardNav();
  initBlueprintLightbox();
  initAcronymTooltips();

  const overlay = document.getElementById("sidebar-overlay");
  if (overlay) overlay.addEventListener("click", () => document.body.classList.remove("sidebar-open"));
});