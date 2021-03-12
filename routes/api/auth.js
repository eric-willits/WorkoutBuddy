const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

//import auth middleware
const auth = require('../../middleware/auth');

//User Model
const User = require('../../models/User');

// @route POST api/auth/login
// @desc Login user
// @access Public
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    //simple validation
    if(!username || !password ){
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    User.findOne({ username })
        .then(user => {
            if(!user) return res.status(400).json({ msg: 'That user does not exist.' });

            //Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: "Invalid password" });

                    jwt.sign(
                        { id: user.id, username },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;

                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    username: user.username,
                                    pinned: user.pinned
                                }
                            })
                        }
                    )
                })
        })
});

// @route POST api/auth/register
// @desc Register new user
// @access Public
router.post("/register", (req, res) => {
    const { username, password } = req.body;

    //simple validation
    if(!username || !password ){
        return res.status(400).json({ msg: 'Please enter all fields.' });
    }

    User.findOne({ username })
        .then(user => {
            if(user) return res.status(400).json({ msg: 'A user with that username already exists.' });

            const newUser = new User({
                username,
                password
            });

            //Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id, username },
                                config.get('jwtSecret'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err;

                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            username: user.username,
                                            pinned: user.pinned
                                        }
                                    })
                                }
                            )
                        });
                })
            })
        })
})

//@route PUT api/auth/pinned
//@desc Update user pinned exercises
//@access Public
router.put("/pinned", auth, (req, res) => {
    User.findByIdAndUpdate(req.user.id, {pinned: req.body.pinned}, {new: true})
        .then(user => res.json(user))
})

// @route GET api/auth/user
// @desc Get user data
// @access Public
router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})

module.exports = router;