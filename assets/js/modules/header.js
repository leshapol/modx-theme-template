/* ---------------------------
   Update CSS variable for header height
---------------------------- */
let baseHeaderHeight = null;

function setHeaderHeight(isSmall) {
  const header = document.querySelector(".header");
  if (!header) return;

  const baseHeight =
    baseHeaderHeight || Math.round(header.getBoundingClientRect().height);
  const targetHeight = isSmall ? Math.max(baseHeight - 30, 0) : baseHeight;

  document.documentElement.style.setProperty(
    "--header-height",
    `${targetHeight}px`
  );
}

function updateBaseHeaderHeight() {
  const header = document.querySelector(".header");
  if (!header) return;

  const wasSmall = header.classList.contains("is-small");
  if (wasSmall) header.classList.remove("is-small");

  // measure in default state
  baseHeaderHeight = Math.round(header.getBoundingClientRect().height);

  // restore previous state
  if (wasSmall) header.classList.add("is-small");

  // sync CSS variable to current visual state
  setHeaderHeight(header.classList.contains("is-small"));
}

/* ---------------------------
   Shrink Header on Scroll
---------------------------- */
function handleHeaderShrink() {
  const header = document.querySelector(".header");
  if (!header) return;

  const shrinkOffset = 80;

  window.addEventListener("scroll", () => {
    const isSmall = window.scrollY > shrinkOffset;
    header.classList.toggle("is-small", isSmall);
    setHeaderHeight(isSmall);
  });
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
  updateBaseHeaderHeight();
  initBurgerMenu();
  initMobileDropdowns();
  handleHeaderShrink();

  // recalc height on resize
  window.addEventListener("resize", () => {
    updateBaseHeaderHeight();
  });
}

/* Make function available to main.js */
window.initHeader = initHeader;
