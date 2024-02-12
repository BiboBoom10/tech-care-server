const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderSchema = new Schema(
	{
		deviceType: { type: String, required: true },
		brand: { type: String, required: true },
		model: { type: String, required: true },
		issueDescription: { type: String, required: true },
		additionalInstructions: { type: String },
		deliveryOptions: { type: String, required: true },
		phoneNumber: { type: String, required: true },
		serviceOrProduct: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
