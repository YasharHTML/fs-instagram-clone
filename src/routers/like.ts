import { Router } from "express";
import { prismaClient } from "../data/prisma";

const router = Router();

router.put("/likes/post/:id/toggle", async (req, res) => {
    try {
        if (!req.isAuthenticated())
            return res.status(401).json({ error: "Unauthenticated" });
        const id = req.params.id;
        const userId = req.user.id;

        const exists = await prismaClient.like.findUnique({
            where: {
                userId_postId: {
                    postId: id,
                    userId,
                },
            },
        });
        if (exists === null) {
            await prismaClient.like.create({
                data: {
                    postId: id,
                    userId,
                },
            });
        } else {
            await prismaClient.like.delete({
                where: {
                    userId_postId: {
                        postId: id,
                        userId,
                    },
                },
            });
        }

        res.json(true);
    } catch (error) {
        res.status(500).json(error);
    }
});

export { router as LikeRouter };
