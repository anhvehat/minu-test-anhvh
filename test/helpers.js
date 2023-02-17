export const findRow = (id) => {
	return document.getElementById('todo-' + id);
};

export const createRow = (item, editCb, delCb) => {
	let tr = document.createElement('tr');
	tr.id = 'todo-' + item.id;
	let id = document.createElement('td');
	id.innerText = item.id;
	let title = document.createElement('td');
	title.innerText = item.title;
	let description = document.createElement('td');
	description.innerText = item.description;
	let completed = document.createElement('td');
	completed.innerText = item.completed ? 'True' : 'False';
	let actions = document.createElement('td');
	actions.style['text-align'] = 'right';
	let edit = document.createElement('button');
	edit.className = 'btn btn-primary btn-sm';
	edit.innerText = 'EDIT';
	edit.addEventListener('click', function(e) {
		if (typeof editCb == 'function') {
			editCb(item.id);
		}
	;})
	let del = document.createElement('button');
	del.className = 'btn btn-danger btn-sm';
	del.innerText = 'DELETE';
	
	del.addEventListener('click', function(e) {
		if (typeof delCb == 'function') {
			delCb(item.id);
		}
	;})
	
	actions.append(del);
	actions.append(' ');
	actions.append(edit);
	tr.append(id);
	tr.append(title);
	tr.append(description);
	tr.append(completed);
	tr.append(actions);
	return tr;
};

export const updateRow = (tr, item) => {
	let td = tr.children;
	td[1].innerText = item.title;
	td[2].innerText = item.description;
	td[3].innerText = item.completed ? 'True' : 'False';
};
