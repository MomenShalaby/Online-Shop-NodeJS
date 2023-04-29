const express = require('express')
const app = express()
const path = require('path')
const body_parser = require('body-parser')

const session = require('express-session')
const SessionStore=require('connect-mongodb-session')(session)

const home_route = require('./routes/home_route')
const product_route =require('./routes/product_route')
const auth_route=require('./routes/auth_route')

const flash = require('connect-flash')

app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))

require('dotenv').config()
const DB_URL = process.env.DATABASE_URL


const store = new SessionStore({
    uri:DB_URL,
    collection:'sessions'

})

app.use(session({
    secret:'secretkey',
    saveUninitialized:false,
    store:store,
    resave: false

}))

app.use(flash())

app.set('view engine', 'ejs')

app.set('views', 'views')

app.use(body_parser.urlencoded({ extended: false }))

app.use('/',home_route)

app.use('/',auth_route)

app.use('/product',product_route)


app.listen(process.env.port, (err) => {
    console.log("server is running")
})