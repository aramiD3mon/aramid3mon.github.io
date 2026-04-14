(function () {
  "use strict";

  // Theme toggle
  const toggleBtn = document.querySelector(".btn-theme-toggle");
  const body = document.body;

  const setTheme = (theme) => {
    body.setAttribute("data-theme", theme);
    localStorage.setItem("preferred-theme", theme);
    toggleBtn.setAttribute(
      "aria-label",
      theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
    );
  };

  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const saved = localStorage.getItem("preferred-theme");
  const theme = saved || (prefersDark ? "dark" : "light");
  setTheme(theme);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      const current = body.getAttribute("data-theme");
      setTheme(current === "dark" ? "light" : "dark");
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const id = link.getAttribute("href");
      if (!id || id === "#" || id === "") return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });

  // Reveal on scroll
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach(el => revealObserver.observe(el));

  // Blog card expand / collapse
  const blogCards = document.querySelectorAll(".blog-card-full");

  blogCards.forEach(card => {
    const btn = card.querySelector(".btn-expand");
    if (!btn) return;

    const excerpt = card.querySelector(".blog-excerpt");
    const content = card.querySelector(".blog-content");

    // Do NOT touch style.display here → defer to CSS + .expanded class
    btn.addEventListener("click", () => {
      const expanded = card.classList.toggle("expanded");

      btn.textContent = expanded ? "Collapse" : "Read more";

      // Optional: keep the card in viewport after expanding
      card.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });
})();