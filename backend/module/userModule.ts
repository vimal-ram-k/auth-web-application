import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://admin:1605--Vr@myatlasclusteredu.x34edzz.mongodb.net/testing"
  )
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

const userScheme = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const userModule = mongoose.model("users", userScheme);
export default userModule;
