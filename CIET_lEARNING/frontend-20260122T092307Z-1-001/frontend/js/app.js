if (!AppState.user) {
  window.location.href = "auth.html";
}

document.getElementById("app").innerHTML = `
  ${Sidebar()}
  <main class="main" id="mainContent"></main>
`;

function navigate(page) {
  const main = document.getElementById("mainContent");

  if (page === "dashboard") {
    main.innerHTML = DashboardPage();
  }
  else if (page === "training") {
    main.innerHTML = TrainingPage();
  }
  else if (page === "assessment") {
    main.innerHTML = AssessmentPage();
  }
  else if (page === "certificates") {
    main.innerHTML = CertificatesPage();
  }

  else if (page === "leaderboard") {
    main.innerHTML = LeaderboardPage();
  }
    else if (page === "profile") {
    main.innerHTML = ProfilePage();
  }
  else {
    main.innerHTML = `
      <h2>${page.toUpperCase()}</h2>
      <p>Page under construction</p>
    `;
  }
}

// ✅ run once
initCredits();
initCertificates();

navigate("dashboard");
