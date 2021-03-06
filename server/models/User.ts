import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	access_token: {
		type: String,
	},
});

// module.exports = mongoose.model("User", UserSchema);
export default mongoose.model("User", UserSchema);
