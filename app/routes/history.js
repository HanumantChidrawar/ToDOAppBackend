const express = require('express');
const router = express.Router();
const historyController = require("./../../app/controllers/historyController");
const appConfig = require("./../../config/appConfig");
const authorization = require("./../middlewares/auth");

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/history`;

    // defining routes.

    // params: listId
    app.get(`${baseUrl}/:listId/createHistoryList`, authorization.isAuthorized, historyController.createHistoryList);
    /**
        * @apiGroup History
        * @apiVersion  1.0.0
        * @api {get} /api/v1/history/:listId/createHistoryList api for creating the historyList for Todo list.
        *
        * @apiParam {string} listId Id of the ToDo List for whom we need to create History in database. (route params) (required)
        * 
        * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required) 
        * @apiSuccess {object} myResponse shows error status, message, http status code, result.
        * 
        * @apiSuccessExample {object} Success-Response:
           {
               "error": false,
               "message": "History List created ",
               "status": 200,
               "data": {
                   "__v": 0,
                   "_id": "5bbef87e5c58742d48cc6b41",
                   "objects": [],
                   "createdOn": "2018-10-11T07:15:10.000Z",
                   "listId": "crv321p5x",
                   "historyId": "rDq3xR3FM"
               }
           }

       *  @apiErrorExample {json} Error-Response:
           {
                   "error": true,
                   "message": string,
                   "status": 400,
                   "data": null
           }      
       */

    //params: listId
    app.get(`${baseUrl}/:listId/deleteHistoryList`, authorization.isAuthorized, historyController.deleteHistoryList);
    /**
         * @apiGroup History
         * @apiVersion  1.0.0
         * @api {get} /api/v1/history/:listId/deleteHistoryList api for deleting the historyList for Todo list.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} listId Id of the ToDo List for whom we need to create History in database. (route params) (required)
         *  
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "History List Deleted",
                "status": 200,
                "data": null
            }
        *  @apiErrorExample {json} Error-Response:
            {
                    "error": true,
                    "message": string,
                    "status": 400,
                    "data": null
            }      
        */

    // params: listId,item, subitem flag, itemId, subItemId
    app.post(`${baseUrl}/:listId/saveObject`, authorization.isAuthorized, historyController.saveObject);
    /**
         * @apiGroup History
         * @apiVersion  1.0.0
         * @api {post} /api/v1/history/:listId/saveObject api for saving an Item/subItem in historyList for Todo list used in case of undo operation.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} listId Id of the ToDo List for whom we need to create History in database. (route params) (required)
         * @apiParam {string} item flag used to indicate the type of element as item of the ToDo List. (body params) (optional)
         * @apiParam {string} itemId Id used to find the item and save it in the history of ToDo list. (body params) (optional)
         * @apiParam {string} subItem flag used to indicate the type of element as subItem of the ToDo List. (body params) (optional)
         * @apiParam {string} subItemId Id used to find the subItem and save it in the history of ToDo list. (body params) (optional)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "History updated Successfully",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
                }
            }
        *  @apiErrorExample {json} Error-Response:
            {
                "error": true,
                "message": "History of List not found",
                "status": 500,
                "data": null
            }  
        */

    // params: listId
    app.get(`${baseUrl}/:listId/deleteObject`, authorization.isAuthorized, historyController.deleteObject);
    /**
         * @apiGroup History
         * @apiVersion  1.0.0
         * @api {get} /api/v1/history/:listId/deleteObject api for deleting an Item/subItem in historyList for Todo list used in case of undo operation.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} listId Id of the ToDo List for whom we need to create History in database. (route params) (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "History objects for list updated Successfully",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1,
                    "deletedObject": {
                        "_id": "5bbeee175c58742d48cc6b3c",
                        "__v": 0,
                        "listId": "crv321p5x",
                        "createdOn": "2018-10-11T06:30:47.000Z",
                        "createdBy": "Hanumant Patil",
                        "itemStatus": false,
                        "itemName": "Item2",
                        "itemId": "1luCEpXZB",
                        "operationType": null
                    }
                }
            }
        *  @apiErrorExample {json} Error-Response:
            {
                "error": true,
                "message": "History of List not found",
                "status": 500,
                "data": null
            }  
        */
}
