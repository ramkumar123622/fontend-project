import express from 'express';
import mongoose from "mongoose";
import menuItemRoutes from './routes/menuItemRoutes.js';
import personRoutes from './routes/personRoutes.js';

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // replaces body-parser

// MongoDB connection
mongoose.connect(
  'mongodb+srv://mahararamkumar35_db_user:mongo1000@cluster0.m3ggwt3.mongodb.net/Hotels?retryWrites=true&w=majority&appName=Cluster0'
)
  .then(() => {
    console.log('MongoDB Connected');

    // Start server AFTER DB is connected
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB Error:', err.message);
  });

// Base route
app.get('/', (req, res) => {
  res.send('Welcome to my hotel ... How can I help you?');
});

// Routers with prefixes
app.use('/person',personRoutes);
app.use('/menuItem',menuItemRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ status: 'error', data: 'Route not found' });
});
