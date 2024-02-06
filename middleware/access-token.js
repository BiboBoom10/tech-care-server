const HttpError = require('../models/http-error');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.accessToken = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization;
        const separatedToken = token?.split(' ')[1];
        if (!separatedToken) return next(new HttpError('Token Error', 'Invalid access token', 403));
        const decodedToken = jwt.verify(separatedToken, process.env.TOKEN_SECRET);
        if (!decodedToken) return next(new HttpError('Token Error', 'Invalid access token', 403));
        const userId = decodedToken?.id;
        const foundUser = await User.findById(userId, { password: 0 });
        if (!foundUser) return next(new HttpError('Token Error', 'Invalid access token', 403));
        req.id = userId;
        req.user = foundUser?._doc;
        next();
    } catch (err) {
        console.log(err);
        return next(new HttpError('Unable to validate token'))
    }
}