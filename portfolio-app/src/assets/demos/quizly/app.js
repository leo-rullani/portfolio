"use strict";

const questionBank = [
  {
    category: "WEB",
    difficulty: "Basis",
    question: "Welches HTML-Element beschreibt die Hauptnavigation einer Seite semantisch?",
    answers: ["<menu>", "<nav>", "<section>", "<links>"],
    correct: 1,
    explanation: "<nav> kennzeichnet einen Bereich mit wichtigen Navigationslinks."
  },
  {
    category: "CSS",
    difficulty: "Basis",
    question: "Welche CSS-Einheit bezieht sich auf die Breite des Viewports?",
    answers: ["rem", "vh", "vw", "ch"],
    correct: 2,
    explanation: "1vw entspricht einem Prozent der aktuellen Viewport-Breite."
  },
  {
    category: "LOGIK",
    difficulty: "Fokus",
    question: "Eine Schleife verdoppelt eine Zahl dreimal. Sie startet bei 2. Was ist das Ergebnis?",
    answers: ["8", "12", "16", "32"],
    correct: 2,
    explanation: "Die Folge lautet 2 → 4 → 8 → 16."
  },
  {
    category: "API",
    difficulty: "Praxis",
    question: "Welcher HTTP-Statuscode steht typischerweise für eine erfolgreich erstellte Ressource?",
    answers: ["200", "201", "204", "301"],
    correct: 1,
    explanation: "201 Created signalisiert, dass eine neue Ressource erfolgreich erstellt wurde."
  },
  {
    category: "UX",
    difficulty: "Praxis",
    question: "Was verbessert die Zugänglichkeit eines Icon-Buttons am direktesten?",
    answers: ["Ein Schatten", "Mehr Animation", "Ein zugänglicher Name", "Eine kleinere Fläche"],
    correct: 2,
    explanation: "Ein aria-label oder sichtbarer Text vermittelt Assistenztechnologien den Zweck des Buttons."
  },
  {
    category: "JAVASCRIPT",
    difficulty: "Fokus",
    question: "Welche Methode erstellt ein neues Array, ohne das ursprüngliche Array zu verändern?",
    answers: ["push()", "sort()", "splice()", "map()"],
    correct: 3,
    explanation: "map() gibt ein neues Array mit den transformierten Elementen zurück."
  },
  {
    category: "SECURITY",
    difficulty: "Praxis",
    question: "Wo sollte ein geheimer API-Schlüssel niemals gespeichert werden?",
    answers: ["In einer Server-Umgebungsvariable", "Im Browser-JavaScript", "In einem Secret Manager", "In geschützter Server-Konfiguration"],
    correct: 1,
    explanation: "Code im Browser ist öffentlich einsehbar; echte Secrets gehören ausschließlich auf die Serverseite."
  },
  {
    category: "GIT",
    difficulty: "Basis",
    question: "Welcher Git-Befehl zeigt den aktuellen Zustand der Arbeitskopie?",
    answers: ["git status", "git state", "git inspect", "git branch --new"],
    correct: 0,
    explanation: "git status zeigt geänderte, vorgemerkte und nicht verfolgte Dateien an."
  }
];

const els = {
  startScreen: document.querySelector("#startScreen"),
  quizScreen: document.querySelector("#quizScreen"),
  resultScreen: document.querySelector("#resultScreen"),
  startButton: document.querySelector("#startButton"),
  restartButton: document.querySelector("#restartButton"),
  lengthOptions: [...document.querySelectorAll(".length-option")],
  bestScoreIntro: document.querySelector("#bestScoreIntro"),
  questionNumber: document.querySelector("#questionNumber"),
  currentQuestion: document.querySelector("#currentQuestion"),
  totalQuestions: document.querySelector("#totalQuestions"),
  liveScore: document.querySelector("#liveScore"),
  progressBar: document.querySelector("#progressBar"),
  sideIndex: document.querySelector("#sideIndex"),
  categoryLabel: document.querySelector("#categoryLabel"),
  difficultyLabel: document.querySelector("#difficultyLabel"),
  questionText: document.querySelector("#questionText"),
  answers: document.querySelector("#answers"),
  feedback: document.querySelector("#feedback"),
  feedbackIcon: document.querySelector("#feedbackIcon"),
  feedbackTitle: document.querySelector("#feedbackTitle"),
  feedbackText: document.querySelector("#feedbackText"),
  nextButton: document.querySelector("#nextButton"),
  resultTitle: document.querySelector("#resultTitle"),
  resultMessage: document.querySelector("#resultMessage"),
  scoreRing: document.querySelector("#scoreRing"),
  finalPercent: document.querySelector("#finalPercent"),
  correctAnswers: document.querySelector("#correctAnswers"),
  finalScore: document.querySelector("#finalScore"),
  bestScoreResult: document.querySelector("#bestScoreResult"),
  reviewList: document.querySelector("#reviewList")
};

let selectedLength = 5;
let activeQuestions = [];
let currentIndex = 0;
let correctCount = 0;
let score = 0;
let answersGiven = [];

function getBestScore() {
  try {
    const value = Number(localStorage.getItem("quizly-demo-best") || 0);
    return Number.isFinite(value) ? Math.max(0, value) : 0;
  } catch {
    return 0;
  }
}

function setBestScore(value) {
  try {
    localStorage.setItem("quizly-demo-best", String(value));
  } catch {
    // The quiz remains fully usable if local storage is unavailable.
  }
}

function formatScore(value) {
  return String(value).padStart(3, "0");
}

