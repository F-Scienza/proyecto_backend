const fs = require('fs');
class Product {
	constructor(filename) {
		this.id = 0;
		this.file = filename;
		this.list = [];
	}

	async init() {
		const data = await fs.readFileSync(this.file);
		const dataProducts = JSON.parse(data);
		for (const element of dataProducts) {
			this.list.push(element)
			this.id++
		}
		console.log('-----file loaded-----');
	}

	async write() {
		await fs.promises.writeFile(this.file, JSON.stringify(this.list))
	}

	async getAll() {
		console.log('-----get all----');
		let allProducts = JSON.stringify(this.list);
		return allProducts;
	}

	async getById(id) {
		console.log('----get by id-----')
		let result;
		if (this.list !== []) {
			result = this.list.find(x => x.id === id);
			if (result === undefined) {
				result = null;
			}
		} else {
			result = 'No coincide ningun id';
		}
		return result;
	}

	async save(object) {
		console.log('-----save-----')
		this.id++; //Aumento la propiedad que va guardando el ID más alto
//		console.log('save id '+this.id)
		object['id'] = this.id; //Agrego la propiedad id al objeto pasado como parámetro
		this.list.push(object); //Agrego el objeto al contenido(array)
//		console.log(this.list);
		this.write(); //Agrego el objeto al archivo
		return `El id del objeto añadido es ${this.id}.`; //Retorna el ID (lo solicita la consigna)
	}

	async update(upId, obj) {
		console.log('-----update-----')
		const index = this.list.findIndex(el => el.id == upId);
		obj.id = this.list[index].id;
		this.list[index] = obj;
		return obj;
	}
}
module.exports = Product;
