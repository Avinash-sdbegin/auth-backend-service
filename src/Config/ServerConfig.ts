import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

export const PORT = process.env.PORT || "3000";

export const SALT = bcrypt.genSaltSync(10);

export const JWT_KEY = process.env.JWT_KEY as string;