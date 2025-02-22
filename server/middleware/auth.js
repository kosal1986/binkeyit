import { request } from "express";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken || req?.header?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        message: "Provide token",
        error: true,
        success: false,
      });
    }

    const decode = await jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
    console.log("decode", decode);
    if (!decode) {
      return res.status(401).json({
        message: "Unauthorize access",
        error: true,
        success: false,
      });
    }
    req.userId = decode.id;
    next();
  } catch (err) {
    return res.status(500).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

export default auth;
