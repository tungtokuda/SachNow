import jwt from "jsonwebtoken";
import User from "../models/user.js";
import dotenv from "dotenv";
dotenv.config();
export const checkPermission = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        message: "Bạn chưa đăng nhập",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET,
      async (error, payload) => {
        if (error) {
          if (error.name == "TokenExpiredError") {
            return res.json({
              message: "Token không hợp lệ",
            });
          }
          if (error.name == "TokenExpiredError") {
            return res.json({
              message: "Token hết hạn",
            });
          }
        }
        // console.log("payload: ",payload);
        // console.log("error check: ",error);
        const user = await User.findById(payload.id);
        if (user && user.role !== "admin") {
          return res.status(403).json({
            message: "Bạn không có quyền truy cập tài nguyên !",
          });
        }
        next();
      }
    );
  } catch (error) {
    return res.status(401).json({
      message: error.message || "Token không hợp lệ",
    });
  }
};
