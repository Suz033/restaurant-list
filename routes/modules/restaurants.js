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
  const restaurant = {
    ...req.body,
    userId: req.user._id
  }
  return Restaurant.create(restaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurants => res.render('show', { restaurants }))
    .catch(error => console.error(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurants => res.render('edit', { restaurants }))
    .catch(error => console.error(error))
})

router.put('/:id', (req, res) => {
  const restaurant = {
    ...req.body,
    userId: req.user._id
  }
  const id = req.params.id
  return Restaurant.findByIdAndUpdate(id, restaurant)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.error(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.deleteOne())
    .then(() => res.redirect('/'))
    .catch(error => console.error(error))
})

// exports
module.exports = router