import mongoose from "mongoose";
import User from "../../../models/userSchema";
import { dbAuthenticate } from "@/app/db/config";
import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

export async function POST(request: any) {
  try {
    await dbAuthenticate();
    let payload = await request.json();
    const { email, password } = payload;
    if (!email || !password) {
      return NextResponse.json({
        StatusCode: StatusCodes.BAD_REQUEST,
        msg: "Missing Fields",
      });
    } else {
      const hashPassword = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        password: hashPassword,
      });
      await newUser.save();
      return NextResponse.json({
        StatusCode: StatusCodes.OK,
        msg: "User Registered Successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      msg: error,
    });
  }
}
