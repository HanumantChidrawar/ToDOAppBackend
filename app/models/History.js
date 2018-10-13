const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const time = require('./../libs/timeLib');

const History1 = new Schema({
    historyId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    listId: {
        type: String,
        default:""
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    objects: []
});

mongoose.model('History', History1);