const mongo = require("mongoose");

const sellerSchema = new mongo.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone_number: {
		type: Number,
		required: false,
	},
	website: {
		type: String,
		required: false,
	},
	seller_country: {
		type: String,
		required: true,
	},
	response_time: {
		type: Number,
		required: true,
		default: 0
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now
	},
})

module.exports = mongo.model('seller', sellerSchema);
