document.addEventListener("DOMContentLoaded", () => {
  const logo = document.getElementById("logoHeader");
  const lottieContainer = document.getElementById("lottie-container");

  if (logo && lottieContainer) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            // If the Lottie container is out of view, fade in the logo
            logo.classList.add("opacity-100");
          } else {
            // If the Lottie container is visible, hide the logo
            logo.classList.remove("opacity-100");
          }
        });
      },
      {
        root: null, // Observing relative to the viewport
        threshold: 0, // Trigger when any part of the Lottie container leaves the viewport
      },
    );

    observer.observe(lottieContainer);
  }
});
