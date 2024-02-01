import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/user/profiles");
  },
  filename: (req, file, cb) => {
    const file_ext = req.file?.originalname.split(".")[1];
    const random_number = Math.random() * 16;
    if (file_ext) {
      cb(null, `${random_number + "." + file_ext}}`);
    }
  },
});

export const upload = multer({ storage: storage });
