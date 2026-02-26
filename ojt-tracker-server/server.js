const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "EduTrack API running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


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

    const [result] = await pool.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, password]);

    const [userRows] = await pool.execute("SELECT id, name, email, required_hours FROM users WHERE id=?", [result.insertId]);
    res.json(userRows[0]);
  }catch(err){
    console.error(err);
    res.status(500).json({message: "Database error."})
  }
})

app.post("/api/logs", async (req, res) => {
  const { studentId, date, hours, description } = req.body;

  try{
    await pool.execute("INSERT INTO logs (user_id, date, hours, description) VALUES (?, ?, ?, ?)", [studentId, date, hours, description]);
    res.json({ message: "Log entry created successfully" });
  }catch(err){
    console.log(err);
    res.status(500).json({message: "Database error."})
  }
})

app.get("/api/logs/:userId", async (req, res) => {
  const { userId } = req.params;
  try{
    const [rows] = await pool.execute("SELECT * FROM logs WHERE user_id = ? ORDER BY date DESC", [userId]);

    res.json(rows);
  }catch(err){
    console.log(err);
    res.status(500).json({message: "Database error."})
  }
})

app.put("/api/update-target-hours", async (req, res) => {
  const { studentId, requiredHours } = req.body;
  if(!requiredHours){
    return res.status(400).json({message: "Missing fields."})
  }

  try{
    await pool.query("UPDATE users SET required_hours = ? WHERE id = ?", [requiredHours, studentId]);
    console.log("Student ID:", studentId);
    res.json({ message: "Target hours updated successfully" });
  }catch(err){
    console.log(err);
    res.status(500).json({message: "Database error."})
  }
})

app.get("/api/user/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, required_hours AS requiredHours FROM users WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(rows[0]);

  } catch (err) {
    console.error("Fetch user error:", err);
    res.status(500).json({ message: "Database error." });
  }
});

app.get("/api/logs/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT id, user_id AS userId, date, hours, description, status FROM logs WHERE user_id = ? ORDER BY date DESC",
      [userId]
    );

    res.json(rows);

  } catch (err) {
    console.error("Fetch logs error:", err);
    res.status(500).json({ message: "Database error." });
  }
});