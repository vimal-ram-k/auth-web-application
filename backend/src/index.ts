import express from "express";
import dotenv from "dotenv";
import { Request, Response } from "express";
import cors from "cors";
dotenv.config();

const app = express();
const userModule = require("../module/userModule");
import postrouter from "../controller/post";
import userRouter from "../controller/user";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hi");
});

app.use("/", postrouter);
app.use("/", userRouter);

app.listen(8000, () => {
  console.log("Hi I'm listening");
});
