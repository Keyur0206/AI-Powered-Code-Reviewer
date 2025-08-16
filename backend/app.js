import "dotenv/config";
import express from "express";
import { router as ai } from "./routes/ai.route.js";
const app = express();
import cors from 'cors'
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`App is listing on ${port}`);
});

app.use("/ai", ai);
