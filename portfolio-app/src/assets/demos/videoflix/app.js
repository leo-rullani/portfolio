"use strict";

const titles = [
  { id: "nyx-47-signalbruch", title: "Nyx-47: Signalbruch", genre: "sci-fi", genreLabel: "Sci-Fi", year: "2026", duration: "1h 48m", age: "12+", match: 97, art: "art-orbital", description: "Eine Crew folgt einem rätselhaften Signal bis an den Rand des kartierten Alls. Dort antwortet etwas, das seit Jahrhunderten gewartet hat." },
  { id: "kairova-grid", title: "Kairova Grid", genre: "thriller", genreLabel: "Thriller", year: "2025", duration: "8 Folgen", age: "16+", match: 94, art: "art-neon", description: "Eine Analystin entdeckt in den Lichtern einer futuristischen Metropole ein verborgenes Muster – und gerät selbst in dessen Zentrum." },
  { id: "pelagia-n6", title: "Pelagia N-6", genre: "documentary", genreLabel: "Dokumentation", year: "2026", duration: "52m", age: "6+", match: 91, art: "art-depth", description: "Eine synthetische Dokumentation über autonome Forschung unter einer kilometerdicken Eisschicht und die Technik hinter der Mission." },
  { id: "luma-echo-03", title: "Luma Echo 03", genre: "sci-fi", genreLabel: "Sci-Fi", year: "2024", duration: "1h 36m", age: "12+", match: 89, art: "art-signal", description: "Alle Geräte einer Insel empfangen zeitgleich dieselbe Botschaft. Niemand weiß, woher sie kommt – nur, wann sie endet." },
  { id: "quorin-vault", title: "Quorin Vault", genre: "thriller", genreLabel: "Thriller", year: "2025", duration: "6 Folgen", age: "16+", match: 87, art: "art-archive", description: "In einem vergessenen Datenarchiv findet ein Restaurator Aufzeichnungen von Ereignissen, die erst morgen stattfinden werden." },
  { id: "viridia-twelve", title: "Viridia Twelve", genre: "documentary", genreLabel: "Dokumentation", year: "2026", duration: "44m", age: "0+", match: 96, art: "art-bloom", description: "Makroaufnahmen, Visualisierungen und ruhiges Storytelling zeigen, wie ein künstliches Ökosystem über sich hinauswächst." },
  { id: "loopline-x9", title: "Loopline X9", genre: "animation", genreLabel: "Animation", year: "2025", duration: "1h 21m", age: "6+", match: 92, art: "art-loop", description: "Eine Fahrradkurierin bemerkt, dass ihre Stadt jeden Abend zurückgesetzt wird – und sucht den einzigen Weg aus der Schleife." },
  { id: "kora-pulse-7", title: "Kora Pulse 7", genre: "animation", genreLabel: "Animation", year: "2024", duration: "9 Folgen", age: "12+", match: 85, art: "art-pulse", description: "Vier junge Erfinder jagen einem Energiesignal nach, das ihre schwebende Heimatstadt zugleich antreibt und bedroht." }
];

const els = {
  grid: document.querySelector("#mediaGrid"),
  search: document.querySelector("#searchInput"),
  filters: [...document.querySelectorAll(".filter")],
  status: document.querySelector("#resultsStatus"),
  empty: document.querySelector("#emptyState"),
  reset: document.querySelector("#resetFilters"),
  watchlistToggle: document.querySelector("#watchlistToggle"),
  watchlistCount: document.querySelector("#watchlistCount"),
  dialog: document.querySelector("#detailDialog"),
  dialogArt: document.querySelector("#dialogArt"),
  dialogTitle: document.querySelector("#dialogTitle"),
  dialogMeta: document.querySelector("#dialogMeta"),
  dialogDescription: document.querySelector("#dialogDescription"),
  dialogWatchlist: document.querySelector("#dialogWatchlist"),
  dialogClose: document.querySelector("#dialogClose"),
  player: document.querySelector("#previewPlayer"),
  playerProgress: document.querySelector("#playerProgress"),
  playerTime: document.querySelector("#playerTime"),
  playPreview: document.querySelector("#playPreview"),
  pausePreview: document.querySelector("#pausePreview"),
  toast: document.querySelector("#toast")
};

