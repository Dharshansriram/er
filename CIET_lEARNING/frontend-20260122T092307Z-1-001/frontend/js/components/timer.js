
let timerInterval = null;
let remainingSeconds = 0;

function startTimer(minutes) {
  clearInterval(timerInterval);

  remainingSeconds = minutes * 60;
  updateTimerUI();

  timerInterval = setInterval(() => {
    remainingSeconds--;

    updateTimerUI();

    if (remainingSeconds <= 0) {
      clearInterval(timerInterval);
      alert("⏰ Time's up! Assessment auto-submitted.");
      navigate("dashboard");
    }
  }, 1000);
}

function updateTimerUI() {
  const timerEl = document.getElementById("timer");
  if (!timerEl) return;

  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;

  timerEl.textContent =
    `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}
