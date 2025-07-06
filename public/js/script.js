function toggleMenu(icon) {
  const nav = document.getElementById('navMenu');
  const menuIcon = icon.querySelector('i');
  if (nav.style.display === 'flex') {
    nav.style.display = 'none';
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  } else {
    nav.style.display = 'flex';
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
  }
}

function handleLike() {
  const isLoggedIn = localStorage.getItem("userLoggedIn");
  if (!isLoggedIn) {
    alert("Please login to like!");
    window.location.href = "login.html";
  } else {
    let countElement = document.getElementById("likeCount");
    let count = localStorage.getItem("likeCount") || "104000";
    count = parseInt(count) + 1;
    localStorage.setItem("likeCount", count);
    countElement.innerText = count >= 1000 ? (count / 1000).toFixed(1) + "k" : count;
  }
}

// ✅ Remove auto-redirect on page load
window.onload = function () {
  let countElement = document.getElementById("likeCount");
  let count = localStorage.getItem("likeCount") || "104000";
  countElement.innerText = count >= 1000 ? (count / 1000).toFixed(1) + "k" : count;

  // ❌ No redirect to login here — allow page to load freely
};

function logoutUser() {
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// ✅ Optional: For feedback form protection
const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", (e) => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");
    if (!isLoggedIn) {
      e.preventDefault();
      alert("Please login to submit feedback.");
      window.location.href = "login.html";
    }
  });
}
function toggleMenu(icon) {
  const nav = document.getElementById('navMenu');
  const menuIcon = icon.querySelector('i');
  if (nav.style.display === 'flex') {
    nav.style.display = 'none';
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  } else {
    nav.style.display = 'flex';
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
  }
}

function handleLike() {
  const isLoggedIn = localStorage.getItem("userLoggedIn");
  if (!isLoggedIn) {
    alert("Please login to like!");
    window.location.href = "login.html";
  } else {
    let countElement = document.getElementById("likeCount");
    let count = localStorage.getItem("likeCount") || "104000";
    count = parseInt(count) + 1;
    localStorage.setItem("likeCount", count);
    countElement.innerText = count >= 1000 ? (count / 1000).toFixed(1) + "k" : count;
  }
}

// ✅ Remove auto-redirect on page load
window.onload = function () {
  let countElement = document.getElementById("likeCount");
  let count = localStorage.getItem("likeCount") || "104000";
  countElement.innerText = count >= 1000 ? (count / 1000).toFixed(1) + "k" : count;

  // ❌ No redirect to login here — allow page to load freely
};

function logoutUser() {
  localStorage.removeItem("userLoggedIn");
  localStorage.removeItem("currentUser");
  window.location.href = "login.html";
}

// ✅ Optional: For feedback form protection
const feedbackForm = document.getElementById("feedbackForm");
if (feedbackForm) {
  feedbackForm.addEventListener("submit", (e) => {
    const isLoggedIn = localStorage.getItem("userLoggedIn");
    if (!isLoggedIn) {
      e.preventDefault();
      alert("Please login to submit feedback.");
      window.location.href = "login.html";
    }
  });
}