let activeGenre = "all";
let watchlistOnly = false;
let activeTitleId = null;
let previewTimer = null;
let previewSeconds = 0;
let toastTimer = null;
let watchlist = loadWatchlist();

function loadWatchlist() {
  try {
    const stored = JSON.parse(localStorage.getItem("videoflix-demo-watchlist") || "[]");
    return new Set(Array.isArray(stored) ? stored.filter(id => titles.some(title => title.id === id)) : []);
  } catch {
    return new Set();
  }
}

function saveWatchlist() {
  try {
    localStorage.setItem("videoflix-demo-watchlist", JSON.stringify([...watchlist]));
  } catch {
    // The demo also works when storage is unavailable.
  }
}

function iconMarkup(isSaved) {
  return isSaved
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
}

function filteredTitles() {
  const query = els.search.value.trim().toLocaleLowerCase("de");
  return titles.filter(title => {
    const genreMatches = activeGenre === "all" || title.genre === activeGenre;
    const searchMatches = title.title.toLocaleLowerCase("de").includes(query) || title.genreLabel.toLocaleLowerCase("de").includes(query);
    const watchlistMatches = !watchlistOnly || watchlist.has(title.id);
    return genreMatches && searchMatches && watchlistMatches;
  });
}

function render() {
  const visibleTitles = filteredTitles();
  els.grid.replaceChildren(...visibleTitles.map(createCard));
  els.empty.hidden = visibleTitles.length > 0;
  els.status.textContent = watchlistOnly
    ? `${visibleTitles.length} ${visibleTitles.length === 1 ? "Titel" : "Titel"} in deiner lokalen Liste`
    : `${visibleTitles.length} von ${titles.length} Titeln`;
  els.watchlistCount.textContent = String(watchlist.size);
  els.watchlistToggle.setAttribute("aria-pressed", String(watchlistOnly));
  document.querySelectorAll("[data-watchlist]").forEach(updateWatchlistButton);
}

function createCard(title) {
  const card = document.createElement("article");
  card.className = "media-card";
  card.innerHTML = `
    <button class="poster ${title.art}" type="button" data-open="${title.id}" aria-label="Details zu ${title.title} öffnen">
      <span class="poster-badge">${title.genreLabel}</span>
      <span class="poster-copy"><strong>${title.title}</strong><small>${title.year} · ${title.duration}</small></span>
    </button>
    <button class="card-watchlist" type="button" data-watchlist="${title.id}" aria-pressed="${watchlist.has(title.id)}" aria-label="${title.title} ${watchlist.has(title.id) ? "aus Liste entfernen" : "zur Liste hinzufügen"}">${iconMarkup(watchlist.has(title.id))}</button>
    <p class="match">${title.match}% Match</p>`;
  return card;
}

function updateWatchlistButton(button) {
  const title = titles.find(item => item.id === button.dataset.watchlist);
  if (!title) return;
  const isSaved = watchlist.has(title.id);
  button.setAttribute("aria-pressed", String(isSaved));
  if (button.classList.contains("card-watchlist")) {
    button.innerHTML = iconMarkup(isSaved);
    button.setAttribute("aria-label", `${title.title} ${isSaved ? "aus Liste entfernen" : "zur Liste hinzufügen"}`);
  } else {
    button.innerHTML = `${iconMarkup(isSaved)} ${isSaved ? "Gemerkt" : "Merken"}`;
  }
}

function toggleWatchlist(id) {
  const title = titles.find(item => item.id === id);
  if (!title) return;
  const wasSaved = watchlist.has(id);
  wasSaved ? watchlist.delete(id) : watchlist.add(id);
  saveWatchlist();
  showToast(wasSaved ? `${title.title} wurde entfernt.` : `${title.title} ist jetzt in deiner Liste.`);
  els.watchlistCount.textContent = String(watchlist.size);
  if (watchlistOnly) {
    render();
  } else {
    document.querySelectorAll("[data-watchlist]").forEach(updateWatchlistButton);
  }
}

