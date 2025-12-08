import mongoose from "mongoose";

export const categories = ['food', 'clothes', 'tech', 'jewellery'];
export const brands =  ['addidas', 'samsung', 'tanishq', 'iphone' ];

const productSchema =  new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    detail: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
     category: {
        type: String,
        enum:categories ,
        required: true
    },
     brand: {
        type: String,
        enum: brands,
        required: true
    },
     rating: {
        type: Number,
        default: 0
    },
    
        rating: {
         type: Number,
         default: 0
        },
    
    stock:{
      type:Number,
      required:true
    },
    price: {
        type: Number,
        required: true
    }
},  {timestamps: true});

const product = mongoose.model('product', productSchema);
export default product;