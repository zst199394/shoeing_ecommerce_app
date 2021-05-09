const { User } = require('../models');

const userData = [{
        name: "test",
        password: "testtest"
    },
    {
        name: "admin",
        password: "adminadmin"
    },
];

const seedUsers = async() => {
    for (let user of userData) {
        let newUser = await User.create(user);

        await newUser.createCart();
    }
};

module.exports = seedUsers;