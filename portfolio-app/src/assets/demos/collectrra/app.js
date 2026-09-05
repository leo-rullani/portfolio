"use strict";

const STORAGE_KEY = "collectrra-demo-favorites-v1";

const pieces = [
  {
    id: "echo-45",
    title: "Echo 45",
    maker: "Northline Audio",
    category: "Music",
    year: "1978",
    summary: "A translucent single with a warm, imperfect pulse.",
    story:
      "Found in a fictional neighborhood record shop, Echo 45 became the soundtrack to late-night sketching sessions. Its soft crackle is part of the charm—not something to edit away.",
    tone: "#b5ec35",
    accent: "#10130b",
    shape: "50%",
    rotation: "-8deg",
    symbol: "◉",
  },
  {
    id: "fold-camera",
    title: "Fold No. 3",
    maker: "Horizon Optics",
    category: "Tech",
    year: "1986",
    summary: "Compact analog mechanics in an unexpectedly bold shell.",
    story:
      "This invented pocket camera represents the joy of deliberate photography: twelve frames, no preview and enough friction to make every composition feel considered.",
    tone: "#d5a9ff",
    accent: "#17101c",
    shape: "18%",
    rotation: "5deg",
    symbol: "▣",
  },
  {
    id: "grid-study",
    title: "Grid Study 08",
    maker: "Atelier Forma",
    category: "Print",
    year: "2021",
    summary: "A numbered poster exploring rhythm, scale and negative space.",
    story:
      "A fictional limited-edition print built around a strict modular grid. It is a reminder that the most expressive layouts often begin with a small set of clear constraints.",
    tone: "#ff765c",
    accent: "#1f0d09",
    shape: "3% 50% 3% 50%",
    rotation: "11deg",
    symbol: "▦",
  },
  {
    id: "orbit-keys",
    title: "Orbit 75",
    maker: "Keyfield Lab",
    category: "Tech",
    year: "2024",
    summary: "A tactile keyboard concept tuned for focused work.",
    story:
      "Orbit 75 is a made-up mechanical keyboard with a compact layout, quiet switches and a single bright accent key. A practical object elevated by careful proportion.",
    tone: "#5ad9d0",
    accent: "#081615",
    shape: "12%",
    rotation: "-4deg",
    symbol: "⌨",
  },
  {
    id: "soft-form",
    title: "Soft Form 02",
    maker: "Morrow Objects",
    category: "Design",
    year: "2019",
    summary: "A playful vessel where function meets an organic silhouette.",
    story:
      "This fictional object started as a paper model and evolved into a sculptural desk vessel. Its uneven outline catches different shadows as the light changes.",
    tone: "#f5d858",
    accent: "#191606",
    shape: "62% 38% 58% 42% / 45% 62% 38% 55%",
    rotation: "8deg",
    symbol: "◒",
  },
  {
    id: "field-notes",
    title: "Field Notes 14",
    maker: "Common Matter",
    category: "Print",
    year: "2023",
    summary: "Pocket observations translated into type and texture.",
    story:
      "A fictional hand-bound notebook series for small observations: colors seen on a walk, overheard phrases and shapes worth remembering. The cover changes with every volume.",
    tone: "#79a5ff",
    accent: "#0a1020",
    shape: "4%",
    rotation: "-11deg",
    symbol: "▤",
  },
  {
    id: "signal-lamp",
    title: "Signal Lamp",
    maker: "Noma Workshop",
    category: "Design",
    year: "2020",
    summary: "Ambient light reduced to one line and one glowing circle.",
    story:
      "The invented Signal Lamp balances a fine steel stem with a floating light source. Saved here because its simple geometry makes a quiet room feel intentional.",
    tone: "#fd9cc8",
    accent: "#200c15",
    shape: "50% 50% 8% 8%",
    rotation: "4deg",
    symbol: "◐",
  },
  {
    id: "loop-tape",
    title: "Loop Tape A",
    maker: "Roomtone Archive",
    category: "Music",
    year: "1993",
    summary: "A tiny archive of imagined rooms, machines and weather.",
    story:
      "A fictional cassette of field recordings: rain against glass, an elevator motor and the final train of the evening. Ordinary sounds become surprisingly vivid when carefully labeled.",
    tone: "#c8b8ff",
    accent: "#120f20",
    shape: "15%",
    rotation: "7deg",
    symbol: "∞",
  },
];

const categories = ["All", ...new Set(pieces.map((piece) => piece.category))];
const state = {
  category: "All",
  query: "",
  savedOnly: false,
  favorites: readFavorites(),
  selectedPieceId: null,
};

const grid = document.querySelector("#collection-grid");
const filterContainer = document.querySelector("#category-filters");
const searchInput = document.querySelector("#search");
const savedFilter = document.querySelector("#saved-filter");
const savedCount = document.querySelector("#saved-count");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const storyDialog = document.querySelector("#story-dialog");
const dialogTitle = document.querySelector("#dialog-title");
const dialogCategory = document.querySelector("#dialog-category");
const dialogMeta = document.querySelector("#dialog-meta");
const dialogStory = document.querySelector("#dialog-story");
const dialogSave = document.querySelector("#dialog-save");
const toast = document.querySelector("#toast");
let toastTimer;

function readFavorites() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return new Set(Array.isArray(value) ? value.filter((id) => pieces.some((piece) => piece.id === id)) : []);
  } catch {
    return new Set();
  }
}

function saveFavorites() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...state.favorites]));
  } catch {
    // The demo still works when browser storage is disabled.
  }
}

function heartIcon() {
  return `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 20.5 4.8 14a4.7 4.7 0 0 1 6.4-6.9l.8.7.8-.7a4.7 4.7 0 0 1 6.4 6.9Z"></path>
    </svg>`;
}

