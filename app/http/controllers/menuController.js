const Menu = require('../../models/menu')

function menuController() {
    return {
        async index(req, res) {
            const pizzas = await Menu.find()
            return res.render('menu', {pizzas: pizzas})
        }
    }
}

module.exports = menuController