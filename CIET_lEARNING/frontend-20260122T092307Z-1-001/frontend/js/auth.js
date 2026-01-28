function signup() {
  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("roll").value.trim();
  const dept = document.getElementById("dept").value;
  const year = document.getElementById("year").value;
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (!name || !roll || !dept || !year || !password) {
    alert("Please fill all fields");
    return;
  }

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  const user = {
    name,
    roll,
    dept,
    year,
    password,
    credits: 0
  };

  localStorage.setItem("user", JSON.stringify(user));
 // window.location.href = "index.html";
 showWelcome(name);

}

function switchToLogin() {
  const card = document.querySelector(".auth-card");

  /* START WIPE */
  card.classList.add("animate");

  /* CHANGE CONTENT MID-WIPE */
  setTimeout(() => {
    document.getElementById("authTitle").innerText = "Sign In";
    document.getElementById("authBtn").innerText = "Sign In";
    document.getElementById("confirmPassword").style.display = "none";

    document.querySelector(".switch").innerHTML = `
      Don't have an account?
      <span onclick="switchToSignup()">Create Account</span>
    `;

    document.getElementById("authBtn").onclick = login;
  }, 400);

  /* CLEANUP */
  setTimeout(() => {
    card.classList.remove("animate");
  }, 800);
}

function switchToSignup() {
  const card = document.querySelector(".auth-card");

  card.classList.add("animate");

  setTimeout(() => {
    document.getElementById("authTitle").innerText = "Create Account";
    document.getElementById("authBtn").innerText = "Create Account";
    document.getElementById("confirmPassword").style.display = "block";

    document.querySelector(".switch").innerHTML = `
      Already have an account?
      <span onclick="switchToLogin()">Sign In</span>
    `;

    document.getElementById("authBtn").onclick = signup;
  }, 400);

  setTimeout(() => {
    card.classList.remove("animate");
  }, 800);
}

function login() {
  const roll = document.getElementById("roll").value.trim();
  const password = document.getElementById("password").value;

  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || user.roll !== roll || user.password !== password) {
    alert("Invalid credentials");
    return;
  }

  window.location.href = "index.html";
}
/* =======================
   CURSOR FOLLOW EFFECT
======================= */
/* =======================
   SMOOTH CURSOR FOLLOW (INERTIA)
======================= */
const cursorDot = document.querySelector(".cursor-dot");

let mouseX = 0;
let mouseY = 0;

let dotX = 0;
let dotY = 0;

const speed = 0.18; // lower = slower follow, higher = faster

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  // move dot gradually toward mouse
  dotX += (mouseX - dotX) * speed;
  dotY += (mouseY - dotY) * speed;

  cursorDot.style.left = dotX + "px";
  cursorDot.style.top = dotY + "px";

  requestAnimationFrame(animateCursor);
}

animateCursor();

/* Grow on interactive elements */
document.querySelectorAll("input, select, button, span").forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursorDot.classList.add("active");
  });
  el.addEventListener("mouseleave", () => {
    cursorDot.classList.remove("active");
  });
});


function showWelcome(name) {
  const overlay = document.getElementById("welcomeOverlay");
  const msg = document.getElementById("welcomeMsg");

  msg.innerText = `Welcome, ${name}`;
  overlay.classList.add("show");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
}


