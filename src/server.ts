import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Hello from Classroom!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
