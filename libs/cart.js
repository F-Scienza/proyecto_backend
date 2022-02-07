const fs = require('fs');

class Cart {
	constructor(fileName) {
		this.file = fileName;
		this.countID = 0;
		this.carts = [];
	}
	async init() {
		console.log('-----carts init-----')
		const data = await fs.promises.readFile(this.file);
		const dataCarts = JSON.parse(data);
		
		for(const el of dataCarts){
			this.carts.push(el)
			this.countID++
		}
		console.log('-----cart file loaded----')
	}
	async write() {
		console.log('-----carts write-----')
		await fs.promises.writeFile(this.file, JSON.stringify(this.carts))
	}
	async newCart(obj){
		console.log('-----new cart-----')
		this.countID++
		obj['id']=this.countID
		this.carts.push(obj)
		this.write()
		return console.log(`new cart whit id ${this.countID}`)
	}
	async deleteCart(id){
		console.log('-----delete cart-----')
		if(this.carts.length > 0){
			console.log(JSON.stringify(this.carts) + ' antes de filtrar ');
			let newList = this.carts.filter((x)=> x.id != id)
			this.carts = newList
			this.write()
			console.log(`-----cart ${id} deleted-----`);	
		}else{
			console.log('-----no carts-----')
		}
	}
	async getCartProducts(id){
		console.log('-----search cart-----')
		let selectedCart = this.carts.find(el => el.id == id)
		return selectedCart
	}
}
module.exports = Cart;
