function TrainingPage() {
  return `
    <div class="training">

      <div class="training-header">
        <h2>🧠 Training Hub</h2>
        <p>
          Practice concepts freely or attempt workouts to earn credits.
        </p>
      </div>

      <div class="training-grid">

        <div class="training-card">
          <h3>Aptitude</h3>
          <p>
            Improve numerical ability, logical reasoning and problem-solving skills.
          </p>

          <div class="training-actions">
            <button class="practice-btn" onclick="startPractice('aptitude')">
              Practice
            </button>
            <button class="workout-btn" onclick="startWorkout('aptitude')">
              Workout
            </button>
          </div>
        </div>

        <div class="training-card">
          <h3>DSA</h3>
          <p>
            Build strong data structures and algorithmic thinking.
          </p>

          <div class="training-actions">
            <button class="practice-btn" onclick="startPractice('dsa')">
              Practice
            </button>
            <button class="workout-btn" onclick="startWorkout('dsa')">
              Workout
            </button>
          </div>
        </div>

      </div>

    </div>
  `;
}

function startPractice(skill) {
  AppState.mode = "practice";
  AppState.skill = skill;

  startAssessmentSession(skill, "practice");

  navigate("assessment");
}

function startWorkout(skill) {
  AppState.mode = "workout";
  AppState.skill = skill;

  startAssessmentSession(skill, "workout");

  navigate("assessment");
}
