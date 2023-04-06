//// modules ////
// express
const express = require('express')
const app = express()

// handlebars
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs ({ defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

// body-parser (before setting route)
app.use(express.urlencoded({ extended: true }))

// dotenv (before setting mongoose)
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// mongoose
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection
db.on('error', () => {
  console.log('=== mongodb error ===')
})
db.once('open', () => {
  console.log('=== mongodb connected ===')
})


//// files ////
app.use(express.static('public'))
const Restaurant = require('./models/restaurant')


//// routes setting ////
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))

  // res.render('index', { list: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurants => res.render('show', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const re = new RegExp(keyword, 'gi')
  const list = restaurantList.results.filter((list) => {
    return list.name.match(re) || list.category.match(re)
  })
  res.render('index', { keyword, list})
})

app.get('/add', (req, res) => {
  res.render('add')
})

app.post('/add', (req, res) => {
  const restaurant = req.body
  console.log(restaurant)
  // return Restaurant.create({ restaurant })
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurants => res.render('edit', { restaurants }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const restaurant = req.body
  return Restaurant.findByIdAndUpdate(id, restaurant)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.deleteOne())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//// listen ////
const port = 3000
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}.`)
})
