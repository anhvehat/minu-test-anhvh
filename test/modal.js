import {
	createTodo,
	updateTodo
} from './api';
import table from './table';

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const btnCancel = document.getElementById('cancel');
const btnSave = document.getElementById('save');
const form = {
	id: null,
	title: document.getElementById('title'),
	description: document.getElementById('description'),
	completed: document.getElementById('completed')
};

const show = (item = {}) => {
	form.id = item.id;
	form.title.value = item.title || '';
	form.description.value = item.description || '';
	form.completed.checked = item.completed ? true : false;
	modalTitle.innerText = form.id ? ('Edit todo - #' + form.id) : 'Create todo';
	modal.className = 'show';
};

const hide = () => {
	modal.className = '';
};

const setLoading = (val) => {
	btnSave.disabled = val;
	btnCancel.disabled = val;
};

btnCancel.addEventListener('click', (e) => {
	hide();
});

btnSave.addEventListener('click', async (e) => {
	setLoading(true);
	let data = {
		title: form.title.value.trim(),
		description: form.description.value.trim(),
		completed: form.completed.checked
	};
	let item = form.id ? await updateTodo(form.id, data)
		: await createTodo(data);
	setLoading(false);
	if (item) {
		table.putItem(item);
		hide();
	}
});

export default {
	show,
	hide,
};
