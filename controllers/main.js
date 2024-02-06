const HttpError = require('../models/http-error');

exports.main = async (req, res, next) => {
    try {
        res.status(200).json({ message: 'Bibo Boom' });
    } catch (err) {
        console.log(err);
        return next(new HttpError('Unable to load the application'));
    }
}