const mongoose = require('mongoose');

const { Schema } = mongoose;  

const partymembersModel = new Schema(
    {
        CharacterID: { type: String },
        GroupID: { type: String }

    }
);

module.exports = mongoose.model('Partymember', partymembersModel);


