import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

// ✅ ALL ROUTERS FROM /routers (NOT routes)
import authRouter from "./routers/auth.router.js";
import userRouter from "./routers/user.router.js";
import resumeRouter from "./routers/resume.router.js";
import planRouter from "./routers/plan.router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ================= Middleware ================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      process.env.CLIENT_URL,
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  })
);

/* ================= Routes ================= */
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/plans", planRouter);

/* ================= Health Check ================= */
app.get("/", (req, res) => {
  res.json({ message: "ATS Resume Builder API is running 🚀" });
});

/* ================= Error Handler ================= */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || "Something went wrong",
  });
});

/* ================= Start Server ================= */
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server Running at ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
