const mongoose = require('mongoose');

const {Schema} = mongoose;  

const characterModel = new Schema(
    {
        //CharacterID: { type: Number },
        Name: { type: String },
        Speed: { type: Number },
        Dex: { type: Number }
    }
);

module.exports = mongoose.model('Character', characterModel);