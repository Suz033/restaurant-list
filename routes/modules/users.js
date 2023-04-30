// modules
const express = require('express')
const router = express.Router()

// routers
// login
router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
})

// exports
module.exports = router