import { Router } from "express";
import { prismaClient } from "../data/prisma";

const router = Router();

router.get("/search", async (req, res) => {
    try {
        const rawQuery = req.query.query;
        if (typeof rawQuery !== "string")
            return res.status(400).json({ error: "query must be string" });
        const decodedQuery = decodeURIComponent(rawQuery.trim());
        if (!decodedQuery)
            return res.status(400).json({ error: "query is invalid" });

        const data = await prismaClient.$transaction([
            prismaClient.user.findMany({
                where: {
                    OR: [
                        {
                            email: {
                                contains: decodedQuery,
                            },
                        },
                        {
                            email: {
                                search: decodedQuery,
                            },
                        },
                        {
                            username: {
                                contains: decodedQuery,
                            },
                        },
                        {
                            username: {
                                search: decodedQuery,
                            },
                        },
                    ],
                },
                select: {
                    email: true,
                    _count: { select: { followers: true, following: true } },
                    photo: true,
                    username: true,
                    id: true,
                },
            }),
        ]);

        res.json({ users: data[0] });
    } catch (error) {
        res.status(500).json(error);
    }
});

export { router as SearchRouter };
