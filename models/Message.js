const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
	dialogId: String,
	from: String,
	to: String,
	text: [String],
	sended: String,
	received: String,
	date: Date
});

const message = model('message', messageSchema);

module.exports = {
	schema: messageSchema,
	model: message
};
