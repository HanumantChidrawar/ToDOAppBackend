const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const time = require('./../libs/timeLib');

const List = new Schema({
    listId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    listName: {
        type: String,
        default: "New ToDo List"
    },
    creatorId:{
        type: String,
        default: ""
    },
    createdBy: {
        type: String,
        default: ""
    },
    listType:{
        type: String,
        default: "public"
    },
    users:[],
    createdOn: {
        type: Date,
        default: Date.now()
    }
});

mongoose.model('List', List);