const { Schema, model } = require('mongoose');

const memberSchema = new Schema({
	userId: String,
	name: String
});

const member = model('member', memberSchema);

module.exports = {
	schema: memberSchema,
	model: member
};
