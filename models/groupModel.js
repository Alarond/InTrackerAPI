const mongoose = require('mongoose');

const { Schema } = mongoose;    

const groupModel = new Schema(
    {
        //GroupID: { type: Number },
        GroupName: { type: String }
    }
);

module.exports = mongoose.model('Group', groupModel);