const express = require('express');
const { Router } = express;
const routerProd = Router();

routerProd.use(express.json());
routerProd.use(express.urlencoded({ extended: true }));

const Product = require('../libs/productos')
const products = new Product(__dirname + '/data/products.json')
products.init()

routerProd.get('/', (req, res) => {
	// 	Todos los productos
	let productsList = products.list

	return res.render('pages/products', {
		list: productsList
	})
});
routerProd.get('/:id', async (req, res) => {
	//  listar todos los productos disponibles o un producto por id
	let id = req.params.id
	let prodList = products.list
	return res.json(prodList[id]);
});

routerProd.post('/', (req, res) => {
	//  agrega un producto a la lista (solo para admin)
	products.save(req.body);
	let prodList = products.list
	return res.json(prodList)
});

routerProd.put('/:id', (req, res) => {
	//  actualiza un producto por id
	let obj = req.body;
	let id = Number(req.params.id);
	products.update(id, obj);
	return res.json(products.list[id]);
});

routerProd.delete('/:id', (req, res)=>{
    //  borra producto por id
	let id = Number(req.params.id)
	console.log(id)
	products.deleteById(id)
	return res.json(products.list)
})

routerProd.delete('/', (req, res)=>{
	products.deleteAll()
	return res.json(products.list)
})

module.exports = routerProd;
