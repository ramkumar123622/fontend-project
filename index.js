

import express from 'express';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js'
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from "dotenv"

const app = express();
const port = 5000;
dotenv.config();

// MONGODB CONNECTION
mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('MongoDB Connected');

    // Start server AFTER DB is connected
    app.listen(port, () => {
      console.log('connected and server is running');
    });
  })
  .catch((err) => {
    console.log('MongoDB Error:', err.message);
  });

app.use(cors());
app.use(express.json());
app.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 },
  })
);

app.use(express.static('uploads'));

// =======================
// ✅ NODEMAILER SETTINGS
// =======================
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'mahararamkumar35@gmail.com',
    pass: 'roxrehepuvkmxlkh',
  },
});

// =======================
// ✅ HOME ROUTE
// =======================
app.get('/', (req, res) => {
  return res.status(200).json({
    status: 'Success',
    data: 'hello jee welcome to Server',
  });
});

// =======================
// ✅ EMAIL ROUTE
// =======================
app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body ?? {};

  try {
    const info = await transporter.sendMail({
      from: '"Ram Jee" <mahararamkumar35@gmail.com>',
      to,
      subject,
      text,
    });

    return res.status(200).json({
      message: info,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

// =======================
// ✅ API ROUTES
// =======================
app.use(productRoutes);
app.use(userRoutes);
app.use(orderRoutes);

