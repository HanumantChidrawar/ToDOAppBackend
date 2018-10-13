const express = require('express');
const router = express.Router();
const listController = require("./../../app/controllers/listController");
const appConfig = require("./../../config/appConfig");
const authorization = require("./../middlewares/auth");

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/lists`;

    // defining routes.


    // params: userId, listType,listName
    app.post(`${baseUrl}/createList`, authorization.isAuthorized, listController.createListFunction);
    /**
        * @apiGroup List
        * @apiVersion  1.0.0
        * @api {post} /api/v1/lists/createList api for creating the ToDO List.
        *
        * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
        * @apiParam {string} listName Name of the ToDo list to be created. (body params) (required)
        * @apiParam {string} listType Type of the ToDo list to be created should be either public / private. (body params) (required)
        * @apiParam {string} userId Id of the user who is creating the ToDo lists. (body params) (required)
        *  
        * @apiSuccess {object} myResponse shows error status, message, http status code, result.
        * 
        * @apiSuccessExample {object} Success-Response:
           {
               "error": false,
               "message": "list created Successfully",
               "status": 200,
               "data": {
                   "__v": 0,
                   "_id": "5bbed93cf30eb80878c24857",
                   "createdOn": "2018-10-11T05:01:48.000Z",
                   "users": [
                       {
                           "userId": "Y6eiRLmta"
                       }
                   ],
                   "listType": "public",
                   "createdBy": "Hanumant Patil",
                   "creatorId": "Y6eiRLmta",
                   "listName": "Fisrt List",
                   "listId": "lcpIG4HXk"
               }
           }
       *  @apiErrorExample {json} Error-Response:
       *
       *  {
               "error": true,
               "message": "UserId is missing",
               "status": 400,
               "data": null
           }    
       */

    // params: listId,listName
    app.post(`${baseUrl}/:listId/updateList`, authorization.isAuthorized, listController.updateListFunction);
    /**
         * @apiGroup List
         * @apiVersion  1.0.0
         * @api {post} /api/v1/lists/createList api for updating the ToDo List.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} listName Updated Name of the ToDo list. (body params) (required)
         * @apiParam {string} listId Id of the TODo list which is to be updated. (route params) (required)
         *  
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
           {
                "error": false,
                "message": "List found & Updated ",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
                }
            }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": false,
                "message": string,
                "status": 500,
                "data": null
            }
        */

    // params: listId
    app.get(`${baseUrl}/:listId/deleteList`, authorization.isAuthorized, listController.deleteListFunction);
    /**
         * @apiGroup List
         * @apiVersion  1.0.0
         * @api {get} /api/v1/lists/deleteList api for deletion of ToDo List.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} listId Id of the TODo list which is to be updated. (route params) (required)
         *  
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
           {
                "error": false,
                "message": "List found & deleted ",
                "status": 200,
                "data": {
                    "n": 1,
                    "ok": 1
                }
            }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": false,
                "message": string,
                "status": 500,
                "data": null
            }
        */

    // params: listId,userName,itemName
    app.post(`${baseUrl}/createItem`, authorization.isAuthorized, listController.createItemFunction);
    /**
         * @apiGroup Item
         * @apiVersion  1.0.0
         * @api {post} /api/v1/lists/createItem api for Creation of Item.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} listId Id of the TODo list which is to be updated. (body params) (required)
         * @apiParam {string} userName Name of the user who created the Item. (body params) (required)
         * @apiParam {string} itemName Name of the item which is to  be  created. (body params) (required)
         * 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
           {
                "error": "false",
                "message": "Item Created",
                "status": 200,
                "data": {
                    "__v": 0,
                    "_id": "5bbeddb2f30eb80878c24859",
                    "listId": "lcpIG4HXk",
                    "createdOn": "2018-10-11T05:20:50.000Z",
                    "createdBy": "Hanumant Patil",
                    "itemStatus": false,
                    "itemName": "Item1",
                    "itemId": "-F-plPU5A"
                }
            }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": "listId is missing",
                "status": 400,
                "data": null
            }
        */

    // params: itemId,itemName or itemStatus
    app.post(`${baseUrl}/:itemId/updateItem`, authorization.isAuthorized, listController.updateItemFunction);
    /**
         * @apiGroup Item
         * @apiVersion  1.0.0
         * @api {post} /api/v1/lists/updateItem api for user updating the Item.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} itemId Id of the TODo list which is to be updated. (route params) (required)
         * @apiParam {string} itemStatus Status of the Item which is to be updated. (body params) (optional)
         * @apiParam {string} itemName New Name of the item which is to  be  updated. (body params) (optional)
         * 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
           {
                "error": false,
                "message": "Item found & Updated ",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
                }
            }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 400,
                "data": null
            }
        */

    // params: itemId
    app.get(`${baseUrl}/:itemId/deleteItem`, authorization.isAuthorized, listController.deleteItemFunction);
    /**
         * @apiGroup Item
         * @apiVersion  1.0.0
         * @api {get} /api/v1/lists/:itemId/deleteItem api for deletion of Item.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} itemId Id of the TODo list which is to be updated. (route params) (required)
         * 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
           {
                "error": false,
                "message": "Item found & deleted ",
                "status": 200,
                "data": {
                    "n": 1,
                    "ok": 1
                }
            }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 400,
                "data": null
            }
        */
    // params: itemId,userName,subItemName
    app.post(`${baseUrl}/createSubItem`, authorization.isAuthorized, listController.createSubItemFunction);
    /**
         * @apiGroup SubItem
         * @apiVersion  1.0.0
         * @api {post} /api/v1/lists/createSubItem api for creation of subItem.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} itemId Id of the TODo list which is to be updated. (route params) (required)
         * @apiParam {string} userName Name of the user who is creating the subItem. (body params) (required)
         * @apiParam {string} subItemName Name of the subItem to be created. (body params) (required)
         * 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
           {
                "error": "false",
                "message": "SubItem Created",
                "status": 200,
                "data": {
                    "__v": 0,
                    "subItemName": "Sub item1",
                    "_id": "5bbee4f4f30eb80878c2485a",
                    "createdOn": "2018-10-11T05:51:48.000Z",
                    "createdBy": "Hanumant Patil",
                    "itemId": "-F-plPU5A",
                    "subItemStatus": false,
                    "subItemId": "4j4D-qCLr"
                }
            }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": "itemId is missing",
                "status": 400,
                "data": null
            }
        */

    // params: subItemId,subItemName or subItemStatus
    app.post(`${baseUrl}/:subItemId/updateSubItem`, authorization.isAuthorized, listController.updateSubItemFunction);
    /**
         * @apiGroup SubItem
         * @apiVersion  1.0.0
         * @api {post} /api/v1/lists/:subItemId/updateSubItem api for updation of subItem.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} subItemId Id of the TODo list which is to be updated. (route params) (required)
         * @apiParam {string} subItemStatus status of the subItem which is to be updated. (body params) (optional)
         * @apiParam {string} subItemName Name of the subItem to be updated. (body params) (optional)
         * 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
           {
                "error": false,
                "message": "SubItem found & Updated ",
                "status": 200,
                "data": {
                    "n": 1,
                    "nModified": 1,
                    "ok": 1
                }
            }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 400,
                "data": null
            }
        */


    // params: subItemId
    app.get(`${baseUrl}/:subItemId/deleteSubItem`, authorization.isAuthorized, listController.deleteSubItemFunction);
    /**
         * @apiGroup SubItem
         * @apiVersion  1.0.0
         * @api {get} /api/v1/lists/:subItemId/deleteSubItem api for deletion of subItem.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} subItemId Id of the TODo list which is to be updated. (route params) (required)
         * 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
           {
                "error": false,
                "message": "SubItem found & deleted ",
                "status": 200,
                "data": {
                    "n": 1,
                    "ok": 1
                }
            }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 400,
                "data": null
            }
        */

    // params: userId,listType
    app.get(`${baseUrl}/:userId/:listType/getlists`, authorization.isAuthorized, listController.getListsFunction);
    /**
         * @apiGroup List
         * @apiVersion  1.0.0
         * @api {get} /api/v1/lists/:userId/:listType/getlists api for geting the lists for user.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} userId Id of the user whoose lists are to be found.(route params) (required)
         * @apiParam {string} listType type of the list which are to fetched.(route params) (required)
         * 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
           {
                "error": false,
                "message": "Lists found",
                "status": 200,
                "data": [
                    {
                        "_id": "5bbedccff30eb80878c24858",
                        "__v": 0,
                        "createdOn": "2018-10-11T05:17:03.000Z",
                        "users": [
                            {
                                "userId": "Y6eiRLmta"
                            }
                        ],
                        "listType": "public",
                        "createdBy": "Hanumant Patil",
                        "creatorId": "Y6eiRLmta",
                        "listName": "Fisrt List",
                        "listId": "crv321p5x"
                    }
                ]
            }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 400,
                "data": null
            }
        */
    // params: listId
    app.get(`${baseUrl}/:listId/getlist`, authorization.isAuthorized, listController.getListFunction);
    /**
         * @apiGroup List
         * @apiVersion  1.0.0
         * @api {get} /api/v1/lists/:listId/getlist api for geting the list.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} listId Id of the ToDo which is to be fetched.(route params) (required)
         * 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
           {
                "error": false,
                "message": "List found",
                "status": 200,
                "data": [
                    {
                        "_id": "5bbedccff30eb80878c24858",
                        "__v": 0,
                        "createdOn": "2018-10-11T05:17:03.000Z",
                        "users": [
                            {
                                "userId": "Y6eiRLmta"
                            }
                        ],
                        "listType": "public",
                        "createdBy": "Hanumant Patil",
                        "creatorId": "Y6eiRLmta",
                        "listName": "Fisrt List",
                        "listId": "crv321p5x"
                    }
                ]
            }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 400,
                "data": null
            }
        */

    // params: listId
    app.get(`${baseUrl}/:listId/getItems`, authorization.isAuthorized, listController.getItemsFunction);
    /**
         * @apiGroup Item
         * @apiVersion  1.0.0
         * @api {get} /api/v1/lists/:listId/getItems api for geting the items of list.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} listId Id of the ToDo whoose items are to be fetched.(route params) (required)
         * 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
           {
                "error": false,
                "message": "items found",
                "status": 200,
                "data": [
                    {
                        "listId": "crv321p5x",
                        "createdOn": "2018-10-11T06:30:47.000Z",
                        "createdBy": "Hanumant Patil",
                        "itemStatus": false,
                        "itemName": "Item2",
                        "itemId": "1luCEpXZB"
                    },
                    {
                        "listId": "crv321p5x",
                        "createdOn": "2018-10-11T06:30:40.000Z",
                        "createdBy": "Hanumant Patil",
                        "itemStatus": false,
                        "itemName": "Item1",
                        "itemId": "iIorq2A8o"
                    }
                ]
            }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 400,
                "data": null
            }
        */
    // params: array of itemsIds converted to string
    app.get(`${baseUrl}/getSubItems`, authorization.isAuthorized, listController.getSubItemsFunction);
    /**
        * @apiGroup SubItem
        * @apiVersion  1.0.0
        * @api {get} /api/v1/lists/getSubItems api for geting the SubItems of list.
        *
        * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
        * @apiParam {string} itemIds Ids of the items in ToDo list whoose subItems are to be fetched.(query params) (required)
        * 
        * @apiSuccess {object} myResponse shows error status, message, http status code, result.
        * 
        * @apiSuccessExample {object} Success-Response:
          {
               "error": false,
               "message": "SubItems found",
               "status": 200,
               "data": [
                   {
                       "_id": "5bbeee6c5c58742d48cc6b3d",
                       "subItemName": "Sub item2",
                       "__v": 0,
                       "createdOn": "2018-10-11T06:32:12.000Z",
                       "createdBy": "Hanumant Patil",
                       "itemId": "iIorq2A8o",
                       "subItemStatus": false,
                       "subItemId": "HeYkC7QTl"
                   },
                   {
                       "_id": "5bbeee705c58742d48cc6b3e",
                       "subItemName": "Sub item1",
                       "__v": 0,
                       "createdOn": "2018-10-11T06:32:16.000Z",
                       "createdBy": "Hanumant Patil",
                       "itemId": "iIorq2A8o",
                       "subItemStatus": false,
                       "subItemId": "4J5ZTzz5e"
                   },
                   {
                       "_id": "5bbeee855c58742d48cc6b3f",
                       "subItemName": "Sub item1",
                       "__v": 0,
                       "createdOn": "2018-10-11T06:32:37.000Z",
                       "createdBy": "Hanumant Patil",
                       "itemId": "1luCEpXZB",
                       "subItemStatus": false,
                       "subItemId": "4iFEJek4O"
                   },
                   {
                       "_id": "5bbeee895c58742d48cc6b40",
                       "subItemName": "Sub item2",
                       "__v": 0,
                       "createdOn": "2018-10-11T06:32:41.000Z",
                       "createdBy": "Hanumant Patil",
                       "itemId": "1luCEpXZB",
                       "subItemStatus": false,
                       "subItemId": "8JGueBcih"
                   }
               ]
           }
       *  @apiErrorExample {json} Error-Response:
       *
       *  {
               "error": true,
               "message": string,
               "status": 400,
               "data": null
           }
       */
}
