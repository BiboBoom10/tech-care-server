const User = require('../models/user');
const Technician = require('../models/technician');
const HttpError = require('../models/http-error');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, isTechnician, phone } = req.body;
        const foundEmail = await User.findOne({ email });
        if (foundEmail) return next(new HttpError('Email Error', 'The email address already exists', 422));
        const hashedPassword = await bcrypt.hash(password, 12);
        let newUser;
        let newTech;
        if (isTechnician) newTech = await Technician.create({ name, email, password: hashedPassword, phone });
        else if (!isTechnician) newUser = await User.create({ name, email, password: hashedPassword, phone });
        const createdAccount = newUser?._doc || newTech?._doc
        const accessToken = jwt.sign({ id: createdAccount._id, email }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 });
        delete createdAccount.password;
        res.status(200).json({ message: 'User registered', user: createdAccount, accessToken })
    } catch (err) {
        console.log(err);
        return next(new HttpError('Unable to register user'));
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        const foundTech = await Technician.findOne({ email });
        if (!foundUser && !foundTech) return next(new HttpError('Auth Error', 'Invalid email or password', 422));
        const foundAccount = foundUser || foundTech
        const isPasswordCorrect = await bcrypt.compare(password, foundAccount.password);
        if (!isPasswordCorrect) return next(new HttpError('Auth Error', 'Invalid email or password', 422));
        const theUser = foundAccount?._doc;
        delete theUser.password;
        const accessToken = jwt.sign({ id: foundAccount._id, email }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 });
        res.status(200).json({ message: 'User log in successfull', user: theUser, accessToken })
    } catch (err) {
        console.log(err);
        return next(new HttpError('Unable to login user'))
    }
}

exports.profile = async (req, res, next) => {
    try {
        res.status(200).json({ user: req.user });
    } catch (err) {
        console.log(err);
        return next(new HttpError('Unable to get profile details'));
    }
}

exports.updateProfile = async (req, res, next) => {
    try {
        const { profile, address, longitude, latitude, services } = req.body;
        const location = {
            type: 'Point',
            coordinates: [Number(longitude), Number(latitude)]
        };
        if (req.isTechnician) await Technician.updateOne({ _id: req.id }, { $set: { location, address, services, profile } });
        res.status(200).json({ message: 'Profile details have been updated' });
    } catch (err) {
        console.log(err);
        return next(new HttpError('Unable to update profile details'))
    }
}