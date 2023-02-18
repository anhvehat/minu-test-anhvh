const fs = require('fs');
const path = require('path');
const DATA_PATH = path.resolve('./data.json');

const readData = () => {
	try {
		let data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
		if (!Array.isArray(data)) return [];
		return data.filter(item => item && item.id);
	} catch (err) {
		return [];
	}
};

const writeData = (data) => {
	fs.writeFileSync(DATA_PATH, JSON.stringify(data));
};

const validateData = (data) => {
	if (typeof data.title != 'string' || data.title.trim() == '') {
		return 'Title can not be empty';
	}
	if (data.description !== null && typeof data.description != 'string') {
		return 'Description must be a string';
	}
	return false;
};

module.exports = {

	find: () => {
		return readData();
	},

	findById: (id) => {
		let items = readData();
		let matched = items.filter(item => item.id == id);
		return matched.length > 0 ? matched[0] : null;
	},

	create: (data) => {
		let items = readData();
		let id = 1;
		for (let item of items) {
			if (item.id > id) id = item.id;
		}
		let item = {
			id: id + 1,
			title: data.title || '',
			description: data.description || '',
			completed: data.completed ? true : false,
		};
		let err = validateData(item);
		if (err) throw new Error(err);
		items.push(item);
		writeData(items);
		return item;
	},

	update: (id, data) => {
		let items = readData();
		let updated = null;
		for (let item of items) {
			if (item.id != id) continue;
			if (data.hasOwnProperty('title')) item.title = data.title;
			if (data.hasOwnProperty('description')) item.description = data.description;
			if (data.hasOwnProperty('completed')) item.completed = data.completed ? true : false;
			let err = validateData(item);
			if (err) throw new Error(err);
			updated = item;
		}
		writeData(items);
		return updated;
	},

	delete: (id) => {
		let items = readData();
		let len = items.length;
		items = items.filter(item => item.id != id);
		writeData(items);
		return items.length < len ? { id } : null;
	},

};
