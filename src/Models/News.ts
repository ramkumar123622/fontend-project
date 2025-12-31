import mongoose, { models } from "mongoose";


const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true 
    },
    image:{
        type: String,
        required: true
    }
},{timestamps:true});

export const News = models.News || mongoose.model('News', newsSchema);
