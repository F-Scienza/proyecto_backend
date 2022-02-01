const express = require("express");

const app = express()

const cartRouter = require('./routers/cart.router')

const productsRouter = require('./routers/products.router');


app.use(express.static(__dirname + '/public'));
app.use('/api/carrito', cartRouter)
app.use('/api/products', productsRouter)
app.set('views','./views')
app.set('view engine', 'ejs');

app.listen(3000, () => {
	console.log('listen 3000');
})