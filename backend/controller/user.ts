import express, { Router } from "express";
import { Response } from "express";
import ExtendedRequest from "../extenedtypes/ExtendedRequest.ds";
const userRouter: Router = express.Router();
import userModule from "../module/userModule";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

userRouter.post("/signup", async (req: ExtendedRequest, res: Response) => {
  const checkUserExists = await userModule
    .findOne({ username: req.body.username })
    .then((user) => {
      return user;
    });

  if (!checkUserExists) {
    const hashed_password = await bcrypt.hash(req.body.password, 5);
    console.log(hashed_password);
    const user = await userModule
      .create({
        username: req.body.username,
        password: hashed_password,
      })
      .then((user) => {
        return user;
      });
    const token = jwt.sign({ id: user.id }, "123214214124124214", {
      expiresIn: "1h",
    });

    res.send({ token: token, user: { user } });
  } else {
    res.send("user already exits");
  }
});

userRouter.post("/signin", async (req: ExtendedRequest, res: Response) => {
  console.log(req.headers.authorization);
  if (req.headers.authorization) {
    const user = await userModule
      .findOne({ username: req.body.username })
      .then((user) => {
        return user;
      });

    if (user) {
      const pasword = await bcrypt.compare(req.body.password, user.password);
      if (pasword) {
        const token = jwt.sign({ id: user.id }, "123214214124124214", {
          expiresIn: "1h",
        });
        console.log(user);

        res.json({
          message: "jwt created",
          token: token,
          user: { username: user.username },
        });
      }
    }
  } else {
    const user = await userModule.findOne({ username: req.body.username });
    console.log(user);
    if (user) {
      const password_verified = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (password_verified) {
        const token = jwt.sign({ id: user.id }, "123214214124124214", {
          expiresIn: "1h",
        });

        res.json({
          message: "jwt created",
          token: token,
        });
      }
    }
  }
});

userRouter.get("/login", async (req: ExtendedRequest, res: Response) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      try {
        const decode = (await jwt.verify(
          token,
          "123214214124124214"
        )) as jwt.JwtPayload;

        const user = await userModule.findOne({ _id: decode.id });

        if (user) {
          res.json({ token: token, user: { username: user.username } });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
          res.status(401).json({ error: "Token expired" });
        } else {
          res.status(500).json({ error: "Internal server error" });
        }
      }
    }
  } else {
    res.status(404).json("user not exits");
  }
});

userRouter.get("/logout", async (req: ExtendedRequest, res: Response) => {
  console.log("Hi");
  if (req.headers.authorization?.split(" ")[1]) {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      const decode = (await jwt.verify(
        token,
        "123214214124124214"
      )) as jwt.JwtPayload;
    }
  }
});
export default userRouter;
