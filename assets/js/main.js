// ======================================
// Main JavaScript Entry (Gulp Compatible)
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  if (typeof initHeader === "function") initHeader();
  if (typeof initScrollAnimations === "function") initScrollAnimations();
  if (typeof initReviewsSlider === "function") initReviewsSlider();
  if (typeof initProjectsSlider === "function") initProjectsSlider();
  if (typeof initFaq === "function") initFaq();
  if (typeof initContactForm === "function") initContactForm();
});
