import mongoose from "mongoose";



const userSchema =  new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
         validate: {
    validator: function (v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    },
    message: (props) => `${props.value} is not a valid email!`,
  },
        required: true
        
    },
    password: { 
        type: String,
        minlength: [4, 'Must be at least 4'],
        required: true
    },
     role: {
        type: String,
       enum: {
        values:['user', 'admin'],
        message: '{VALUE} is not supported'
       },
       default: 'user'
    },
     
     
},  {timestamps: true});





const User = mongoose.model('User', userSchema);
export default User; 