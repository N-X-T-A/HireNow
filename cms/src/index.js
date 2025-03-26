import express from "express";
import dotenv from "dotenv";
import { connectDB } from "#config/db.js";
import adminRouter from "#config/admin.js";


dotenv.config();

const PORT = process.env.APP_PORT || 8000;
const HOST = process.env.APP_HOST || "localhost";

const app = express();
connectDB();

app.use("/admin", adminRouter);

app.listen(PORT, () => {
    console.log(`🚀 AdminJS is running on http://${HOST}:${PORT}/admin/login`);
});
