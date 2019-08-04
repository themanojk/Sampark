const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AnswerSchema = new Schema({
  surveyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'survey',
    required: true
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'questions',
    required: true
  },
  answer: {
    type: String,
    required: true
  }
},{
    timestamps: true
});

module.exports = Answer = mongoose.model('answer', AnswerSchema);