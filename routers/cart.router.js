const express = require('express');
const { Router } = express;
const routerCart = Router();
routerCart.use(express.json());
routerCart.use(express.urlencoded({ extended: true }));

routerCart.post('/', (req, res)=>{
    //  crea CARRITO y devuelve id
})
routerCart.delete('/:id', (req, res)=>{
    //  vacia CARRITO y lo elimina
})

routerCart.get('/:id/products', (req, res)=>{
    //  lista de productos en el carrito
})
routerCart.post('/:id/products', (req, res)=>{
    //  agrega productos al carrito por id de producto
})
routerCart.delete('/:id/productos/:id_prod', (req, res)=>{
    //  elimina un producto del carrito
})

module.exports = routerCart;
