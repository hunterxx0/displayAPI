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
	notifications: [{
        _id: false,
        id: {
            type: String,
            required: false,
        },
        date: {
            type: Number,
            required: false,
        },
        product_id: {
            type: String,
            required: false,
        },
        product_name: {
            type: String,
            required: false,
        },
        request_id: {
            type: String,
            required: false,
        },
        user_id: {
            type: String,
            required: false,
        },
        read: {
            type: String,
            required: false,
        },
        Operation: {
            type: String,
            required: false,
        },
    }],
	created_at: {
		type: Date,
		required: true,
		default: Date.now
	},
})


const Seller = mongoose.model('seller', sellerSchema);

export { Seller } ;
