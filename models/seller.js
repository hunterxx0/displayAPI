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
            product_limit: {
                type: Number,
                required: false,
                default: 0
            },
            product_creation_count: {
                type: Number,
                required: false,
                default: 0
            },
            edit_limit: {
                type: Number,
                required: false,
                default: 0
            },
            edited_products: [{
                _id: false,
                default: [],
                prodID: {
                    type: String,
                    required: false,
                    expires: 86400
                }
            }],
            token: {
                type: String,
                required: false,
                default: null
            },
            avatarURL: {
                type: String,
                required: false,
            },
            notifications: [{
                        _id: false,
                        default: [],
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
}, { timestamps: true })


const Seller = mongoose.model('seller', sellerSchema);

export { Seller };