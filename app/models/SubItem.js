const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const time = require('./../libs/timeLib');

const SubItem = new Schema({
    subItemId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    subItemName: {
        type: String
    },
    subItemStatus: {
        type: Boolean,
        default: false
    },
    itemId: {
        type: String,
        default: ""
    },
    createdBy: {
        type: String,
        default: ""
    },
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('SubItem', SubItem);