function openDetails(id) {
  const title = titles.find(item => item.id === id);
  if (!title) return;
  activeTitleId = id;
  stopPreview();
  els.dialogArt.className = `dialog-art ${title.art}`;
  els.dialogTitle.textContent = title.title;
  els.dialogMeta.innerHTML = `<strong>${title.match}% Match</strong><span>${title.year}</span><span>${title.age}</span><span>${title.duration}</span><span>${title.genreLabel}</span>`;
  els.dialogDescription.textContent = title.description;
  els.dialogWatchlist.dataset.watchlist = id;
  updateWatchlistButton(els.dialogWatchlist);
  els.dialog.showModal();
}

function startPreview() {
  previewSeconds = 0;
  els.player.hidden = false;
  els.pausePreview.textContent = "Ⅱ";
  els.pausePreview.setAttribute("aria-label", "Wiedergabe pausieren");
  clearInterval(previewTimer);
  previewTimer = setInterval(() => {
    previewSeconds = (previewSeconds + 1) % 31;
    els.playerProgress.style.width = `${(previewSeconds / 30) * 100}%`;
    els.playerTime.textContent = `00:${String(previewSeconds).padStart(2, "0")}`;
  }, 1000);
}

function stopPreview() {
  clearInterval(previewTimer);
  previewTimer = null;
  previewSeconds = 0;
  els.player.hidden = true;
  els.playerProgress.style.width = "0%";
  els.playerTime.textContent = "00:00";
}

function togglePreviewPause() {
  if (previewTimer) {
    clearInterval(previewTimer);
    previewTimer = null;
    els.pausePreview.textContent = "▶";
    els.pausePreview.setAttribute("aria-label", "Wiedergabe fortsetzen");
  } else {
    startPreviewFromCurrent();
  }
}

function startPreviewFromCurrent() {
  els.pausePreview.textContent = "Ⅱ";
  els.pausePreview.setAttribute("aria-label", "Wiedergabe pausieren");
  previewTimer = setInterval(() => {
    previewSeconds = (previewSeconds + 1) % 31;
    els.playerProgress.style.width = `${(previewSeconds / 30) * 100}%`;
    els.playerTime.textContent = `00:${String(previewSeconds).padStart(2, "0")}`;
  }, 1000);
}

function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 2600);
}

document.addEventListener("click", event => {
  const openButton = event.target.closest("[data-open]");
  if (openButton) {
    openDetails(openButton.dataset.open);
    return;
  }

  const watchlistButton = event.target.closest("[data-watchlist]");
  if (watchlistButton) toggleWatchlist(watchlistButton.dataset.watchlist);
});

els.filters.forEach(button => button.addEventListener("click", () => {
  activeGenre = button.dataset.filter;
  els.filters.forEach(filter => {
    const isActive = filter === button;
    filter.classList.toggle("active", isActive);
    filter.setAttribute("aria-pressed", String(isActive));
  });
  render();
}));

els.search.addEventListener("input", render);
els.watchlistToggle.addEventListener("click", () => {
  watchlistOnly = !watchlistOnly;
  render();
  document.querySelector("#catalogue").scrollIntoView({ behavior: "smooth", block: "start" });
});
els.reset.addEventListener("click", () => {
  activeGenre = "all";
  watchlistOnly = false;
  els.search.value = "";
  els.filters.forEach(filter => {
    const isActive = filter.dataset.filter === "all";
    filter.classList.toggle("active", isActive);
    filter.setAttribute("aria-pressed", String(isActive));
  });
  render();
  els.search.focus();
});
els.dialogClose.addEventListener("click", () => els.dialog.close());
els.dialog.addEventListener("click", event => {
  const bounds = els.dialog.getBoundingClientRect();
  const isBackdrop = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (isBackdrop) els.dialog.close();
});
els.dialog.addEventListener("close", () => {
  activeTitleId = null;
  stopPreview();
});
els.playPreview.addEventListener("click", startPreview);
els.pausePreview.addEventListener("click", togglePreviewPause);

render();
