const io = require('socket.io-client');

const instance = io('ws://localhost:9000');

const chat = io('ws://localhost:9000/chat-namespace');

chat.on('connect', socket => {
	console.log('Successfully connected to chat');
	chat.emit('join-dialog', '1');

	chat.on('message', message => {
		// Вот тут просто фильтруй сообщения по комнатам
		console.log('received new message for dialog', message.dialogId);
	});
})


setInterval(() => {
	chat.emit('message', { dialogId: '1'});
}, 3000);
