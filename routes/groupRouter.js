const express = require('express');
/* esling-disable = no-param-reassign */
const groupController = require('../controllers/groupController');

function routes(Group) {
    const groupRouter = express.Router();
    const controller = groupController(Group);
    //Use group Controller
    groupRouter.route('/group')
        .post(controller.post)
        .get(controller.get);

    // Middleware - call the Controller for Get by ID
    groupRouter.use('/group/:groupID', (req, res, next) => {

        Group.findById(req.params.groupID, (err, group) => {

            if (err) {
                return res.send(err);
            }

            if (group) {
                req.group = group;
                return next();
            }

            return res.sendStatus(404);
        });

    });

    //Take a group by its ID String
    groupRouter.route('/group/:groupID')
        .get((req, res) => {
            res.json(req.group);
        })
        .put((req, res) => {

            const { group } = req;

            group.GroupName = req.body.GroupName;

            group.save((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(group);
            });


        })
        .patch((req, res) => {
            const { group } = req;

            //if the _id gets accidently passed delet it bofor proceding
            if (req.body._id) {
                delete req.body._id;
            }

            Object.entries(req.body).forEach((Item) => {
                const key = item[0];
                const value = item[1];
                group[key] = value;
            });

            group.save((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(group);
            });
        })
        .delete((req, res) => {
            req.group.remove((err) => {
                if (err) {
                    return res.send(err);
                }

                return res.sendStatus(204);
            });
        });


    return groupRouter;
}

module.exports = routes;