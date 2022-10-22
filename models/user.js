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
    recently_viewed: {
        type: Array,
        required: false,
        default: []
    },
    recently_searched: {
        type: Array,
        required: false,
        default: []
    },
    notifications: {
        id: {
            type: String,
            required: true,
        },
        date: {
            type: Number,
            required: true,
        },
        prodID: {
            type: String,
            required: true,
        },
        product_name: {
            type: String,
            required: true,
        },
        read: {
            type: String,
            required: true,
            default: 'unRead'
        },
        seller_name: {
            type: String,
            required: true,
        },
        Operation: {
            type: String,
            required: true,
        },
        targets: {
            name: {
                type: String,
                required: false,
            },
            from: {
                type: String,
                required: false,
            },
            to: {
                type: String,
                required: false,
            },
        },
    },
    following: {
        type: Array,
        required: false,
        default: []
    },
    unfollowed: {
        type: Array,
        required: false,
        default: []
    },
})

const User = mongoose.model('user', userSchema);

export { User };