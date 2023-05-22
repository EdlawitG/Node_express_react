import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import useRouter from "./routes/tickets.js";
// import multer from "multer";
// import path from 'path';
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/", useRouter);

// const storage = multer.diskStorage({
//   destination:path.join(__dirname,'../public/','uploads'),
//   filename: (req,file,cb) => {
//     cb(null,file.originalname)
//   }
// })

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.all("*", (req, res) => {
  res.send("The Page you are looking for does not exsit!");
});

app.listen(process.env.PORT || 4000, () =>
  console.log(`server is Listening at http://localhost:${process.env.PORT}`)
);