function makeFilterButtons() {
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-chip";
    button.textContent = category;
    button.dataset.category = category;
    button.setAttribute("aria-pressed", String(category === state.category));
    button.addEventListener("click", () => {
      state.category = category;
      filterContainer.querySelectorAll("button").forEach((filterButton) => {
        filterButton.setAttribute("aria-pressed", String(filterButton.dataset.category === category));
      });
      render();
    });
    filterContainer.append(button);
  });
}

function getVisiblePieces() {
  const query = state.query.trim().toLocaleLowerCase();
  return pieces.filter((piece) => {
    const matchesCategory = state.category === "All" || piece.category === state.category;
    const matchesSaved = !state.savedOnly || state.favorites.has(piece.id);
    const haystack = `${piece.title} ${piece.maker} ${piece.category} ${piece.summary}`.toLocaleLowerCase();
    return matchesCategory && matchesSaved && (!query || haystack.includes(query));
  });
}

function createCard(piece, index) {
  const card = document.createElement("article");
  card.className = "collection-card";

  const art = document.createElement("div");
  art.className = "card-art";
  art.setAttribute("role", "img");
  art.setAttribute("aria-label", `Abstract cover artwork for ${piece.title}`);
  art.style.setProperty("--tone", piece.tone);
  art.style.setProperty("--tone-alt", piece.accent);
  art.style.setProperty("--shape", piece.shape);
  art.style.setProperty("--rotation", piece.rotation);

  const artIndex = document.createElement("span");
  artIndex.className = "art-index";
  artIndex.textContent = String(index + 1).padStart(2, "0");
  const symbol = document.createElement("span");
  symbol.className = "art-symbol";
  symbol.textContent = piece.symbol;
  art.append(artIndex, symbol);

  const favorite = document.createElement("button");
  favorite.type = "button";
  favorite.className = "favorite-button";
  favorite.innerHTML = heartIcon();
  favorite.setAttribute("aria-label", favoriteLabel(piece));
  favorite.setAttribute("aria-pressed", String(state.favorites.has(piece.id)));
  favorite.addEventListener("click", () => toggleFavorite(piece.id));
  art.append(favorite);

  const copy = document.createElement("div");
  copy.className = "card-copy";

  const category = document.createElement("p");
  category.className = "card-category";
  category.textContent = piece.category;
  const year = document.createElement("p");
  year.className = "card-year";
  year.textContent = piece.year;
  const title = document.createElement("h3");
  title.textContent = piece.title;
  const summary = document.createElement("p");
  summary.textContent = piece.summary;
  const storyButton = document.createElement("button");
  storyButton.className = "story-button";
  storyButton.type = "button";
  storyButton.textContent = "Read its story →";
  storyButton.addEventListener("click", () => openStory(piece.id));
  copy.append(category, year, title, summary, storyButton);

  card.append(art, copy);
  return card;
}

function favoriteLabel(piece) {
  return `${state.favorites.has(piece.id) ? "Remove" : "Save"} ${piece.title}`;
}

function render() {
  const visiblePieces = getVisiblePieces();
  grid.replaceChildren(...visiblePieces.map(createCard));
  resultCount.textContent = `${visiblePieces.length} ${visiblePieces.length === 1 ? "piece" : "pieces"}`;
  savedCount.textContent = String(state.favorites.size);
  savedFilter.setAttribute("aria-pressed", String(state.savedOnly));
  emptyState.hidden = visiblePieces.length !== 0;
  grid.hidden = visiblePieces.length === 0;
  updateDialogButton();
}

function toggleFavorite(id) {
  const piece = pieces.find((item) => item.id === id);
  if (!piece) return;

  if (state.favorites.has(id)) {
    state.favorites.delete(id);
    showToast(`${piece.title} removed from saved pieces`);
  } else {
    state.favorites.add(id);
    showToast(`${piece.title} saved in this browser`);
  }
  saveFavorites();
  render();
}

function openStory(id) {
  const piece = pieces.find((item) => item.id === id);
  if (!piece) return;

  state.selectedPieceId = id;
  dialogCategory.textContent = piece.category;
  dialogTitle.textContent = piece.title;
  dialogMeta.textContent = `${piece.maker} · ${piece.year}`;
  dialogStory.textContent = piece.story;
  updateDialogButton();
  storyDialog.showModal();
}

function updateDialogButton() {
  if (!state.selectedPieceId) return;
  dialogSave.textContent = state.favorites.has(state.selectedPieceId)
    ? "Remove from saved pieces"
    : "Save this piece";
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2400);
}

function resetFilters() {
  state.category = "All";
  state.query = "";
  state.savedOnly = false;
  searchInput.value = "";
  filterContainer.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.category === "All"));
  });
  render();
}

searchInput.addEventListener("input", (event) => {
  state.query = event.currentTarget.value;
  render();
});

savedFilter.addEventListener("click", () => {
  state.savedOnly = !state.savedOnly;
  render();
});

document.querySelector("#show-saved-hero").addEventListener("click", () => {
  state.savedOnly = true;
  render();
  document.querySelector("#collection").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#reset-filters").addEventListener("click", resetFilters);

document.querySelector("#clear-saved").addEventListener("click", () => {
  if (state.favorites.size === 0) {
    showToast("There are no saved pieces to clear");
    return;
  }
  state.favorites.clear();
  saveFavorites();
  render();
  showToast("Saved pieces cleared");
});

document.querySelector("#dialog-close").addEventListener("click", () => storyDialog.close());

dialogSave.addEventListener("click", () => {
  if (state.selectedPieceId) toggleFavorite(state.selectedPieceId);
});

storyDialog.addEventListener("click", (event) => {
  if (event.target === storyDialog) storyDialog.close();
});

makeFilterButtons();
render();
