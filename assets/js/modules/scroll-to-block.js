function initScrollToBlock() {
  const links = document.querySelectorAll("[data-scroll], a[href^='#']");
  if (!links.length) return;

  const header = document.querySelector(".header");

  const closeMobileMenu = () => {
    const burger = document.querySelector(".js-burger");
    const mobileMenu = document.querySelector(".js-mobile-menu");

    if (!burger || !mobileMenu) return;

    burger.classList.remove("active");
    mobileMenu.classList.remove("open");
    document.body.classList.remove("no-scroll");
  };

  const getOffset = () => (header ? header.offsetHeight : 0);

  links.forEach((link) => {
    const target = link.dataset.scroll || link.getAttribute("href");
    const isAnchorLink = target && target.startsWith("#") && target !== "#";
    if (!isAnchorLink) return;

    link.addEventListener("click", (event) => {
      const destination = document.querySelector(target);
      if (!destination) return;

      event.preventDefault();
      closeMobileMenu();

      const headerOffset = getOffset();
      const top =
        destination.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top: Math.max(top, 0),
        behavior: "smooth",
      });

      if (history.replaceState) {
        history.replaceState(null, "", target);
      } else {
        window.location.hash = target;
      }
    });
  });
}

window.initScrollToBlock = initScrollToBlock;
