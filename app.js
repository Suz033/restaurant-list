// express
const express = require('express')
const app = express()

// handlebars
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs ({ defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// static files
app.use(express.static('public'))

// json files
const restaurantList = require('./restaurant.json')

// port
const port = 3000

// routes setting
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

// start
app.listen(port, () => {
  console.log(`Express server: localhost:${port}`)
})
