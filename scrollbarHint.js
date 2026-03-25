// Shows the poster-strip scrollbar briefly after scrolling.
(function () {
  const strips = Array.from(document.querySelectorAll(".poster-strip"));
  if (!strips.length) return;

  const timers = new WeakMap();

  function show(strip) {
    strip.classList.add("is-scrolling");
    const prev = timers.get(strip);
    if (prev) window.clearTimeout(prev);
    const t = window.setTimeout(() => {
      strip.classList.remove("is-scrolling");
      timers.delete(strip);
    }, 900);
    timers.set(strip, t);
  }

  for (const strip of strips) {
    strip.addEventListener("scroll", () => show(strip), { passive: true });
    strip.addEventListener("pointerenter", () => show(strip), { passive: true });
    strip.addEventListener("focusin", () => show(strip));
  }
})();

