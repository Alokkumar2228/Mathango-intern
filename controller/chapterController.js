import chapterModels from "../models/chapterModel.js"
import fs from 'fs/promises'
import CustomError from "../middeware/customError.js";
import redisClient from "../utils/redisClient.js";

const uploadChpter = async (req, res,next) => {
    try {
      if (!req.file) {
        return next(new CustomError("No file uploaded.", 400));
      }
  
      const rawContent = req.file.buffer.toString("utf-8");
  
      let parsedChapters;
      try {
        parsedChapters = JSON.parse(rawContent);
      } catch (err) {
        return next(new CustomError("Invalid JSON format.", 400));
      }
  
      if (!Array.isArray(parsedChapters)) {
        return next(new CustomError("Uploaded file must contain an array of chapters.", 400));
      }
  
      const failedChapters = [];
      const successfulChapters = [];
  
      for (const chapter of parsedChapters) {
        try {
          const newChapter = new chapterModels(chapter);
          await newChapter.validate(); // only validate
          successfulChapters.push(newChapter);
        } catch (validationError) {
          failedChapters.push({ chapter, error: validationError.message });
        }
      }
  
      if (successfulChapters.length > 0) {
        await chapterModels.insertMany(successfulChapters);
      }
  
      return res.status(200).json({
        message: `${successfulChapters.length} chapters uploaded.`,
        failed: failedChapters
      });
  
    } catch (err) {
      return next(err);
    }
  };



const getAllChapters = async (req, res, next) => {
    try {
      const { class: classFilter, unit, status, weakChapters, subject, page = 1, limit = 10 } = req.query;
  
      // Validate pagination
      if (isNaN(page) || page <= 0) {
        return next(new CustomError("Page must be a positive number", 400));
      }
      if (isNaN(limit) || limit <= 0) {
        return next(new CustomError("Limit must be a positive number", 400));
      }
  
      const query = {};
      if (classFilter) query.class = classFilter;
      if (unit) query.unit = unit;
      if (status) query.status = status;
      if (subject) query.subject = subject;
      if (weakChapters !== undefined) {
        query.isWeakChapter = weakChapters === "true";
      }
  
      const skip = (parseInt(page) - 1) * parseInt(limit);
  
      // Build a cache key based on the full query
    const cacheKey = `chapters:${JSON.stringify(req.query)}`;
    
    // Check Redis for cached data
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }
  
      const total = await chapterModels.countDocuments(query);
  
      if (skip >= total) {
        const response = {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          chapters: [],
          message: "No more chapters available for this page."
        };
        await redisClient.set(cacheKey, JSON.stringify(response),{EX:3600});
        return res.status(200).json(response);
      }
  
      const chapters = await chapterModels.find(query).skip(skip).limit(parseInt(limit));
  
      const response = {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        chapters
      };
  
      await redisClient.set(cacheKey, JSON.stringify(response),{EX:3600});
  
      return res.status(200).json(response);
    } catch (err) {
      return next(err);
    }
  };
  
  const getChapterById = async (req, res, next) => {
    try {
      const chapter = await chapterModels.findById(req.params.id);
      if (!chapter) {
        return next(new CustomError("Chapter not found", 404));
      }
      res.status(200).json(chapter);
    } catch (err) {
      return next(err);
    }
  };

export {uploadChpter, getAllChapters, getChapterById}