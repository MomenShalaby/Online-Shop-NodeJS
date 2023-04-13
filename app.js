const express = require('express')
const app = express()
const path = require('path')
const home_route = require('./routes/home_route')
const product_route =require('./routes/product_route')

app.use(express.static(path.join(__dirname, 'assets')))
app.use(express.static(path.join(__dirname, 'images')))


app.set('view engine', 'ejs')

app.set('views', 'views')



app.use('/',home_route)

app.use('/product',product_route)


app.listen(3000, (err) => {
    console.log("server is running")
})