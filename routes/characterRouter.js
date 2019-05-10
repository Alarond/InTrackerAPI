const express = require('express');
/* esling-disable = no-param-reassign */
const characterController = require('../controllers/characterController');

function routes(Character) {
    const characterRouter = express.Router();
    const controller = characterController(Character);
    //Get a list of Roman Numerals
    characterRouter.route('/character')
        .post(controller.post)
        .get(controller.get);

    // Middleware - call the Controller for Get by ID
    characterRouter.use('/character/:characterID', (req, res, next) => {

        Character.findById(req.params.characterID, (err, character) => {

            if (err) {
                return res.send(err);
            }

            if (character) {
                req.character = character;
                return next();
            }

            return res.sendStatus(404);
        });

    });
    //Take a Character by its ID String
    characterRouter.route('/character/:characterID')
        .get((req, res) => {
            res.json(req.character);
        })
        .put((req, res) => {

            const { character } = req;

            character.Name = req.body.Name;
            character.Speed = req.body.Speed;
            character.Dex = req.body.Dex;

            character.save((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(character);
            });


        }).patch((req, res) => {
            const { character } = req;

            //if the _id gets accidently passed delet it bofor proceding
            if (req.body._id) {
                delete req.body._id;
            }

            Object.entries(req.body).forEach((Item) => {
                const key = item[0];
                const value = item[1];
                character[key] = value;
            });

            character.save((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(character);
            });
        }).delete((req, res) => {
            req.character, remove((err) => {
                if (err) {
                    return res.send(err);
                }

                return res.sendStatus(204);
            });
        });



    return characterRouter;
}

module.exports = routes;