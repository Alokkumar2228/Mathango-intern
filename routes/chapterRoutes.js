import express from "express";
import { uploadChpter, getAllChapters, getChapterById } from "../controller/chapterController.js";
import adminAuth from "../middeware/adminAuth.js";
import multer from "multer";
import rateLimit from "../middeware/rateLimit.js"

const chapterRouter = express.Router();

// Use memoryStorage
const storage = multer.memoryStorage();
const upload = multer({ storage });

chapterRouter.get('/chapters',rateLimit, getAllChapters);
chapterRouter.get('/chapters/:id',rateLimit, getChapterById);
chapterRouter.post('/chapters',rateLimit, adminAuth, upload.single('file'), uploadChpter);

export default chapterRouter;
