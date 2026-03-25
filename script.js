/* Wasabi House starter site.
   Edit `events`, `links`, and `ticketRequestEmail` to match your real info. */

const links = {
  youtube: "https://www.youtube.com/",
  soundcloud: "https://soundcloud.com/"
};

const ticketRequestEmail = "tickets@wasabihouse.com";

// Entrance gate (Y2K style). The site is hidden until the user clicks Enter.
const gateStorageKey = "wasabi_house_entered_v1";
const gateScreen = document.getElementById("gateScreen");
const siteContent = document.getElementById("siteContent");
const enterBtn = document.getElementById("enterBtn");

function revealSite() {
  if (!gateScreen || !siteContent) return;
  gateScreen.hidden = true;
  siteContent.hidden = false;
  document.body.style.overflow = "";
  try {
    localStorage.setItem(gateStorageKey, "1");
  } catch {
    // Ignore storage issues (private mode, etc.)
  }
}

if (enterBtn) {
  enterBtn.addEventListener("click", revealSite);
}

// On refresh, keep the entered experience.
let alreadyEntered = false;
try {
  alreadyEntered = localStorage.getItem(gateStorageKey) === "1";
} catch {
  alreadyEntered = false;
}

if (alreadyEntered) {
  revealSite();
} else if (gateScreen) {
  // Prevent accidental scrolling on the gate screen.
  document.body.style.overflow = "hidden";
}

// Sample events. Update dates/titles/ticket prices/links here.
const events = [
  {
    id: "2026-03-28-neon-ramen",
    date: "2026-03-28",
    title: "Neon Ramen (Bass Night)",
    doors: "21:00",
    location: "Wasabi House — back room",
    tags: ["Bass", "Techno", "Ramen vibes"],
    status: "Limited",
    description:
      "Fast kicks. Hot sauce synths. Bring friends who like it loud.\nLine-up coming soon.",
    youtube: "https://www.youtube.com/",
    soundcloud: "https://soundcloud.com/",
    ticketTiers: [
      { key: "ga", label: "GA", price: 25, note: "Standard entry" },
      { key: "vip", label: "VIP", price: 45, note: "Priority entry + better view (limited)" }
    ]
  },
  {
    id: "2026-04-05-miso-attack",
    date: "2026-04-05",
    title: "Miso Attack (Live Sets)",
    doors: "21:30",
    location: "Wasabi House — main floor",
    tags: ["Live", "Breaks", "Synth heat"],
    status: "Limited",
    description:
      "Live sets all night long. Expect breaks, stutters, and cinematic bass.\nLimited VIP available.",
    youtube: "https://www.youtube.com/",
    soundcloud: "https://soundcloud.com/",
    ticketTiers: [
      { key: "ga", label: "GA", price: 28, note: "Entry when doors open" },
      { key: "vip", label: "VIP", price: 55, note: "Priority entry + merch bundle (limited)" }
    ]
  },
  {
    id: "2026-04-19-heatwave",
    date: "2026-04-19",
    title: "Heatwave (Late Closing)",
    doors: "22:00",
    location: "Wasabi House — back room",
    tags: ["House", "Groove", "Late session"],
    status: "Soon",
    description:
      "Long warm-up, then the drop hits. Stay for the final set.",
    youtube: "https://www.youtube.com/",
    soundcloud: "https://soundcloud.com/",
    ticketTiers: [
      { key: "ga", label: "GA", price: 30, note: "Standard entry" },
      { key: "vip", label: "VIP", price: 48, note: "Priority entry (limited)" }
    ]
  },
  {
    id: "2026-05-03-wasabi-waltz",
    date: "2026-05-03",
    title: "Wasabi Waltz (Deep + Dark)",
    doors: "21:00",
    location: "Wasabi House — main floor",
    tags: ["Deep", "Dark", "Minimal groove"],
    status: "Limited",
    description:
      "A slow burn into deep resonance. Minimal groove with pressure.",
    youtube: "https://www.youtube.com/",
    soundcloud: "https://soundcloud.com/",
    ticketTiers: [
      { key: "ga", label: "GA", price: 27, note: "Standard entry" },
      { key: "vip", label: "VIP", price: 52, note: "Priority entry + lounge access (limited)" }
    ]
  },
  {
    id: "2026-05-17-salt-spark",
    date: "2026-05-17",
    title: "Salt Spark (DJ Showcase)",
    doors: "21:15",
    location: "Wasabi House — special set",
    tags: ["Showcase", "UKG", "Energy"],
    status: "Limited",
    description:
      "A rotating showcase. Fast transitions and big energy.",
    youtube: "https://www.youtube.com/",
    soundcloud: "https://soundcloud.com/",
    ticketTiers: [
      { key: "ga", label: "GA", price: 26, note: "Entry when doors open" },
      { key: "vip", label: "VIP", price: 49, note: "Priority entry (limited)" }
    ]
  }
];

