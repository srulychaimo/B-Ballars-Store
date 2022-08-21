import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/productRoutes.js";
import usersRouter from "./routes/userRoutes.js";
import passwordResetRouter from "./routes/passwordReset.js";
import uploadRouter from "./routes/uploadRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import morgan from "morgan";

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/password-reset", passwordResetRouter);

app.get("/api/config/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID);
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
