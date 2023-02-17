const TodoService = require('./todo.service');

module.exports = {

	// retrieves a list of all to-dos
	find: (req, res) => {
		try {
			let data = TodoService.find();
			return res.json(data);
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},

	// retrieves a specific to-do by its ID
	detail: (req, res) => {
		try {
			let data = TodoService.findById(req.params.id);
			if (!data) {
				return res.status(404).json({ error: 'Not found' });
			}
			return res.json(data);
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},

	// creates a new to-do
	create: (req, res) => {
		try {
			let d = req.body || {};
			let data = TodoService.create(d);
			io.emit('create', data);
			return res.json(data);
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},

	// updates an existing to-do
	update: (req, res) => {
		try {
			let d = req.body || {};
			let data = TodoService.update(req.params.id, d);
			if (!data) {
				return res.status(404).json({ error: 'Not found' });
			}
			io.emit('update', data);
			return res.json(data);
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},

	// deletes an existing to-do
	delete: (req, res) => {
		try {
			let { id } = req.params;
			let data = TodoService.delete(id);
			if (!data) {
				return res.status(404).json({ error: 'Not found' });
			}
			io.emit('delete', data);
			return res.json(data);
		} catch (err) {
			return res.status(500).json({ error: err.message });
		}
	},

};