const featuredTags = ["Techno", "Bass", "House", "Live", "Breaks", "Late"];

const els = {
  prevMonth: document.getElementById("prevMonth"),
  nextMonth: document.getElementById("nextMonth"),
  calendarTitle: document.getElementById("calendarTitle"),
  calendarGrid: document.getElementById("calendarGrid"),

  spotlightEvent: document.getElementById("spotlightEvent"),
  spotlightMeta: document.getElementById("spotlightMeta"),

  youtubeLink: document.getElementById("youtubeLink"),
  soundcloudLink: document.getElementById("soundcloudLink"),
  featuredTags: document.getElementById("featuredTags"),

  // Modal
  modalOverlay: document.getElementById("modalOverlay"),
  eventModal: document.getElementById("eventModal"),
  modalClose: document.getElementById("modalClose"),

  modalTitle: document.getElementById("modalTitle"),
  modalSubtitle: document.getElementById("modalSubtitle"),
  modalDescription: document.getElementById("modalDescription"),
  modalDoors: document.getElementById("modalDoors"),
  modalLocation: document.getElementById("modalLocation"),
  modalTags: document.getElementById("modalTags"),
  modalChooserBlock: document.getElementById("modalChooserBlock"),
  eventChooser: document.getElementById("eventChooser"),
  tierList: document.getElementById("tierList"),
  ticketQty: document.getElementById("ticketQty"),
  qtyMinus: document.getElementById("qtyMinus"),
  qtyPlus: document.getElementById("qtyPlus"),
  totalValue: document.getElementById("totalValue"),
  getTicketsBtn: document.getElementById("getTicketsBtn"),
  copyOrderBtn: document.getElementById("copyOrderBtn")
};

let state = {
  viewYear: 0,
  viewMonthIndex: 0,
  selectedDayISO: null,
  selectedEventId: null,
  selectedTierKey: null,
  qty: 1
};

