const express = require('express');
const router = express.Router();
const friendController = require("./../../app/controllers/friendController");
const appConfig = require("./../../config/appConfig");
const authorization = require("./../middlewares/auth");

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/friend`;

    // defining routes.


    // params: userId,friendId
    app.get(`${baseUrl}/:userId/:friendId/sendRequest`, authorization.isAuthorized, friendController.sendRequest);
    /**
         * @apiGroup Friend
         * @apiVersion  1.0.0
         * @api {get} /api/v1/friend/:userId/:friendId/sendRequest api for sending the friend request.
         *
         * @apiParam {string} userId Id of user who want to send the request. (route params) (required)
         * @apiParam {string} friendId Id of friend whom want to send the request. (route params) (required)
         * 
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required) 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Friend received request updated",
                "status": 200,
                "data": {
                    "sentFriendRequests": [
                        {
                            "friendId": "uTuw2W--v",
                            "friendName": "Krishna Patil"
                        }
                    ],
                    "receivedFriendRequests": [
                        {
                            "friendId": "Y6eiRLmta",
                            "friendName": "Hanumant Patil"
                        }
                    ],
                    "saveFriendResult": {
                        "n": 1,
                        "nModified": 1,
                        "ok": 1
                    },
                    "saveUserResult": {
                        "n": 1,
                        "nModified": 1,
                        "ok": 1
                    }
                }
            }

        *  @apiErrorExample {json} Error-Response:
            {
                "error": true,
                "message": "Friend request cannot be sent already sent",
                "status": 305,
                "data": null
            }
            {
                "error": true,
                "message": "Friend request cannot be sent already received",
                "status": 305,
                "data": null
            }
            {
                "error": true,
                "message": "Friend request cannot be sent already friends",
                "status": 305,
                "data": null
            }
        */

    // params: userId,friendId
    app.get(`${baseUrl}/:userId/:friendId/acceptRequest`, authorization.isAuthorized, friendController.acceptRequest);
    /**
         * @apiGroup Friend
         * @apiVersion  1.0.0
         * @api {get} /api/v1/friend/:userId/:friendId/acceptRequest api for accepting the friend request.
         *
         * @apiParam {string} userId Id of user who want to accept the request. (route params) (required)
         * @apiParam {string} friendId Id of friend whoose request is to be accepted. (route params) (required)
         * 
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required) 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Friend request accepted",
                "status": 200,
                "data": {
                    "receivedFriendRequests": [],
                    "userFriends": [
                        {
                            "friendId": "Y6eiRLmta",
                            "friendName": "Hanumant Patil"
                        }
                    ],
                    "sentFriendRequests": [],
                    "friends": [
                        {
                            "friendId": "uTuw2W--v",
                            "friendName": "Krishna Patil"
                        }
                    ],
                    "saveFriendResult": {
                        "n": 1,
                        "nModified": 1,
                        "ok": 1
                    },
                    "saveUserResult": {
                        "n": 1,
                        "nModified": 1,
                        "ok": 1
                    }
                }
            }

        *  @apiErrorExample {json} Error-Response:
            {
                "error": true,
                "message": "Friend request cannot be accepted",
                "status": 300,
                "data": null
            }
        */

    // params: friendId,userId
    app.get(`${baseUrl}/:userId/:friendId/rejectRequest`, authorization.isAuthorized, friendController.rejectRequest);
    /**
         * @apiGroup Friend
         * @apiVersion  1.0.0
         * @api {get} /api/v1/friend/:userId/:friendId/rejectRequest api for rejecting the friend request.
         *
         * @apiParam {string} userId Id of user who want to reject the request. (route params) (required)
         * @apiParam {string} friendId Id of friend whoose request is to be rejected. (route params) (required)
         * 
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required) 
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "Friend request rejected",
                "status": 200,
                "data": {
                    "receivedFriendRequests": [],
                    "sentFriendRequests": [],
                    "saveFriendResult": {
                        "n": 1,
                        "nModified": 1,
                        "ok": 1
                    },
                    "saveUserResult": {
                        "n": 1,
                        "nModified": 1,
                        "ok": 1
                    }
                }
            }
        *  @apiErrorExample {json} Error-Response:
            {
                "error": true,
                "message": "Friend request cannot be rejected",
                "status": 300,
                "data": null
            }
        */

    // params: friendId,userId
    app.get(`${baseUrl}/:userId/:friendId/unFriend`, authorization.isAuthorized, friendController.unFriend);
    /**
        * @apiGroup Friend
        * @apiVersion  1.0.0
        * @api {get} /api/v1/friend/:userId/:friendId/unFriend api for deleting the friend.
        *
        * @apiParam {string} userId Id of user who want to unfriend a friend. (route params) (required)
        * @apiParam {string} friendId Id of friend whoom to unfriend. (route params) (required)
        * 
        * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required) 
        * @apiSuccess {object} myResponse shows error status, message, http status code, result.
        * 
        * @apiSuccessExample {object} Success-Response:
           {
               "error": false,
               "message": "Friend deleted",
               "status": 200,
               "data": {
                   "userFriends": [],
                   "friends": [],
                   "saveFriendResult": {
                       "n": 1,
                       "nModified": 1,
                       "ok": 1
                   },
                   "saveUserResult": {
                       "n": 1,
                       "nModified": 1,
                       "ok": 1
                   }
               }
           }

       *  @apiErrorExample {json} Error-Response:
           {
               "error": true,
               "message": "No such Friend",
               "status": 300,
               "data": null
           }
       */
    // params: friendId1,friendId2
    app.get(`${baseUrl}/:friend1Id/:friend2Id/addUsersToSharedLists`, authorization.isAuthorized, friendController.addUsersToSharedLists);
    /**
        * @apiGroup Friend
        * @apiVersion  1.0.0
        * @api {get} /api/v1/friend/:friend1Id/:friend2Id/addUsersToSharedLists api for adding users to sharedList of each others. (public ToDo list).
        *
        * @apiParam {string} friend1Id Id of first User who want to share ToDo List. (route params) (required)
        * @apiParam {string} friend2Id Id of second User who want to share ToDo List. (route params) (required)
        * 
        * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required) 
        * @apiSuccess {object} myResponse shows error status, message, http status code, result.
        * 
        * @apiSuccessExample {object} Success-Response:
           {
               "error": false,
               "message": "Friends shared lists updated",
               "status": 200,
               "data": {
                   "friend1SharedListResult": {
                       "n": 1,
                       "nModified": 1,
                       "ok": 1
                   },
                   "friend2SharedListResult": {
                       "n": 0,
                       "nModified": 0,
                       "ok": 1
                   }
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
    // params: friendId1,friendId2
    app.get(`${baseUrl}/:friend1Id/:friend2Id/removeUsersFromSharedLists`, authorization.isAuthorized, friendController.removeUsersFromSharedLists);
    /**
       * @apiGroup Friend
       * @apiVersion  1.0.0
       * @api {get} /api/v1/friend/:friend1Id/:friend2Id/removeUsersFromSharedLists api for removing themseleves from sharedList of each others. (public ToDo list).
       *
       * @apiParam {string} friend1Id Id of first User who don't want to share ToDo List with second user . (route params) (required)
       * @apiParam {string} friend2Id Id of second User who don't want to share ToDo List with first user. (route params) (required)
       * 
       * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required) 
       * @apiSuccess {object} myResponse shows error status, message, http status code, result.
       * 
       * @apiSuccessExample {object} Success-Response:
          {
              "error": false,
              "message": "Friends shared lists updated",
              "status": 200,
              "data": {
                  "friend1SharedListResult": {
                      "n": 1,
                      "nModified": 1,
                      "ok": 1
                  },
                  "friend2SharedListResult": {
                      "n": 0,
                      "nModified": 0,
                      "ok": 1
                  }
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
}

