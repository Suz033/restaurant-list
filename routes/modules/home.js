// modules
const express = require('express')
const router = express.Router()

// files
const restaurant = require('../../models/restaurant')

// routes
router.get('/', (req, res) => {
  restaurant
    .find()
    .lean()
    .sort({ _id: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(err => console.error(error))
})

// exports
module.exports = router