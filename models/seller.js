import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
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
	hashedPassword: {
		type: String,
		required: true,
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
	token: {
		type: String,
		required: true,
		default: null
	},
	avatarURL: {
		type: String,
		required: false,
	},
	created_at: {
		type: Date,
		required: true,
		default: Date.now
	},
})


const Seller = mongoose.model('seller', sellerSchema);

export { Seller } ;
