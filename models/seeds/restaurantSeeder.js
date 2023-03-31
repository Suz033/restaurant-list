// dotenv (before setting mongoose)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// module and model
const mongoose = require('mongoose')
const Restaurant = require('../restaurant.js')
const restaurantList = require('../../restaurant.json')
const list = restaurantList.results

// db
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', () => {
  console.log('=== mongodb error ===')
})
db.once('open', () => {
  console.log('=== mongodb connected ===')
  for (let i = 0; i < list.length; i++) {
    Restaurant.create({
      id: list[i].id,
      name: list[i].name,
      name_en: list[i].name_en,
      category: list[i].category,
      image: list[i].image,
      location: list[i].location,
      phone: list[i].phone,
      google_map: list[i].google_map,
      rating: list[i].rating,
      description: list[i].description,
    })
  }
  console.log('seed data added.')
})
