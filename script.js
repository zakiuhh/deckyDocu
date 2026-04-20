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

function show(key) {
  const targetId = sectionMap[key];
  if (!targetId) return;

  document.querySelectorAll(".section").forEach((s) => s.classList.remove("active"));

  const target = document.getElementById(targetId);
  target.style.animation = "none";
  void target.offsetHeight;
  target.style.animation = "";
  target.classList.add("active");

  document.querySelectorAll(".nav-item").forEach((n) => {
    n.classList.toggle("active", n.getAttribute("onclick")?.includes(`'${key}'`));
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
  applyAnimations(target);

  if (window.innerWidth < 769) {
    document.body.classList.remove("sidebar-open");
  }
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
  { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
);

function applyAnimations(section) {
  const elements = section.querySelectorAll(
    "h3, p, .hero-box, .callout, .table-wrap, .spec-card, .doc-list li, .module-card, .mission-card, .authors-strip, .divider"
  );
  elements.forEach((el, index) => {
    el.classList.remove("reveal", "visible");
    void el.offsetWidth;
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(index * 0.04, 0.4)}s`;
    revealObserver.observe(el);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const initialSection = document.querySelector(".section.active");
  if (initialSection) applyAnimations(initialSection);
});

// ── Sidebar Toggle ────────────────────────────────────
function toggleSidebar() {
  if (window.innerWidth < 769) {
    document.body.classList.toggle("sidebar-open");
  } else {
    const isCollapsed = document.body.classList.toggle("sidebar-collapsed");
    localStorage.setItem("sidebarCollapsed", isCollapsed ? "1" : "0");
  }
}

(function () {
  if (window.innerWidth >= 769 && localStorage.getItem("sidebarCollapsed") === "1") {
    document.body.classList.add("sidebar-collapsed");
  }
})();

// ── Interactive Tilt Cards ────────────────────────────
function initInteractiveCards() {
  const cards = document.querySelectorAll(".spec-card, .module-card, .mission-card");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -2.5;
      const rotateY = ((x - rect.width / 2) / rect.width) * 2.5;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";
    });
  });
}

// ── Color Picker ──────────────────────────────────────
function initColorPicker() {
  const swatches = document.querySelectorAll(".color-swatch");
  const root = document.documentElement;

  const savedColor = localStorage.getItem("accentColorV2");
  if (savedColor) applyColor(savedColor);

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  }

  function applyColor(color) {
    root.style.setProperty("--accent", color);
    // Derive accent-dim from the color
    if (color.startsWith("oklch(")) {
      // Insert alpha into oklch
      const dimColor = color.replace(")", " / 0.07)");
      root.style.setProperty("--accent-dim", dimColor);
    } else if (color.startsWith("#")) {
      const r = parseInt(color.slice(1,3),16);
      const g = parseInt(color.slice(3,5),16);
      const b = parseInt(color.slice(5,7),16);
      root.style.setProperty("--accent-dim", `rgba(${r},${g},${b},0.07)`);
    }

    swatches.forEach(s => s.classList.remove("active"));
    const activeSwatch = Array.from(swatches).find(s => s.dataset.color === color);
    if (activeSwatch) activeSwatch.classList.add("active");
  }

  swatches.forEach(swatch => {
    swatch.addEventListener("click", () => {
      const col = swatch.dataset.color;
      applyColor(col);
      localStorage.setItem("accentColorV2", col);
    });
  });
}

// ── Custom Cursor ─────────────────────────────────────
function initCustomCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const cursor = document.getElementById("custom-cursor");
  if (!cursor) return;

  cursor.style.width = "10px";
  cursor.style.height = "10px";

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;
  let hoverTarget = null;
  let cachedBorderRadius = "4px";

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
      cursor.style.borderRadius = cachedBorderRadius;
    } else {
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursor.style.borderRadius = "50%";
      cursorX += (mouseX - cursorX) * 0.25;
      cursorY += (mouseY - cursorY) * 0.25;
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const squeeze = Math.min(distance * 0.0035, 0.4);
      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%) rotate(${angle}rad) scale(${1 + squeeze}, ${1 - squeeze})`;
    }
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  document.body.addEventListener("mouseover", (e) => {
    const magneticEl = e.target.closest(".spec-card, .module-card, .mission-card");
    const clickableEl = e.target.closest("a, .nav-item, .color-swatch, .fnav-btn, .sb-toggle");
    if (magneticEl) {
      hoverTarget = magneticEl;
      cachedBorderRadius = window.getComputedStyle(magneticEl).borderRadius || "4px";
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
    const clickableEl = e.target.closest("a, .nav-item, .color-swatch, .fnav-btn, .sb-toggle");
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
  const main = document.querySelector("main");
  window.addEventListener("scroll", () => {
    const docHeight = main.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    bar.style.width = `${Math.min(pct, 100)}%`;
  }, { passive: true });
}

// ── Keyboard Navigation ───────────────────────────────
function initKeyboardNav() {
  const keyMap = { "0": "overview", "1": "propulsion", "2": "stealth", "3": "control",
    "4": "missile", "5": "cyber", "6": "sensory", "7": "missions", "8": "compat" };
  document.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (keyMap[e.key]) show(keyMap[e.key]);
  });
}

// ── Init ──────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initInteractiveCards();
  initCustomCursor();
  initColorPicker();
  initProgressBar();
  initKeyboardNav();

  const overlay = document.getElementById("sidebar-overlay");
  if (overlay) overlay.addEventListener("click", () => document.body.classList.remove("sidebar-open"));
});
