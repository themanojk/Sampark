const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default:false
  },
  isActive: {
    type: Boolean,
    default:true
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

module.exports = Admin = mongoose.model('admin', AdminSchema);