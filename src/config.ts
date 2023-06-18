import dotenv from 'dotenv';
dotenv.config();

export const PORT: string = process.env.PORT || '3000';
export const MONGODB_ATLAS_URI = process.env.MONGODB_ATLAS_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const SENDER_EMAIL = process.env.SENDER_EMAIL;
export const SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD;