function toISODate(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function parseISODate(iso) {
  // Force midnight to avoid timezone shifts.
  return new Date(`${iso}T00:00:00`);
}

function formatMonthYear(year, monthIndex) {
  const dt = new Date(year, monthIndex, 1);
  return dt.toLocaleDateString(undefined, { month: "long", year: "numeric" });
}

function formatPrettyDate(iso) {
  const dt = parseISODate(iso);
  return dt.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

function formatMoney(n) {
  return `$${Number(n).toFixed(0)}`;
}

function getEventsByDate() {
  const map = new Map();
  for (const e of events) {
    if (!map.has(e.date)) map.set(e.date, []);
    map.get(e.date).push(e);
  }
  // Keep deterministic order
  for (const [k, arr] of map.entries()) {
    arr.sort((a, b) => a.title.localeCompare(b.title));
    map.set(k, arr);
  }
  return map;
}

function dotClassForStatus(status) {
  if (status === "Limited") return "dot-hot";
  if (status === "Soon") return "dot-soon";
  if (status === "SoldOut") return "dot-full";
  return "dot-hot";
}

function chooseNextUpcomingEvent() {
  const now = new Date();
  const nowISO = toISODate(now);
  // Compare by date string works for ISO yyyy-mm-dd.
  const upcoming = events
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((e) => e.date >= nowISO);
  return upcoming[0] || null;
}

function renderSpotlight() {
  const next = chooseNextUpcomingEvent();
  if (!next) {
    els.spotlightEvent.textContent = "No events scheduled (yet)";
    els.spotlightMeta.textContent = "Add events in `script.js` to populate the calendar.";
    return;
  }
  els.spotlightEvent.textContent = next.title;
  els.spotlightMeta.textContent = `${formatPrettyDate(next.date)} • Doors ${next.doors}`;
}

function renderFeaturedTags() {
  els.featuredTags.innerHTML = "";
  for (const t of featuredTags) {
    const span = document.createElement("span");
    span.className = "tag";
    span.textContent = t;
    els.featuredTags.appendChild(span);
  }
}

function renderMusicLinks() {
  els.youtubeLink.href = links.youtube;
  els.soundcloudLink.href = links.soundcloud;
}

function setModalVisible(visible) {
  if (visible) {
    els.modalOverlay.hidden = false;
    els.eventModal.hidden = false;
    els.modalOverlay.setAttribute("aria-hidden", "false");
  } else {
    els.modalOverlay.hidden = true;
    els.eventModal.hidden = true;
    els.modalOverlay.setAttribute("aria-hidden", "true");
  }
}

function closeModal() {
  setModalVisible(false);
}

function currentEvent() {
  return events.find((e) => e.id === state.selectedEventId) || null;
}

function setSelectedEvent(event) {
  state.selectedEventId = event.id;
  state.selectedDayISO = event.date;

  // Pick the first tier by default.
  state.selectedTierKey = event.ticketTiers[0]?.key || null;
  state.qty = 1;
  els.ticketQty.value = "1";

  renderModalEvent();
}

function renderModalEvent() {
  const e = currentEvent();
  if (!e) return;

  els.modalTitle.textContent = e.title;
  els.modalSubtitle.textContent = formatPrettyDate(e.date);
  els.modalDescription.textContent = e.description;

  els.modalDoors.textContent = `Doors: ${e.doors}`;
  els.modalLocation.textContent = e.location;

  els.modalTags.innerHTML = "";
  for (const t of e.tags) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = t;
    els.modalTags.appendChild(tag);
  }

  // Chooser is only needed if multiple events share the same day.
  const eventsOnDay = events.filter((x) => x.date === e.date);
  renderEventChooser(eventsOnDay);

  renderTierList(e);

  updateTotal();
}

function renderEventChooser(eventsOnDay) {
  els.eventChooser.innerHTML = "";
  const count = eventsOnDay.length;

  if (count <= 1) {
    if (els.modalChooserBlock) els.modalChooserBlock.hidden = true;
    els.eventChooser.innerHTML = "";
    return;
  }

  if (els.modalChooserBlock) els.modalChooserBlock.hidden = false;

  for (const ev of eventsOnDay) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chooser-btn";
    btn.setAttribute("aria-pressed", String(ev.id === state.selectedEventId));
    const minPrice = Math.min(...ev.ticketTiers.map((t) => t.price || 0));
    btn.innerHTML = `
      <div style="font-weight:950">${ev.title}</div>
      <div class="muted" style="margin-top:6px;font-weight:700">
        ${formatPrettyDate(ev.date)} • Doors ${ev.doors}
      </div>
      <div class="muted" style="margin-top:8px;font-weight:800">
        From ${formatMoney(minPrice)}
      </div>
    `;
    btn.addEventListener("click", () => setSelectedEvent(ev));
    els.eventChooser.appendChild(btn);
  }
}

