import {
	getTodos,
	deleteTodo
} from './api';
import { createRow, findRow, updateRow } from './helpers';
import modal from './modal';

const table = document.getElementById('table');
var data = [];

const clear = () => {
	table.innerHTML = '';
	data = [];
};

const putItem = (item) => {
	if (!item || !item.id) return;
	let matched = data.filter(it => it.id == item.id);
	if (matched.length > 0) {
		for (let it of matched) Object.assign(it, item);
	} else {
		data.push(item);
	}
	let el = findRow(item.id);
	if (el) {
		updateRow(el, item);
		return;
	}
	let editCb = (id) => {
		for (let it of data) {
			if (it.id == id) return modal.show(it);
		}
		return alert('Invalid item');
	};
	let delCb = async (id) => {
		let deleted = await deleteTodo(id);
		if (deleted) deleteItem(id);
	};
	el = createRow(item, editCb, delCb);
	table.append(el);
};

const deleteItem = (id) => {
	data = data.filter(it => it.id != id);
	let el = findRow(id);
	while (el) {
		el.remove();
		el = findRow(id);
	}
};

const loadAll = async () => {
	clear();
	let items = await getTodos();
	for (let item of items) {
		putItem(item);
	}
};

export default {
	clear,
	loadAll,
	putItem,
	deleteItem,
};
