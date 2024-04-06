const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const technicianSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, default: 'Technician' },
    password: { type: String, required: true },
    location: { type: Object, content: Schema.Types.Mixed },
    address: { type: String, content: Schema.Types.Mixed },
    profile: { type: String, content: Schema.Types.Mixed },
    description: { type: String, content: Schema.Types.Mixed },
    services: [String]
}, { timestamps: true });

module.exports = mongoose.model('Technician', technicianSchema);