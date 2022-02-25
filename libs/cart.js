const fs = require('fs');

class Cart {
	constructor(fileName) {
		this.file = fileName;
		this.countID = 0;
		this.carts = [];
	}
	async init() {
		console.log('-----carts init-----');
		const data = await fs.promises.readFile(this.file);
		const dataCarts = JSON.parse(data);
		for (const el of dataCarts) {
			this.carts.push(el);
			this.countID++;
		}
		console.log('-----cart file loaded----');
	}
	async write() {
		console.log('-----carts write-----');
		await fs.promises.writeFile(this.file, JSON.stringify(this.carts));
	}
	async newCart(obj) {
		console.log('-----new cart-----');
		this.countID++;
		obj['id'] = this.countID;
		this.carts.push(obj);
		this.write();
		return console.log(`new cart whit id ${this.countID}`);
	}
	async deleteCart(id) {
		console.log('-----delete cart-----');
		if (this.carts.length > 0) {
			console.log(JSON.stringify(this.carts) + ' antes de filtrar ');
			let newList = this.carts.filter(x => x.id != id);
			this.carts = newList;
			this.write();
			console.log(`-----cart ${id} deleted-----`);
		} else {
			console.log('-----no carts-----');
		}
	}
	async getCartProducts(id) {
		console.log('-----search cart-----');
		let selectedCart = this.carts.find(el => el.id == id);
		return selectedCart;
	}
	async addProduct(id, product) {
		const index = this.carts.findIndex(objT => objT.id == id);
		if (this.carts[index]) {
			this.carts[index].products.push(product);
			this.write();
		} else {
			console.log('no existe carrito con ese id');
		}
		return this.carts;
	}
	async deleteProductCart(id_cart, id_prod) {
		if(this.carts !== []){
			const index = this.carts.findIndex(obj => obj.id == id_cart);
			const cartProducts = this.carts[index].products
			const newCartProducts = cartProducts.filter(x => x.id !== id_prod);
			this.carts[index].products = newCartProducts
			console.log('-----Deleted product on cart-----');
			this.write();
		}else{
			console.log('-----no exist-----');
		}
		return 
	}
}
module.exports = Cart;
