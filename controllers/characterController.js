function characterController(Character) {

    function post(req, res) {
        const character = new Character(req.body);

        if (!req.body.Name) {
            res.status(400);
            return res.send('Name is Required');
        }

        if (!req.body.Dex) {
            res.status(400);
            return res.send('Dex is Required');
        }

        if (!req.body.Speed) {
            res.status(400);
            return res.send('Speed is Required');
        }

        character.save();
        return res.status(201).json(character);
    }

    function get(req, res) {

        const query = {};

        //if (req.query.character) {
        //    query.character = req.query.character;
        //}

        Character.find(query, (err, Characters) => {
            if (err) {
                return res.send(err);
            }

            return res.json(Characters);
        });

    }

    return { post, get }
}

module.exports = characterController;