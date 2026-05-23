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
