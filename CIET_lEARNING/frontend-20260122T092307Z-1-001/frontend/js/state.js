

const AppState = {

  user: JSON.parse(localStorage.getItem("user")) || null,

 
  skill: null,     // "aptitude" | "dsa"
  mode: null,      // "practice" | "workout"


  session: {
    questions: [], 
    index: 0       // current question index
  },


  sessionResult: {
    startTime: null,
    endTime: null,
    attempts: []   // each attempt stored here
  },


  credits: 0,
  badges: [],


  attempted: {
    aptitude: [],
    dsa: []
  }
};
