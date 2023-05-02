//// modules ////
const express = require('express')
const router = express.Router()


//// routes ////
// login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
})

// register
router.get('/register', (req, res) => {
  res.render('register')
})


//// exports ////
module.exports = router