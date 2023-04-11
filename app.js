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
  console.error('=== mongodb error ===')
})
db.once('open', () => {
  console.log('=== mongodb connected ===')
})

// method-override
const methodOverride = require('method-override')
app.use(methodOverride('_method'))


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