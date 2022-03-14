const express = require("express");
const app = express()
const cartRouter = require('./routers/cart.router')
const productsRouter = require('./routers/products.router');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/cart', cartRouter)
app.use('/api/products', productsRouter)
app.set('views','./views')
app.set('view engine', 'ejs');

app.get('/', (req,res)=>{
	res.render('pages/form');
})

app.listen(3000, () => {
	console.log('*****LISTEN PORT 3000*****');
})