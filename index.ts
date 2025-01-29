import express from "express";
import { search } from "./search";

const app = express();
const PORT = 3030;

app.use(express.json());

app.post("/chat", async (req, res) => {
  const query = req.body.query;

  const response = await search(query);

  res.json({ data: response.response });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
