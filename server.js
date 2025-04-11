require('dotenv').config();  // Load environment variables from .env file
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routes/auth'); // Make sure auth routes are correctly set

const app = express();

// Enable CORS for all origins (you can restrict this to specific domains later if needed)
app.use(cors());
app.use(express.json());  // For parsing JSON request bodies

// Use the MONGO_URI from the .env file
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.log('MongoDB connection error:', err));

// Register routes
app.use('/api/auth', authRouter);  // This is where your auth routes are located

// Serve static files for the frontend (React app)
app.use(express.static(path.join(__dirname, 'client/build')));

// Root route for testing
app.get('/', (req, res) => {
  res.send('Hello from the server'); 
});

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



