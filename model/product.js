import mongoose from "mongoose";



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
        enum: ['food', 'clothes', 'tech', 'jewellery'],
        required: true
    },
     brand: {
        type: String,
        enum: ['addidas', 'samsung', 'tanishq', 'iphone' ],
        required: true
    },
    //  eggs: {
    //     type: Number,
    //     min: [6, 'Too few eggs'],
    //     max: 12
    // },
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