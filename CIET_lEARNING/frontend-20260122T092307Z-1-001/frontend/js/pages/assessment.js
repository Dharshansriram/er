/*************************************************
 * ASSESSMENT PAGE – MAIN CONTROLLER
 *************************************************/

function AssessmentPage() {

  // SAFETY CHECK
  if (!AppState.session || !AppState.session.questions.length) {
    return `
      <div class="assessment">
        <h2>No questions loaded</h2>
        <p>Please start from Training page.</p>
      </div>
    `;
  }

  const q = getCurrentQuestion();
  const showTimer = AppState.mode === "workout";

  if (!q) {
    return `
      <div class="assessment">
        <h2>Assessment Completed 🎉</h2>
        <p>You have completed all questions.</p>
        <button class="submit-btn" onclick="navigate('dashboard')">
          Go to Dashboard
        </button>
      </div>
    `;
  }

  // START TIMER ONLY ONCE (WORKOUT MODE)
  setTimeout(() => {
    if (showTimer && AppState.session.index === 0) {
      startTimer(15); // 15 minutes
    }
  }, 100);

  return `
    <div class="assessment">

      <div class="assessment-header">
        <h2>
          ${AppState.skill.toUpperCase()} · ${AppState.mode.toUpperCase()}
          (${AppState.session.index + 1} / ${AppState.session.questions.length})
        </h2>

        ${showTimer ? `<div class="timer" id="timer">--:--</div>` : ""}
      </div>

      ${
        AppState.skill === "aptitude"
          ? renderAptitude(q)
          : renderDsa(q)
      }

    </div>
  `;
}







/*************************************************
 * APTITUDE – MCQ SECTION
 *************************************************/

function renderAptitude(q) {
  return `
    <div class="question-card">

      <p class="problem">${q.question}</p>

      <div class="options">
        ${q.options.map((opt, i) => `
          <label class="mcq-option">
            <input type="radio" name="mcq" value="${i}">
            ${opt}
          </label>
        `).join("")}
      </div>

      <button class="submit-btn" onclick="submitAptitude(${q.correctAnswer})">
        Submit & Next
      </button>

    </div>
  `;
}

function submitAptitude(correctAnswer) {
  const selected = document.querySelector("input[name='mcq']:checked");
  if (!selected) return alert("Select an option");

  recordAttempt({
    questionId: getCurrentQuestion().id,
    skill: "aptitude",
    difficulty: getCurrentQuestion().difficulty,
    isCorrect: selected.value === correctAnswer
  });

  nextQuestion();
}







/*************************************************
 * DSA – CODING SECTION
 *************************************************/

function renderDsa(q) {
  return `
    <div class="question-card">

      <h3>${q.title}</h3>

      <p class="problem">${q.description}</p>

      ${
        q.examples
          ? `<div class="examples">
              <h4>Examples</h4>
              ${q.examples
                .map(
                  ex => `
                    <pre>
Input: ${ex.input}
Output: ${ex.output}
${ex.explanation ? "Explanation: " + ex.explanation : ""}
                    </pre>
                  `
                )
                .join("")}
            </div>`
          : ""
      }

      ${
        q.constraints
          ? `<div class="constraints">
              <h4>Constraints</h4>
              <ul>
                ${q.constraints.map(c => `<li>${c}</li>`).join("")}
              </ul>
            </div>`
          : ""
      }

      ${
        q.hints
          ? `<details class="hints">
              <summary>Hints</summary>
              <ul>
                ${q.hints.map(h => `<li>${h}</li>`).join("")}
              </ul>
            </details>`
          : ""
      }

      <textarea
        id="codeAnswer"
        rows="10"
        placeholder="// Write your solution here..."
      ></textarea>

      <button class="submit-btn" onclick="submitDsa()">
        Submit & Next
      </button>

    </div>
  `;
}

function submitDsa() {
  const code = document.getElementById("codeAnswer").value.trim();
  if (!code) return alert("Write your solution");

  recordAttempt({
    questionId: getCurrentQuestion().id,
    skill: "dsa",
    difficulty: getCurrentQuestion().difficulty,
    isCorrect: true // backend later
  });

  nextQuestion();
}


