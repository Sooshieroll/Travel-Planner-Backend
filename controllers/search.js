const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GOOGLE_API_KEY } = process.env;


router.get('/test', (req, res) => {
    res.json({ message: 'User endpoint OK! ✅' });
});

router.post('/', (req, res) => {
    console.log(req.query.location);

    // res.json({
    //     result: req.query.location
    // })
    // res.setHeader()
    const locationApiConfig = {
        method: 'get',
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.location}&key=${GOOGLE_API_KEY}`,
        headers: { 'Content-Type': 'application/json' }

    }

    return axios(locationApiConfig)
        .then(function (response) {
            console.log(JSON.stringify(response.data));

            // })

            console.log(JSON.stringify(response.data.results[0].geometry));
            const placesSearchApiConfig = {
                method: 'get',
                url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${JSON.stringify(response.data.results[0].geometry.location.lat)}%2C${JSON.stringify(response.data.results[0].geometry.location.lng)}&radius=1500&type=restaurant&keyword=${req.query.searchTerm}&key=${GOOGLE_API_KEY}`,
                headers: { 'Content-Type': 'application/json' }
            };
            axios(placesSearchApiConfig)
                .then(function (response) {
                    console.log(response.data.results);
                    res.json({ search: (response.data.results) })
                })
        })
        .catch(function (error) {
            console.log(error);
        });
})



module.exports = router;