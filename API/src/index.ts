import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());


app.get("/", (req, res) => {
    res.send("Hello, Typescript with express server")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});