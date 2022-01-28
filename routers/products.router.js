const express = require('express');
const { Router } = express;

const routerProd = Router();

routerProd.get('/', (req, res) => {
	//  
});
routerProd.get('/:id', async (req, res) => {
	//  listar todos los productos disponibles o un producto por id
});

routerProd.post('/', (req, res) => {
	//  agrega un producto a la lista (solo para admin)
});

routerProd.put('/:id', (req, res) => {
    //  actualiza un producto por id
});

routerProd.delete('/:id', (req, res)=>{
    //  borra producto por id
})

module.exports = routerProd;
