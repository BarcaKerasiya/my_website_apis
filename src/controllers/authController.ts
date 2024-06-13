import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens";
import jwt from "jsonwebtoken";
import userSchema from "../validations/user";
import nodemailer from "nodemailer";
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // Use secure cookies in production
  sameSite: "strict" as const,
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    // // Validate input data
    console.log("req.body", req.body);
    const { error } = userSchema.validate(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    // Create a new user
    let userData;
    if (!userExists) {
      userData = await User.create({
        name,
        email,
        password,
        isVerified: false,
      });
    }

    const user = userExists ? userExists : userData;
    const emailVerificationToken = generateEmailVerificationToken(user._id);
    await sendVerificationEmail(user, emailVerificationToken);

    res.status(201).json({
      message:
        "Registration successful. Please check your email to verify your account.",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export const registerUserBackup = async (req: Request, res: Response) => {
  try {
    // // Validate input data
    const { error } = userSchema.validate(req.body);
    if (error) {
      res.status(400);
      throw new Error(error.details[0].message);
    }
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }
    // Create a new user
    const user = await User.create({
      name,
      email,
      password,
      isVerified: false,
    });

    if (user) {
      // Generate tokens
      const accessToken = generateAccessToken(user._id);
      const refreshToken = generateRefreshToken(user._id);

      // Set cookies
      res.cookie("accessToken", accessToken, {
        ...cookieOptions,
        maxAge: 15 * 60 * 1000, // 15 minutes
      });
      res.cookie("refreshToken", refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Send response
      res.status(201).json({
        _id: user._id,
        email: user.email,
        name: user.name,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
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

const sendVerificationEmail = async (user: any, token: string) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Email Verification",
    html: `<p>Hi ${user.name},</p>
           <p>Please click the link below to verify your email address:</p>
           <a href="${verificationUrl}">Verify Email</a>
           <p>If you did not request this, please ignore this email.</p>`,
  };
  await transporter.sendMail(mailOptions);
};
const generateEmailVerificationToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.EMAIL_VERIFICATION_SECRET, {
    expiresIn: "1h",
  });
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;
    console.log("token", token);

    if (typeof token !== "string") {
      res.status(400);
      throw new Error("No token provided or invalid token format");
    }

    const decoded: any = jwt.verify(
      token,
      process.env.EMAIL_VERIFICATION_SECRET as string
    );
    console.log("decoded", decoded);
    const user = await User.findById(decoded.userId);
    console.log("user", user);
    if (!user) {
      res.status(400);
      throw new Error("Invalid token");
    }

    if (user.isVerified) {
      res.status(400);
      throw new Error("User already verified");
    }

    user.isVerified = true;
    await user.save();

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict" as const,
    };

    res.cookie("accessToken", accessToken, {
      ...cookieOptions,
      maxAge: 15 * 60 * 1000, // 15 minutes
    });
    res.cookie("refreshToken", refreshToken, {
      ...cookieOptions,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.log("catch innn", err);
    next(err);
  }
};
