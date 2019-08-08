const express = require('express');

function routes(Partymember) {
    const partymemberRouter = express.Router();
    //Get a list of Roman Numerals
    partymemberRouter.route('/partymember')
        .post((req, res) => {
            const partymember = new group(req.body);

            Partymember.save();
            return res.status(201).json(Group);
        })
        .get((req, res) => {

            const query = {};

            Partymember.find(query, (err, partymembers) => {
                if (err) {
                    return res.send(err);
                }

                return res.json(partymembers);
            });

        });

    //Take a group by its ID String
    partymemberRouter.route('/partymember/:partymemberID')
        .get((req, res) => {

            Partymember.findById(req.params.partymemberID, (err, partymember) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(partymember);
            });
        });

    //Take a groupCharacterAssoc by its ID String
    partymemberRouter.route('/partymember/bygroupid/:groupID')
        .get((req, res) => {

            const query = { GroupID: req.params.groupID };

            Partymember.find(query, (err, partymembers) => {
                if (err) {
                    return res.send(err);
                }

                return res.json(partymembers);
            });

        });


    return partymemberRouter;
}

module.exports = routes;