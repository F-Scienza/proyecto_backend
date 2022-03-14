const fs = require('fs');
class Product {
	constructor(filename) {
		this.id = 0;
		this.file = filename;
		this.list = [];
	}

	async init() {
		console.log('-----product init-----')
		const data = await fs.promises.readFile(this.file);
		const dataProducts = JSON.parse(data);
		for (const element of dataProducts) {
			this.list.push(element)
			this.id++
		}
		console.log('-----product file loaded-----');
	}

	async write() {
		console.log('-----product write-----')
		await fs.promises.writeFile(this.file, JSON.stringify(this.list))
	}

	async getAll() {
		console.log('-----product get all----');
		let allProducts = JSON.stringify(this.list);
		return allProducts;
	}

	async getById(id) {
		console.log('----- product get by id-----')
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
		console.log('-----product save-----')
		this.id++; //Aumento la propiedad que va guardando el ID más alto
		object['id'] = this.id; //Agrego la propiedad id al objeto pasado como parámetro
		object.timestamp = Date.now() // timestamp
		this.list.push(object); //Agrego el objeto al contenido(array)
		this.write(); //Agrego el objeto al archivo
		return `El id del objeto añadido es ${this.id}.`; //Retorna el ID (lo solicita la consigna)
	}

	async update(id, obj) {
		console.log('-----product update-----')
		const index = this.list.findIndex(el => el.id == id);
		obj.id = this.list[index].id;
		this.list[index] = obj;
		this.write()
		return obj;
	}

	deleteById(id) {
		//Elimina del archivo el objeto con el id buscado
		console.log('-----product deleted by id-----')
		let result;
		if (this.list !== []) {
			let newlist = this.list.filter((x) => x.id !== id);
			this.list = newlist;
			this.write(); //SobreEscribo el archivo
			result = `El producto fue eliminado`;
		} else {
			result = `El archivo está vacío`;
		}
		return result;
	}

	async deleteAll(){
		console.log('-----product deleted all-----')
		this.list = await this.list.splice(0, this.list.length)
		this.write()
	}
}
module.exports = Product;
