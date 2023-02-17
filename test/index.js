import modal from './modal';
import table from './table';
import socket from './socket';

async function initialize() {
	await table.loadAll();
	socket.connect();
	document.getElementById('create').addEventListener('click', function(e) {
		modal.show();
	});
}

initialize();


