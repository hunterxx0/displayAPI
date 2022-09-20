import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	fullName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	hashedPassword: {
		type: String,
		required: true,
	},
	phone_number: {
		type: Number,
		required: true,
	},
	token: {
		type: String,
		required: true,
		default: null
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
	avatarURL: {
		type: String,
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

const User = mongoose.model('user', userSchema);

export { User } ;
