const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const time = require('./../libs/timeLib');

const Item = new Schema({
    itemId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    itemName: {
        type: String,
        default: ""
    },
    itemStatus: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: String,
        default: ""
    },
    createdOn: {
        type: Date,
        default: Date.now()
    },
    listId:{
        type: String,
        default:""
    }
});

mongoose.model('Item', Item);