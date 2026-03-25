// Custom always-visible thin scrollbar indicator for horizontal strips.
(function () {
  const indicators = Array.from(document.querySelectorAll(".scroll-indicator[data-for]"));
  if (!indicators.length) return;

  function clamp(n, a, b) {
    return Math.max(a, Math.min(b, n));
  }

  function update(indicator) {
    const id = indicator.getAttribute("data-for");
    const strip = id ? document.getElementById(id) : null;
    const thumb = indicator.querySelector(".scroll-thumb");
    if (!strip || !thumb) return;

    const maxScroll = Math.max(0, strip.scrollWidth - strip.clientWidth);
    if (maxScroll === 0) {
      indicator.style.opacity = "0";
      return;
    }
    indicator.style.opacity = "1";

    const ratio = strip.clientWidth / strip.scrollWidth;
    const thumbW = clamp(ratio * indicator.clientWidth, 24, indicator.clientWidth);
    const progress = strip.scrollLeft / maxScroll;
    const left = (indicator.clientWidth - thumbW) * progress;

    thumb.style.width = `${thumbW}px`;
    thumb.style.transform = `translateX(${left}px)`;
  }

  function bind(indicator) {
    const id = indicator.getAttribute("data-for");
    const strip = id ? document.getElementById(id) : null;
    if (!strip) return;

    const onScroll = () => update(indicator);
    strip.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Initial paint (after images load, sizes might change)
    update(indicator);
    window.setTimeout(onScroll, 50);
    window.setTimeout(onScroll, 300);
    window.setTimeout(onScroll, 900);
  }

  for (const ind of indicators) bind(ind);
})();

