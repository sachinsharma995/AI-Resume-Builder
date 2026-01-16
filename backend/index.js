import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connetDB from "./config/db.js";
import cors from "cors";
import authRouter from "./routers/auth.router.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

// Allow CORS from local dev frontends (handles varying dev ports like 5173/5174/5175)
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      // Allow any localhost origin (http) for development
      if (origin.startsWith("http://localhost")) return callback(null, true);
      // Fallback: allow if matches env CLIENT_URL
      const clientUrl = process.env.CLIENT_URL;
      if (clientUrl && origin === clientUrl) return callback(null, true);
      return callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/auth", authRouter);

app.listen(port, () => {
  connetDB();
  console.log(`Server Running at ${port}`);
});
