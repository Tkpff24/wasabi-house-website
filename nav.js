(function () {
  function setupNav() {
    const toggle = document.querySelector(".nav-toggle");
    const drawer = document.getElementById("navMenu");
    if (!toggle || !drawer) return;

    toggle.addEventListener("click", () => {
      const isHidden = drawer.hasAttribute("hidden");
      drawer.toggleAttribute("hidden");
      toggle.setAttribute("aria-expanded", String(isHidden));
    });

    drawer.addEventListener("click", (e) => {
      const link = e.target.closest("a");
      if (!link) return;
      drawer.setAttribute("hidden", "");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setupNav);
  } else {
    setupNav();
  }
})();

