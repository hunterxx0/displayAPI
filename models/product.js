import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	pics_url: {
		type: Array,
		required: false,
		default: [],
	},
	seller_name: {
		type: String,
		required: true,
	},
	seller_id: {
		type: String,
		required: true,
		default: "none",
	},
	category: {
		type: String,
		required: true,
	},
	descriptions: {
		type: String,
		required: true,
		default: 'Describe your product'
	},
	tags: {
		type: Array,
		required: false,
		default: [],
	},
	requests: {
		type: Array,
		required: false,
		default: [],
	},
	characteristics: {
		type: Object,
		required: false,
		default: {},
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now
	},
	views: {
		type: Number,
		required: true,
		default: 0
	},
	favorite_count: {
		type: Number,
		required: true,
		default: 0
	},	
})

module.exports = mongoose.model('product', productSchema);
