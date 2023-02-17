import axios from 'axios';

export const getTodos = async () => {
	try {
		let res = await axios.get('/api/todos');
		return res.data;
	} catch (err) {
		alert(err.response && err.response.data ? err.response.data.error : err.message);
		return [];
	}
};

export const getTodo = async (id) => {
	try {
		let res = await axios.get('/api/todos/' + id);
		return res.data;
	} catch (err) {
		alert(err.response && err.response.data ? err.response.data.error : err.message);
		return null;
	}
};

export const createTodo = async (data) => {
	try {
		let res = await axios.post('/api/todos', data);
		return res.data;
	} catch (err) {
		alert(err.response && err.response.data ? err.response.data.error : err.message);
		return null;
	}
};

export const updateTodo = async (id, data) => {
	try {
		let res = await axios.put('/api/todos/' + id, data);
		return res.data;
	} catch (err) {
		alert(err.response && err.response.data ? err.response.data.error : err.message);
		return null;
	}
};

export const deleteTodo = async (id) => {
	try {
		let res = await axios.delete('/api/todos/' + id);
		return true;
	} catch (err) {
		alert(err.response && err.response.data ? err.response.data.error : err.message);
		return false;
	}
};
