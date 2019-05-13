var express = require('express');
var request = require('request');


module.exports = function (router) {

    /**
     * Find character by id
     */
    characterIdRoute = router.route('/character/:id');
    characterIdRoute.get((req, res) => {
        let url = 'https://anapioficeandfire.com/api/characters/' + req.params.id;
        request.get(url, (error, response, resBody) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(resBody);
        });
    })

    /**
     * Find houses by id
     */
    houseIdRoute = router.route('/house/:id');
    houseIdRoute.get((req, res) => {
        let url = 'https://anapioficeandfire.com/api/houses/' + req.params.id;
        request.get(url, (error, response, resBody) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(resBody);
        });
    })


    return router;
}
