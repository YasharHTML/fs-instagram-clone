import { Router } from "express";
import { prismaClient } from "../data/prisma";

const router = Router();

router.get("/user/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const { email, photo, username, dob } =
            await prismaClient.user.findUniqueOrThrow({
                where: { id },
            });
        res.json({ email, photo, username, dob });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/user/follows/all/:id", async (req, res) => {
    const full = req.query.full;
    try {
        const id = req.params.id;
        const result = await prismaClient.$transaction([
            prismaClient.follow.findMany({
                where: { followerId: id },
                select: {
                    following: {
                        select: {
                            photo: true,
                            username: true,
                        },
                    },
                },
            }),
            prismaClient.follow.findMany({
                where: { followingId: id },
                select: {
                    follower: {
                        select: {
                            photo: true,
                            username: true,
                        },
                    },
                },
            }),
        ]);

        res.json({ following: result[0], followers: result[1] });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/user/follow/:id", async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const followerId = req.user.id;
            const followingId = req.params.id;

            if (followerId === followingId) {
                throw new Error("How can you even follow yourself");
            }

            const exists = await prismaClient.follow.findUnique({
                where: {
                    followerId_followingId: {
                        followerId,
                        followingId,
                    },
                },
            });
            res.json(!!exists);
        } else {
            res.status(401).json({ error: "unauthenticated" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/user/socials/:id", async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const sessionUserId = req.user.id;
            const userId = req.params.id;

            if (userId !== sessionUserId)
                return res.status(403).json({ error: "Forbidden" });

            const { username, dob } = req.body;
            console.log(username, new Date(dob));

            const user = await prismaClient.user.update({
                where: { id: sessionUserId },
                data: {
                    username,
                    dob: new Date(dob),
                },
            });

            console.log(user);

            res.json(true);
        } else {
            res.status(401).json({ error: "Unauthenticated" });
        }
    } catch (error) {}
});

router.put("/user/follow/:id", async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const followerId = req.user.id;
            const followingId = req.params.id;

            await prismaClient.follow.create({
                data: {
                    followerId,
                    followingId,
                },
            });
            res.json(true);
        } else {
            res.status(401).json({ error: "unauthenticated" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/user/follow/:id", async (req, res) => {
    try {
        if (req.isAuthenticated()) {
            const followerId = req.user.id;
            const followingId = req.params.id;

            await prismaClient.follow.delete({
                where: {
                    followerId_followingId: {
                        followerId,
                        followingId,
                    },
                },
            });
            res.json({ status: true });
        } else {
            res.status(401).json({ error: "unauthenticated" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

export { router as UserRouter };
