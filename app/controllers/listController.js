const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const mailer = require('./../libs/mailerLib');
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib');
const check = require('../libs/checkLib');
const passwordLib = require('./../libs/passwordLib');
const token = require('./../libs/tokenLib');

/* Models */
const UserModel = mongoose.model('User');
const ListModel = mongoose.model('List');
const ItemModel = mongoose.model('Item');
const SubItemModel = mongoose.model('SubItem');

//start createListFunction

let createListFunction = (req, res) => {

    let checkeUserId = () => {

        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.body.userId)) {
                logger.info('UserId is missing', "listController:checkUserId", 10);
                let apiResponse = response.generate(true, "UserId is missing", 400, null);
                reject(apiResponse);

            }
            else {
                resolve(req);
            }
        });//end promise
    }//end checkUserId

    let getUser = () => {

        return new Promise((resolve, reject) => {

            UserModel.findOne({ userId: req.body.userId }, (err, userDetails) => {

                if (err) {
                    logger.error(err.message, "listController:getUser()", 10);
                    let apiResponse = response.generate("true", "Failed to find user", 500, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(userDetails)) {
                    logger.error(err.message, "listController:getUser()", 10);
                    let apiResponse = response.generate("true", "No user found", 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info("User Found", "listController:getUser()", 10);
                    let user = userDetails.toObject();
                    resolve(user);
                }
            });//end findone
        });//end promise
    }//end getUser

    let createList = (userDetails) => {

        return new Promise((resolve, reject) => {

            let newList = new ListModel({
                listId: shortid.generate(),
                listName: req.body.listName,
                creatorId: req.body.userId,
                createdBy: `${userDetails.firstName} ${userDetails.lastName}`,
                listType: req.body.listType,
                createdOn: time.now()
            });//end ListModel

            let userObject = { userId: userDetails.userId }
            newList.users.push(userObject);
            if (userDetails.friends.length > 0) {
                for (let friend of userDetails.friends) {
                    let friendObject = { userId: friend.friendId }
                    newList.users.push(friendObject);
                }
            }

            newList.save((err, newlist) => {
                if (err) {
                    logger.error(err.message, "listController: createList()", 10);
                    let apiResponse = response.generate("true", "failed to create List", 500, null);
                    reject(apiResponse);
                }
                else {
                    let newListObj = newlist.toObject();
                    resolve(newListObj);
                }
            });//end newList.save()
        });//end promise
    }//end createList

    checkeUserId(req, res)
        .then(getUser)
        .then(createList)
        .then((resolve) => {
            let apiResponse = response.generate(false, "list created Successfully", 200, resolve);
            res.status(200);
            res.send(apiResponse);
        })
        .catch((err) => {
            res.status(err.status);
            res.send(err);
        });

}//end createListFunction

let updateListFunction = (req, res) => {

    if (check.isEmpty(req.params.listId)) {
        logger.info('listId is missing', "listController:updateListFunction", 10);
        let apiResponse = response.generate(true, "listId is missing", 400, null);
        res.send(apiResponse);
    }
    else {
        ListModel.update({ listId: req.params.listId }, { listName: req.body.listName }, { multi: true }, (err, result) => {
            if (err) {
                logger.error("Failed to update List ", "listController: updateListFunction()", 10);
                let apiResponse = response.generate(true, "Failed to update List", 500, null);
                res.send(apiResponse);
            }
            else if (check.isEmpty(result)) {
                logger.error("List Not found", "listController: updateListFounction()", 10);
                let apiResponse = response.generate(true, "List not found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("List updated", "listController: updateUser()", 10);
                let apiResponse = response.generate(false, "List found & Updated ", 200, result);
                res.send(apiResponse);
            }
        });//end update
    }
}//end updateListFunction

let deleteListFunction = (req, res) => {

    if (check.isEmpty(req.params.listId)) {
        logger.info('listId is missing', "listController:deleteListFunction", 10);
        let apiResponse = response.generate(true, "listId is missing", 400, null);
        res.send(apiResponse);
    }
    else {
        ListModel.remove({ listId: req.params.listId }, (err, result) => {
            if (err) {
                logger.error("Failed to delete List ", "listController: deleteListFunction()", 10);
                let apiResponse = response.generate(true, "Failed to delete List", 500, null);
                res.send(apiResponse);
            }
            else if (check.isEmpty(result)) {
                logger.error("List Not found", "listController: deleteListFunction()", 10);
                let apiResponse = response.generate(true, "List not found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("List deleted", "listController: deleteteUser()", 10);
                let apiResponse = response.generate(false, "List found & deleted ", 200, result);
                res.send(apiResponse);
            }
        });//end update
    }
}//end deleteListFunction

createItemFunction = (req, res) => {

    if (check.isEmpty(req.body.listId)) {
        logger.info('listId is missing', "listController:createItemFunction", 10);
        let apiResponse = response.generate(true, "listId is missing", 400, null);
        res.send(apiResponse);
    }
    else if (check.isEmpty(req.body.userName)) {
        logger.info('userName is missing', "listController:createItemFunction", 10);
        let apiResponse = response.generate(true, "User Name is missing", 400, null);
        res.send(apiResponse);
    } else {

        let newItem = new ItemModel({
            itemId: req.body.itemId || shortid.generate(),
            itemName: req.body.itemName,
            itemStatus: req.body.itemStatus || false,
            createdBy: req.body.userName,
            createdOn: req.body.createdOn || time.now(),
            listId: req.body.listId
        });//end ItemModel

        newItem.save((err, savedItem) => {
            if (err) {
                logger.error(err.message, "listController: createItem()", 10);
                let apiResponse = response.generate("true", "failed to create Item", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("Item Created", "listController: createItem()", 10);
                let apiResponse = response.generate("false", "Item Created", 200, savedItem);
                res.send(apiResponse);
            }
        });//end newItem
    }
}//end createItemFunction


let updateItemFunction = (req, res) => {

    if (check.isEmpty(req.params.itemId)) {
        logger.info('itemId is missing', "listController:updateItemFunction", 10);
        let apiResponse = response.generate(true, "ItemId is missing", 400, null);
        res.send(apiResponse);

    } else {

        if (req.body.itemName && req.body.itemStatus) {
            ItemModel.update({ itemId: req.params.itemId }, { itemName: req.body.itemName, itemStatus: req.body.itemStatus }, { multi: true }).exec((err, result) => {

                if (err) {
                    logger.error("Failed to update item ", "listController: updateItemFunction()", 10);
                    let apiResponse = response.generate(true, "Failed to update item", 500, null);
                    res.send(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("item Not found", "listController: updateItemFunction()", 10);
                    let apiResponse = response.generate(true, "Item not found", 500, null);
                    res.send(apiResponse);
                }
                else {
                    logger.info("item updated", "listController: updateItemFunction()", 10);
                    let apiResponse = response.generate(false, "Item found & Updated ", 200, result);
                    res.send(apiResponse);
                }
            });//end update
        }
        else if (req.body.itemStatus) {
            ItemModel.update({ itemId: req.params.itemId }, { itemStatus: req.body.itemStatus }, { multi: true }).exec((err, result) => {

                if (err) {
                    logger.error("Failed to update item ", "listController: updateItemFunction()", 10);
                    let apiResponse = response.generate(true, "Failed to update item", 500, null);
                    res.send(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("item Not found", "listController: updateItemFunction()", 10);
                    let apiResponse = response.generate(true, "Item not found", 500, null);
                    res.send(apiResponse);
                }
                else {
                    logger.info("item updated", "listController: updateItemFunction()", 10);
                    let apiResponse = response.generate(false, "Item found & Updated ", 200, result);
                    res.send(apiResponse);
                }
            });//end update 
        }
        else {
            ItemModel.update({ itemId: req.params.itemId }, { itemName: req.body.itemName }, { multi: true }).exec((err, result) => {

                if (err) {
                    logger.error("Failed to update item ", "listController: updateItemFunction()", 10);
                    let apiResponse = response.generate(true, "Failed to update item", 500, null);
                    res.send(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("item Not found", "listController: updateItemFunction()", 10);
                    let apiResponse = response.generate(true, "Item not found", 500, null);
                    res.send(apiResponse);
                }
                else {
                    logger.info("item updated", "listController: updateItemFunction()", 10);
                    let apiResponse = response.generate(false, "Item found & Updated ", 200, result);
                    res.send(apiResponse);
                }
            });//end update 
        }
    }
}//end updateItemFunction

let deleteItemFunction = (req, res) => {

    if (check.isEmpty(req.params.itemId)) {
        logger.info('itemId is missing', "listController:updateItemFunction", 10);
        let apiResponse = response.generate(true, "ItemId is missing", 400, null);
        res.send(apiResponse);
    } else {

        ItemModel.remove({ itemId: req.params.itemId }, (err, result) => {

            if (err) {
                logger.error("Failed to delete item ", "listController: deleteItemFunction()", 10);
                let apiResponse = response.generate(true, "Failed to delete item", 500, null);
                res.send(apiResponse);
            }
            else if (check.isEmpty(result)) {
                logger.error("item Not found", "listController: deleteItemFunction()", 10);
                let apiResponse = response.generate(true, "Item not found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("item deleted", "listController: deleteItemFunction()", 10);
                let apiResponse = response.generate(false, "Item found & deleted ", 200, result);
                res.send(apiResponse);
            }
        });//end remove
    }
}//end deleteItemFunction

createSubItemFunction = (req, res) => {

    if (check.isEmpty(req.body.itemId)) {
        logger.info('itemId is missing', "listController:createSubItemFunction", 10);
        let apiResponse = response.generate(true, "itemId is missing", 400, null);
        res.send(apiResponse);
    }
    else if (check.isEmpty(req.body.userName)) {
        logger.info('userName is missing', "listController:createSubItemFunction", 10);
        let apiResponse = response.generate(true, "User Name is missing", 400, null);
        res.send(apiResponse);
    } else {

        let newSubItem = new SubItemModel({
            subItemId: shortid.generate(),
            subItemName: req.body.subItemName,
            subItemStatus: false,
            createdBy: req.body.userName,
            createdOn: time.now(),
            itemId: req.body.itemId
        });//end SubItemModel

        newSubItem.save((err, savedSubItem) => {
            if (err) {
                logger.error(err.message, "listController: createSubItem()", 10);
                let apiResponse = response.generate("true", "failed to create SubItem", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("SubItem Created", "listController: createSubItem()", 10);
                let apiResponse = response.generate("false", "SubItem Created", 200, savedSubItem);
                res.send(apiResponse);
            }
        });//end newSubItem
    }
}//end createSubItemFunction


let updateSubItemFunction = (req, res) => {

    if (check.isEmpty(req.params.subItemId)) {
        logger.info('subItemId is missing', "listController:updateSubItemFunction", 10);
        let apiResponse = response.generate(true, "subItemId is missing", 400, null);
        res.send(apiResponse);
    }
    else {

        if (req.body.subItemName && req.body.subItemStatus) {
            SubItemModel.update({ subItemId: req.params.subItemId }, { subItemName: req.body.subItemName, subItemStatus: req.body.subItemStatus }, { multi: true }).exec((err, result) => {

                if (err) {
                    logger.error("Failed to update subItem ", "listController: updateSubItemFunction()", 10);
                    let apiResponse = response.generate(true, "Failed to update subItem", 500, null);
                    res.send(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("SubItem Not found", "listController: updateSubItemFunction()", 10);
                    let apiResponse = response.generate(true, "SubItem not found", 500, null);
                    res.send(apiResponse);
                }
                else {
                    logger.info("SubItem updated", "listController: updateSubItemFunction()", 10);
                    let apiResponse = response.generate(false, "SubItem found & Updated ", 200, result);
                    res.send(apiResponse);
                }
            });//end update
        }
        else if (req.body.subItemStatus) {
            SubItemModel.update({ subItemId: req.params.subItemId }, { subItemStatus: req.body.subItemStatus }, { multi: true }).exec((err, result) => {

                if (err) {
                    logger.error("Failed to update subItem ", "listController: updateSubItemFunction()", 10);
                    let apiResponse = response.generate(true, "Failed to update subItem", 500, null);
                    res.send(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("SubItem Not found", "listController: updateSubItemFunction()", 10);
                    let apiResponse = response.generate(true, "SubItem not found", 500, null);
                    res.send(apiResponse);
                }
                else {
                    logger.info("SubItem updated", "listController: updateSubItemFunction()", 10);
                    let apiResponse = response.generate(false, "SubItem found & Updated ", 200, result);
                    res.send(apiResponse);
                }
            });//end update
        }
        else {
            SubItemModel.update({ subItemId: req.params.subItemId }, { subItemName: req.body.subItemName }, { multi: true }).exec((err, result) => {

                if (err) {
                    logger.error("Failed to update subItem ", "listController: updateSubItemFunction()", 10);
                    let apiResponse = response.generate(true, "Failed to update subItem", 500, null);
                    res.send(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("SubItem Not found", "listController: updateSubItemFunction()", 10);
                    let apiResponse = response.generate(true, "SubItem not found", 500, null);
                    res.send(apiResponse);
                }
                else {
                    logger.info("SubItem updated", "listController: updateSubItemFunction()", 10);
                    let apiResponse = response.generate(false, "SubItem found & Updated ", 200, result);
                    res.send(apiResponse);
                }
            });//end update
        }


    }
}//end updateSubItemFunction

let deleteSubItemFunction = (req, res) => {

    if (check.isEmpty(req.params.subItemId)) {
        logger.info('subItemId is missing', "listController:updateSubItemFunction", 10);
        let apiResponse = response.generate(true, "subItemId is missing", 400, null);
        res.send(apiResponse);
    } else {

        SubItemModel.remove({ subItemId: req.params.subItemId }, (err, result) => {

            if (err) {
                logger.error("Failed to delete SubItem ", "listController: deleteSubItemFunction()", 10);
                let apiResponse = response.generate(true, "Failed to delete SubItem", 500, null);
                res.send(apiResponse);
            }
            else if (check.isEmpty(result)) {
                logger.error("SubItem Not found", "listController: deleteSubItemFunction()", 10);
                let apiResponse = response.generate(true, "SubItem not found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("SubItem deleted", "listController: deleteSubItemFunction()", 10);
                let apiResponse = response.generate(false, "SubItem found & deleted ", 200, result);
                res.send(apiResponse);
            }
        });//end remove
    }
}//end deleteSubItemFunction



//All getter functions


let getListsFunction = (req, res) => {

    if (check.isEmpty(req.params.userId)) {
        logger.info('userId is missing', "listController:getListsFunction", 10);
        let apiResponse = response.generate(true, "userId is missing", 400, null);
        res.send(apiResponse);
    }
    else {
        if (req.params.listType == "private") {
            ListModel.find({ $and: [{ creatorId: req.params.userId }, { listType: 'private' }] }, (err, listDetails) => {
                if (err) {
                    logger.error("Failed to find lists ", "listController: getListsFunction()", 10);
                    let apiResponse = response.generate(true, "Failed to find lists", 500, null);
                    res.send(apiResponse);
                }
                else if (check.isEmpty(listDetails)) {
                    logger.error("No Lists found", "listController: getListsFunction()", 10);
                    let apiResponse = response.generate(true, "No Lists found", 500, null);
                    res.send(apiResponse);
                }
                else {
                    logger.info("Lists Found", "listController: getListsFunction()", 10);
                    let apiResponse = response.generate(false, "Lists found", 200, listDetails);
                    res.send(apiResponse);
                }
            });//end find
        }
        else {
            ListModel.find({ $and: [{ users: { userId: req.params.userId }}, { listType: 'public'}]}, (err, listDetails) => {
                if (err) {
                    logger.error("Failed to find lists ", "listController: getListsFunction()", 10);
                    let apiResponse = response.generate(true, "Failed to find lists", 500, null);
                    res.send(apiResponse);
                }
                else if (check.isEmpty(listDetails)) {
                    logger.error("No Lists found", "listController: getListsFunction()", 10);
                    let apiResponse = response.generate(true, "No Lists found", 300, null);
                    res.send(apiResponse);
                }
                else {
                    logger.info("Lists Found", "listController: getListsFunction()", 10);
                    let apiResponse = response.generate(false, "Lists found", 200, listDetails);
                    res.send(apiResponse);
                }
            });//end find
        }
    }
}//end getListFunction

let getListFunction = (req, res) => {

    if (check.isEmpty(req.params.listId)) {
        logger.info('listId is missing', "listController:getListFunction", 10);
        let apiResponse = response.generate(true, "listId is missing", 400, null);
        res.send(apiResponse);
    }
    else {
        ListModel.find({ listId: req.params.listId }, (err, listDetails) => {
            if (err) {
                logger.error("Failed to find list ", "listController: getListFunction()", 10);
                let apiResponse = response.generate(true, "Failed to find list", 500, null);
                res.send(apiResponse);
            }
            else if (check.isEmpty(listDetails)) {
                logger.error("No List found", "listController: getListFunction()", 10);
                let apiResponse = response.generate(true, "No List found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("List Found", "listController: getListFunction()", 10);
                let apiResponse = response.generate(false, "List found", 200, listDetails);
                res.send(apiResponse);
            }
        });//end find
    }
}//end getListFunction

let getItemsFunction = (req, res) => {

    if (check.isEmpty(req.params.listId)) {
        logger.info('listId is missing', "listController:getListFunction", 10);
        let apiResponse = response.generate(true, "listId is missing", 400, null);
        res.send(apiResponse);
    }
    else {
        ItemModel.find({ listId: req.params.listId })
            .select('-_id -__v -receiverName -receiverId')
            .sort('-createdOn')
            .skip(parseInt(req.query.skip * 5) || 0)
            .lean()
            .limit(5)
            .exec(
                (err, itemsDetails) => {
                    if (err) {
                        logger.error("Failed to find items ", "listController: getItemsFunction()", 10);
                        let apiResponse = response.generate(true, "Failed to find items", 500, null);
                        res.send(apiResponse);
                    }
                    else if (check.isEmpty(itemsDetails)) {
                        logger.error("No items found", "listController: getItemsFunction()", 10);
                        let apiResponse = response.generate(true, "No items found", 300, null);
                        res.send(apiResponse);
                    }
                    else {
                        logger.info("items Found", "listController: getItemsFunction()", 10);
                        let apiResponse = response.generate(false, "items found", 200, itemsDetails);
                        res.send(apiResponse);
                    }
                });//end exec
    }
}//end getItemsFunction

let getSubItemsFunction = (req, res) => {

    if (check.isEmpty(req.query.itemIds)) {
        logger.info('itemIds are missing', "listController:getSubItemsFunction", 10);
        let apiResponse = response.generate(true, "itemIds are missing", 400, null);
        res.send(apiResponse);
    }
    else {
        let itemsArray = req.query.itemIds.split(',');
        SubItemModel.find({ itemId: { $in: itemsArray } }, (err, subItemsDetails) => {
            if (err) {
                logger.error("Failed to find subItems ", "listController: getSubItemsFunction()", 10);
                let apiResponse = response.generate(true, "Failed to find SubItems", 500, null);
                res.send(apiResponse);
            }
            else if (check.isEmpty(subItemsDetails)) {
                logger.error("No SubItems found", "listController: getSubItemsFunction()", 10);
                let apiResponse = response.generate(true, "No SubItems found", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("SubItems Found", "listController: getSubItemsFunction()", 10);
                let apiResponse = response.generate(false, "SubItems found", 200, subItemsDetails);
                res.send(apiResponse);
            }
        });//end find
    }
}//end getSubItemsFunction

module.exports = {

    createListFunction: createListFunction,
    updateListFunction: updateListFunction,
    deleteListFunction: deleteListFunction,
    createItemFunction: createItemFunction,
    updateItemFunction: updateItemFunction,
    deleteItemFunction: deleteItemFunction,
    createSubItemFunction: createSubItemFunction,
    updateSubItemFunction: updateSubItemFunction,
    deleteSubItemFunction: deleteSubItemFunction,
    getListsFunction: getListsFunction,
    getListFunction: getListFunction,
    getItemsFunction: getItemsFunction,
    getSubItemsFunction: getSubItemsFunction

}// end exports