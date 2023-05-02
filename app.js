//// modules ////
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')

// files
const usePassport = require('./config/passport')

// hbs
app.engine('hbs', exphbs ({ defaultLayout: 'main', extname: 'hbs'}))
app.set('view engine', 'hbs')

// express-session
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// hbs-helpers
const helpers = require('handlebars-helpers')()

// body-parser (before setting route)
app.use(express.urlencoded({ extended: true }))

// method-override
app.use(methodOverride('_method'))

// passport
usePassport(app)


//// auth state ////
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})


//// db ////
require('./config/mongoose')


//// files ////
app.use(express.static('public'))


//// routes setting ////
const routes = require('./routes')
app.use(routes)


//// listen ////
const port = 3000
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}.`)
})