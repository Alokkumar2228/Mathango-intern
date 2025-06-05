import mongoose from "mongoose";

const yearWiseQuestionCountSchema = new mongoose.Schema({
  2019: { type: Number, min: 0, required: true },
  2020: { type: Number, min: 0, required: true },
  2021: { type: Number, min: 0, required: true },
  2022: { type: Number, min: 0, required: true },
  2023: { type: Number, min: 0, required: true },
  2024: { type: Number, min: 0, required: true },
  2025: { type: Number, min: 0, required: true }
}, { _id: false });

const chapterSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  chapter: { type: String, required: true },
  class: { type: String, required: true },
  unit: { type: String, required: true },
  yearWiseQuestionCount: { type: yearWiseQuestionCountSchema, required: true },
  questionSolved: { type: Number, min: 0, required: true },
  status: { 
    type: String, 
    enum: ["Not Started", "In Progress", "Completed"], 
    required: true 
  },
  isWeakChapter: { type: Boolean, required: true }
}, { timestamps: true });

const chapterModels = mongoose.models.ChapterProgress || mongoose.model("chapterModels", chapterSchema);

export default chapterModels;
