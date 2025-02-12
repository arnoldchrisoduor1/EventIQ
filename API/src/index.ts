import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from './routes/auth.route';
import eventsRoutes from "./routes/event.route";
import { connectionDB } from "./db/connectDB";

dotenv.config({ path: './src/.env' });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/events", eventsRoutes);


app.get("/", (req, res) => {
    res.send("Hello, Typescript with express server")
});

app.listen(PORT, () => {
    connectionDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});