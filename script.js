// Elemen DOM
const result = document.getElementById("result");
const historyList = document.getElementById("history-list");
const themeToggle = document.getElementById("theme-toggle");

// ---------- TEMA (Dark/Light) ----------
function setTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
    if (themeToggle) themeToggle.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    if (themeToggle) themeToggle.textContent = "🌙";
  }
  localStorage.setItem("darkMode", isDark ? "true" : "false");
}


if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const currentlyDark = document.body.classList.contains("dark");
    setTheme(!currentlyDark);
  });
} else {
  console.warn("Theme toggle button not found (id='theme-toggle').");
}


(function initTheme() {
  const saved = localStorage.getItem("darkMode");
  if (saved === "true") {
    setTheme(true);
  } else if (saved === "false") {
    setTheme(false);
  } else {
    // jika belum ada preferensi, gunakan preferensi sistem jika tersedia
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark);
  }
})();


function appendValue(value) {
  result.value += value;
}

function clearResult() {
  result.value = "";
}

function deleteLast() {
  result.value = result.value.slice(0, -1);
}

function calculateResult() {
  try {
    const expression = result.value;
    // Hindari eksekusi kosong
    if (!expression) return;
    // eval sederhana — untuk project pembelajaran; jangan gunakan eval di production tanpa sanitasi!
    const outcome = eval(expression);
    result.value = outcome;
    addToHistory(expression, outcome);
    saveHistoryToLocal();
  } catch (error) {
    result.value = "Error";
  }
}

function addToHistory(expression, outcome) {
  const listItem = document.createElement("li");
  listItem.textContent = `${expression} = ${outcome}`;
  historyList.prepend(listItem);
}


function saveHistoryToLocal() {
  const items = [];
  document.querySelectorAll("#history-list li").forEach(li => items.push(li.textContent));
  localStorage.setItem("calcHistory", JSON.stringify(items));
}

function loadHistoryFromLocal() {
  const items = JSON.parse(localStorage.getItem("calcHistory") || "[]");
  items.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    historyList.appendChild(li);
  });
}

// load history on start
loadHistoryFromLocal();

