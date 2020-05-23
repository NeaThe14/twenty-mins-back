const { Schema, model } = require('mongoose');
const message = require('./Message');
const member = require('./Member');

const dialogSchema = new Schema({
	firstMember: member.schema,
	secondMember: member.schema,
	messages: [message.schema]
});

const dialog = model('dialog', dialogSchema);

module.exports = {
   schema: dialogSchema,
   model: dialog
};
