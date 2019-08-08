const express = require('express');

function routes(Group) {
    const groupRouter = express.Router();
    //Get a list of Roman Numerals
    groupRouter.route('/group')
        .post((req, res) => {
            const group = new group(req.body);

            Group.save();
            return res.status(201).json(Group);
        })
        .get((req, res) => {

            const query = {};

            //if (req.query.group) {
            //    query.group = req.query.group;
            //}
            Group.find(query, (err, groups) => {
                if (err) {
                    return res.send(err);
                }

                return res.json(groups);
            });

        });

    //Take a group by its ID String
    groupRouter.route('/group/:groupID')
        .get((req, res) => {

            Group.findById(req.params.groupID, (err, group) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(group);
            });
        });


    return groupRouter;
}

module.exports = routes;