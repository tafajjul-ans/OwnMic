// js/auth.js

// Utility to show alerts
function showAlert(message) {
  alert(message);
}

// ===== SIGNUP FORM =====
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      fullname: signupForm.fullname.value,
      email: signupForm.email.value,
      username: signupForm.username.value,
      password: signupForm.password.value,
    };

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        localStorage.setItem("tempUser", data.username);
        showAlert("OTP sent to your email!");
        window.location.href = "otp.html";
      } else {
        showAlert(result.message || "Signup failed");
      }
    } catch (err) {
      showAlert("Something went wrong");
    }
  });
}

// ===== LOGIN FORM =====
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      username: loginForm.username.value,
      password: loginForm.password.value,
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (result.success) {
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("currentUser", result.user.username);
        showAlert("Login successful!");
        window.location.href = "index.html";
      } else {
        showAlert(result.message || "Login failed");
      }
    } catch (err) {
      showAlert("Error logging in");
    }
  });
}

// ===== OTP FORM =====
const otpForm = document.getElementById("otpForm");
if (otpForm) {
  otpForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = localStorage.getItem("tempUser");
    const otp = otpForm.otp.value;

    try {
      const res = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, otp }),
      });

      const result = await res.json();

      if (result.success) {
        localStorage.removeItem("tempUser");
        showAlert("Account verified successfully!");
        window.location.href = "login.html";
      } else {
        showAlert(result.message || "Invalid OTP");
      }
    } catch (err) {
      showAlert("Verification error");
    }
  });
}

// ===== Resend OTP =====
function resendOTP() {
  const username = localStorage.getItem("tempUser");
  if (!username) return showAlert("No user found");

  fetch("/api/resend-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.success) {
        showAlert("OTP resent!");
      } else {
        showAlert(result.message);
      }
    })
    .catch(() => {
      showAlert("Failed to resend OTP");
    });
}
