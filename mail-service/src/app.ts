import { config } from "dotenv";
config();

import express from "express";
import { sendMail } from "./services/mail";
import { verifyJwt } from "./providers/jwt";

const app = express();
app.use(express.json());

app.post("/create_email", (req, res) => {
    const { userId, email } = req.body;

    sendMail(userId, email)
        .then((value) => {
            res.json(value);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

app.post("/verify_token", (req, res) => {
    const token = req.body.token;

    try {
        res.json(verifyJwt(token));
    } catch (error) {
        res.status(500).json(error);
    }
});

app.listen(process.env.PORT, () => {
    console.log("Mail service is running on: " + process.env.PORT);
});
