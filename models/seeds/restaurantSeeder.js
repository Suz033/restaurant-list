// modules
const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// files
const Restaurant = require('../restaurant')
const User = require('../user')
const restaurantList = require('../../restaurant.json')
const db = require('../../config/mongoose')

// schema
const list = restaurantList.results

// add seed data
const SEED_USER = {
  name: 'user',
  email: '@example.com',
  password: '12345678'
}

db.once('open', () => {
  bcrypt
    .genSalt(10)
    .then(salt => bcrypt.hash(SEED_USER.password, salt))
    .then(hash => {
      return Promise.all(Array.from(
        { length: 2 },
        (_, i) => User.create({ name: `${SEED_USER.name}${i + 1}`, email: `${SEED_USER.name}${i + 1}${SEED_USER.email}`, password: hash })
      ))
    })
    .then(user => {
      return Promise.all([
        ...Array.from(
          { length: 3 },
          (_, i) => Restaurant.create({
            name: list[i].name,
            name_en: list[i].name_en,
            category: list[i].category,
            image: list[i].image,
            location: list[i].location,
            phone: list[i].phone,
            google_map: list[i].google_map,
            rating: list[i].rating,
            description: list[i].description,
            userId: user[0]._id
          })
        ),
        ...Array.from(
          { length: 3 },
          (_, i) => Restaurant.create({
            name: list[i + 3].name,
            name_en: list[i + 3].name_en,
            category: list[i + 3].category,
            image: list[i + 3].image,
            location: list[i + 3].location,
            phone: list[i + 3].phone,
            google_map: list[i + 3].google_map,
            rating: list[i + 3].rating,
            description: list[i + 3].description,
            userId: user[1]._id
          })
        )
      ])
    })
    .then(() => {
      console.log('seed data added.')
      process.exit()
    })
})