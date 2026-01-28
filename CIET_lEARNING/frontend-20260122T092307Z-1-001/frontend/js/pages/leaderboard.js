function LeaderboardPage() {
  // Load students
  const students = getAllStudentsForLeaderboard();

  // UI build
  setTimeout(() => {
    renderLeaderboardTable(students);
  }, 50);

  return `
    <div class="leaderboard-page">

      <!-- HEADER -->
      <div class="lb-hero">
        <div>
          <h2>🏆 Leaderboard</h2>
          <p>Compete with your friends. Earn credits in workout mode to rank up 🔥</p>
        </div>

        <div class="lb-actions">
          <select id="deptFilter" class="lb-select" onchange="applyLeaderboardFilters()">
            <option value="all">All Departments</option>
            <option value="cse">CSE</option>
            <option value="it">IT</option>
            <option value="aids">AI&DS</option>
            <option value="aiml">AIML</option>
            <option value="cyber security">Cyber Security</option>
            <option value="ece">ECE</option>
            <option value="eee">EEE</option>
          </select>

          <input
            id="lbSearch"
            class="lb-search"
            placeholder="Search student name..."
            oninput="applyLeaderboardFilters()"
          />
        </div>

        <div class="lb-glow"></div>
      </div>

      <!-- PODIUM -->
      <div class="lb-podium" id="lbPodium"></div>

      <!-- TABLE -->
      <div class="lb-card">
        <div class="lb-card-head">
          <h3>📌 Rankings</h3>
          <span class="lb-tag" id="lbCountTag">0 Students</span>
        </div>

        <div class="lb-table" id="lbTable"></div>
      </div>
    </div>
  `;
}

/* ---------------- DATA ---------------- */

function getAllStudentsForLeaderboard() {
  // Your real users stored in localStorage (if you made multi-user later)
  // For now: 1 real user + sample users
  const current = AppState.user;

  const me = {
    name: current.name,
    dept: current.dept,
    year: current.year,
    credits: AppState.credits || 0,
    badges: AppState.badges || []
  };

  const sample = [
    { name: "Arjun K", dept: "cse", year: "3", credits: 420, badges: ["Silver", "Starter"] },
    { name: "Priya S", dept: "it", year: "2", credits: 310, badges: ["Bronze"] },
    { name: "Vishnu R", dept: "ece", year: "4", credits: 510, badges: ["Gold"] },
    { name: "Deepika M", dept: "aids", year: "1", credits: 150, badges: ["Starter"] },
    { name: "Sanjay P", dept: "aiml", year: "3", credits: 275, badges: ["Bronze"] },
    { name: "Hari V", dept: "eee", year: "2", credits: 90, badges: ["Starter"] },
    { name: "Keerthi J", dept: "cyber security", year: "4", credits: 460, badges: ["Silver"] }
  ];

  return [me, ...sample]
    .map(s => ({
      ...s,
      dept: (s.dept || "").toLowerCase()
    }))
    .sort((a, b) => b.credits - a.credits);
}

/* ---------------- FILTERS ---------------- */

function applyLeaderboardFilters() {
  const dept = document.getElementById("deptFilter")?.value || "all";
  const query = (document.getElementById("lbSearch")?.value || "").toLowerCase();

  const all = getAllStudentsForLeaderboard();

  const filtered = all.filter(s => {
    const okDept = dept === "all" ? true : s.dept === dept;
    const okSearch = s.name.toLowerCase().includes(query);
    return okDept && okSearch;
  });

  renderLeaderboardTable(filtered);
}

/* ---------------- RENDER ---------------- */

function renderLeaderboardTable(students) {
  // Podium render (Top 3)
  const podium = document.getElementById("lbPodium");
  if (podium) podium.innerHTML = renderPodium(students.slice(0, 3));

  // Count Tag
  const countTag = document.getElementById("lbCountTag");
  if (countTag) countTag.innerText = `${students.length} Students`;

  // Table rows
  const table = document.getElementById("lbTable");
  if (!table) return;

  if (!students.length) {
    table.innerHTML = `<p class="lb-muted">No students found.</p>`;
    return;
  }

  table.innerHTML = `
    <div class="lb-row lb-head">
      <span>#</span>
      <span>Name</span>
      <span>Dept</span>
      <span>Year</span>
      <span>Credits</span>
      <span>Badges</span>
    </div>

    ${students.map((s, i) => `
      <div class="lb-row ${isCurrentUser(s.name) ? "me" : ""}">
        <span class="rank">${i + 1}</span>
        <span class="name">${s.name} ${isCurrentUser(s.name) ? `<b class="me-tag">You</b>` : ""}</span>
        <span class="dept">${formatDept(s.dept)}</span>
        <span class="year">${s.year}</span>
        <span class="credits">${s.credits}</span>
        <span class="badges">${renderBadgeIcons(s.badges)}</span>
      </div>
    `).join("")}
  `;
}

function renderPodium(top3) {
  const first = top3[0];
  const second = top3[1];
  const third = top3[2];

  return `
    <div class="podium-card silver">
      ${second ? podiumUser(second, "🥈 #2") : emptyPodium("🥈")}
    </div>

    <div class="podium-card gold">
      ${first ? podiumUser(first, "🥇 #1") : emptyPodium("🥇")}
    </div>

    <div class="podium-card bronze">
      ${third ? podiumUser(third, "🥉 #3") : emptyPodium("🥉")}
    </div>
  `;
}

function podiumUser(s, tag) {
  return `
    <div class="podium-tag">${tag}</div>
    <div class="podium-avatar">${getInitials(s.name)}</div>
    <h3>${s.name}</h3>
    <p>${formatDept(s.dept)} · Year ${s.year}</p>
    <div class="podium-credits">${s.credits} credits</div>
  `;
}

function emptyPodium(icon) {
  return `
    <div class="podium-tag">${icon}</div>
    <div class="podium-avatar">?</div>
    <h3>---</h3>
    <p>---</p>
    <div class="podium-credits">0 credits</div>
  `;
}

/* ---------------- SMALL HELPERS ---------------- */

function renderBadgeIcons(badges) {
  if (!badges || !badges.length) return `<span class="lb-muted">-</span>`;

  return badges.slice(0, 3).map(b => {
    const t = b.toLowerCase();
    if (t.includes("gold")) return `<span class="bicon gold">G</span>`;
    if (t.includes("silver")) return `<span class="bicon silver">S</span>`;
    if (t.includes("bronze")) return `<span class="bicon bronze">B</span>`;
    return `<span class="bicon starter">★</span>`;
  }).join("");
}

function isCurrentUser(name) {
  return AppState.user?.name === name;
}

function formatDept(d) {
  if (!d) return "—";
  if (d === "aids") return "AI&DS";
  if (d === "aiml") return "AIML";
  if (d === "cyber security") return "CYBER";
  return d.toUpperCase();
}

function getInitials(name) {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}
