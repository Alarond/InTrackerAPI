function partymemberController(Partymember) {

    function post(req, res) {
        const partymember = new Partymember(req.body);

        if (!req.body.GroupID) {
            res.status(400);
            return res.send('GroupID is Required');
        }

        if (!req.body.CharacterID) {
            res.status(400);
            return res.send('Character is Required');
        }

        partymember.save();
        return res.status(201).json(partymember);
    }

    function get(req, res) {

        const query = {};

        Partymember.find(query, (err, Partymembers) => {
            if (err) {
                return res.send(err);
            }

            return res.json(Partymembers);
        });

    }

    return { post, get }
}

module.exports = partymemberController;