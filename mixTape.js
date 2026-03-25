// Mix tape gallery (YouTube thumbnails, horizontal scroll).
(function () {
  const gallery = document.getElementById("mixTapeGallery");
  if (!gallery) return;

  const urls = [
    "https://www.youtube.com/watch?v=UiAyK982Hqw&list=RDUiAyK982Hqw&start_radio=1",
    "https://www.youtube.com/watch?v=hsRT1JtINc8&list=RDUiAyK982Hqw&index=2",
    "https://www.youtube.com/watch?v=9q6eOryR4HE&list=RDUiAyK982Hqw&index=9",
    "https://www.youtube.com/watch?v=YeuLlX8ZyI8&list=RDUiAyK982Hqw&index=15",
    "https://www.youtube.com/watch?v=TfphXgNZjLA&t=3557s",
    "https://www.youtube.com/watch?v=L1zLH81gnWI",
    "https://www.youtube.com/watch?v=rJON8YtOonU&t=59s",
    "https://www.youtube.com/watch?v=0Xw6j1sGP5s&t=3415s"
  ];

  function getVideoId(url) {
    try {
      const u = new URL(url);
      return u.searchParams.get("v");
    } catch {
      return null;
    }
  }

  async function fetchOEmbedTitle(url) {
    const endpoint = `https://www.youtube.com/oembed?format=json&url=${encodeURIComponent(url)}`;
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error("oEmbed failed");
    const json = await res.json();
    return json && json.title ? String(json.title) : "YouTube";
  }

  function createCard({ url, id, title }) {
    const a = document.createElement("a");
    a.className = "media-card";
    a.href = url;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.setAttribute("aria-label", title ? `Open on YouTube: ${title}` : "Open on YouTube");

    const img = document.createElement("img");
    img.src = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    img.alt = title || "YouTube thumbnail";
    img.loading = "lazy";

    const titleEl = document.createElement("div");
    titleEl.className = "media-title";
    const span = document.createElement("span");
    span.textContent = title || "YouTube";
    titleEl.appendChild(span);

    a.appendChild(img);
    a.appendChild(titleEl);
    return a;
  }

  (async () => {
    for (const url of urls) {
      const id = getVideoId(url);
      if (!id) continue;
      try {
        const title = await fetchOEmbedTitle(url);
        gallery.appendChild(createCard({ url, id, title }));
      } catch {
        gallery.appendChild(createCard({ url, id, title: "YouTube" }));
      }
    }
  })();
})();

