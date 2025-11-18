// Scroll-triggered animations for elements with [data-anim]
(function () {
  const DEFAULT_DURATION = 600; // ms
  const DEFAULT_DELAY = 0; // ms
  const DEFAULT_ONCE = false; // global default: repeat animations

  function initScrollAnimations(options = {}) {
    const {
      offset = 80, // px: start animation a bit before the element is fully visible
      once = DEFAULT_ONCE,
    } = options;

    const elements = document.querySelectorAll("[data-anim]");
    if (!elements.length) return;

    // Prepare elements
    elements.forEach((el) => {
      const type = el.dataset.anim || "fade-up";
      const duration = parseInt(el.dataset.animDuration || DEFAULT_DURATION, 10);
      const delay = parseInt(el.dataset.animDelay || DEFAULT_DELAY, 10);

      // Resolve per-element "once" setting
      let runOnce;
      if (el.dataset.animOnce === "false") {
        runOnce = false;
      } else if (el.dataset.animOnce === "true") {
        runOnce = true;
      } else {
        runOnce = once; // use global default
      }

      el.dataset.animOnceResolved = runOnce ? "true" : "false";

      // Initial state: shifted (anim-init) + effect type
      el.classList.add("anim-init", `anim-${type}`);

      // Set transition via inline styles
      el.style.transitionDuration = duration + "ms";
      el.style.transitionDelay = delay + "ms";
    });

    // Fallback: no IntersectionObserver → show everything at once
    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => {
        el.classList.remove("anim-init");
        el.classList.add("anim-animate");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target;
          const runOnce = el.dataset.animOnceResolved === "true";

          if (entry.isIntersecting) {
            // Element enters viewport → animate in
            el.classList.remove("anim-init");
            el.classList.add("anim-animate");

            if (runOnce) {
              observer.unobserve(el);
            }
          } else if (!runOnce) {
            // Element leaves viewport → reset for next time
            el.classList.remove("anim-animate");
            el.classList.add("anim-init");
          }
        });
      },
      {
        root: null,
        rootMargin: `0px 0px -${offset}px 0px`,
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));
  }

  // Expose to global scope
  window.initScrollAnimations = initScrollAnimations;
})();
