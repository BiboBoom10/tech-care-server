const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true },
    orderId: { type: Schema.Types.ObjectId, required: true },
    message: { type: String, required: true },
    messageType: { type: String, enum: ['Accepted', 'Rejected', 'Pending'], default: 'Pending' },
    rejectionReason: { type: String }, // Only applicable if messageType is 'reject'
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
