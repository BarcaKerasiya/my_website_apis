import { Request, Response } from "express";
import User from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  sameSite: "strict" as const,
};

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
};

export const authUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.json({
      _id: user._id,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
};

export const refreshAccessToken = (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    res.status(401);
    throw new Error("No token provided");
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET!,
    (err: any, decoded: any) => {
      if (err) {
        res.status(403);
        throw new Error("Invalid token");
      }

      const accessToken = generateAccessToken(decoded.id);
      res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000, // 15 minutes
      });

      res.json({ accessToken });
    }
  );
};
