// backend/index.js
const express = require("express");
const app = express();
const PORT = 5002;

// A sample API route
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from the backend API!" });
});

app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});
