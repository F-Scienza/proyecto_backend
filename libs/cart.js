const fs = require('fs');

class Cart {
	constructor(fileName) {
		this.file = fileName;
		this.countID = 0;
		this.carts = [];
	}
	async init() {
		console.log('-----carts init-----')
		try {
			console.log('-----cart file loaded----')
			const data = await fs.promises.readFile(this.file);
			this.list = JSON.parse(data);
			for (const element of this.list) {
				if (element.id > this.countID) this.countID = element.id;
			}
		} catch (error) {
			console.log('-----carts file created-----');
			this.write()
		}
	}
	async write() {
		try {
			const str = JSON.stringify(this.list);
			await fs.promises.writeFile(this.file, str);
		} catch (err) {
			return `Ocurrio un error al escrbir el archivo ${err}`;
		}
	}
	newCart(obj){
		this.countID++
		obj['id']=this.countID
		this.carts.push(obj)
		this.write()
		return console.log(`id carrito ${this.countID}`)
	}
}

module.exports = Cart;
