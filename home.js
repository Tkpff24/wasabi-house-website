// Home page: render spotlight + upcoming/past lists from `data.js`.
(function () {
  const data = window.wasabiHouse;
  if (!data || !Array.isArray(data.events)) return;

  const upcomingEl = document.getElementById("upcomingEvents");
  const pastEl = document.getElementById("pastEvents");
  const pastPosterGallery = document.getElementById("pastPosterGallery");
  const spotlightArtistsEl = document.getElementById("spotlightArtists");
  const spotlightLocationEl = document.getElementById("spotlightLocation");

  function toISODate(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function parseISODate(iso) {
    return new Date(`${iso}T00:00:00`);
  }

  function formatShortDate(iso) {
    const dt = parseISODate(iso);
    return dt.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  const now = new Date();
  const todayISO = toISODate(now);

  const pastEvents = [];
  const upcomingEvents = [];
  for (const ev of data.events) {
    if (ev.date < todayISO) pastEvents.push(ev);
    else upcomingEvents.push(ev);
  }

  upcomingEvents.sort((a, b) => a.date.localeCompare(b.date));
  pastEvents.sort((a, b) => b.date.localeCompare(a.date));

  function artistsText(ev) {
    if (Array.isArray(ev.artists) && ev.artists.length) return ev.artists.join(", ");
    return "Line-up TBA";
  }

  function locationText(ev) {
    return ev.location || "Wasabi House";
  }

  function renderList(container, list) {
    if (!container) return;
    container.innerHTML = "";

    if (!list.length) {
      return;
    }

    const limited = list.slice(0, 4);
    for (const ev of limited) {
      const item = document.createElement("article");
      item.className = "home-event";

      item.innerHTML = `
        <div class="home-event-date">${formatShortDate(ev.date)}</div>
        <div class="home-event-title">${ev.title}</div>
        <div class="home-event-meta">
          <span><strong>Artists:</strong> ${artistsText(ev)}</span>
          <span><strong>Location:</strong> ${locationText(ev)}</span>
        </div>
      `;

      const linkRow = document.createElement("div");
      linkRow.className = "home-event-links";
      const a = document.createElement("a");
      a.href = "./events.html";
      a.className = "home-link";
      a.textContent = "Open calendar";
      linkRow.appendChild(a);

      item.appendChild(linkRow);
      container.appendChild(item);
    }
  }

  renderList(upcomingEl, upcomingEvents);
  // If we have poster gallery, we don't also render the text-based past list.
  renderList(pastEl, pastPosterGallery ? [] : pastEvents);

  const spotlight = upcomingEvents[0] || pastEvents[0] || null;
  if (spotlight) {
    if (spotlightArtistsEl) spotlightArtistsEl.textContent = artistsText(spotlight);
    if (spotlightLocationEl) spotlightLocationEl.textContent = locationText(spotlight);
  }
})();