function renderTierList(event) {
  els.tierList.innerHTML = "";

  for (const tier of event.ticketTiers) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tier-btn";
    btn.setAttribute("aria-pressed", String(tier.key === state.selectedTierKey));
    btn.innerHTML = `
      <div class="tier-main">
        <div style="font-weight:950">${tier.label}</div>
        <div class="muted" style="margin-top:6px;font-weight:700">${tier.note || ""}</div>
      </div>
      <div class="tier-price">${formatMoney(tier.price)}</div>
    `;

    btn.addEventListener("click", () => {
      state.selectedTierKey = tier.key;
      // Update selected tier visuals
      [...els.tierList.querySelectorAll(".tier-btn")].forEach((x) => x.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      updateTotal();
    });

    els.tierList.appendChild(btn);
  }
}

function selectedTier() {
  const e = currentEvent();
  if (!e) return null;
  return e.ticketTiers.find((t) => t.key === state.selectedTierKey) || null;
}

function updateTotal() {
  const tier = selectedTier();
  if (!tier) {
    els.totalValue.textContent = "$—";
    return;
  }
  const qty = Math.max(1, Number(state.qty || 1));
  const total = tier.price * qty;
  els.totalValue.textContent = formatMoney(total);
}

function setQty(next) {
  const n = Math.max(1, Math.floor(Number(next || 1)));
  state.qty = n;
  els.ticketQty.value = String(n);
  updateTotal();
}

function openModalForDay(isoDate) {
  const eventsOnDay = events.filter((e) => e.date === isoDate);
  if (eventsOnDay.length === 0) return;
  state.selectedDayISO = isoDate;
  setSelectedEvent(eventsOnDay[0]);
  setModalVisible(true);
}

function renderCalendar() {
  const eventsByDate = getEventsByDate();

  const year = state.viewYear;
  const monthIndex = state.viewMonthIndex;
  els.calendarTitle.textContent = formatMonthYear(year, monthIndex);

  const first = new Date(year, monthIndex, 1);
  const firstWeekday = first.getDay(); // 0=Sun
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

  // 6 weeks grid to keep height stable.
  const totalCells = 42;
  els.calendarGrid.innerHTML = "";

  for (let cell = 0; cell < totalCells; cell++) {
    const dayNum = cell - firstWeekday + 1;
    const cellEl = document.createElement("div");
    cellEl.className = "day-cell";

    if (dayNum < 1 || dayNum > daysInMonth) {
      cellEl.classList.add("is-out");
      cellEl.innerHTML = `<div class="day-number" style="opacity:0.35">&nbsp;</div>`;
      els.calendarGrid.appendChild(cellEl);
      continue;
    }

    const d = new Date(year, monthIndex, dayNum);
    const iso = toISODate(d);
    const dayEvents = eventsByDate.get(iso) || [];

    cellEl.innerHTML = `
      <div class="day-number">${dayNum}</div>
      <div class="event-chips" aria-label="Events on ${iso}"></div>
    `;

    const chipsWrap = cellEl.querySelector(".event-chips");

    if (dayEvents.length > 0) {
      // Mark the day using the first event's status for the legend.
      const firstEvent = dayEvents[0];
      const minPrice = Math.min(...dayEvents.flatMap((e) => e.ticketTiers.map((t) => t.price || 0)));
      const maxChips = Math.min(3, dayEvents.length);
      for (let i = 0; i < maxChips; i++) {
        const ev = dayEvents[i];
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "chip-day";
        const statusClass = dotClassForStatus(ev.status);
        chip.innerHTML =
          '<span class="dot ' +
          statusClass +
          '"></span>' +
          ev.title.split(" (")[0].slice(0, 22) +
          ' • from ' +
          formatMoney(minPrice);
        chip.addEventListener("click", () => openModalForDay(iso));
        chipsWrap.appendChild(chip);
      }

      // If more than 3 events, show "+N more" chip.
      if (dayEvents.length > 3) {
        const extra = document.createElement("div");
        extra.className = "muted";
        extra.style.fontWeight = "800";
        extra.style.marginTop = "6px";
        extra.textContent = `+${dayEvents.length - 3} more`;
        chipsWrap.appendChild(extra);
      }

      // Also allow clicking the date cell background.
      cellEl.style.cursor = "pointer";
      cellEl.addEventListener("click", (ev) => {
        // Avoid triggering when user clicks inside a chip button (already opens modal).
        if (ev.target && ev.target.closest && ev.target.closest(".chip-day")) return;
        openModalForDay(iso);
      });
    }

    els.calendarGrid.appendChild(cellEl);
  }
}

