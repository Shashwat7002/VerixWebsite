// Mobile navigation toggle
const toggle = document.querySelector(".nav-toggle");
const mobileNav = document.getElementById("mobile-nav");

if (toggle && mobileNav) {
  toggle.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close after selecting a destination
  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Scroll-reveal (progressive enhancement)
// Elements with [data-sr] fade up when they enter the viewport.
// The .js class (set synchronously in <head>) enables CSS hiding
// so content is never invisible without JS support.
;(function () {
  if (!("IntersectionObserver" in window)) return;

  const els = Array.from(document.querySelectorAll("[data-sr]"));
  if (!els.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("sr-visible");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -48px 0px" }
  );

  els.forEach((el) => io.observe(el));
})();
