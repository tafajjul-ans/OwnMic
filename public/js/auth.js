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

      const text = await res.text();

      if (res.ok) {
        localStorage.setItem("tempUser", data.username);
        localStorage.setItem("email", data.email);
        localStorage.setItem("password", data.password);
        showAlert("OTP sent to your email!");
        window.location.href = "otp.html";
      } else {
        showAlert(text || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
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
      email: loginForm.email.value,
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

    const email = localStorage.getItem("email");
    const username = localStorage.getItem("tempUser");
    const otp = otpForm.otp.value;

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, otp }),
      });

      const result = await res.json();

      if (result.success) {
        localStorage.removeItem("tempUser");
        localStorage.removeItem("email");
        localStorage.removeItem("password");
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
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  if (!email || !password) return showAlert("Missing email or password");

  fetch("/api/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.text())
    .then(() => showAlert("OTP resent!"))
    .catch(() => {
      showAlert("Failed to resend OTP");
    });
    }
