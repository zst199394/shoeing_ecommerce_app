const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class OrderItem extends Model {}

OrderItem.init({
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
    modelName: 'orderItem',
});

module.exports = OrderItem;