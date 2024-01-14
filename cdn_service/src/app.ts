import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";

const app = express();

app.use(
    cors({
        credentials: false,
        methods: "GET,HEAD",
    })
);

app.use(express.static(process.env.FILES_PATH!));

app.listen(process.env.PORT, () => {
    console.log("CDN IS READY AT: " + process.env.PORT);
});
