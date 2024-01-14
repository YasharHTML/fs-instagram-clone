import { Router } from "express";
import { passport } from "../auth/passport";
import { prismaClient } from "../data/prisma";
import axios from "axios";
import { hash } from "bcrypt";

const router = Router();

router.get("/auth/me", (req, res) => {
    if (req.isAuthenticated()) res.json(req.user);
    else res.status(401).json({ error: "Unauthenticated" });
});

router.post("/auth/login", passport.authenticate("local.login"), (req, res) => {
    if (req.body.remember) {
        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // Cookie expires after 30 days
    } else {
        req.session.cookie.maxAge = 12 * 60 * 60 * 1000; // Cookie expires after half a day
    }
    res.redirect("/");
});

router.post("/auth/verify_token", async (req, res) => {
    const token = req.body.token;
    try {
        const result = await axios.post(
            `${process.env.MAIL_SERVICE_URL}/verify_token`,
            {
                token,
            }
        );

        res.json(result.data);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/auth/change-password", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    const password = req.body.password;
    if (!password)
        return res.status(400).json({ error: "password doesn't exist" });
    if (!token) return res.status(401).json({ error: "unauthenticated" });
    try {
        const result = (
            await axios.post(`${process.env.MAIL_SERVICE_URL}/verify_token`, {
                token,
            })
        ).data;

        const uid = result.uid;

        const user = await prismaClient.user.update({
            where: { id: uid },
            data: {
                password: await hash(password, 10),
            },
        });
        res.json("Password changed");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/auth/forgot-password", async (req, res) => {
    try {
        const email = req.body.email;
        if (!email) return res.json({ done: 1 });

        const user = await prismaClient.user.findUnique({ where: { email } });

        if (!user) {
            return res.json({ done: 1 });
        }

        if (user.password === null) {
            return res.json({ done: 1 });
        }

        await axios.post(`${process.env.MAIL_SERVICE_URL}/create_email`, {
            userId: user.id,
            email: user.email,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }

    res.json({ done: 0 });
});

router.post(
    "/auth/register",
    passport.authenticate("local.register", {
        successRedirect: "/",
    })
);

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "/",
    })
);

router.delete("/auth/logout", (req, res, next) => {
    console.log(req.user);
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        res.json({});
    });
});

export { router as AuthRouter };
