import mongoose from 'mongoose';

const { Schema } = mongoose;

export type RocketType = {
    name: string;
    description: string;
    height: number;
    width: number;
    mass: number;
    photo: string;
};

export const RocketSchema = new Schema<RocketType>({
    name: String,
    description: String,
    height: String,
    width: String,
    mass: String,
    photo: String,
});

export const RocketModel = mongoose.model('rocket', RocketSchema);
