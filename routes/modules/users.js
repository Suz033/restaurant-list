// modules
const express = require('express')
const router = express.Router()
const User = require('../../models/user')

// routers
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

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ email })
    .then(user => {
      if (user) {
        console.log('User already exists.')
        res.render('register', {
          name,
          email,
          password,
          confirmPassword
        })
      } else {
        return User.create({
          name,
          email,
          password
        })
          .then(() => res.redirect('/'))
          .catch(err => console.error(err))
      }
    })
    .catch(err => console.log(err))
})

// exports
module.exports = router