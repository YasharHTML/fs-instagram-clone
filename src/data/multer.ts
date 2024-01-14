import multer, { diskStorage } from "multer";
import path from "path";

const storage = diskStorage({
    destination: process.env.UPLOADS_FOLDER,
    filename: (req, file, callback) => {
        if (!req.user) return callback(new Error("Unauthenticated"), "");
        callback(null, `${req.user?.id}${path.extname(file.originalname)}`);
    },
});

export const fileUpload = multer({ storage });
