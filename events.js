// Events + ticket modal (calendar page).
(function () {
  const data = window.wasabiHouse;
  if (!data || !Array.isArray(data.events)) return;

  const events = data.events;
  const ticketRequestEmail = data.ticketRequestEmail || "";

  const els = {
    prevMonth: document.getElementById("prevMonth"),
    nextMonth: document.getElementById("nextMonth"),
    calendarTitle: document.getElementById("calendarTitle"),
    calendarGrid: document.getElementById("calendarGrid"),

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

  if (!els.calendarGrid || !els.prevMonth || !els.nextMonth || !els.eventModal) return;

  const state = {
    viewYear: 0,
    viewMonthIndex: 0,
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

  function setModalVisible(visible) {
    if (!els.modalOverlay || !els.eventModal) return;
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
    els.totalValue.textContent = formatMoney(tier.price * qty);
  }

  function setQty(next) {
    const n = Math.max(1, Math.floor(Number(next || 1)));
    state.qty = n;
    els.ticketQty.value = String(n);
    updateTotal();
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
        [...els.tierList.querySelectorAll(".tier-btn")].forEach((x) => x.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        updateTotal();
      });

      els.tierList.appendChild(btn);
    }
  }

  function renderEventChooser(eventsOnDay) {
    if (els.modalChooserBlock) {
      els.modalChooserBlock.hidden = eventsOnDay.length <= 1;
    }
    els.eventChooser.innerHTML = "";

    if (eventsOnDay.length <= 1) return;

    for (const ev of eventsOnDay) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "chooser-btn";
      btn.setAttribute("aria-pressed", String(ev.id === state.selectedEventId));
      btn.innerHTML = `
        <div style="font-weight:950">${ev.title}</div>
        <div class="muted" style="margin-top:6px;font-weight:700">Doors ${ev.doors}</div>
      `;
      btn.addEventListener("click", () => setSelectedEvent(ev));
      els.eventChooser.appendChild(btn);
    }
  }

  function setSelectedEvent(event) {
    state.selectedEventId = event.id;
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

    const eventsOnDay = events.filter((x) => x.date === e.date);
    renderEventChooser(eventsOnDay);

    renderTierList(e);
    updateTotal();
  }

  function openModalForDay(isoDate) {
    const eventsOnDay = events.filter((e) => e.date === isoDate);
    if (eventsOnDay.length === 0) return;
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
        const minPrice = Math.min(...dayEvents.flatMap((x) => x.ticketTiers.map((t) => t.price || 0)));
        const maxChips = Math.min(3, dayEvents.length);

        for (let i = 0; i < maxChips; i++) {
          const ev = dayEvents[i];
          const chip = document.createElement("button");
          chip.type = "button";
          chip.className = "chip-day";

          const statusClass = dotClassForStatus(ev.status);
          const titleShort = ev.title.split(" (")[0].slice(0, 22);
          chip.innerHTML =
            '<span class="dot ' +
            statusClass +
            '"></span>' +
            titleShort +
            " • from " +
            formatMoney(minPrice);

          chip.addEventListener("click", () => openModalForDay(iso));
          chipsWrap.appendChild(chip);
        }

        if (dayEvents.length > 3) {
          const extra = document.createElement("div");
          extra.className = "muted";
          extra.style.fontWeight = "800";
          extra.style.marginTop = "6px";
          extra.textContent = `+${dayEvents.length - 3} more`;
          chipsWrap.appendChild(extra);
        }

        cellEl.style.cursor = "pointer";
        cellEl.addEventListener("click", (ev) => {
          if (ev.target && ev.target.closest && ev.target.closest(".chip-day")) return;
          openModalForDay(iso);
        });
      }

      els.calendarGrid.appendChild(cellEl);
    }
  }

  function setupHandlers() {
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
        "Hi Wasabi House team,",
        "",
        `I want tickets for: ${e.title}`,
        `Date: ${formatPrettyDate(e.date)}`,
        `Doors: ${e.doors}`,
        `Location: ${e.location}`,
        "",
        `Ticket tier: ${tier.label}`,
        `Quantity: ${qty}`,
        `Total: ${formatMoney(total)}`,
        "",
        "Notes:",
        "- (your name / contact info here)",
        ""
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
        "Wasabi House ticket request",
        `Event: ${e.title}`,
        `Date: ${formatPrettyDate(e.date)}`,
        `Tier: ${tier.label}`,
        `Qty: ${qty}`,
        `Total: ${formatMoney(total)}`
      ].join("\n");

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
          els.copyOrderBtn.textContent = "Copied!";
          setTimeout(() => (els.copyOrderBtn.textContent = "Copy order summary"), 1200);
        } else {
          // Fallback: best-effort
          els.copyOrderBtn.textContent = "Copy not supported";
          setTimeout(() => (els.copyOrderBtn.textContent = "Copy order summary"), 1200);
        }
      } catch {
        els.copyOrderBtn.textContent = "Copy failed";
        setTimeout(() => (els.copyOrderBtn.textContent = "Copy order summary"), 1200);
      }
    });
  }

  function init() {
    setupHandlers();
    const now = new Date();
    state.viewYear = now.getFullYear();
    state.viewMonthIndex = now.getMonth();
    renderCalendar();
  }

  init();
})();

