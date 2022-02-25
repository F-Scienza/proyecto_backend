const express = require('express');
const Cart = require('../libs/cart')
const { Router } = express;
const routerCart = Router();

routerCart.use(express.json());
routerCart.use(express.urlencoded({ extended: true }));

const carts = new Cart(__dirname + '/data/cart.json')
carts.init()

routerCart.post('/', (req, res)=>{
    //  crea CARRITO y devuelve id
    carts.newCart(req.body)
    let content = carts.carts
    return res.json(content)
})
routerCart.delete('/:id', (req, res)=>{
    //  vacia CARRITO y lo elimina
    let id = Number(req.params.id)
    carts.deleteCart(id)
    let content = carts.carts
    return res.json(content)
})
routerCart.get('/', (req, res) => {
	//  lista de todos los carritos
    console.log('-----get all carts-----');
    let content = carts.carts;
	return res.json(content);
});
routerCart.get('/:id/products', (req, res)=>{
    //  lista de productos en el carrito
    let id = Number(req.params.id)
    let cartsearch = carts.getCartProducts(id)
    return res.json(cartsearch)
})
routerCart.post('/:id/products', (req, res)=>{
    //  agrega productos al carrito por id de producto
    let id = Number(req.params.id)
    let product = req.body
    carts.addProduct(id, product)
    let content = carts.carts
    return res.json(content)
})
routerCart.delete('/:id/products/:id_prod', (req, res)=>{
    //  elimina un producto del carrito
    let id_prod = Number(req.params.id_prod)
    let id_cart = Number(req.params.id)
    carts.deleteProductCart(id_cart, id_prod);
    return res.json(carts.carts)
})

module.exports = routerCart;
