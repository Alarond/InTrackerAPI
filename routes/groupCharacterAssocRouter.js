const express = require('express');

function routes(GroupCharacterAssoc) {
    const groupCharacterAssocRouter = express.Router();
    //Get a list of Roman Numerals
    groupCharacterAssocRouter.route('/groupCharacterAssoc')
        .post((req, res) => {
            const groupCharacterAssoc = new groupCharacterAssoc(req.body);

            groupCharacterAssoc.save();
            return res.status(201).json(groupCharacterAssoc);
        })
        .get((req, res) => {

            const query = {};

            //if (req.query.groupCharacterAssoc) {
            //    query.groupCharacterAssoc = req.query.groupCharacterAssoc;
            //}

            GroupCharacterAssoc.find(query, (err, groupCharacterAssocs) => {
                if (err) {
                    return res.send(err);
                }

                return res.json(groupCharacterAssocs);
            });

        });

    //Take a groupCharacterAssoc by its ID String
    groupCharacterAssocRouter.route('/groupCharacterAssoc/:groupCharacterAssocID')
        .get((req, res) => {

            GroupCharacterAssoc.findById(req.params.groupCharacterAssocID, (err, groupCharacterAssoc) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(groupCharacterAssoc);
            });
        });


    return groupCharacterAssocRouter;
}

module.exports = routes;