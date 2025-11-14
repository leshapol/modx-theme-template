function initProjectsSlider() {
  const root = document.querySelector(".projects");
  if (!root) return;

  const container = root.querySelector(".projects__container");
  const track = root.querySelector(".projects__track");
  const slides = [...root.querySelectorAll(".projects__slide")];

  let isDragging = false;
  let startX = 0;
  let deltaX = 0;
  let lastOffset = 0;
  const EDGE = 40; // same visual spacing as in mockup

  function updateBounds() {
    const slideWidth = slides[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 24;

    const containerWidth = container.offsetWidth;
    const trackWidth = slides.length * slideWidth + (slides.length - 1) * gap;

    return {
      min: containerWidth - trackWidth - EDGE,
      max: EDGE,
    };
  }

  function applyOffset(offset) {
    track.style.transform = `translateX(${offset}px)`;
  }

  // DRAG START
  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = "none";
  });

  // DRAG MOVE
  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    deltaX = e.clientX - startX;
    applyOffset(lastOffset + deltaX);
  });

  // DRAG END
  window.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;
    track.style.transition = "transform 0.45s ease";

    const { min, max } = updateBounds();
    const current = lastOffset + deltaX;

    if (current > max) lastOffset = max;
    else if (current < min) lastOffset = min;
    else lastOffset = current;

    applyOffset(lastOffset);
    deltaX = 0;
  });

  // TOUCH SUPPORT
  track.addEventListener("touchstart", (e) => {
    track.style.transition = "none";
    startX = e.touches[0].clientX;
  });

  track.addEventListener("touchmove", (e) => {
    const diff = e.touches[0].clientX - startX;
    applyOffset(lastOffset + diff);
  });

  track.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;

    track.style.transition = "transform 0.45s ease";

    const { min, max } = updateBounds();
    const current = lastOffset + diff;

    if (current > max) lastOffset = max;
    else if (current < min) lastOffset = min;
    else lastOffset = current;

    applyOffset(lastOffset);
  });

  // Prevent image drag ghost
  track.addEventListener("dragstart", (e) => e.preventDefault());

  // On resize: soft recalculation
  window.addEventListener("resize", () => {
    const { min, max } = updateBounds();
    lastOffset = Math.min(max, Math.max(min, lastOffset));
    applyOffset(lastOffset);
  });

  // INIT POSITION
  applyOffset(lastOffset);
}

document.addEventListener("DOMContentLoaded", initProjectsSlider);
