const mongoose = require('mongoose');

const feedbacksystem = new mongoose.Schema({
    name: String,
    contactnumber: String,
    email: String,
    feedback: String
});

module.exports = mongoose.model('Feedback',feedbacksystem);