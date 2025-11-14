function initReviewsSlider() {
  const root = document.querySelector(".reviews");
  if (!root) return;

  const container = root.querySelector(".reviews__container");
  const track = root.querySelector(".reviews__track");
  const cards = [...root.querySelectorAll(".reviews__card")];
  const prevBtn = root.querySelector(".js-prev");
  const nextBtn = root.querySelector(".js-next");

  let index = 0;
  const EDGE_LIMIT = 20;

  // autoplay
  let autoplayTimer = null;
  const AUTOPLAY_DELAY = 8000;
  let isHovered = false;

  // drag
  let isDragging = false;
  let dragStartX = 0;
  let dragDeltaX = 0;
  let dragStartTime = 0;
  let lastOffset = 0; // last applied translateX from update()

  // =====================================================
  // POSITIONING
  // =====================================================
  function update() {
    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 40;

    const containerWidth = container.offsetWidth;
    const trackWidth = cards.length * cardWidth + (cards.length - 1) * gap;

    const containerCenter = containerWidth / 2;
    const cardCenter = index * (cardWidth + gap) + cardWidth / 2;

    let offset = containerCenter - cardCenter;

    const maxOffset = EDGE_LIMIT;
    const minOffset = containerWidth - trackWidth - EDGE_LIMIT;

    offset = Math.min(maxOffset, Math.max(minOffset, offset));

    lastOffset = offset;
    track.style.transform = `translateX(${offset}px)`;

    cards.forEach((c, i) => c.classList.toggle("active", i === index));

    prevBtn.classList.toggle("is-disabled", index === 0);
    nextBtn.classList.toggle("is-disabled", index === cards.length - 1);
  }

  // =====================================================
  // NAVIGATION
  // =====================================================
  function goNext() {
    if (index < cards.length - 1) {
      index++;
      update();
    }
  }

  function goPrev() {
    if (index > 0) {
      index--;
      update();
    }
  }

  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);

  // =====================================================
  // TOUCH SWIPE (MOBILE)
  // =====================================================
  let touchStartX = 0;

  track.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
    stopAutoplay();
  });

  track.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 60) {
      diff < 0 ? goNext() : goPrev();
    }
    if (!isHovered) startAutoplay();
  });

  // =====================================================
  // MOUSE DRAG (DESKTOP)
  // =====================================================
  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    dragStartX = e.clientX;
    dragDeltaX = 0;
    dragStartTime = Date.now();
    track.style.transition = "none";
    stopAutoplay();
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    dragDeltaX = e.clientX - dragStartX;
    const current = lastOffset + dragDeltaX;
    track.style.transform = `translateX(${current}px)`;
  });

  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;

    track.style.transition = "transform 0.5s ease";

    const absDiff = Math.abs(dragDeltaX);
    const dragDuration = Date.now() - dragStartTime;

    // calculate bounds
    const cardWidth = cards[0].offsetWidth;
    const gap = parseFloat(getComputedStyle(track).gap) || 40;
    const containerWidth = container.offsetWidth;
    const trackWidth = cards.length * cardWidth + (cards.length - 1) * gap;

    const maxOffset = EDGE_LIMIT;
    const minOffset = containerWidth - trackWidth - EDGE_LIMIT;

    const current = lastOffset + dragDeltaX;

    // --- ALWAYS HANDLE EDGE RETURN ---
    if (current > maxOffset) {
      track.style.transform = `translateX(${maxOffset}px)`;
      lastOffset = maxOffset;
      dragDeltaX = 0;
      if (!isHovered) startAutoplay();
      return;
    }

    if (current < minOffset) {
      track.style.transform = `translateX(${minOffset}px)`;
      lastOffset = minOffset;
      dragDeltaX = 0;
      if (!isHovered) startAutoplay();
      return;
    }

    // swipe detection
    const isQuickSwipe = dragDuration < 250 && absDiff > 40;
    const isLongSwipe = absDiff > 120;

    if (isQuickSwipe || isLongSwipe) {
      dragDeltaX < 0 ? goNext() : goPrev();
    } else {
      update(); // return to current slide
    }

    dragDeltaX = 0;
    if (!isHovered) startAutoplay();
  });

  // prevent native image drag
  track.addEventListener("dragstart", (e) => e.preventDefault());

  // =====================================================
  // AUTOPLAY
  // =====================================================
  function startAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = setInterval(() => {
      if (isHovered) return;

      if (index < cards.length - 1) {
        goNext();
      } else {
        index = 0;
        update();
      }
    }, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
    autoplayTimer = null;
  }

  root.addEventListener("mouseenter", () => {
    isHovered = true;
    stopAutoplay();
  });

  root.addEventListener("mouseleave", () => {
    isHovered = false;
    startAutoplay();
  });

  // =====================================================
  // RESIZE
  // =====================================================
  window.addEventListener("resize", () => {
    setTimeout(update, 50);
  });

  // INIT
  update();
  startAutoplay();
}

document.addEventListener("DOMContentLoaded", initReviewsSlider);
