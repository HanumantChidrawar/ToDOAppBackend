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
const HistoryModel = mongoose.model('History')

let createHistoryList = (req, res) => {

    if (check.isEmpty(req.params.listId)) {
        logger.info('listId is missing', "historyController:createHistoryList", 10);
        let apiResponse = response.generate(true, "listId is missing", 400, null);
        res.send(apiResponse);
    }
    else {

        let newHistoryObject = new HistoryModel({
            historyId: shortid.generate(),
            listId: req.params.listId,
            createdOn: time.now()
        });

        newHistoryObject.save((err, result) => {
            if (err) {
                logger.error("Failed to History Object for List ", "HistoryController: createHistoryList()", 10);
                let apiResponse = response.generate(true, "Failed to create History List", 500, null);
                res.send(apiResponse);
            }
            else {
                logger.info("History List created", "HistoryController: createHistoryList()", 10);
                let apiResponse = response.generate(false, "History List created ", 200, result);
                res.send(apiResponse);
            }
        });//end save
    }

}//end createHistoryList

let deleteHistoryList = (req, res) => {

    if (check.isEmpty(req.params.listId)) {
        logger.info('listId is missing', "historyController:deleteHistoryList", 10);
        let apiResponse = response.generate(true, "listId is missing", 400, null);
        res.send(apiResponse);
    }
    else {

        HistoryModel.remove({ listId: req.params.listId }, (err, result) => {
            if (err) {
                logger.error('Unable to Delete History List', "historyController:deleteHistoryList", 10);
                let apiResponse = response.generate(true, "unable to delete History List", 400, null);
                res.send(apiResponse);
            }
            else if (check.isEmpty(result)) {
                logger.error('No History List found', "historyController:deleteHistoryList", 10);
                let apiResponse = response.generate(true, "No History List Found", 400, null);
                res.send(apiResponse);
            }
            else {
                logger.info('History List Deleted', "historyController:deleteHistoryList", 10);
                let apiResponse = response.generate(false, "History List Deleted", 200, null);
                res.send(apiResponse);
            }
        });//end remove
    }

}//end deleteHistoryList

