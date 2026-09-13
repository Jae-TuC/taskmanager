const express = require('express');
const cors = require('cors');
const app = express();

const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoute');
const taskRoute = require('./routes/taskRoute');

// Load environment variables from .env file
require('dotenv').config(); 

connectDB(); // Connect to MongoDB
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Middleware to enable CORS

// Routes
app.use(authRoutes);
app.use(taskRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});