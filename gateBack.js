// Ensure browser Back from the main page returns to gate.
// This is needed when `home.html` is opened directly (no gate in history).
(function () {
  // Create a "buffer" history entry so the first Back triggers popstate here.
  try {
    history.pushState({ wasabi: "home-buffer" }, "", window.location.href);
  } catch {
    // ignore
  }

  window.addEventListener("popstate", () => {
    // Send user to gate page.
    window.location.href = "./gate.html";
  });
})();