let saveObject = (req, res) => {

    let getObject = () => {
        return new Promise((resolve, reject) => {

            if (check.isEmpty(req.params.listId)) {
                logger.info('listId is missing', "historyController:getObject", 10);
                let apiResponse = response.generate(true, "listId is missing", 400, null);
                reject(apiResponse);
            }
            else if (req.body.item) {

                ItemModel.findOne({ itemId: req.body.itemId }, (err, itemDetails) => {
                    if (err) {
                        logger.error("Failed to find Item", "HistoryController: getObject()", 10);
                        let apiResponse = response.generate(true, "Failed to find Item", 500, null);
                        reject(apiResponse);
                    }
                    else if (check.isEmpty(itemDetails)) {
                        logger.error("Item Not found", "HistoryController:getObject()", 10);
                        let apiResponse = response.generate(true, "Item not found", 500, null);
                        reject(apiResponse);
                    }
                    else {
                        logger.info("Item Found", "HistoryController: getObject()", 10);
                        let details = itemDetails.toObject();
                        details.operationType = req.body.operationType;
                        resolve(details);
                    }
                });//end findOne
            }
            else if (req.body.subItem) {

                SubItemModel.findOne({ subItemId: req.body.subItemId }, (err, subItemDetails) => {
                    if (err) {
                        logger.error("Failed to find SubItem", "HistoryController: getObject()", 10);
                        let apiResponse = response.generate(true, "Failed to find SubItem", 500, null);
                        reject(apiResponse);
                    }
                    else if (check.isEmpty(subItemDetails)) {
                        logger.error("SubItem Not found", "HistoryController:getObject()", 10);
                        let apiResponse = response.generate(true, "SubItem not found", 500, null);
                        reject(apiResponse);
                    }
                    else {
                        logger.info("SubItem Found", "HistoryController: getObject()", 10);
                        let details = subItemDetails.toObject();
                        details.operationType = req.body.operationType;
                        resolve(details);
                    }
                });//end findOne
            }
            else {
                logger.info("Dummy for new Item/subItem", "HistoryController: getObject()", 10);
                resolve(req.body);
            }
        });//end promise
    }//end getObject

    let getHistoryObject = (objectDetails) => {

        return new Promise((resolve, reject) => {

            HistoryModel.findOne({ listId: req.params.listId }, (err, result) => {
                if (err) {
                    logger.error("Failed to find History for list", "HistoryController: getHistoryObject()", 10);
                    let apiResponse = response.generate(true, "Failed to find History of List", 500, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("Histroy of List Not found", "HistoryController:getHistoryObject()", 10);
                    let apiResponse = response.generate(true, "History of List not found", 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info("List HistoryFound", "HistoryController: getHistorytObject()", 10);
                    result.objects.push(objectDetails);
                    resolve(result);
                }
            });//end find
        });//end promise
    }//end getHistoryObject

    let updateHistoryObject = (objectDetails) => {

        return new Promise((resolve, reject) => {
            HistoryModel.update({ historyId: objectDetails.historyId }, { objects: objectDetails.objects }, { multi: true }, (err, result) => {
                if (err) {
                    logger.error("Failed to update History for list", "HistoryController: updateHistoryObject()", 10);
                    let apiResponse = response.generate(true, "Failed to update History of List", 500, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("Histroy of List Not updated", "HistoryController:updateHistoryObject()", 10);
                    let apiResponse = response.generate(true, "History of List not updated", 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info("List History updated", "HistoryController: updateHistorytObject()", 10);
                    resolve(result);
                }
            });//end find
        });//end promise
    }//end updateHistoryObject

    getObject(req, res)
        .then(getHistoryObject)
        .then(updateHistoryObject)
        .then((resolve) => {
            let apiResponse = response.generate(false, "History updated Successfully", 200, resolve);
            res.status(200);
            res.send(apiResponse);
        })
        .catch((err) => {
            res.status(err.status);
            res.send(err);
        });

}//end saveObject

let deleteObject = (req, res) => {

    let getHistoryObject = () => {

        return new Promise((resolve, reject) => {

            if (check.isEmpty(req.params.listId)) {
                logger.info('listId is missing', "historyController:getHistoryObject", 10);
                let apiResponse = response.generate(true, "listId is missing", 400, null);
                reject(apiResponse);
            }
            else {
                HistoryModel.findOne({ listId: req.params.listId }, (err, result) => {
                    if (err) {
                        logger.error("Failed to find History for list", "HistoryController: getHistoryObject()", 10);
                        let apiResponse = response.generate(true, "Failed to find History of List", 500, null);
                        reject(apiResponse);
                    }
                    else if (check.isEmpty(result)) {
                        logger.error("Histroy of List Not found", "HistoryController:getHistoryObject()", 10);
                        let apiResponse = response.generate(true, "History of List not found", 300, null);
                        reject(apiResponse);
                    }
                    else {
                        logger.info("List HistoryFound", "HistoryController: getHistorytObject()", 10);
                        let deletedObject = result.objects.pop();
                        result.deletedObject = deletedObject;
                        resolve(result);
                    }
                });//end find
            }
        });//end promise
    }//end getHistoryObject

    let deleteHistoryObject = (objectDetails) => {

        return new Promise((resolve, reject) => {
            HistoryModel.update({ historyId: objectDetails.historyId }, { objects: objectDetails.objects }, { multi: true }, (err, result) => {
                if (err) {
                    logger.error("Failed to delete History for list", "HistoryController: deleteHistoryObject()", 10);
                    let apiResponse = response.generate(true, "Failed to delete History of List", 500, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("Histroy of List Not deleted", "HistoryController:deleteHistoryObject()", 10);
                    let apiResponse = response.generate(true, "History of List not deleted", 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info("List History updated", "HistoryController: deleteHistorytObject()", 10);
                    result.deletedObject = objectDetails.deletedObject;
                    resolve(result);
                }
            });//end find
        });//end promise
    }//end deleteHistoryObject

    getHistoryObject(req, res)
        .then(deleteHistoryObject)
        .then((resolve) => {
            let apiResponse = response.generate(false, "History objects for list updated Successfully", 200, resolve);
            res.status(200);
            res.send(apiResponse);
        })
        .catch((err) => {
            res.status(err.status);
            res.send(err);
        });

}//end deleteObject

module.exports = {

    createHistoryList: createHistoryList,
    saveObject: saveObject,
    deleteObject: deleteObject,
    deleteHistoryList: deleteHistoryList

}// end exports