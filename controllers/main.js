const HttpError = require('../models/http-error');
const Technician = require('../models/technician');

exports.main = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Bibo Boom' });
    } catch (err) {
        console.log(err);
        return next(new HttpError('Unable to load the application'));
    }
}

exports.getTechnicians = async (req, res, next) => {
    try {
        const technicians = await Technician.find({}, { password: 0 });
        res.status(200).json({ message: 'Technicians', technicians });
    } catch (err) {
        console.log(err);
        return next(new HttpError('Unable to get technicians'))
    }
}