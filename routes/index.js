// modules
const express = require('express')
const router = express.Router()

// files 
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')

// routes
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)

// exports
module.exports = router