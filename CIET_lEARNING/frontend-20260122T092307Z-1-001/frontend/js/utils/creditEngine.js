function initCredits() {
  if (AppState.credits === undefined) {
    AppState.credits = 0;
  }

  if (!AppState.badges) {
    AppState.badges = [];
  }
}

/* -------------------------------
   CREDIT CALCULATION
-------------------------------- */

function calculateCredits(attempt) {
  if (AppState.mode !== "workout") return 0;
  if (!attempt.isCorrect) return 0;

  if (attempt.difficulty === "advanced") return 10;
  if (attempt.difficulty === "pro") return 20;

  return 0;
}

/* -------------------------------
   APPLY CREDITS  ✅ IMPORTANT
-------------------------------- */

function applyCredits(attempt) {
  const earned = calculateCredits(attempt);

  // Update credits safely
  AppState.credits += earned;

  // Check badges
  checkBadges();

  // ✅ THIS IS WHERE YOU ADD IT
  checkCertificateEligibility();
}

/* -------------------------------
   BADGES
-------------------------------- */

function checkBadges() {
  if (!AppState.badges.includes("Starter")) {
    AppState.badges.push("Starter");
  }

  if (AppState.credits >= 100 && !AppState.badges.includes("Bronze")) {
    AppState.badges.push("Bronze");
  }

  if (AppState.credits >= 250 && !AppState.badges.includes("Silver")) {
    AppState.badges.push("Silver");
  }

  if (AppState.credits >= 500 && !AppState.badges.includes("Gold")) {
    AppState.badges.push("Gold");
  }
}
