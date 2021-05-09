const { Category } = require('../models');

const categoryData = [{
        category_name: 'Tennis',
    },
    {
        category_name: 'Sneaker',
    },
    {
        category_name: 'Running',
    },
    {
        category_name: 'Basketball',
    },
    {
        category_name: 'Heels',
    },
    {
        category_name: 'Boots',
    }
];

const seedCategories = () => Category.bulkCreate(categoryData);

module.exports = seedCategories;