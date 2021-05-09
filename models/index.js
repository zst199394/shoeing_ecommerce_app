const Cart = require('./Cart');
const User = require('./User');
const CartItem = require('./Cart-Item');
const Category = require('./Category');
const Product = require('./Product');
const Order = require('./Order');
const OrderItem = require('./Order-Item');

User.hasOne(Cart)

Cart.belongsTo(User);

Category.hasMany(Product);

Product.belongsTo(Category);

Product.belongsToMany(Cart, { through: CartItem });

Cart.belongsToMany(Product, { through: CartItem });

Order.belongsTo(User);

User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });

Product.belongsToMany(Order, { through: OrderItem });

module.exports = { User, Cart, CartItem, Category, Product, Order, OrderItem };