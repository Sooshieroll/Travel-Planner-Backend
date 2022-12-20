const express = require('express');
const router = express.Router();
const Favorite = require('../models/favorite');
const passport = require('passport');

router.get('/test', (req, res) => {
    res.send('hello')
})

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
    Favorite.create({
        name: req.body.name,
        address: req.body.address
    }, function (err, favorite) {
        if (err)
            res.send(err);

        Favorite.find({}, function (err, favorite) {
            if (err)
                res.send(err);
            res.json(favorite);
        });
    });
});

module.exports = router;