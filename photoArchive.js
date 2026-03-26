(function () {
  const grid = document.getElementById("photoAlbumGrid");
  if (!grid) return;

  const photos = [
    "DSC01086 copy.JPG",
    "DSC01350 copy.JPG",
    "DSC01358 copy.JPG",
    "DSC06051.JPG",
    "DSC06098.jpg",
    "DSC06558.JPG",
    "DSC06705 2.JPG",
    "DSC06803.JPG",
    "DSC06965.JPG",
    "DSC06970.JPG",
    "DSC07063.JPG",
    "DSC07088.JPG",
    "DSC07150.JPG",
    "DSC07534.JPG",
    "DSC07645.JPEG",
    "DSC09376 2.JPG",
    "IMG_6822 2.JPG",
    "IMG_6859 2.JPG",
    "artists/DSC09343 2.JPG",
    "chill-smoking/DSC06966.JPG",
    "current/DSC07485.JPG",
    "header pic/DSC07140.JPG",
    "house/DSC00673 copy.JPG",
    "photo-arc/DSC01355 copy.JPG"
  ];

  const stylePattern = [
    "tall",
    "wide",
    "square",
    "tall",
    "wide",
    "square",
    "tall",
    "square"
  ];

  for (let i = 0; i < photos.length; i += 1) {
    const path = photos[i];
    const figure = document.createElement("figure");
    const variant = stylePattern[i % stylePattern.length];
    figure.className = `album-item album-${variant}`;
    figure.style.setProperty("--tilt", `${(i % 5 - 2) * 0.6}deg`);

    const img = document.createElement("img");
    img.src = `./photos/${path}`;
    img.alt = `Wasabi archive photo: ${path}`;
    img.loading = "lazy";

    figure.appendChild(img);
    grid.appendChild(figure);
  }
})();
