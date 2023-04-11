// data
const Restaurant = require('../restaurant.js')
const restaurantList = require('../../restaurant.json')

// schema
const list = restaurantList.results

// db
const db = require('../../config/mongoose')
db.once('open', () => {
  for (let i = 0; i < list.length; i++) {
    Restaurant.create({
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