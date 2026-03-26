(function () {
  const img = document.getElementById("posterImg");
  const titleEl = document.getElementById("posterTitle");
  const taglineEl = document.getElementById("posterTagline");
  const dateEl = document.getElementById("posterDate");
  const openEl = document.getElementById("posterOpen");
  const doorEl = document.getElementById("posterDoor");
  const locationEl = document.getElementById("posterLocation");
  const musicEl = document.getElementById("posterMusic");
  const liveEl = document.getElementById("posterLive");
  const visualEl = document.getElementById("posterVisual");
  const exhibitionEl = document.getElementById("posterExhibition");
  const tattooEl = document.getElementById("posterTattoo");
  const workshopEl = document.getElementById("posterWorkshop");
  if (!img) return;

  const params = new URLSearchParams(window.location.search);
  const file = params.get("file");

  const detailsByFile = {
    "ambient night 3 copy.png": {
      title: "Ambient Night 3",
      tagline: "Alive, softly in the dark. To listen to the light.",
      date: "23rd August",
      open: "8pm",
      door: "200 THB (100 THB per person for groups of 3+)",
      location: "Wasabi House",
      music: "DJ-ORK, Mordah, Waay, Muksmok, Grey",
      live: "-",
      visual: "Mojack",
      exhibition: "Amy",
      tattoo: "-",
      workshop: "-"
    },
    "asdfaerqewzxcvsd copy.png": {
      title: "DROM",
      tagline: "Auditory Journey & Exhibition at Wasabi House",
      date: "17th September",
      open: "8pm",
      door: "200 THB",
      location: "Wasabi House",
      music: "Madman, elila.b, BUGSY BAE, Radpittt, Grey",
      live: "-",
      visual: "Pistolpraw",
      exhibition: "Pop up by Mybling Toothgem",
      tattoo: "Yana / The taste of INK",
      workshop: "-"
    },
    "bnmvhbvmnb copy.png": {
      title: "RED STARS",
      tagline: "master bogus Live",
      date: "3rd September",
      open: "8pm",
      door: "-",
      location: "Wasabi House",
      music: "Madman, Radpittt, Tsedel, Direrattt, Grey",
      live: "master bogus",
      visual: "-",
      exhibition: "-",
      tattoo: "-",
      workshop: "-"
    },
    "hgfgmhf copy.png": {
      title: "DRUM and BASS",
      tagline: "DJ Hobbes / Rav D",
      date: "9th April",
      open: "7pm",
      door: "100 THB",
      location: "Wasabi House",
      music: "Hobbes, Rav D",
      live: "-",
      visual: "-",
      exhibition: "-",
      tattoo: "-",
      workshop: "-"
    },
    "khggfkjhgkjhgkj copy.png": {
      title: "Ambient Night 2",
      tagline: "Let sound do what thoughts can't.",
      date: "18th July",
      open: "8pm",
      door: "300 THB (200 THB per person for groups of 3+)",
      location: "Wasabi House",
      music: "Em-J, Mjma, Mojack, Hallboy, Tripaipi",
      live: "Pradit Saengkrai, Vivienne Chakra, My Lucky Angel",
      visual: "Pistolpraw, Uglybarreleye",
      exhibition: "-",
      tattoo: "-",
      workshop: "Maxine, Pearl's eye"
    },
    "sjalhksjdfh copy.png": {
      title: "SYSTM",
      tagline: "Club night at Wasabi House",
      date: "10th September",
      open: "8pm",
      door: "-",
      location: "Wasabi House",
      music: "Serapha, Og killa, Raiqasvl, Grey",
      live: "Sen",
      visual: "Mojack",
      exhibition: "-",
      tattoo: "Amy",
      workshop: "-"
    },
    "tyrytruytryutr copy.png": {
      title: "From Myanmar with Love",
      tagline: "Joshua Photo Exhibition",
      date: "4th AUG",
      open: "8pm",
      door: "-",
      location: "Wasabi House",
      music: "Radpittt, Grey",
      live: "-",
      visual: "-",
      exhibition: "Joshua Photo Exhibition",
      tattoo: "-",
      workshop: "-"
    }
  };

  if (!file) {
    img.alt = "No poster selected";
    if (titleEl) titleEl.textContent = "No poster selected";
    return;
  }

  // Poster folder is named "past events" (space in folder name).
  img.src = `./past events/${file}`;
  img.alt = `Past event poster: ${file}`;

  const details = detailsByFile[file];
  if (!details) {
    return;
  }

  if (titleEl) titleEl.textContent = details.title;
  if (taglineEl) taglineEl.textContent = details.tagline;
  if (dateEl) dateEl.textContent = details.date;
  if (openEl) openEl.textContent = details.open;
  const resolvedDoor = !details.door || details.door.trim() === "-" ? "Free entry" : details.door;
  if (doorEl) doorEl.textContent = resolvedDoor;
  if (locationEl) locationEl.textContent = details.location;
  if (musicEl) musicEl.textContent = details.music;
  if (liveEl) liveEl.textContent = details.live;
  if (visualEl) visualEl.textContent = details.visual;
  if (exhibitionEl) exhibitionEl.textContent = details.exhibition;
  if (tattooEl) tattooEl.textContent = details.tattoo;
  if (workshopEl) workshopEl.textContent = details.workshop;
})();

