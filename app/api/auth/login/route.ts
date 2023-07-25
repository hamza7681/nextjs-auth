import User from "../../../models/userSchema";
import { dbAuthenticate } from "@/app/db/config";
import { NextResponse } from "next/server";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET = "dontunderestimatethreethingsinyourlifeimemyself";

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
      const findUser = await User.findOne({ email });
      if (findUser) {
        const isMatch = await bcrypt.compare(password, findUser.password);
        if (isMatch) {
          const token = jwt.sign(findUser.id, SECRET);
          return NextResponse.json({
            StatusCode: StatusCodes.OK,
            msg: "Login Successfully",
            token,
          });
        } else {
          return NextResponse.json({
            StatusCode: StatusCodes.BAD_REQUEST,
            msg: "Password is incorrect",
          });
        }
      } else {
        return NextResponse.json({
          StatusCode: StatusCodes.NOT_FOUND,
          msg: "User not found!",
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      msg: error,
    });
  }
}
