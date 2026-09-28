const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://frontend-sand-six-37.vercel.app",
    ],
  })
);
app.use(express.json());

const MOCK_USER = {
  email: "maker@hearthline.studio",
  password: "Studio@2026",
  name: "Prathap",
  role: "Studio lead",
};

app.get("/", (req, res) => {
  res.json({ ok: true, service: "Hearthline API" });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  const emailMatches = String(email).trim().toLowerCase() === MOCK_USER.email;
  const passwordMatches = String(password) === MOCK_USER.password;

  if (!emailMatches || !passwordMatches) {
    return res.status(401).json({
      success: false,
      message: "Those credentials don't match our studio records.",
    });
  }

  return res.json({
    success: true,
    message: "Welcome back to Hearthline.",
    user: {
      name: MOCK_USER.name,
      email: MOCK_USER.email,
      role: MOCK_USER.role,
    },
  });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Hearthline API running on http://localhost:${PORT}`);
  });
}

module.exports = app;
