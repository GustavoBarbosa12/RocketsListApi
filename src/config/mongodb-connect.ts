import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;
const dbPath = process.env.DB_PATH;
const connectString = `mongodb+srv://${dbUser}:${dbPass}${dbPath}`;

export const mongodbConnect = async() => {
    mongoose.set('strictQuery', false);
    return mongoose.connect(connectString);
}