(function () {
  const img = document.getElementById("posterImg");
  if (!img) return;

  const params = new URLSearchParams(window.location.search);
  const file = params.get("file");

  if (!file) {
    img.alt = "No poster selected";
    return;
  }

  // Poster folder is named "past events" (space in folder name).
  img.src = `./past events/${file}`;
  img.alt = `Past event poster: ${file}`;
})();

