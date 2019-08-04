const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const type = ['Textbox','Radio','Checkbox']

// Create Schema
const QuestionSchema = new Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'candidate',
    required: true
  },
  question: {
    type: String,
    required: true
  },
  questionType: {
    type: String,
    enum: type,
    required: true
  },
  options: {
      type: Array,
      require: false
  }
},{
    timestamps: true
});

module.exports = Question = mongoose.model('questions', QuestionSchema);