function updateBestScoreLabels() {
  const best = getBestScore();
  els.bestScoreIntro.textContent = best ? formatScore(best) : "–";
  els.bestScoreResult.textContent = formatScore(best);
}

function chooseLength(event) {
  const button = event.currentTarget;
  selectedLength = Number(button.dataset.length);
  els.lengthOptions.forEach(option => {
    const isActive = option === button;
    option.classList.toggle("active", isActive);
    option.setAttribute("aria-pressed", String(isActive));
  });
}

function startQuiz() {
  activeQuestions = questionBank.slice(0, selectedLength);
  currentIndex = 0;
  correctCount = 0;
  score = 0;
  answersGiven = [];
  els.startScreen.hidden = true;
  els.resultScreen.hidden = true;
  els.quizScreen.hidden = false;
  els.totalQuestions.textContent = String(activeQuestions.length);
  renderQuestion();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const item = activeQuestions[currentIndex];
  const displayIndex = String(currentIndex + 1).padStart(2, "0");
  els.questionNumber.textContent = displayIndex;
  els.sideIndex.textContent = displayIndex;
  els.currentQuestion.textContent = String(currentIndex + 1);
  els.categoryLabel.textContent = item.category;
  els.difficultyLabel.textContent = item.difficulty;
  els.questionText.textContent = item.question;
  els.liveScore.textContent = formatScore(score);
  els.progressBar.style.width = `${(currentIndex / activeQuestions.length) * 100}%`;
  els.feedback.hidden = true;
  els.feedback.classList.remove("wrong");
  els.nextButton.innerHTML = `${currentIndex === activeQuestions.length - 1 ? "Ergebnis" : "Weiter"}<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 6l6 6-6 6"/></svg>`;
  els.answers.replaceChildren(...item.answers.map((answer, index) => createAnswerButton(answer, index)));
  requestAnimationFrame(() => els.questionText.focus?.());
}

function createAnswerButton(answer, index) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "answer-button";
  button.dataset.answer = String(index);
  const badge = document.createElement("span");
  badge.textContent = String.fromCharCode(65 + index);
  const label = document.createElement("strong");
  label.textContent = answer;
  button.append(badge, label);
  button.addEventListener("click", submitAnswer);
  return button;
}

function submitAnswer(event) {
  const selected = Number(event.currentTarget.dataset.answer);
  const item = activeQuestions[currentIndex];
  const isCorrect = selected === item.correct;
  const buttons = [...els.answers.querySelectorAll("button")];

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === item.correct) button.classList.add("correct");
    if (index === selected && !isCorrect) button.classList.add("wrong");
  });

  if (isCorrect) {
    correctCount += 1;
    score += 100;
  }
  answersGiven.push({ question: item.question, selected, correct: item.correct, isCorrect });
  els.liveScore.textContent = formatScore(score);
  els.progressBar.style.width = `${((currentIndex + 1) / activeQuestions.length) * 100}%`;
  els.feedback.classList.toggle("wrong", !isCorrect);
  els.feedbackIcon.textContent = isCorrect ? "✓" : "×";
  els.feedbackTitle.textContent = isCorrect ? "Richtig!" : "Fast – die markierte Antwort stimmt.";
  els.feedbackText.textContent = item.explanation;
  els.feedback.hidden = false;
  els.nextButton.focus();
}

function nextQuestion() {
  if (currentIndex < activeQuestions.length - 1) {
    currentIndex += 1;
    renderQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  const percent = Math.round((correctCount / activeQuestions.length) * 100);
  const previousBest = getBestScore();
  if (score > previousBest) setBestScore(score);

  els.quizScreen.hidden = true;
  els.resultScreen.hidden = false;
  els.resultTitle.textContent = percent === 100 ? "Perfekte Runde!" : percent >= 75 ? "Starke Runde!" : percent >= 50 ? "Gute Basis!" : "Weiter neugierig!";
  els.resultMessage.textContent = percent === 100
    ? "Alles richtig – dein Web-Wissen sitzt."
    : percent >= 75
      ? "Du hast die meisten Konzepte sicher erkannt."
      : percent >= 50
        ? "Solide Leistung. Eine zweite Runde bringt dich noch weiter."
        : "Jede Antwort ist ein neuer Baustein. Starte direkt die nächste Runde.";
  els.scoreRing.style.setProperty("--score", `${percent * 3.6}deg`);
  els.finalPercent.textContent = `${percent}%`;
  els.correctAnswers.textContent = `${correctCount} / ${activeQuestions.length}`;
  els.finalScore.textContent = formatScore(score);
  updateBestScoreLabels();
  renderReview();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderReview() {
  els.reviewList.replaceChildren(...answersGiven.map((answer, index) => {
    const item = activeQuestions[index];
    const entry = document.createElement("li");
    entry.classList.toggle("wrong", !answer.isCorrect);
    const label = document.createElement("span");
    label.textContent = item.question;
    const result = document.createElement("strong");
    result.textContent = answer.isCorrect ? "✓" : "×";
    entry.append(label, result);
    return entry;
  }));
}

function resetToStart() {
  els.resultScreen.hidden = true;
  els.quizScreen.hidden = true;
  els.startScreen.hidden = false;
  updateBestScoreLabels();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

els.lengthOptions.forEach(option => option.addEventListener("click", chooseLength));
els.startButton.addEventListener("click", startQuiz);
els.nextButton.addEventListener("click", nextQuestion);
els.restartButton.addEventListener("click", resetToStart);
updateBestScoreLabels();
