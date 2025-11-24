const HEADER_SHRINK_DELTA = 30;
let baseHeaderHeight = null;
let smallHeaderHeight = null;
let mobileBreakpoint = null;

function getCssNumberVar(name, fallback) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name);
  const parsed = parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function getMobileBreakpoint() {
  if (mobileBreakpoint === null) {
    mobileBreakpoint = getCssNumberVar("--header-mobile-breakpoint", 992);
  }
  return mobileBreakpoint;
}

function isMobileViewport() {
  return window.innerWidth <= getMobileBreakpoint();
}

function applyHeaderHeight({ isSmall, isMobile }) {
  if (baseHeaderHeight === null || smallHeaderHeight === null) return;

  const useSmall = isSmall || isMobile;
  const targetHeight = useSmall ? smallHeaderHeight : baseHeaderHeight;

  document.documentElement.style.setProperty(
    "--header-height",
    `${targetHeight}px`
  );
}

function updateMeasuredHeights() {
  const header = document.querySelector(".header");
  if (!header) return;

  const wasSmall = header.classList.contains("is-small");
  if (wasSmall) header.classList.remove("is-small");

  // measure base height in default state
  baseHeaderHeight = Math.round(header.getBoundingClientRect().height);

  const cssSmall = getCssNumberVar(
    "--header-height-small",
    baseHeaderHeight - HEADER_SHRINK_DELTA
  );
  smallHeaderHeight = Math.max(cssSmall, 0);

  // restore previous state
  if (wasSmall) header.classList.add("is-small");

  // sync CSS variable to current visual state
  applyHeaderHeight({
    isSmall: header.classList.contains("is-small"),
    isMobile: isMobileViewport(),
  });
}

/* ---------------------------
   Shrink Header on Scroll
---------------------------- */
function handleHeaderShrink() {
  const header = document.querySelector(".header");
  if (!header) return;

  const shrinkOffset = 80;

  const updateState = () => {
    const isSmall = window.scrollY > shrinkOffset;
    const isMobile = isMobileViewport();
    header.classList.toggle("is-small", isSmall);
    applyHeaderHeight({ isSmall, isMobile });
  };

  window.addEventListener("scroll", updateState);
  updateState();
}

/* ---------------------------
   Mobile dropdowns inside mobile menu
---------------------------- */
function initMobileDropdowns() {
  const toggles = document.querySelectorAll(".header__mobile-toggle");

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dropdown = btn.nextElementSibling;

      btn.classList.toggle("open");
      dropdown.classList.toggle("open");
    });
  });
}

/* ---------------------------
   Burger Menu
---------------------------- */
function initBurgerMenu() {
  const burger = document.querySelector(".js-burger");
  const mobileMenu = document.querySelector(".js-mobile-menu");

  if (!burger || !mobileMenu) return;

  burger.addEventListener("click", () => {
    const active = burger.classList.toggle("active");
    mobileMenu.classList.toggle("open", active);

    // disable body scroll
    document.body.classList.toggle("no-scroll", active);
  });
}

/* ---------------------------
   MAIN INIT FUNCTION
---------------------------- */
function initHeader() {
  updateMeasuredHeights();
  initBurgerMenu();
  initMobileDropdowns();
  handleHeaderShrink();

  // recalc height on resize
  window.addEventListener("resize", () => {
    mobileBreakpoint = null; // force re-read of CSS var
    updateMeasuredHeights();
  });
}

/* Make function available to main.js */
window.initHeader = initHeader;
