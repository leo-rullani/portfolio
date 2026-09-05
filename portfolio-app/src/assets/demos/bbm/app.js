"use strict";

const STORAGE_KEY = "flowboard-demo-tasks-v1";

const statuses = [
  { id: "backlog", label: "Backlog", color: "#8d9386" },
  { id: "ready", label: "Ready", color: "#79a5ff" },
  { id: "progress", label: "In progress", color: "#f5d858" },
  { id: "done", label: "Done", color: "#b5ec35" },
];

const disciplines = {
  Design: { mark: "DS", color: "#d5a9ff" },
  Frontend: { mark: "FE", color: "#b5ec35" },
  Backend: { mark: "BE", color: "#79a5ff" },
  Quality: { mark: "QA", color: "#f5d858" },
};

const initialTasks = [
  {
    id: "FLW-101",
    title: "Map the first-use journey",
    description: "Reduce the onboarding path to a few confident, useful steps.",
    discipline: "Design",
    priority: "High",
    status: "backlog",
  },
  {
    id: "FLW-102",
    title: "Document release checks",
    description: "Create a short checklist for predictable, low-stress releases.",
    discipline: "Quality",
    priority: "Low",
    status: "backlog",
  },
  {
    id: "FLW-103",
    title: "Refine empty states",
    description: "Help people understand what happened and what to do next.",
    discipline: "Design",
    priority: "Medium",
    status: "ready",
  },
  {
    id: "FLW-104",
    title: "Add keyboard shortcuts",
    description: "Make common board actions faster without sacrificing clarity.",
    discipline: "Frontend",
    priority: "Medium",
    status: "ready",
  },
  {
    id: "FLW-105",
    title: "Improve image delivery",
    description: "Serve appropriately sized assets and reserve layout space early.",
    discipline: "Frontend",
    priority: "High",
    status: "progress",
  },
  {
    id: "FLW-106",
    title: "Shape activity events",
    description: "Define a compact event model for meaningful board changes.",
    discipline: "Backend",
    priority: "Medium",
    status: "progress",
  },
  {
    id: "FLW-107",
    title: "Test responsive board flow",
    description: "Verify touch, keyboard and narrow-screen navigation patterns.",
    discipline: "Quality",
    priority: "High",
    status: "done",
  },
  {
    id: "FLW-108",
    title: "Clarify progress feedback",
    description: "Use concise status messages after important user actions.",
    discipline: "Frontend",
    priority: "Low",
    status: "done",
  },
];

const state = {
  tasks: loadTasks(),
  query: "",
  discipline: "All",
  draggedId: null,
};

const kanban = document.querySelector("#kanban");
const searchInput = document.querySelector("#task-search");
const filterContainer = document.querySelector("#discipline-filters");
const visibleCount = document.querySelector("#visible-count");
const emptySearch = document.querySelector("#empty-search");
const dialog = document.querySelector("#new-task-dialog");
const newTaskForm = document.querySelector("#new-task-form");
const toast = document.querySelector("#toast");
let toastTimer;

function loadTasks() {
  try {
    const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!Array.isArray(value)) return structuredClone(initialTasks);
    return value.filter(isSafeTask).slice(0, 60);
  } catch {
    return structuredClone(initialTasks);
  }
}

function isSafeTask(task) {
  return (
    task &&
    typeof task.id === "string" &&
    typeof task.title === "string" &&
    typeof task.description === "string" &&
    Object.hasOwn(disciplines, task.discipline) &&
    ["Low", "Medium", "High"].includes(task.priority) &&
    statuses.some((status) => status.id === task.status)
  );
}

function persistTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.tasks));
  } catch {
    // Keep the current session interactive when browser storage is unavailable.
  }
}

function visibleTasks() {
  const query = state.query.trim().toLocaleLowerCase();
  return state.tasks.filter((task) => {
    const matchesDiscipline = state.discipline === "All" || task.discipline === state.discipline;
    const haystack = `${task.id} ${task.title} ${task.description} ${task.discipline}`.toLocaleLowerCase();
    return matchesDiscipline && (!query || haystack.includes(query));
  });
}

function makeDisciplineFilters() {
  ["All", ...Object.keys(disciplines)].forEach((discipline) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-chip";
    button.textContent = discipline;
    button.dataset.discipline = discipline;
    button.setAttribute("aria-pressed", String(state.discipline === discipline));
    button.addEventListener("click", () => {
      state.discipline = discipline;
      filterContainer.querySelectorAll("button").forEach((filterButton) => {
        filterButton.setAttribute(
          "aria-pressed",
          String(filterButton.dataset.discipline === discipline),
        );
      });
      render();
    });
    filterContainer.append(button);
  });
}

function createColumn(status, tasks) {
  const column = document.createElement("section");
  column.className = "kanban-column";
  column.dataset.status = status.id;
  column.style.setProperty("--status-color", status.color);
  column.setAttribute("aria-labelledby", `column-${status.id}`);

  const heading = document.createElement("div");
  heading.className = "column-heading";
  const title = document.createElement("h3");
  title.className = "column-title";
  title.id = `column-${status.id}`;
  const dot = document.createElement("span");
  dot.className = "status-dot";
  dot.setAttribute("aria-hidden", "true");
  title.append(dot, document.createTextNode(status.label));
  const count = document.createElement("span");
  count.className = "column-count";
  count.textContent = String(tasks.length);
  count.setAttribute("aria-label", `${tasks.length} tasks`);
  heading.append(title, count);

  const list = document.createElement("div");
  list.className = "task-list";
  list.append(...tasks.map(createTaskCard));
  column.append(heading, list);

  column.addEventListener("dragover", (event) => {
    event.preventDefault();
    column.classList.add("drag-over");
  });
  column.addEventListener("dragleave", (event) => {
    if (!column.contains(event.relatedTarget)) column.classList.remove("drag-over");
  });
  column.addEventListener("drop", (event) => {
    event.preventDefault();
    column.classList.remove("drag-over");
    if (state.draggedId) moveTask(state.draggedId, status.id);
  });

  return column;
}

