// SoundCloud gallery (artwork thumbnails, horizontal scroll).
// Uses SoundCloud oEmbed to fetch title + thumbnail.
(function () {
  const gallery = document.getElementById("soundcloudGallery");
  if (!gallery) return;

  const urls = [
    "https://soundcloud.com/wasabihouse_bkk/acid-house-mix-by-dary-at-wasabi-house",
    "https://soundcloud.com/wasabihouse_bkk/mizuyo-zen-wasabi-house-28082025",
    "https://soundcloud.com/wasabihouse_bkk/tanukiir-zen-wasabi-house-28082025",
    "https://soundcloud.com/wasabihouse_bkk/eyezen-zen-wasabi-house-28082025",
    "https://soundcloud.com/wasabihouse_bkk/radpittt-zen-wasabi-house-28082025",
    "https://soundcloud.com/wasabihouse_bkk/hallboy-zen-wasabi-house-28082025",
    "https://soundcloud.com/wasabihouse_bkk/muang-ek-sound-system-zen-wasabi-house-28082025",
    "https://soundcloud.com/wasabihouse_bkk/jazz-mix-by-chris"
  ];

  function createCard({ url, title, thumb }) {
    const a = document.createElement("a");
    a.className = "media-card";
    a.href = url;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.title = title || "SoundCloud";
    a.setAttribute("aria-label", title ? `Open on SoundCloud: ${title}` : "Open on SoundCloud");

    const img = document.createElement("img");
    img.loading = "lazy";
    img.alt = title || "SoundCloud artwork";

    if (thumb) img.src = thumb;
    else img.src = "./photos/DSC01355 copy.JPG";

    const titleEl = document.createElement("div");
    titleEl.className = "media-title";
    const span = document.createElement("span");
    span.textContent = title || "SoundCloud";
    titleEl.appendChild(span);

    a.appendChild(img);
    a.appendChild(titleEl);
    return a;
  }

  async function fetchOEmbed(url) {
    const endpoint = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`;
    const res = await fetch(endpoint, { mode: "cors" });
    if (!res.ok) throw new Error("oEmbed failed");
    return await res.json();
  }

  (async () => {
    for (const url of urls) {
      try {
        const data = await fetchOEmbed(url);
        const title = data && data.title ? String(data.title) : "SoundCloud";
        const thumb = data && data.thumbnail_url ? String(data.thumbnail_url) : null;
        gallery.appendChild(createCard({ url, title, thumb }));
      } catch {
        gallery.appendChild(createCard({ url, title: "SoundCloud", thumb: null }));
      }
    }
  })();
})();

