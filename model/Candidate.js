const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const CandidateSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  panchayat: {
    type: Array,
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default:Date.now
  },
});

module.exports = Candidate = mongoose.model('candidates', CandidateSchema);