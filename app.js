const express = require('express')
const app = express()
const path = require('path')
const body_parser = require('body-parser')

const session = require('express-session')
const SessionStore=require('connect-mongodb-session')(session)

const home_route = require('./routes/home_route')
const product_route =require('./routes/product_route')
const auth_route=require('./routes/auth_route')


app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))

// const DB_URL = "mongodb://127.0.0.1:27017/online_shop";
const DB_URL = "mongodb+srv://momenahmed2010:blIZhpDsyFOFOBCe@cluster0.qs8mrwv.mongodb.net/?retryWrites=true&w=majority"


const store = new SessionStore({
    uri:DB_URL,
    collection:'sessions'
})

app.use(session({
    secret:'secretkey',
    saveUninitialized:false,
    store:store
}))

app.set('view engine', 'ejs')

app.set('views', 'views')

app.use(body_parser.urlencoded({ extended: false }))

app.use('/',home_route)

app.use('/',auth_route)

app.use('/product',product_route)


app.listen(3000, (err) => {
    console.log("server is running")
})