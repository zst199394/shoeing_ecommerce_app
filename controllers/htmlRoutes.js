const router = require('express').Router();
const path = require('path');
const withAuth = require('../utils/auth');

router.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'));
});

router.get('/search/:search', async(req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'));
});

router.get('/item/:id', async(req, res) => {
    res.sendFile(path.join(__dirname, '../public/item.html'));
});

router.get('/cart', withAuth, async(req, res) => {
    res.sendFile(path.join(__dirname, '../public/cart.html'));
});

router.get('/login', async(req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/signup', async(req, res) => {
    res.sendFile(path.join(__dirname, '../public/signup.html'));
});

router.get('/contact', async(req, res) => {
    res.sendFile(path.join(__dirname, '../public/contact.html'));
});

module.exports = router;