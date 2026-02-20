const express = require("express");
const cors = require("cors");

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

let users = []
let logs = []

app.post("/api/register",(req, res) => {
  const {name, email, password} = req.body;

  if(!name || !email || !password){
    return res.status(400).json({message: "Missing fields."})
  }

  const exists = users.find(u => u.email === email);
  if(exists){
    return res.status(400).json({message: "User already exists."})
  }

  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password,
    currentHours: 0,
    requiredHours: 300
  };

  users.push(newUser);

  res.json({ message: "User registered successfully" });
})