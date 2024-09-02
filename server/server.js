
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


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const enrollRoutes = require('./routes/enrollment');
const cors = require('cors');
const path = require('path');
const enrollmentRoutes = require('./routes/enrollment');

const dotenv = require('dotenv'); // Add this line

dotenv.config(); // Load environment variables

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI, { // Use environment variable
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

app.use('/api/auth', authRoutes);
app.use('/api', enrollRoutes);
app.use('/api', enrollmentRoutes);

const PORT = process.env.PORT || 8000; // Use environment variable
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
