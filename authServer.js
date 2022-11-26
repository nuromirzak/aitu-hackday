const express = require('express');
const bodyparser = require("body-parser");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require("mongoose");
const logger = require('./log-rotator');

const app = express();
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    logger.info(`Request URL: ${req.url} Request Type: ${req.method} Request Body: ${JSON.stringify(req.body)}`);
    next();
});

const port = process.env.PORT || 5000;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRE_TIME = 60 * 15; // 15 minutes
const REFRESH_TOKEN_EXPIRE_TIME = 6 * 30 * 24 * 60 * 60; // 6 months
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
const salt = 10;

mongoose.connect(`mongodb+srv://username:${MONGODB_PASSWORD}@cluster-0.ypif198.mongodb.net/test`);

// Schema For User Auth
const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true}, password: {type: String, required: true}
}, {collection: 'users'});
//
const User = mongoose.model("User", userSchema);

// Route for user signup
app.post('/signup', async (req, res, next) => {
    const {email, password: plainTextPassword} = req.body;
    // encrypting our password to store in database
    const password = await bcrypt.hash(plainTextPassword, salt);
    try {
        // storing our user data into database
        const user = new User({email, password});
        await user.save();
        return res.json({status: 'ok'});
    } catch (error) {
        console.log(error);
        if (error.code === 11000) {
            return res.json({status: 'error', error: 'email already in use'});
        }
        throw error;
    }
})

// Verifying user login
const verifyUserLogin = async (email, password) => {
    try {
        // const user = await User.findOne({email}).lean()
        const user = await User.findOne({email: email}).lean();
        if (!user) {
            return {status: 'error', error: 'user not found'}
        }
        if (await bcrypt.compare(password, user.password)) {
            // creating a JWT token
            const accessToken = jwt.sign({
                username: user.email, type: 'user'
            }, ACCESS_TOKEN_SECRET, {expiresIn: ACCESS_TOKEN_EXPIRE_TIME});

            const refreshToken = jwt.sign({
                username: user.email, type: 'user'
            }, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_EXPIRE_TIME});

            return {status: 'ok', accessToken, refreshToken};
        }
        return {status: 'error', error: 'invalid password'}
    } catch (error) {
        console.log(error);
        return {status: 'error', error: 'timed out'}
    }
}

// Route for user login
app.post('/login', async (req, res) => {
    const {email, password} = req.body;
    // we made a function to verify our user login
    const response = await verifyUserLogin(email, password);
    if (response.status === 'ok') {
        // storing our JWT web token as a cookie in our browser
        res.cookie('token', response.refreshToken, {maxAge: REFRESH_TOKEN_EXPIRE_TIME * 1000, httpOnly: true});
        res.cookie('accessToken', response.accessToken, {maxAge: ACCESS_TOKEN_EXPIRE_TIME * 1000, httpOnly: true});

        res.json({status: 'ok', token: response.accessToken});
    } else {
        res.json(response);
    }
})

// Logout
app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.clearCookie('accessToken');
    res.redirect('/');
});

// Refresh Token
app.post('/refresh', (req, res) => {
    if (req.cookies?.token) {

        // Destructuring refreshToken from cookie
        const refreshToken = req.cookies.token;

        // Verifying refresh token
        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {

                // Wrong Refresh Token
                console.log(JSON.stringify(err));
                return res.status(406).json({message: 'Unauthorized'});
            } else {
                // Correct token we send a new access token
                const accessToken = jwt.sign({
                    email: decoded.email, type: decoded.type
                }, ACCESS_TOKEN_SECRET, {
                    expiresIn: ACCESS_TOKEN_EXPIRE_TIME
                });
                res.cookie('accessToken', accessToken, {maxAge: ACCESS_TOKEN_EXPIRE_TIME * 1000, httpOnly: true});
                return res.json({accessToken});
            }
        });
    } else {
        console.log('Refresh token not found');
        return res.status(406).json({message: 'Unauthorized'});
    }
})

// Verifying access token
const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, ACCESS_TOKEN_SECRET);
        return verify.type === 'user';
    } catch (error) {
        console.log(JSON.stringify(error));
        return false;
    }
}

// Special route which can only be accessed by logged-in users
app.get('/secret', (req, res) => {
    const token = req.cookies.accessToken;
    if (typeof token !== 'undefined') {
        if (verifyToken(token)) {
            return res.send('You are logged in');
        } else {
            return res.send('FAIL');
        }
    } else {
        return res.status(403).send('You are not provided with a token');
    }
});

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.use(function (err, req, res, next) {
    let obj = {
        "message": err.message,
        "stack": err.stack,
        "url": req.url,
    };
    console.log(obj);
    logger.error(obj);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});