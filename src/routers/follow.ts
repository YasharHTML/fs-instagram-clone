import { Router } from "express";
import { prismaClient } from "../data/prisma";

const router = Router();

router.get("/follows/following", async (req, res) => {
    try {
        if (!req.isAuthenticated())
            return res.status(401).json({ error: "Unauthenticated" });

        const id = req.user.id;

        const following = await prismaClient.user.findMany({
            where: {
                followers: {
                    some: {
                        followerId: id,
                    },
                },
            },
            select: {
                id: true,
                photo: true,
                username: true,
            },
        });

        res.json(following);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/follows/not-following", async (req, res) => {
    try {
        if (!req.isAuthenticated())
            return res.status(401).json({ error: "Unauthenticated" });

        const id = req.user.id;

        const following = await prismaClient.user.findMany({
            where: {
                AND: [
                    {
                        followers: {
                            none: {
                                followerId: id,
                            },
                        },
                    },
                    {
                        id: {
                            not: id,
                        },
                    },
                ],
            },
            select: {
                id: true,
                photo: true,
                username: true,
            },
        });

        res.json(following);
    } catch (error) {
        res.status(500).json(error);
    }
});

export { router as FollowRouter };
