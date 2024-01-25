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
  console.log(req.body.username);
  if (req.headers.authorization) {
    const user = await userModule
      .findOne({ username: req.body.username })
      .then((user) => {
        return user;
      });
    if (user) {
      if (user.password === req.body.password) {
        const token = jwt.sign({ id: user.id }, "123214214124124214", {
          expiresIn: "1h",
        });

        res.json({
          message: "jwt created",
          token: token,
        });
      } else {
        res.send("check your password");
      }
    } else {
      res.status(409).json({ error: "User already exists" });
    }
  } else {
    const user = await userModule
      .findOne({ username: req.body.username })
      .then((user) => {
        return user;
      });
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
      } else {
        res.send("check your password");
      }
      res.send({ user });
    }
  }
});

userRouter.get("/login", async (req: ExtendedRequest, res: Response) => {
  console.log(req.headers);
  console.log(req.header);
  if (req.headers.authorization) {
    const token = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (token) {
      const decode = (await jwt.verify(
        token,
        "123214214124124214"
      )) as jwt.JwtPayload;
      console.log(decode.id);
      const user = await userModule.findOne({ _id: decode.id });

      if (user) {
        res.json({ token: token, user: { user } });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } else {
    res.status(401).json({ error: "Login again" });
  }
});

userRouter.get("/logout", async (req: ExtendedRequest, res: Response) => {
  console.log("Hi");
  if (req.headers.authorization?.split(" ")[1]) {
    const token = req.headers.authorization?.split(" ")[1];

    if (token) {
      (await jwt.verify(token, "123214214124124214")) as jwt.JwtPayload;
      res.json({ message: "logged off successfully" });
    } else {
      res.status(401).json({ error: "Login first" });
    }
  } else {
    res.status(401).json({ error: "Login first" });
  }
});
export default userRouter;
