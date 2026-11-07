function setupMobileMenu() {
  const burger = document.querySelector(".menu__burger");
  const toggle = burger ? burger.querySelector('input[type="checkbox"]') : null;
  const menu = burger ? burger.querySelector(".menu--vertical") : null;

  if (!burger || !toggle || !menu) return;

  const updateMenuState = () => {
    toggle.setAttribute("aria-expanded", String(toggle.checked));
    toggle.setAttribute(
      "aria-label",
      toggle.checked ? "Close main menu" : "Open main menu",
    );
  };

  toggle.addEventListener("change", updateMenuState);

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      toggle.checked = false;
      updateMenuState();
    }
  });

  document.addEventListener("click", (event) => {
    if (!burger.contains(event.target) && toggle.checked) {
      toggle.checked = false;
      updateMenuState();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.checked) {
      toggle.checked = false;
      updateMenuState();
      toggle.focus();
    }
  });

  updateMenuState();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", setupMobileMenu);
} else {
  setupMobileMenu();
}
