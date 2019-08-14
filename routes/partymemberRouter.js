const express = require('express');
/* esling-disable = no-param-reassign */
const partymemberController = require('../controllers/partymemberController');

function routes(Partymember) {
    const partymemberRouter = express.Router();
    const controller = partymemberController(Partymember);
    //Use group Controller
    partymemberRouter.route('/partymember')
        .post(controller.post)
        .get(controller.get);

    // Middleware - call the Controller for Get by ID
    partymemberRouter.use('/partymember/:partymemberID', (req, res, next) => {

        Partymember.findById(req.params.partymemberID, (err, partymember) => {

            if (err) {
                return res.send(err);
            }

            if (partymember) {
                req.partymember = partymember;
                return next();
            }

            return res.sendStatus(404);
        });

    });

    //Take a group by its ID String
    partymemberRouter.route('/partymember/:partymemberID')
        .get((req, res) => {
            res.json(req.partymember);
        })
        .put((req, res) => {

            const { group } = req;

            partymember.GroupID = req.body.GroupID;
            partymember.CharacterID = req.body.CharacterID;

            partymember.save((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(partymember);
            });


        })
        .patch((req, res) => {
            const { partymember } = req;

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
                return res.json(partymember);
            });
        })
        .delete((req, res) => {
            req.partymember.remove((err) => {
                if (err) {
                    return res.send(err);
                }

                return res.sendStatus(204);
            });
        });

    //Take a groupCharacterAssoc by its ID String
    partymemberRouter.route('/bygroupid/:groupID')
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