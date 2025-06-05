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
  res.send('Hello World!');
});

app.use("/api/v1", chapterRouter)

//error handler
app.use(errorHandler);


app.listen(port , ()=>{
    console.log(`Server is running on port ${port}`)
})