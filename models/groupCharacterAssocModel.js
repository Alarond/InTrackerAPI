const mongoose = require('mongoose');

const { Schema } = mongoose;  

const groupCharacterAssocModel = new Schema(
    {
        //GroupCharacterAssocID: { type: Number },
        CharacterID: { type: Number },
        GroupID: { type: Number }
    }
);

module.exports = mongoose.model('GroupCharacterAssoc', groupCharacterAssocModel);