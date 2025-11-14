// ======================================
// Contact Form Handler (front-end only)
// ======================================

function enhanceFormFields(form) {
  const fields = form.querySelectorAll(".form__field");
  const refreshStates = () => {
    fields.forEach((field) => {
      const control = field.querySelector(".form__control");
      if (!control) return;

      const hasValue = control.value.trim().length > 0;
      field.classList.toggle("form__field--filled", hasValue);
      if (!hasValue) {
        field.classList.remove("form__field--focused");
      }
    });
  };

  fields.forEach((field) => {
    const control = field.querySelector(".form__control");
    if (!control) return;

    const updateFilledState = () => {
      const hasValue = control.value.trim().length > 0;
      field.classList.toggle("form__field--filled", hasValue);
    };

    control.addEventListener("focus", () => {
      field.classList.add("form__field--focused");
    });

    control.addEventListener("blur", () => {
      field.classList.remove("form__field--focused");
      updateFilledState();
    });

    control.addEventListener("input", updateFilledState);
    updateFilledState();
  });

  return refreshStates;
}

function initContactForm() {
  const form = document.querySelector(".js-contact-form");
  if (!form) return;

  const refreshFormFields = enhanceFormFields(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
    }

    // Simulate request (MODX FormIt will be added later)
    setTimeout(() => {
      form.reset();
      refreshFormFields();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = "Send";
      }
      alert("Form submitted (front-end mock)");
    }, 800);
  });
}
