import Express from "express";
const postrouter = Express.Router();
import { Response } from "express";
import { upload } from "../module/multer";
import ExtendedRequest from "../extenedtypes/ExtendedRequest.ds";

postrouter.post(
  "/profile-upload",
  upload.single("file"),
  (req: ExtendedRequest, res: Response) => {
    console.log("Hi multer");
    try {
      console.log("File received:", req.file);
      res.status(200).json({ message: "file uploaded" });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "file upload failed" });
    }
  }
);

export default postrouter;
