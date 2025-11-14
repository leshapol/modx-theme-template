/* ---------------------------
   Update CSS variable for header height
---------------------------- */
function updateHeaderHeight() {
  const header = document.querySelector(".header");
  if (!header) return;

  const height = header.offsetHeight;
  document.documentElement.style.setProperty("--header-height", height + "px");
}

/* ---------------------------
   Shrink Header on Scroll
---------------------------- */
function handleHeaderShrink() {
  const header = document.querySelector(".header");
  if (!header) return;

  const shrinkOffset = 80;

  window.addEventListener("scroll", () => {
    if (window.scrollY > shrinkOffset) {
      header.classList.add("is-small");
    } else {
      header.classList.remove("is-small");
    }

    // recalc height for mobile menu position
    updateHeaderHeight();
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
  updateHeaderHeight();
  initBurgerMenu();
  initMobileDropdowns();
  handleHeaderShrink();

  // recalc height on resize
  window.addEventListener("resize", updateHeaderHeight);
}

/* Make function available to main.js */
window.initHeader = initHeader;
