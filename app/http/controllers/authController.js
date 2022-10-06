const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
    const _getRedirectUrl = (req) => {
        return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders'
    }

    return {
        login(req, res) {
            res.render('auth/login')
        },

        postlogin(req, res, next) {
            const { email, password } = req.body
            //Request validation
            if (!email || !password) {
                req.flash('error', 'All fields are required!!')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    req.flash('error', info.message)
                    return next(err)
                }
                if (!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if (err) {
                        req.flash('error', info.message)
                        return next(err)
                    }

                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
        },

        signup(req, res) {
            res.render('auth/signup')
        },

        async postsignup(req, res) {
            const { name, email, password } = req.body
            //Validate request
            if (!name || !email || !password) {
                req.flash('error', 'All fields are required!!')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/signup')
            }
            //Email already registered
            User.exists({ email: email }, (err, result) => {
                if (result) {
                    req.flash('error', 'Email already registered!!')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/signup')
                }
            })
            //password hashing
            const hashedPassword = await bcrypt.hash(password, 10)

            //Register the user
            const user = new User({
                name: name,
                email: email,
                password: hashedPassword
            })

            user.save().then((user) => {
                //for login in future
                return res.redirect('/menu')
            }).catch(err => {
                req.flash('error', 'Something is wrong!!')
                return res.redirect('/signup')
            })
        },

        logout(req, res, next) {
            req.logout((err) => {
                if(err) {
                    return next(err);
                }
                return res.redirect('/login');
            })
        }
    }
}

module.exports = authController