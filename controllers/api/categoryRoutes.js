const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', async(req, res) => {
    try {
        let results = await Category.findAll({ include: [{ model: Product }] });
        res.status(200).json(results)
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.get('/:id', async(req, res) => {
    try {
        let { id } = req.params;
        let results = await Category.findByPk(id, { include: [{ model: Product }] })
        if (!results) res.status(400).send('No Category with that id');
        else res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.post('/', async(req, res) => {
    try {
        let { body } = req;
        let result = await Category.create(body);
        res.status(200).send(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        let { id } = req.params;
        let results = await Category.destroy({
            where: {
                id
            }
        })
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

router.put('/:id', async(req, res) => {
    try {
        let { id } = req.params;
        let { body } = req;
        let result = await Category.update(body, {
            where: {
                id
            }
        });
        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
});

module.exports = router;