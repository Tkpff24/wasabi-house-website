// Past event poster gallery (horizontal, scrollable).
(function () {
  const gallery = document.getElementById("pastPosterGallery");
  if (!gallery) return;

  const posters = [
    "ambient night 3 copy.png",
    "asdfaerqewzxcvsd copy.png",
    "bnmvhbvmnb copy.png",
    "hgfgmhf copy.png",
    "khggfkjhgkjhgkj copy.png",
    "sjalhksjdfh copy.png",
    "tyrytruytryutr copy.png"
  ];

  for (const file of posters) {
    const a = document.createElement("a");
    a.className = "poster-card";
    a.href = `./poster.html?file=${encodeURIComponent(file)}`;
    a.setAttribute("aria-label", `Open poster: ${file}`);

    const img = document.createElement("img");
    img.src = `./past events/${file}`;
    img.alt = `Past event poster: ${file}`;
    img.loading = "lazy";

    a.appendChild(img);
    gallery.appendChild(a);
  }
})();

