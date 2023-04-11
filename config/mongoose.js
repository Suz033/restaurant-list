// dotenv (before setting mongoose)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// modules
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)

// db
const db = mongoose.connection
db.on('error', () => {
  console.error('=== mongodb error ===')
})
db.once('open', () => {
  console.log('=== mongodb connected ===')
})

// exports
module.exports = db