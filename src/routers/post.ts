import { Router } from "express";
import { prismaClient } from "../data/prisma";

const router = Router();

router.get("/posts/user_based", async (req, res) => {
    try {
        if (!req.isAuthenticated())
            return res.status(401).json({ error: "Unauthenticated" });

        const id = req.user.id;
        const posts = await prismaClient.post.findMany({
            where: {
                user: {
                    followers: {
                        some: {
                            followerId: id,
                        },
                    },
                },
            },
            select: {
                body: true,
                title: true,
                id: true,
                photo: true,
                user: {
                    select: {
                        id: true,
                        photo: true,
                        username: true,
                    },
                },
                _count: {
                    select: {
                        Like: true,
                    },
                },
                Like: {
                    where: {
                        userId: id,
                    },
                },
            },
        });

        res.json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/posts/user/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const post = await prismaClient.post.findMany({
            where: { userId: id },
            orderBy: {
                createdAt: "desc",
            },
        });
        res.json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/posts/liked", async (req, res) => {
    try {
        if (!req.isAuthenticated())
            return res.status(401).json({ error: "Unauthenticated" });

        const id = req.user.id;
        const posts = await prismaClient.post.findMany({
            where: {
                Like: {
                    some: {
                        userId: id,
                    },
                },
            },
            select: {
                body: true,
                photo: true,
                title: true,
                userId: true,
                id: true,
                Like: {
                    select: {
                        userId: true,
                    },
                },
            },
        });

        res.json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});

export { router as PostRouter };
