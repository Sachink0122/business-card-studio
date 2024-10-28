const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());  

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/businesscards', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema and model for business cards
const businessCardSchema = new mongoose.Schema({
  name: String,
  CPname: String,
  Designation: String,
  Email: String,
  MobileNumber: String,
  Address: String
});

const BusinessCard = mongoose.model('BusinessCard', businessCardSchema);

// API routes
app.post('/api/cards', async (req, res) => {
  try {
    const card = new BusinessCard(req.body);
    await card.save();
    res.status(201).send(card);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/cards', async (req, res) => {
  try {
    const cards = await BusinessCard.find();
    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
