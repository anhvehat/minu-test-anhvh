import { connect } from 'socket.io-client';
import table from './table';

var client;

export default {
	connect: () => {
		if (client) return;
		client = connect('/', {});
		client.on('connect', () => {
			console.log('Connected');
			table.loadAll();
		});
		client.on('create', (data) => {
			table.putItem(data);
		});
		client.on('update', (data) => {
			table.putItem(data);
		});
		client.on('delete', (data) => {
			if (data && data.id) {
				table.deleteItem(data.id);
			}
		});
	},
};
