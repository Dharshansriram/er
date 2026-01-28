function initScoreEngine() {
  AppState.sessionResult = {
    startTime: Date.now(),
    attempts: []
  };
}

function recordAttempt({ questionId, skill, difficulty, isCorrect }) {
  const attempt = {
    questionId,
    skill,
    difficulty,
    isCorrect,
    time: Date.now()
  };



  AppState.sessionResult.attempts.push(attempt);

    logAttemptAnalytics(isCorrect);

  applyCredits(attempt); // ✅ ONLY THIS
}

function finishAssessment() {
  AppState.sessionResult.endTime = Date.now();

  const total = AppState.sessionResult.attempts.length;
  const correct = AppState.sessionResult.attempts.filter(a => a.isCorrect).length;
   
  checkCertificateEligibility();
  
  alert(`Assessment Completed 🎉
Score: ${correct} / ${total}`);

  navigate("dashboard");
}
