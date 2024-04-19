const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, refPath: 'userModel' },
    userModel: { type: String, required: true, enum: ['User', 'Technician'] },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
    message: { type: String, required: true },
    messageType: { type: String, enum: ['Accepted', 'Rejected', 'Pending'], default: 'Pending' },
    rejectionReason: { type: String }, // Only applicable if messageType is 'reject'
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
