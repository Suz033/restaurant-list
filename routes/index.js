// modules
const express = require('express')
const router = express.Router()

// files 
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const users = require('./modules/users')

// routes
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)
router.use('/users', users)

// exports
module.exports = router