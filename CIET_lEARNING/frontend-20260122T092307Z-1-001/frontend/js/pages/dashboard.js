function DashboardPage() {
  const user = AppState.user;
  const credits = AppState.credits || 0;
  const badges = AppState.badges || [];
  const certs = AppState.certificates || [];

  const attempts = AppState.sessionResult?.attempts || [];
  const total = attempts.length;
  const correct = attempts.filter(a => a.isCorrect).length;
  const accuracy = total ? Math.round((correct / total) * 100) : 0;

  const greet = getGreeting();
  const quote = getRandomQuote();

  // Skill analysis
  const aptitudeAttempts = attempts.filter(a => a.skill === "aptitude");
  const dsaAttempts = attempts.filter(a => a.skill === "dsa");

  const aptAcc = aptitudeAttempts.length
    ? Math.round((aptitudeAttempts.filter(a => a.isCorrect).length / aptitudeAttempts.length) * 100)
    : 0;

  const dsaAcc = dsaAttempts.length
    ? Math.round((dsaAttempts.filter(a => a.isCorrect).length / dsaAttempts.length) * 100)
    : 0;

  const weakSkill = pickWeakSkill(aptAcc, dsaAcc);

  // ✅ Safe streak (if analytics not loaded, fallback)
  const streak = (typeof getStreakDays === "function") ? getStreakDays() : 0;

  setTimeout(() => {
    animateBars();
  }, 80);

  return `
    <div class="dash-page">

      <section class="dash-hero">
        <div class="dash-hero-left">
          <h2>${greet}, <span class="name-glow">${user.name}</span> 👋</h2>
          <p>Track your progress, improve daily, and unlock certificates faster.</p>

          <div class="dash-hero-actions">
            <button class="dash-btn-primary" onclick="navigate('training')">
              🚀 Start Training
            </button>
            <button class="dash-btn-secondary" onclick="navigate('profile')">
              👤 View Profile
            </button>
          </div>

          <div class="dash-quote">
            <span>💡</span>
            <p>${quote}</p>
          </div>
        </div>

        <div class="dash-hero-right">
          <div class="hero-mini-card">
            <h3>${credits}</h3>
            <p>Total Credits</p>
          </div>
          <div class="hero-mini-card">
            <h3>${accuracy}%</h3>
            <p>Accuracy</p>
          </div>
          <div class="hero-mini-card">
            <h3>${certs.length}</h3>
            <p>Certificates</p>
          </div>
          <div class="hero-mini-card">
            <h3>${streak}🔥</h3>
            <p>Streak</p>
          </div>
        </div>

        <div class="dash-hero-glow"></div>
      </section>

      <section class="dash-grid">

        <div class="dash-col">

          <div class="dash-card">
            <div class="dash-head">
              <h3>📈 Skill Progress</h3>
              <span class="dash-tag">Live</span>
            </div>

            <div class="dash-bars">
              <div class="dash-bar-row">
                <div class="dash-bar-top">
                  <b>🧠 Aptitude</b>
                  <span>${aptAcc}% accuracy</span>
                </div>
                <div class="dash-bar">
                  <div class="dash-fill apt" data-width="${Math.min(credits / 5, 100)}"></div>
                </div>
              </div>

              <div class="dash-bar-row">
                <div class="dash-bar-top">
                  <b>💻 DSA</b>
                  <span>${dsaAcc}% accuracy</span>
                </div>
                <div class="dash-bar">
                  <div class="dash-fill dsa" data-width="${Math.min(credits / 5, 100)}"></div>
                </div>
              </div>
            </div>

            <div class="dash-recommend">
              <div class="recommend-box">
                <h4>🎯 Recommended Next</h4>
                <p>
                  Your weak area is <b>${weakSkill.toUpperCase()}</b>.
                  Do 1 workout now to improve faster.
                </p>

                <button class="dash-btn-primary small" onclick="startRecommended('${weakSkill}')">
                  Start ${weakSkill.toUpperCase()} Workout
                </button>
              </div>
            </div>
          </div>

          <div class="dash-card">
            <div class="dash-head">
              <h3>🗓 Weekly Activity</h3>
              <span class="dash-tag">7 Days</span>
            </div>

            <div class="week-chart">
              ${renderWeekChartSafe()}
            </div>

            <p class="dash-muted">
              Consistency matters more than speed. Try 10 mins daily ✅
            </p>
          </div>

        </div>

        <div class="dash-col">

          <div class="dash-card">
            <div class="dash-head">
              <h3>🏅 Badges</h3>
              <span class="dash-tag">${badges.length}</span>
            </div>

            <div class="dash-badges">
              ${
                badges.length
                  ? badges.map(b => `<div class="badge-pill">${b}</div>`).join("")
                  : `<p class="dash-muted">No badges yet. Start workouts 🔥</p>`
              }
            </div>
          </div>

          <div class="dash-card">
            <div class="dash-head">
              <h3>⚡ Recent Attempts</h3>
              <span class="dash-tag">${total}</span>
            </div>

            <div class="dash-activity">
              ${renderRecentAttemptsDash(attempts)}
            </div>
          </div>

          <div class="dash-card">
            <div class="dash-head">
              <h3>🎓 Certificate Journey</h3>
              <span class="dash-tag">Goal</span>
            </div>

            <div class="journey-box">
              <div class="journey-progress">
                <div class="journey-fill" style="width:${Math.min((credits / 500) * 100, 100)}%"></div>
              </div>

              <div class="journey-row">
                <span>${credits} / 500 credits</span>
                <button class="dash-btn-secondary small" onclick="navigate('certificates')">
                  View
                </button>
              </div>
            </div>
          </div>

        </div>

      </section>
    </div>
  `;
}

