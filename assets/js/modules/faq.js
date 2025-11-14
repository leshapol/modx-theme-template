function initFaq() {
  const items = document.querySelectorAll(".faq__item");
  if (!items.length) return;

  items.forEach((item) => {
    const button = item.querySelector(".faq__question");
    if (!button) return;

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all
      items.forEach((i) => i.classList.remove("active"));

      // Toggle clicked
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });
}
