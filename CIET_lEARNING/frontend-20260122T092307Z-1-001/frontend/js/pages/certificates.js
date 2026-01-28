function CertificatesPage() {
  const credits = AppState.credits || 0;

  const tracks = [
    {
      trackId: "aptitude",
      trackTitle: "Aptitude Track",
      trackIcon: "🧠",
      milestones: [
        { id: "apt-bronze", title: "Bronze Aptitude", need: 100, tier: "bronze" },
        { id: "apt-silver", title: "Silver Aptitude", need: 250, tier: "silver" },
        { id: "apt-gold", title: "Gold Aptitude", need: 500, tier: "gold" }
      ]
    },
    {
      trackId: "dsa",
      trackTitle: "DSA Track",
      trackIcon: "💻",
      milestones: [
        { id: "dsa-bronze", title: "Bronze DSA", need: 100, tier: "bronze" },
        { id: "dsa-silver", title: "Silver DSA", need: 250, tier: "silver" },
        { id: "dsa-gold", title: "Gold DSA", need: 500, tier: "gold" }
      ]
    }
  ];

  const overallPercent = Math.min((credits / 500) * 100, 100);

  return `
    <div class="certificates-page">

      <!-- TOP HERO -->
      <div class="cert-top">

        <div class="cert-hero">
          <h2>🎓 Certificates</h2>
          <p>
            Unlock <b>Bronze → Silver → Gold</b> certificates by earning credits in workouts.
          </p>

          <div class="cert-buttons">
            <button class="cert-primary-btn" onclick="navigate('training')">🚀 Start Workout</button>
            <button class="cert-secondary-btn" onclick="showHowItWorks()">❓ How it works</button>
          </div>
        </div>

        <div class="cert-ring-box">
          <div class="progress-ring" style="--percent:${overallPercent}">
            <div class="ring-inner">
              <h3>${credits}</h3>
              <span>Credits</span>
            </div>
          </div>
          <p class="ring-caption">Goal: 500</p>
        </div>

      </div>

      <!-- TRACKS GRID (NO SCROLL BIG) -->
      <div class="cert-tracks-grid">
        ${tracks.map(t => renderTrack(t, credits)).join("")}
      </div>

    </div>
  `;
}

function renderTrack(track, credits) {
  return `
    <div class="cert-track-card">
      <div class="track-header">
        <div class="track-title">
          <span class="track-icon">${track.trackIcon}</span>
          <h3>${track.trackTitle}</h3>
        </div>
        <span class="track-chip">3 Levels</span>
      </div>

      <div class="track-list">
        ${track.milestones.map(m => renderTierCard(m, credits)).join("")}
      </div>
    </div>
  `;
}

function renderTierCard(item, credits) {
  const unlocked = credits >= item.need;
  const percent = Math.min((credits / item.need) * 100, 100);
  const remaining = Math.max(item.need - credits, 0);

  return `
    <div class="tier-card ${item.tier} ${unlocked ? "unlocked" : "locked"}">
      
      <div class="tier-banner ${item.tier}">
        <span class="tier-badge">${unlocked ? "✅ UNLOCKED" : "🔒 LOCKED"}</span>
        <span class="tier-title">${item.title}</span>
      </div>

      <div class="tier-body">
        <div class="tier-row">
          <span class="tier-need">${item.need} credits</span>
          <span class="tier-status">${unlocked ? "Ready 🎉" : `${remaining} left`}</span>
        </div>

        <div class="tier-progress">
          <div class="tier-progress-fill" style="width:${percent}%"></div>
        </div>

        <div class="tier-actions">
          <button class="tier-btn" ${unlocked ? "" : "disabled"}>
            ${unlocked ? "View" : "Locked"}
          </button>

          <button class="tier-btn-outline" onclick="copyCertificateText('${item.title}', ${unlocked})">
            Share
          </button>
        </div>
      </div>

    </div>
  `;
}

/* --- UI helpers --- */

function showHowItWorks() {
  alert(
`✅ Practice: Learn freely (No credits)
🔥 Workout: Timed mode (Earn credits)
🎓 Unlock Bronze/Silver/Gold certificates`
  );
}

function copyCertificateText(title, unlocked) {
  if (!unlocked) {
    alert("This certificate is locked 🔒 Earn more credits!");
    return;
  }
  const text = `🎓 I unlocked "${title}" in CIET Learning Platform 🔥`;
  navigator.clipboard.writeText(text);
  alert("Copied ✅ Paste it in WhatsApp/Instagram!");
}
