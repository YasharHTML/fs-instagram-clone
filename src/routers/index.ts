import { Router } from "express";
import { AuthRouter } from "./auth";
import { UserRouter } from "./user";
import { FileRouter } from "./files";
import { SearchRouter } from "./search";
import { PostRouter } from "./post";
import { FollowRouter } from "./follow";
import { LikeRouter } from "./like";

const router = Router();

router.use(AuthRouter);
router.use(UserRouter);
router.use(FileRouter);
router.use(SearchRouter);
router.use(PostRouter);
router.use(FollowRouter);
router.use(LikeRouter);

export { router };
