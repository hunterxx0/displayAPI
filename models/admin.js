import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
        default: null,
    },
    logs: {
        type: Array,
        required: false,
        default: [],
    },
}, { timestamps: true })

const Admin = mongoose.model('admin', adminSchema);

export { Admin };