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
// static files
app.use(express.static('public'))

// json files
const restaurantList = require('./restaurant.json')


//// routes setting ////
app.get('/', (req, res) => {
  res.render('index', { list: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const list = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { list: list })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const re = new RegExp(keyword, 'gi')
  const list = restaurantList.results.filter((list) => {
    return list.name.match(re) || list.category.match(re)
  })
  res.render('index', { keyword: keyword, list: list})
})


//// listen ////
const port = 3000
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}.`)
})
