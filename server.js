// ✅ Full server.js backend for OwnMic website
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const app = express();

const USERS_FILE = path.join(__dirname, "data", "users.json");
const OTP_FILE = path.join(__dirname, "data", "otpStore.json");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// 🔒 Encrypt password
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// 📤 Send OTP (dummy via console)
function sendOtp(email, otp) {
  console.log(`OTP for ${email}: ${otp}`);
}

// 📁 Load JSON
function loadJSON(filePath) {
  if (!fs.existsSync(filePath)) return {};
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

// 💾 Save JSON
function saveJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// 📥 Signup
app.post("/api/signup", (req, res) => {
  const { email, password } = req.body;
  const users = loadJSON(USERS_FILE);
  if (users[email]) return res.status(409).json({ success: false, message: "User already exists" });
  const otp = Math.floor(100000 + Math.random() * 900000);
  const otpStore = loadJSON(OTP_FILE);
  otpStore[email] = { otp, password: hashPassword(password) };
  saveJSON(OTP_FILE, otpStore);
  sendOtp(email, otp);

  res.status(200).send("OTP sent");
});

// 🔐 Verify OTP
app.post("/api/verify", (req, res) => {
  const { email, otp, username } = req.body;
  const otpStore = loadJSON(OTP_FILE);
  const users = loadJSON(USERS_FILE);
  if (!otpStore[email] || otpStore[email].otp != otp) return res.status(400).json({ success: false, message: "Invalid OTP" });

  users[email] = {
    username,
    password: otpStore[email].password
  };
  saveJSON(USERS_FILE, users);
  delete otpStore[email];
  saveJSON(OTP_FILE, otpStore);

  res.status(200).json({ success: true, message: "Account created" });
});

// 🔓 Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const users = loadJSON(USERS_FILE);
  const user = users[email];
  if (!user || user.password !== hashPassword(password)) return res.status(401).json({ success: false, message: "Invalid credentials" });
  res.status(200).json({ success: true, user: { username: user.username } });
});

// 🚪 Logout handled on frontend (just clear localStorage)

// 🚀 Server start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
