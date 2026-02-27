const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 3000;

//app.use(cors());
app.use(
  cors({
    origin: ["http://localhost", "http://localhost:5173"],
    credentials: true
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "EduTrack API running" });
});

const session = require("express-session");
const bcrypt = require("bcrypt");

app.use(
  session({
    secret: "super-secret-key", // move to .env later
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // true if using HTTPS
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);


app.post("/api/register",async (req, res) => {
  const {name, email, password} = req.body;

  if(!name || !email || !password){
    return res.status(400).json({message: "Missing fields."})
  }

  try{
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
    if(rows.length > 0){
      return res.status(400).json({message: "User already exists."})
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await pool.execute(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    const [userRows] = await pool.execute("SELECT id, name, email, required_hours FROM users WHERE id=?", [result.insertId]);
    res.json(userRows[0]);
  }catch(err){
    console.error(err);
    res.status(500).json({message: "Database error."})
  }
})

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // 🔥 Store user in session
    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    res.json({ message: "Login successful" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error." });
  }
});

app.post("/api/logs", requireAuth, async (req, res) => {
  const { date, hours, description } = req.body;
  const studentId = req.session.user.id;

  try {
    await pool.execute(
      "INSERT INTO logs (user_id, date, hours, description) VALUES (?, ?, ?, ?)",
      [studentId, date, hours, description]
    );

    res.json({ message: "Log entry created successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error." });
  }
});

app.put("/api/update-target-hours", requireAuth, async (req, res) => {
  const { requiredHours } = req.body;
  const studentId = req.session.user.id;

  if (!requiredHours) {
    return res.status(400).json({ message: "Missing fields." });
  }

  try {
    await pool.query(
      "UPDATE users SET required_hours = ? WHERE id = ?",
      [requiredHours, studentId]
    );

    res.json({ message: "Target hours updated successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error." });
  }
});

app.get("/api/user", requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, required_hours AS requiredHours FROM users WHERE id = ?",
      [req.session.user.id]
    );

    res.json(rows[0]);

  } catch (err) {
    res.status(500).json({ message: "Database error." });
  }
});

app.get("/api/logs", requireAuth, async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, user_id AS userId, date, hours, description, status FROM logs WHERE user_id = ? ORDER BY date DESC",
      [req.session.user.id]
    );

    res.json(rows);

  } catch (err) {
    console.error("Fetch logs error:", err);
    res.status(500).json({ message: "Database error." });
  }
});

function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized." });
  }
  next();
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});