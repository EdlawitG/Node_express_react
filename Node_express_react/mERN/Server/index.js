import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import useRouter from './routes/tickets.js'
dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use('/',useRouter)
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.all("*", (req, res) => {
    res.send('The Page you are looking for does not exsit!')
});

app.listen(process.env.PORT, () =>
  console.log(`server is Listening at http://localhost:${process.env.PORT}`)
);
