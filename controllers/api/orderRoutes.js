const router = require('express').Router();
const { Category, Product, Cart, CartItem, User, Order, OrderItem } = require('../../models');

router.get('/', async(req, res) => {
    if (!req.session.logged_in) {

        res.status(400).json({ message: "Please log in" })
        return;
    }

    try {

        let user = await User.findByPk(req.session.user_id, { exclude: ['password'] });

        let orders = await user.getOrders({
            include: [{ model: Product, through: OrderItem }, { model: User, exclude: ['password'] }]
        })

        res.status(200).json(orders)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/:id', async(req, res) => {
    if (!req.session.logged_in) {

        res.status(400).json({ message: "Please log in" })
        return;
    }

    try {

        let { id } = req.params;
        let user = await User.findByPk(req.session.user_id, { exclude: ['password'] });

        let orders = await user.getOrders({
            include: [{ model: Product, through: OrderItem }, { model: User, exclude: ['password'] }],
            where: {
                id
            }
        })

        res.status(200).json(orders)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post("/", async(req, res) => {
    if (!req.session.logged_in) {

        res.status(400).json({ message: "Please log in" })
        return;
    }

    let fetchedCart;
    try {
        fetchedCart = await Cart.findOne({
            include: [{ model: Product, through: CartItem }, { model: User }],
            exclude: ['password'],
            where: {
                user_id: req.session.user_id
            }
        })

        let products = await fetchedCart.getProducts();

        let user = await User.findByPk(req.session.user_id);

        let newOrder = await user.createOrder();

        let orderProducts = products.map(product => {
            product.orderItem = { quantity: product.cartItem.quantity };
            return product;
        })

        for (let product of orderProducts) {
            let prod = await Product.findByPk(product.id);

            prod.stock -= product.orderItem.quantity;

            await Product.update({ stock: prod.stock }, {
                where: {
                    id: product.id
                }
            })
        }

        await fetchedCart.setProducts(null);

        let result = await newOrder.addProducts(orderProducts);

        res.status(200).json(newOrder);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = router;