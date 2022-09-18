const mongo = require("mongoose");

const userSchema = new mongo.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	phone_number: {
		type: Number,
		required: true,
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now
	},
	updated_at: {
		type: Date,
		required: false,
	},
	favorites: {
		type: Array,
		required: false,
		default: []
	},
	requests: {
		type: Array,
		required: false,
		default: []
	},
	recently_searched: {
		type: Array,
		required: false,
		default: []
	},
})

module.exports = mongo.model('user', userSchema);
