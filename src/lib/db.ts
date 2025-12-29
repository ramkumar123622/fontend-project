import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectDb = async () => {

    if(isConnected) return;
    try {
        await mongoose.connect('mongodb+srv://mahararamkumar35_db_user:mongo1000@cluster0.m3ggwt3.mongodb.net/News')
        isConnected = true;
        console.log('MongoDB connected');

    } catch (error) {
        console.log('Error');
        
    }
}
