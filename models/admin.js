import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
	password: {
		type: String,
		required: true,
	},
	logs: {
		type: Array,
		required: false,
		default: [],
	},
},  { timestamps: true })

const Admin = mongoose.model('admin', adminSchema);

export { Admin } ;
