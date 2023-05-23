// modules
const express = require('express')
const router = express.Router()

// files
const Restaurant = require('../../models/restaurant')

// routes
router.get('/', (req, res) => {
  const keyword = req.query.keyword.trim()
  const re = new RegExp(keyword, 'gi')
  const userId = req.user._id

  return Restaurant
    .find({ userId })
    .lean()
    .sort({ _id: 'asc' })
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