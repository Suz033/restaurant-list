// modules
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// new Schema
const restaurantSchema = new Schema({
  name: {
    type: String,
    required: true
  }, 
  done: {
    type: Boolean
  }
})

// export
module.exports = mongoose.model('Restaurant', restaurantSchema)