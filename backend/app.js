import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import productsRouter from "./routes/productRoutes.js";
import usersRouter from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());

app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
