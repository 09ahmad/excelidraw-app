import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
const app = express();
app.use(express.json())
import { Middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config";
import { UserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const parsedData = UserSchema.safeParse(req.body);
    if (!parsedData.success) {
      res.json({
        message: "Incorrect inputs",
      });
      return;
    }

    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: req.body.username,
      },
    });
    if (existingUser) {
      res.json({
        message: "The user already exist",
      });
      return;
    }
    const body = req.body;
    const name = body.name;
    const username = body.username;
    const password = body.password;

    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data?.username,
        password: parsedData.data?.password,
        name:parsedData.data?.name
      },
    });
    if (!user) {
      res.status(404).json({
        messsage: "User not created",
      });
      return;
    }
    res.status(200).json({
      message: "User created successfully ",
      userId:user.id
    });
  } catch (error) {
    console.error(error);
    res.status(403).json({
      error: "Unable to create the user ",
    });
  }
});

app.post("/signin", async (req: Request, res: Response) => {
  const body = req.body;
  const parsedData = SigninSchema.safeParse(req.body.username);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect input",
    });
    return;
  }

  const username = body.username;
  const userExist = await prismaClient.user.findFirst({
    where: {
      email:parsedData.data.username,
      password:parsedData.data.password
    },
  });
  if (!userExist) {
    res.status(404).json({  
      message: "User not found ",
    });
    return;
  }
  const token = jwt.sign({ userExist:userExist.id }, JWT_SECRET);
  res.json({
    token: token,
  });
});

app.post("/room", Middleware, (req: Request, res: Response) => {

});

app.listen(3002);



// 