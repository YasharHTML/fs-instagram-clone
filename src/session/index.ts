import _session from "express-session";
import RedisStore from "connect-redis";
import { client } from "../data/redis";

const expiryTime = 1000 * 60 * 60 * 24 * 7;

const store = new RedisStore({
    client: client,
    prefix: "myapp:",
});

export const session = _session({
    store,
    secret: process.env.SESSION_SECRET!,
    cookie: {
        httpOnly: true,
        secure: "auto",
        maxAge: expiryTime,
    },
    saveUninitialized: false,
    resave: false,
});
