const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CartItem extends Model {}

CartItem.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    quantity: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'cartItem',
});

module.exports = CartItem;