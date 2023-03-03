require("dotenv").config();
export const defaultConfig = {
  port: 5000,
  jwtSecret: process.env.JWT_SECRET,
  mongoUri: process.env.MONGO_URI,
};