function ensureModalEventChooserHiddenWhenSingle() {
  // Placeholder (chooser rendering handles it).
}

function setupModalHandlers() {
  els.modalClose.addEventListener("click", closeModal);
  els.modalOverlay.addEventListener("click", closeModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  els.qtyMinus.addEventListener("click", () => setQty(state.qty - 1));
  els.qtyPlus.addEventListener("click", () => setQty(state.qty + 1));
  els.ticketQty.addEventListener("change", () => setQty(els.ticketQty.value));

  els.getTicketsBtn.addEventListener("click", () => {
    const e = currentEvent();
    const tier = selectedTier();
    if (!e || !tier) return;

    const qty = Math.max(1, Number(state.qty || 1));
    const total = tier.price * qty;

    const subject = `Wasabi House tickets — ${e.title} (${tier.label})`;
    const bodyLines = [
      `Hi Wasabi House team,`,
      ``,
      `I want tickets for: ${e.title}`,
      `Date: ${formatPrettyDate(e.date)}`,
      `Doors: ${e.doors}`,
      `Location: ${e.location}`,
      ``,
      `Ticket tier: ${tier.label}`,
      `Quantity: ${qty}`,
      `Total: ${formatMoney(total)}`,
      ``,
      `Notes:`,
      `- (your name / contact info here)`,
      ``
    ];
    const body = bodyLines.join("\n");

    const mailto = `mailto:${ticketRequestEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });

  els.copyOrderBtn.addEventListener("click", async () => {
    const e = currentEvent();
    const tier = selectedTier();
    if (!e || !tier) return;

    const qty = Math.max(1, Number(state.qty || 1));
    const total = tier.price * qty;
    const text = [
      `Wasabi House ticket request`,
      `Event: ${e.title}`,
      `Date: ${formatPrettyDate(e.date)}`,
      `Tier: ${tier.label}`,
      `Qty: ${qty}`,
      `Total: ${formatMoney(total)}`
    ].join("\n");

    try {
      await navigator.clipboard.writeText(text);
      els.copyOrderBtn.textContent = "Copied!";
      setTimeout(() => (els.copyOrderBtn.textContent = "Copy order summary"), 1200);
    } catch {
      els.copyOrderBtn.textContent = "Copy failed";
      setTimeout(() => (els.copyOrderBtn.textContent = "Copy order summary"), 1200);
    }
  });
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const drawer = document.getElementById("navMenu");
  if (!toggle || !drawer) return;

  toggle.addEventListener("click", () => {
    const isHidden = drawer.hasAttribute("hidden");
    drawer.toggleAttribute("hidden");
    toggle.setAttribute("aria-expanded", String(isHidden));
  });

  drawer.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    drawer.setAttribute("hidden", "");
    toggle.setAttribute("aria-expanded", "false");
  });
}

function init() {
  renderMusicLinks();
  renderFeaturedTags();
  renderSpotlight();
  setupModalHandlers();
  setupNav();

  const now = new Date();
  state.viewYear = now.getFullYear();
  state.viewMonthIndex = now.getMonth();

  els.prevMonth.addEventListener("click", () => {
    state.viewMonthIndex -= 1;
    if (state.viewMonthIndex < 0) {
      state.viewMonthIndex = 11;
      state.viewYear -= 1;
    }
    renderCalendar();
  });

  els.nextMonth.addEventListener("click", () => {
    state.viewMonthIndex += 1;
    if (state.viewMonthIndex > 11) {
      state.viewMonthIndex = 0;
      state.viewYear += 1;
    }
    renderCalendar();
  });

  renderCalendar();
}

init();

