function startAssessmentSession(skill, mode) {
  let questions = [];

  if (skill === "aptitude") {
    questions = getAptitudeQuestions(mode);
  }

  if (skill === "dsa") {
    questions = getDsaQuestions(mode);
  }

  AppState.session = {
    questions: shuffleArray(questions).slice(0, 50),
    index: 0
  };

  initScoreEngine();
}

function getCurrentQuestion() {
  return AppState.session.questions[AppState.session.index];
}

function nextQuestion() {
  AppState.session.index++;

  if (AppState.session.index >= AppState.session.questions.length) {
    stopTimer && stopTimer();
    finishAssessment();
  } else {
    navigate("assessment");
  }
}
