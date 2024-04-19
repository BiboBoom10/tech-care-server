const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		user: { type: Object, required: true },
		recepient: { type: Object, required: true },
		brand: { type: String, required: true },
		model: { type: String, required: true },
		issueDescription: { type: String, required: true },
		additionalInstructions: { type: String },
		deliveryOptions: { type: String, required: true },
		serviceOrProduct: { type: String, required: true },
		status: { type: String, enum: ["Pending", "Accepted", "Rejected"], default: 'Pending' },
		rating: { type: Number, default: 0 }
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);