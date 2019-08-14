function groupController(Group) {

    function post(req, res) {
        const group = new Group(req.body);

        if (!req.body.GroupName) {
            res.status(400);
            return res.send('GroupName is Required');
        }

        group.save();
        return res.status(201).json(group);
    }

    function get(req, res) {

        const query = {};

        Group.find(query, (err, Groups) => {
            if (err) {
                return res.send(err);
            }

            return res.json(Groups);
        });

    }

    return { post, get }
}

module.exports = groupController;