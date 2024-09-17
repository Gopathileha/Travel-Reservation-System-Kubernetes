const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

// Get environment variables
const mongoURI = process.env.MONGO_URI || 'mongodb://mongo:27017/travel-reservation'; // Default to 3001 if PORT is not set

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define Booking schema
const bookingSchema = new mongoose.Schema({
    name: String,
    gender: String,
    dob: Date,
    mobile: String,
    email: String,
    dateOfJourney: Date,
    travelFrom: String,
    travelTo: String,
    passengers: Number
});

const Booking = mongoose.model('Booking', bookingSchema);

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public'

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle form submission
app.post('/submit-booking', async (req, res) => {
    const { name, gender, dob, mobile, email, dateOfJourney, travelFrom, travelTo, passengers } = req.body;

    // Simple validation
    if (!name || !gender || !dob || !mobile || !email || !dateOfJourney || !travelFrom || !travelTo || !passengers) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!/^\d{10}$/.test(mobile)) {
        return res.status(400).json({ message: 'Mobile number must contain exactly 10 digits' });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ message: 'Email must be valid' });
    }

    const today = new Date().toISOString().split('T')[0];
    if (new Date(dateOfJourney) < new Date(today)) {
        return res.status(400).json({ message: 'Date of journey must be today or later' });
    }

    try {
        const newBooking = new Booking({
            name,
            gender,
            dob,
            mobile,
            email,
            dateOfJourney,
            travelFrom,
            travelTo,
            passengers
        });

        const savedBooking = await newBooking.save();
        res.status(201).json({ message: 'Booking stored successfully', id: savedBooking._id });
    } catch (error) {
        res.status(500).json({ message: 'Error saving booking', error });
    }
});

// Retrieve a booking
app.get('/booking/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const booking = await Booking.findById(id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving booking', error });
    }
});
const port = process.env.port || 3001;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
