import Users from "../models/userModel";
import JWT from "jsonwebtoken";
import { compareString, createJWT, hashString } from "../utils";
import { NextFunction, Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, phone, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    next("Please provide all fields");
    return;
  }

  try {
    const userExists = await Users.findOne({ email });
    if (userExists) {
      next("User already exists");
      return;
    }
    const hashedPassword = await hashString(password);
    const user = await Users.create({
      firstName,
      lastName,
      phone,
      email,
      password: hashedPassword,
    });
    const token = createJWT(user?._id.toString());
    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next("Please provide all fields");
    return;
  }
  try {
    const user = await Users.findOne({ email }).select("+password");
    const isMatch = await compareString(password, user?.password as string);
    if (!user || !isMatch) {
      next("Invalid credentials");
      return;
    }
    //make the password to be undefined as we arent using
    user.password = undefined;
    const token = createJWT(user?._id.toString());

    res.status(201).json({
      success: true,
      message: "Login Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (idToken: string) => {
  try {
    console.log("idtoken", idToken);
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload) return { success: false, error: "No payload received" };
    const {
      email,
      sub: googleId,
      given_name: firstName,
      family_name: lastName,
      picture: profileUrl,
    } = payload;

    const user = await Users.create({
      firstName,
      lastName,
      email,
      profileUrl,
      googleId,
    });
    const token = JWT.sign({ userId: user._id }, process.env.JWT_SECRET_KEY!);
    return { success: true, token, user };
  } catch (error) {
    console.log("Error verifying Google token:", error);
    return { success: false, error: "Invalid token" };
  }
};

export const googleLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { token } = req.body; // ✅ Get token from req.body
    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }

    const result = await verifyGoogleToken(token);

    if (result.success) {
      return res.status(200).json({ token: result.token, user: result.user });
    } else {
      return res.status(401).json({ error: result.error });
    }
  } catch (error) {
    console.log("Error in googleLogin:", error);
  }
};
