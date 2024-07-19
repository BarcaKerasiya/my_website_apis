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
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
};

export const registerUser = async (req: Request, res: Response) => {
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
    if (userExists && userExists.isVerified === true) {
      res.status(400);
      throw new Error("Email is already taken!");
    }

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
    subject: "Email Verification - Action Required",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <p>Dear ${user.name},</p>
  
        <p>We hope this message finds you well. To complete your registration and verify your email address, please click on the link below:</p>
        
        <p style="text-align: center;">
          <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; margin: 10px 0; font-size: 16px; color: #fff; background-color: #007BFF; text-decoration: none; border-radius: 5px;">Verify Your Email</a>
        </p>
        
        <p>If you did not initiate this request, please disregard this email. Rest assured, no further action is required on your part.</p>
  
        <p>Thank you for your attention to this matter.</p>
        
        <p>Best regards,<br>
        Vishnu Kerasiya</p>
      </div>
    `,
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

    const secret = process.env.EMAIL_VERIFICATION_SECRET;
    if (!secret) {
      throw new Error("EMAIL_VERIFICATION_SECRET is not set");
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, secret);
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(400).json({ message: "Invalid token" });
      }
      throw error;
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ message: "Invalid token" });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: "User already verified" });
    }

    user.isVerified = true;
    await user.save();

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

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    console.log("catch innn", err);
    next(err);
  }
};
