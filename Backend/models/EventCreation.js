const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const app = express();
app.use(cors());
app.use(express.static('uploads'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up storage engine
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// API to upload file
app.post('/upload', upload.single('image'), (req, res) => {
    res.json({ filePath: `/${req.file.filename}` });
});

// Define Schema for Events
const EventSchema = new mongoose.Schema({

    title1: { type: String, required: true },
    maintitle: { type: String, required: true },
    short_desc: { type: String},
    event_name: { type: String, required: true },
    event_desc: { type: String, required: true },
    event_date: { type: String, required: true },
    start_time: { type: String, required: true },
    end_time: { type: String, required: true },
});

const EventCreation = mongoose.model('EventCreation', EventSchema);

// Handle Form Submission
app.post('/create-event', async (req, res) => {
    try {
        const newEvent = new EventCreation(req.body);
        await newEvent.save();
        res.status(201).json({ message: 'Event created successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving event' });
    }
});

module.exports = EventCreation;