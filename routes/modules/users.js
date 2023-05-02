// modules
const express = require('express')
const router = express.Router()

// routes
router.get('/login', (req, res) => {
  res.render('login')
})

// exports
module.exports = router