//// modules ////
// express
const express = require('express')
const app = express()

// handlebars
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs ({ defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')
const helpers = require('handlebars-helpers')()

// body-parser (before setting route)
app.use(express.urlencoded({ extended: true }))

// method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

// session
const session = require('express-session')
app.use(session({
  secret: 'secretSession',
  resave: false,
  saveUninitialized: true
}))

// passport
const usePassport = require('./config/passport')  // after session
usePassport(app)  // before routes


//// db ////
require('./config/mongoose')


//// files ////
app.use(express.static('public'))


//// auth state ////
app.use((req, res, next) => {
  // 你可以在這裡 console.log(req.user) 等資訊來觀察
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})


//// routes setting ////
const routes = require('./routes')
app.use(routes)


//// listen ////
const port = 3000
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}.`)
})