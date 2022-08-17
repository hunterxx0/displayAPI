const mongo = require("mongoose");

const productSchema = new mongo.Schema({
	title: {
		type: String,
		required: true,
	},
	status: {
		type: Boolean,
		required: true,
	},
	seller_id: {
		type: Number,
		required: true,
	},
	tags: {
		type: Array,
		required: false,
		default: []
	},
	requests: {
		type: Array,
		required: false,
		default: []
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now
	},
})

module.exports = mongo.model('product', productSchema);
