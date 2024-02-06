const User = require('../models/user');
const HttpError = require('../models/http-error');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const { name, email, password, isAdmin } = req.body;
        const foundEmail = await User.findOne({ email });
        if (foundEmail) return next(new HttpError('Email Error', 'The email address already exists', 422));
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await User.create({ name, email, password: hashedPassword, isAdmin });
        const accessToken = jwt.sign({ id: newUser._id, email }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 });
        const createdUser = newUser?._doc;
        delete createdUser.password;
        res.status(200).json({ message: 'User registered', user: createdUser, accessToken })
    } catch (err) {
        console.log(err);
        return next(new HttpError('Unable to register user'));
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const foundEmail = await User.findOne({ email });
        if (!foundEmail) return next(new HttpError('Auth Error', 'Invalid email or password', 422));
        const isPasswordCorrect = await bcrypt.compare(password, foundEmail.password);
        if (!isPasswordCorrect) return next(new HttpError('Auth Error', 'Invalid email or password', 422));
        const theUser = foundEmail?._doc;
        delete theUser.password;
        const accessToken = jwt.sign({ id: foundEmail._id, email }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 });
        res.status(200).json({ message: 'User log in successfull', user: theUser, accessToken })
    } catch (err) {
        console.log(err);
        return next(new HttpError('Unable to login user'))
    }
}