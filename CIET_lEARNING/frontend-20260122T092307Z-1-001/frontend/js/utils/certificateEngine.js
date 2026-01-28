function initCertificates() {
  if (!AppState.certificates) {
    AppState.certificates = [];
  }
}

function generateCertificate(type, title) {
  const cert = {
    id: "CERT-" + Date.now(),
    type,               // aptitude | dsa | overall
    title,              // "Aptitude Mastery"
    name: AppState.user.name,
    dept: AppState.user.dept,
    year: AppState.user.year,
    date: new Date().toLocaleDateString(),
  };

  AppState.certificates.push(cert);
}

function checkCertificateEligibility() {
  const credits = AppState.credits || 0;

  // Prevent duplicates
  const existing = AppState.certificates.map(c => c.title);

  if (credits >= 100 && !existing.includes("Bronze Learner")) {
    generateCertificate("overall", "Bronze Learner");
  }

  if (credits >= 250 && !existing.includes("Silver Learner")) {
    generateCertificate("overall", "Silver Learner");
  }

  if (credits >= 500 && !existing.includes("Gold Learner")) {
    generateCertificate("overall", "Gold Learner");
  }
}
