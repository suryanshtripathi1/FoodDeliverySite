const Contact = require('../../models/contact')

function homeController() {
    return {
        index(req, res) {
            res.render('home')
        },

        cont(req, res) {
            const contact = new Contact({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                message: req.body.message
            })
            contact.save().then(result => {
                return res.redirect('/')
            }).catch(err => {
                return res.redirect('/')
            })
        }
    }
}

module.exports = homeController