function createTaskCard(task) {
  const card = document.createElement("article");
  card.className = "task-card";
  card.draggable = true;
  card.dataset.taskId = task.id;

  const top = document.createElement("div");
  top.className = "task-topline";
  const priority = document.createElement("span");
  priority.className = `priority ${task.priority.toLocaleLowerCase()}`;
  priority.textContent = `${task.priority} priority`;
  const id = document.createElement("span");
  id.className = "task-id";
  id.textContent = task.id;
  top.append(priority, id);

  const title = document.createElement("h3");
  title.textContent = task.title;
  const description = document.createElement("p");
  description.className = "task-description";
  description.textContent = task.description || "No description added.";

  const footer = document.createElement("div");
  footer.className = "task-footer";
  const discipline = document.createElement("span");
  discipline.className = "discipline";
  const mark = document.createElement("span");
  mark.className = "discipline-mark";
  mark.style.setProperty("--discipline-color", disciplines[task.discipline].color);
  mark.textContent = disciplines[task.discipline].mark;
  discipline.append(mark, document.createTextNode(task.discipline));

  const statusSelect = document.createElement("select");
  statusSelect.className = "status-select";
  statusSelect.setAttribute("aria-label", `Move ${task.title} to another status`);
  statuses.forEach((status) => {
    const option = document.createElement("option");
    option.value = status.id;
    option.textContent = status.label;
    option.selected = status.id === task.status;
    statusSelect.append(option);
  });
  statusSelect.addEventListener("change", (event) => moveTask(task.id, event.currentTarget.value));
  statusSelect.addEventListener("pointerdown", (event) => event.stopPropagation());
  footer.append(discipline, statusSelect);

  card.append(top, title, description, footer);
  card.addEventListener("dragstart", (event) => {
    state.draggedId = task.id;
    card.classList.add("dragging");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", task.id);
  });
  card.addEventListener("dragend", () => {
    state.draggedId = null;
    card.classList.remove("dragging");
    document.querySelectorAll(".drag-over").forEach((item) => item.classList.remove("drag-over"));
  });
  return card;
}

function render() {
  const filteredTasks = visibleTasks();
  const columns = statuses.map((status) =>
    createColumn(
      status,
      filteredTasks.filter((task) => task.status === status.id),
    ),
  );
  kanban.replaceChildren(...columns);
  kanban.hidden = filteredTasks.length === 0;
  emptySearch.hidden = filteredTasks.length !== 0;
  visibleCount.textContent = `${filteredTasks.length} ${filteredTasks.length === 1 ? "task" : "tasks"}`;
  updateSummary();
}

function updateSummary() {
  const completed = state.tasks.filter((task) => task.status === "done").length;
  document.querySelector("#summary-open").textContent = String(state.tasks.length - completed);
  document.querySelector("#summary-progress").textContent = String(
    state.tasks.filter((task) => task.status === "progress").length,
  );
  document.querySelector("#summary-done").textContent = String(completed);
}

function moveTask(id, statusId) {
  const task = state.tasks.find((item) => item.id === id);
  const status = statuses.find((item) => item.id === statusId);
  if (!task || !status || task.status === statusId) return;
  task.status = statusId;
  persistTasks();
  render();
  showToast(`${task.title} moved to ${status.label}`);
}

function showToast(message) {
  window.clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("visible");
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2500);
}

function nextTaskId() {
  const highest = state.tasks.reduce((max, task) => {
    const number = Number.parseInt(task.id.replace(/\D/g, ""), 10);
    return Number.isFinite(number) ? Math.max(max, number) : max;
  }, 100);
  return `FLW-${highest + 1}`;
}

searchInput.addEventListener("input", (event) => {
  state.query = event.currentTarget.value;
  render();
});

document.querySelector("#clear-filters").addEventListener("click", () => {
  state.query = "";
  state.discipline = "All";
  searchInput.value = "";
  filterContainer.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.discipline === "All"));
  });
  render();
});

document.querySelector("#reset-board").addEventListener("click", () => {
  state.tasks = structuredClone(initialTasks);
  state.query = "";
  state.discipline = "All";
  searchInput.value = "";
  filterContainer.querySelectorAll("button").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.discipline === "All"));
  });
  persistTasks();
  render();
  showToast("The demo board has been reset");
});

document.querySelector("#open-new-task").addEventListener("click", () => dialog.showModal());
document.querySelector("#close-new-task").addEventListener("click", () => dialog.close());

dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

newTaskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(newTaskForm);
  const title = String(formData.get("title") || "").trim();
  if (!title) return;

  const task = {
    id: nextTaskId(),
    title: title.slice(0, 70),
    description: String(formData.get("description") || "").trim().slice(0, 160),
    discipline: String(formData.get("discipline")),
    priority: String(formData.get("priority")),
    status: "backlog",
  };
  state.tasks.unshift(task);
  persistTasks();
  newTaskForm.reset();
  dialog.close();
  render();
  showToast(`${task.title} added to Backlog`);
});

makeDisciplineFilters();
render();
