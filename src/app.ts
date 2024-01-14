import { config } from "dotenv";
config();

import express, { NextFunction, Request, Response } from "express";
import { router } from "./routers";
import { session } from "./session";
import { join } from "path";
import { passport } from "./auth/passport";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.enable("trust proxy");

app.use(session);
app.use(passport.authenticate("session"));

app.use("/api", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.message);
    res.status(500).json({ error: err });
});

export { app };

if (require.main === module) {
    const PORT = process.env.PORT;
    app.listen(PORT, () => {
        console.log(`Listening on PORT: ${PORT}, PID: ${process.pid}`);
    });
}
