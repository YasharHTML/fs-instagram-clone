import { Router } from "express";
import { fileUpload } from "../data/multer";
import { prismaClient } from "../data/prisma";

const router = Router();

router.post("/files/upload", fileUpload.single("photo"), (req, res) => {
    try {
        if (req.isAuthenticated()) {
            if (req.file) {
                prismaClient.user.update({
                    where: {
                        id: req.user.id,
                    },
                    data: {
                        photo: process.env.CDN_SERVICE_URL + "/" + req.file.filename
                    }
                })
                res.json(true);
            } else {
                res.status(400).json({ error: "No file uploaded" });
            }
        } else {
            res.status(401).json({ error: "Unauthenticated" });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

export { router as FileRouter };
