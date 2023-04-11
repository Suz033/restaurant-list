// modules
const express = require('express')
const router = express.Router()

// files
const Restaurant = require('../../models/restaurant')

// routes
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim()
  const re = new RegExp(keyword, 'gi')

  return Restaurant
    .find()
    .lean()
    .then(restaurantData => {
      const restaurants = restaurantData.filter(data => {
        const { name, name_en, category, location, phone } = data
        return name.match(re) || name_en.match(re) || category.match(re) || location.match(re) || phone.match(re)
      })
      res.render('index', { keyword, restaurants })
    })
    .catch(error => console.error(error))
})

// exports
module.exports = router