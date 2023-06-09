// modules
const express = require('express')
const router = express.Router()

// files
const restaurant = require('../../models/restaurant')

// routes
router.get('/', (req, res) => {
  const userId = req.user._id
  restaurant
    .find({ userId })
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

// exports
module.exports = router