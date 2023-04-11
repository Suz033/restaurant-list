// modules
const express = require('express')
const router = express.Router()

// files
const Restaurant = require('../../models/restaurant')

// routes
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const restaurant = req.body
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurants => res.render('show', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurants => res.render('edit', { restaurants }))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const restaurant = req.body
  return Restaurant.findByIdAndUpdate(id, restaurant)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.deleteOne())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// exports
module.exports = router