/* ================= HELPERS ================= */

function getGreeting() {
  const hr = new Date().getHours();
  if (hr < 12) return "Good Morning";
  if (hr < 17) return "Good Afternoon";
  return "Good Evening";
}

function getRandomQuote() {
  const quotes = [
    "Do workouts daily → unlock certificates faster 🔥",
    "DSA is your interview weapon 💻",
    "Aptitude makes your rounds easy 🧠",
    "Consistency creates placements ✅",
    "1% improvement daily = huge results 🚀"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

function pickWeakSkill(aptAcc, dsaAcc) {
  if (aptAcc === 0 && dsaAcc === 0) return "aptitude";
  return aptAcc <= dsaAcc ? "aptitude" : "dsa";
}

function startRecommended(skill) {
  AppState.mode = "workout";
  AppState.skill = skill;
  startAssessmentSession(skill, "workout");
  navigate("assessment");
}

function animateBars() {
  document.querySelectorAll(".dash-fill").forEach(bar => {
    const w = bar.getAttribute("data-width");
    bar.style.width = w + "%";
  });
}

/* ✅ SAFE weekly chart (won't break dashboard) */
function renderWeekChartSafe() {
  // If analytics.js not loaded, fallback to simple bars
  if (typeof getWeeklyAttempts !== "function") {
    let html = "";
    for (let i = 0; i < 7; i++) {
      const height = 25 + Math.floor(Math.random() * 70);
      html += `<div class="week-bar" style="height:${height}%"></div>`;
    }
    return html;
  }

  // Real weekly chart
  const week = getWeeklyAttempts();
  const max = Math.max(...week.map(w => w.attempts), 1);

  return week.map(day => {
    const height = Math.round((day.attempts / max) * 100);
    const label = day.date.slice(5);

    return `
      <div class="week-col">
        <div class="week-bar" style="height:${height}%"></div>
        <span class="week-label">${label}</span>
      </div>
    `;
  }).join("");
}

function renderRecentAttemptsDash(attempts) {
  if (!attempts.length) {
    return `<p class="dash-muted">No attempts yet. Start training now 🚀</p>`;
  }

  const last = attempts.slice(-5).reverse();

  return last.map(a => `
    <div class="attempt-row">
      <div class="attempt-dot ${a.isCorrect ? "good" : "bad"}"></div>
      <div class="attempt-info">
        <b>${a.skill.toUpperCase()}</b>
        <span>${a.difficulty.toUpperCase()} · ${a.isCorrect ? "Correct ✅" : "Wrong ❌"}</span>
      </div>
    </div>
  `).join("");
}




