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

// Hero dot-grid parallax (GPU-composited via transform on .hero-bg)
// Fires only when prefers-reduced-motion is false.
;(function () {
  const heroBg = document.querySelector(".hero-bg");
  if (!heroBg) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          heroBg.style.transform = `translateY(${window.scrollY * 0.18}px)`;
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
})();

// Stat counter — animates numbers (380 → 380, 100 → 100%) on viewport entry.
// Respects prefers-reduced-motion; text-node manipulation preserves .unit spans.
;(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const statsCard = document.querySelector(".stats-card");
  if (!statsCard) return;

  const counters = Array.from(statsCard.querySelectorAll("[data-count]"));
  if (!counters.length) return;

  function animateCount(el) {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1300;
    const startTime = performance.now();

    // childNodes[0] is the raw number text node; childNodes[1] is .unit span
    el.childNodes[0].nodeValue = "0";

    function tick(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out-cubic — snappy start, smooth finish
      const eased = 1 - Math.pow(1 - progress, 3);
      el.childNodes[0].nodeValue = String(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        counters.forEach(animateCount);
        io.disconnect();
      });
    },
    { threshold: 0.6 }
  );

  io.observe(statsCard);
})();

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
