import express from "express";
import chapterRouter from "./routes/chapterRoutes.js";
import dotenv from "dotenv";
import connectDB from "./db/db.js";
import errorHandler from "./middeware/errorHandler.js";

dotenv.config();
const app = express();

const port = 3000;

app.use(express.urlencoded({extended:true}))
//middleware
app.use(express.json())

connectDB();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: ' Welcome to the Chapter Performance Dashboard API!',
        available_routes: {
            'GET /api/v1/chapters': 'Get all chapters (supports filters, pagination, and caching)',
            'GET /api/v1/chapters/:id': 'Get a specific chapter by ID',
            'POST /api/v1/chapters': 'Upload chapters (Admin only — send x-api-key: admin@mathango as header)',
        },
        filters_supported_on_GET_all_chapters: ['class', 'unit', 'status', 'subject', 'weakChapters'],
        pagination: {
            params: ['page', 'limit'],
            example: '/api/v1/chapters?page=2&limit=10'
        },
        notes: [
            '✅ Redis caching applied to GET /api/v1/chapters for 1 hour.',
            '🔁 Cache is invalidated automatically on new chapter upload.',
            '🔒 Rate limited to 30 requests/minute per IP using Redis.',
            '🔐 Chapter upload is restricted — send header x-api-key: admin@mathango',
        ],
    });
});

app.use("/api/v1", chapterRouter)

//error handler
app.use(errorHandler);


app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})