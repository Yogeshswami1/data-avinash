
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/auth');
// const enrollRoutes = require('./routes/enrollment');
// const cors = require('cors');
// const path = require('path');
// const enrollmentRoutes = require('./routes/enrollment');

// const app = express();
// app.use(cors());

// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));



//   mongoose.connect('mongodb+srv://avinashsaini39:9928373382@cluster.ysujsgk.mongodb.net/data', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }).then(() => {
//     console.log('MongoDB connected');
//   }).catch((err) => {
//     console.error('MongoDB connection error:', err);
//   });


// app.use('/api/auth', authRoutes);
// app.use('/api', enrollRoutes);
// app.use('/api', enrollmentRoutes);


// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const authRoutes = require('./routes/auth');
// const enrollRoutes = require('./routes/enrollment');
// const cors = require('cors');
// const path = require('path');
// const enrollmentRoutes = require('./routes/enrollment');

// const dotenv = require('dotenv'); // Add this line

// dotenv.config(); // Load environment variables

// const app = express();
// app.use(cors());

// app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

// mongoose.connect(process.env.MONGO_URI, { // Use environment variable
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('MongoDB connected');
// }).catch((err) => {
//   console.error('MongoDB connection error:', err);
// });

// app.use('/api/auth', authRoutes);
// app.use('/api', enrollRoutes);
// app.use('/api', enrollmentRoutes);

// const PORT = process.env.PORT || 8000; // Use environment variable
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const enrollRoutes = require('./routes/enrollment');
const enrollmentRoutes = require('./routes/enrollment');
const authRoutes = require('./routes/auth');

// Load environment variables from .env file
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  // origin: 'https://datafrontend.saumic.com', // Replace with your frontend domain
  origin: 'http://localhost:3000', //   Replace with your frontend domain

  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Body parser middleware
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

// Import routes


// Use routes
app.use('/api/auth', authRoutes);
app.use('/api', enrollRoutes);
app.use('/api', enrollmentRoutes);


// Serve frontend application
app.use(express.static(path.join(__dirname, 'public')));

// Handle undefined routes
app.use((req, res, next) => {
  res.status(404).send('Not Found');
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
