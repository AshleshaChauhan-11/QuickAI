import express from "express";
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware } from "@clerk/express";
import aiRouter from "./routes/aiRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Clerk middleware
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Server is Live!");
});

// AI Routes
app.use("/api/ai", aiRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});