const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const SurveySchema = new Schema({
  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'candidate',
    required: true
  },
  surveyInfo: {
    type: Object,
    required: true
  },
    
    answers:{
        type: Object,
        required: true
    }
    
},{
    timestamps: true
});

module.exports = Survey = mongoose.model('survey', SurveySchema);