// modules
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// schema
const userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  }
})

// exports
module.exports = mongoose.model('User', userSchema)