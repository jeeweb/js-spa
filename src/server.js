import express from "express";
import path from "path";

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

app.use("/src", express.static(path.resolve(__dirname, "src")));

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "index.html"));
});

const handleListening = () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
