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

let sendRequest = (req, res) => {

    let getUser = () => {

        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.params.userId)) {
                logger.info('userId is missing', "friendController:getUser", 10);
                let apiResponse = response.generate(true, "userId is missing", 400, null);
                reject(apiResponse);
            }
            else if (check.isEmpty(req.params.friendId)) {
                logger.info('friendId is missing', "friendController:getUser", 10);
                let apiResponse = response.generate(true, "friendId is missing", 400, null);
                reject(apiResponse);
            }
            else {
                UserModel.findOne({ userId: req.params.userId }, (err, userDetails) => {
                    if (err) {
                        logger.error("Unable to find User", "friendController: getUser", 10);
                        let apiResponse = response.generate(true, "Unable to find user", 400, null);
                        reject(apiResponse);
                    }
                    else if (check.isEmpty(userDetails)) {
                        logger.error("User Not Found", "friendController: getUser", 10);
                        let apiResponse = response.generate(true, "User Not Found", 400, null);
                        reject(apiResponse);
                    } else {
                        let user = userDetails.toObject();
                        resolve(user);
                    }
                })//end find
            }
        });//end Promise
    }//end getUser

    let getFriend = (userDetails) => {

        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.params.friendId }, (err, friend) => {
                if (err) {
                    logger.error("Unable to find friend", "friendController: getFriend", 10);
                    let apiResponse = response.generate(true, "Unable to find friend", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(friend)) {
                    logger.error("Friend Not Found", "friendController: getFriend", 10);
                    let apiResponse = response.generate(true, "Friend Not Found", 400, null);
                    reject(apiResponse);
                }
                else {
                    let friendDetails = friend.toObject();
                    let friendObject = {
                        friendId: req.params.friendId,
                        friendName: `${friendDetails.firstName} ${friendDetails.lastName}`
                    };
                    let userObject = {
                        friendId: req.params.userId,
                        friendName: `${userDetails.firstName} ${userDetails.lastName}`
                    };

                    if (userDetails.receivedFriendRequests.findIndex(x => x.friendId == friendObject.friendId) != -1) {
                        logger.error("You have received a request earlier", "friendController: getfriend", 10);
                        let apiResponse = response.generate(true, "Friend request cannot be sent already received", 305, null);
                        reject(apiResponse);
                    }
                    else if (userDetails.sentFriendRequests.findIndex(x => x.friendId == friendObject.friendId) != -1) {
                        logger.error("You have received a sent earlier", "friendController: getfriend", 10);
                        let apiResponse = response.generate(true, "Friend request cannot be sent already sent", 305, null);
                        reject(apiResponse);
                    }
                    else if (userDetails.friends.findIndex(x => x.friendId == friendObject.friendId) != -1) {
                        logger.error("You are alredy friends ", "friendController: getfriend", 10);
                        let apiResponse = response.generate(true, "You are already friends", 305, null);
                        reject(apiResponse);
                    }
                    else {
                        friend.receivedFriendRequests.push(userObject);
                        userDetails.sentFriendRequests.push(friendObject);
                        let saveObject = {
                            sentFriendRequests: userDetails.sentFriendRequests,
                            receivedFriendRequests: friend.receivedFriendRequests
                        }
                        resolve(saveObject);
                    }
                }
            })//end find
        });//end Promise
    }//end getFriend

    let saveFriend = (friendDetails) => {

        return new Promise((resolve, reject) => {

            UserModel.update({ userId: req.params.friendId }, { receivedFriendRequests: friendDetails.receivedFriendRequests }, { multi: true }, (err, result) => {

                if (err) {
                    logger.error("Unable to find friend", "friendController: saveFriend", 10);
                    let apiResponse = response.generate(true, "Unable to find friend", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("friend received request not updated", "friendController:saveFriend()", 10);
                    let apiResponse = response.generate(true, "friend received request not updated", 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info("friend received request updated", "friendController: saveFriend()", 10);
                    friendDetails.saveFriendResult = result;
                    resolve(friendDetails);
                }
            })//end update
        });//end promise
    }//end savefriend

    let saveUser = (friendDetails) => {

        return new Promise((resolve, reject) => {

            UserModel.update({ userId: req.params.userId }, { sentFriendRequests: friendDetails.sentFriendRequests }, { multi: true }, (err, result) => {

                if (err) {
                    logger.error("Unable to find friend", "friendController: saveFriend", 10);
                    let apiResponse = response.generate(true, "Unable to find friend", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("friend received request not updated", "friendController:saveFriend()", 10);
                    let apiResponse = response.generate(true, "friend received request not updated", 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info("friend received request updated", "friendController: saveFriend()", 10);
                    friendDetails.saveUserResult = result;
                    resolve(friendDetails);
                }
            })//end update
        });//end promise
    }//end saveUser

    getUser(req, res)
        .then(getFriend)
        .then(saveFriend)
        .then(saveUser)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Friend received request updated", 200, resolve);
            res.status(200);
            res.send(apiResponse);
        })
        .catch((err) => {
            res.status(err.status);
            res.send(err);
        });
}//end sendRequest

let acceptRequest = (req, res) => {

    let getUser = () => {

        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.params.userId)) {
                logger.info('userId is missing', "friendController:getUser", 10);
                let apiResponse = response.generate(true, "userId is missing", 400, null);
                reject(apiResponse);
            }
            else if (check.isEmpty(req.params.friendId)) {
                logger.info('friendId is missing', "friendController:getUser", 10);
                let apiResponse = response.generate(true, "friendId is missing", 400, null);
                reject(apiResponse);
            }
            else {
                UserModel.findOne({ userId: req.params.userId }, (err, userDetails) => {
                    if (err) {
                        logger.error("Unable to find User", "friendController: getUser", 10);
                        let apiResponse = response.generate(true, "Unable to find user", 400, null);
                        reject(apiResponse);
                    }
                    else if (check.isEmpty(userDetails)) {
                        logger.error("User Not Found", "friendController: getUser", 10);
                        let apiResponse = response.generate(true, "User Not Found", 400, null);
                        reject(apiResponse);
                    } else {
                        let user = userDetails.toObject();
                        resolve(user);
                    }
                })//end find
            }
        });//end Promise
    }//end getUser

    let getFriend = (userDetails) => {

        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.params.friendId }, (err, friend) => {
                if (err) {
                    logger.error("Unable to find friend", "friendController: getFriend", 10);
                    let apiResponse = response.generate(true, "Unable to find friend", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(friend)) {
                    logger.error("Friend Not Found", "friendController: getFriend", 10);
                    let apiResponse = response.generate(true, "Friend Not Found", 400, null);
                    reject(apiResponse);
                }
                else {
                    let friendDetails = friend.toObject();
                    let friendObject = {
                        friendId: req.params.friendId,
                        friendName: `${friendDetails.firstName} ${friendDetails.lastName}`
                    };
                    let userObject = {
                        friendId: req.params.userId,
                        friendName: `${userDetails.firstName} ${userDetails.lastName}`
                    };
                    if (userDetails.receivedFriendRequests.findIndex(x => x.friendId == friendObject.friendId) != -1 && (userDetails.friends.findIndex(x => x.friendId == friendObject.friendId) == -1)) {
                        userDetails.friends.push(friendObject);
                        let index = userDetails.receivedFriendRequests.findIndex(x => x.friendId == friendObject.friendId);
                        userDetails.receivedFriendRequests.splice(index, 1);

                        index = friendDetails.sentFriendRequests.findIndex(x => x.friendId == userObject.friendId);
                        friendDetails.friends.push(userObject);
                        friendDetails.sentFriendRequests.splice(index, 1);

                        let saveObject = {
                            receivedFriendRequests: userDetails.receivedFriendRequests,
                            userFriends: userDetails.friends,
                            sentFriendRequests: friendDetails.sentFriendRequests,
                            friends: friendDetails.friends
                        }
                        resolve(saveObject);
                    }
                    else {
                        logger.error("You have not received a request to accept", "friendController: getfriend", 10);
                        let apiResponse = response.generate(true, "Friend request cannot be accepted", 300, null);
                        reject(apiResponse);
                    }
                }
            })//end find
        });//end Promise
    }//end getFriend

    let saveFriend = (friendDetails) => {

        return new Promise((resolve, reject) => {

            UserModel.update({ userId: req.params.friendId }, { friends: friendDetails.friends, sentFriendRequests: friendDetails.sentFriendRequests }, { multi: true }, (err, result) => {

                if (err) {
                    logger.error("Unable to find user", "friendController: saveFriend", 10);
                    let apiResponse = response.generate(true, "Unable to find user", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("friend request not accepted", "friendController:saveFriend()", 10);
                    let apiResponse = response.generate(true, "friend request not accepted", 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info("friend request accepted", "friendController: saveFriend()", 10);
                    friendDetails.saveFriendResult = result;
                    resolve(friendDetails);
                }
            })//end update
        });//end promise
    }//end savefriend

    let saveUser = (friendDetails) => {

        return new Promise((resolve, reject) => {

            UserModel.update({ userId: req.params.userId }, { friends: friendDetails.userFriends, receivedFriendRequests: friendDetails.receivedFriendRequests }, { multi: true }, (err, result) => {

                if (err) {
                    logger.error("Unable to find user", "friendController: saveFriend", 10);
                    let apiResponse = response.generate(true, "Unable to find user", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("friend request not accepted", "friendController:saveFriend()", 10);
                    let apiResponse = response.generate(true, "friend request not accepted", 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info("friend request accepted", "friendController: saveFriend()", 10);
                    friendDetails.saveUserResult = result;
                    resolve(friendDetails);
                }
            })//end update
        });//end promise
    }//end saveUser
    getUser(req, res)
        .then(getFriend)
        .then(saveFriend)
        .then(saveUser)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Friend request accepted", 200, resolve);
            res.status(200);
            res.send(apiResponse);
        })
        .catch((err) => {
            res.status(err.status);
            res.send(err);
        });

}//end acceptRequest

let rejectRequest = (req, res) => {

    let getUser = () => {

        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.params.userId)) {
                logger.info('userId is missing', "friendController:getUser", 10);
                let apiResponse = response.generate(true, "userId is missing", 400, null);
                reject(apiResponse);
            }
            else if (check.isEmpty(req.params.friendId)) {
                logger.info('friendId is missing', "friendController:getUser", 10);
                let apiResponse = response.generate(true, "friendId is missing", 400, null);
                reject(apiResponse);
            }
            else {
                UserModel.findOne({ userId: req.params.userId }, (err, userDetails) => {
                    if (err) {
                        logger.error("Unable to find User", "friendController: getUser", 10);
                        let apiResponse = response.generate(true, "Unable to find user", 400, null);
                        reject(apiResponse);
                    }
                    else if (check.isEmpty(userDetails)) {
                        logger.error("User Not Found", "friendController: getUser", 10);
                        let apiResponse = response.generate(true, "User Not Found", 400, null);
                        reject(apiResponse);
                    } else {
                        let user = userDetails.toObject();
                        resolve(user);
                    }
                })//end find
            }
        });//end Promise
    }//end getUser

    let getFriend = (userDetails) => {

        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.params.friendId }, (err, friend) => {
                if (err) {
                    logger.error("Unable to find friend", "friendController: getFriend", 10);
                    let apiResponse = response.generate(true, "Unable to find friend", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(friend)) {
                    logger.error("Friend Not Found", "friendController: getFriend", 10);
                    let apiResponse = response.generate(true, "Friend Not Found", 400, null);
                    reject(apiResponse);
                }
                else {
                    let friendDetails = friend.toObject();
                    let friendObject = {
                        friendId: req.params.friendId,
                        friendName: `${friendDetails.firstName} ${friendDetails.lastName}`
                    };
                    let userObject = {
                        friendId: req.params.userId,
                        friendName: `${userDetails.firstName} ${userDetails.lastName}`
                    };
                    if (userDetails.receivedFriendRequests.findIndex(x => x.friendId == friendObject.friendId) != -1) {
                        let index = userDetails.receivedFriendRequests.findIndex(x => x.friendId == friendObject.friendId)
                        userDetails.receivedFriendRequests.splice(index, 1);
                        index = friendDetails.sentFriendRequests.indexOf(x => x.friendId == userObject.friendId);
                        friendDetails.sentFriendRequests.splice(index, 1);
                        let saveObject = {
                            receivedFriendRequests: userDetails.receivedFriendRequests,
                            sentFriendRequests: friendDetails.sentFriendRequests,
                        }
                        resolve(saveObject);
                    }
                    else {
                        logger.error("You have not received a request to reject", "friendController: getfriend", 10);
                        let apiResponse = response.generate(true, "No such Friend request to reject", 300, null);
                        reject(apiResponse);
                    }
                }
            })//end find
        });//end Promise
    }//end getFriend

    let saveFriend = (friendDetails) => {

        return new Promise((resolve, reject) => {

            UserModel.update({ userId: req.params.friendId }, { sentFriendRequests: friendDetails.sentFriendRequests }, { multi: true }, (err, result) => {

                if (err) {
                    logger.error("Unable to find user", "friendController: saveFriend", 10);
                    let apiResponse = response.generate(true, "Unable to find user", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("friend request not rejected", "friendController:saveFriend()", 10);
                    let apiResponse = response.generate(true, "friend request not rejected", 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info("friend request rejected", "friendController: saveFriend()", 10);
                    friendDetails.saveFriendResult = result;
                    resolve(friendDetails);
                }
            })//end update
        });//end promise
    }//end savefriend

    let saveUser = (friendDetails) => {

        return new Promise((resolve, reject) => {

            UserModel.update({ userId: req.params.userId }, { receivedFriendRequests: friendDetails.receivedFriendRequests }, { multi: true }, (err, result) => {

                if (err) {
                    logger.error("Unable to find user", "friendController: saveFriend", 10);
                    let apiResponse = response.generate(true, "Unable to find user", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("friend request not rejected", "friendController:saveFriend()", 10);
                    let apiResponse = response.generate(true, "friend request not rejected", 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info("friend request rejected", "friendController: saveFriend()", 10);
                    friendDetails.saveUserResult = result;
                    resolve(friendDetails);
                }
            })//end update
        });//end promise
    }//end saveUser

    getUser(req, res)
        .then(getFriend)
        .then(saveFriend)
        .then(saveUser)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Friend request rejected", 200, resolve);
            res.status(200);
            res.send(apiResponse);
        })
        .catch((err) => {
            res.status(err.status);
            res.send(err);
        });

}//end rejectRequest

let unFriend = (req, res) => {

    let getUser = () => {

        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.params.userId)) {
                logger.info('userId is missing', "friendController:getUser", 10);
                let apiResponse = response.generate(true, "userId is missing", 400, null);
                reject(apiResponse);
            }
            else if (check.isEmpty(req.params.friendId)) {
                logger.info('friendId is missing', "friendController:getUser", 10);
                let apiResponse = response.generate(true, "friendId is missing", 400, null);
                reject(apiResponse);
            }
            else {
                UserModel.findOne({ userId: req.params.userId }, (err, userDetails) => {
                    if (err) {
                        logger.error("Unable to find User", "friendController: getUser", 10);
                        let apiResponse = response.generate(true, "Unable to find user", 400, null);
                        reject(apiResponse);
                    }
                    else if (check.isEmpty(userDetails)) {
                        logger.error("User Not Found", "friendController: getUser", 10);
                        let apiResponse = response.generate(true, "User Not Found", 400, null);
                        reject(apiResponse);
                    } else {
                        let user = userDetails.toObject();
                        resolve(user);
                    }
                })//end find
            }
        });//end Promise
    }//end getUser

    let getFriend = (userDetails) => {

        return new Promise((resolve, reject) => {
            UserModel.findOne({ userId: req.params.friendId }, (err, friend) => {
                if (err) {
                    logger.error("Unable to find friend", "friendController: getFriend", 10);
                    let apiResponse = response.generate(true, "Unable to find friend", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(friend)) {
                    logger.error("Friend Not Found", "friendController: getFriend", 10);
                    let apiResponse = response.generate(true, "Friend Not Found", 400, null);
                    reject(apiResponse);
                }
                else {
                    let friendDetails = friend.toObject();
                    let friendObject = {
                        friendId: req.params.friendId,
                        friendName: `${friendDetails.firstname} ${friendDetails.lastName}`
                    };
                    let userObject = {
                        friendId: req.params.userId,
                        friendName: `${userDetails.firstName} ${userDetails.lastName}`
                    };
                    if (userDetails.friends.findIndex(x => x.friendId == friendObject.friendId) != -1) {
                        let index = userDetails.friends.findIndex(x => x.friendId == friendObject.friendId);
                        userDetails.friends.splice(index, 1);
                        index = friendDetails.friends.indexOf(x => x.friendId == userObject.friendId);
                        friendDetails.friends.splice(index, 1);
                        let saveObject = {
                            userFriends: userDetails.friends,
                            friends: friendDetails.friends,
                        }
                        resolve(saveObject);
                    }
                    else {
                        logger.error("You are not friends", "friendController: getfriend", 10);
                        let apiResponse = response.generate(true, "No such Friend", 300, null);
                        reject(apiResponse);
                    }
                }
            })//end find
        });//end Promise
    }//end getFriend

    let saveFriend = (friendDetails) => {

        return new Promise((resolve, reject) => {

            UserModel.update({ userId: req.params.friendId }, { friends: friendDetails.friends }, { multi: true }, (err, result) => {

                if (err) {
                    logger.error("Unable to find user", "friendController: saveFriend", 10);
                    let apiResponse = response.generate(true, "Unable to find user", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("friend not deleted", "friendController:saveFriend()", 10);
                    let apiResponse = response.generate(true, "friend not deleted", 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info("friend deleted", "friendController: saveFriend()", 10);
                    friendDetails.saveFriendResult = result;
                    resolve(friendDetails);
                }
            })//end update
        });//end promise
    }//end savefriend

    let saveUser = (friendDetails) => {

        return new Promise((resolve, reject) => {

            UserModel.update({ userId: req.params.userId }, { friends: friendDetails.userFriends }, { multi: true }, (err, result) => {

                if (err) {
                    logger.error("Unable to find user", "friendController: saveUser", 10);
                    let apiResponse = response.generate(true, "Unable to find user", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("friend request not deleted", "friendController:saveUser()", 10);
                    let apiResponse = response.generate(true, "friend not deleted", 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info("friend deleted", "friendController: saveUser()", 10);
                    friendDetails.saveUserResult = result;
                    resolve(friendDetails);
                }
            })//end update
        });//end promise
    }//end saveUser

    getUser(req, res)
        .then(getFriend)
        .then(saveFriend)
        .then(saveUser)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Friend deleted", 200, resolve);
            res.status(200);
            res.send(apiResponse);
        })
        .catch((err) => {
            res.status(err.status);
            res.send(err);
        });

}//end unfriend

let addUsersToSharedLists = (req, res) => {

    let updateSharedLists1 = () => {

        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.params.friend1Id) || check.isEmpty(req.params.friend2Id)) {
                logger.error("Friends Ids are missing", "friendController: getSharedLists", 10);
                let apiResponse = response.generate(true, "Friends Ids are missing", 400, null);
                reject(apiResponse);
            }
            else {
                ListModel.update({
                    $and: [{ creatorId: req.params.friend1Id }, { listType: "public" }]
                }, { $push: { users: { userId: req.params.friend2Id } } }, { multi: true }, (err, result) => {
                    if (err) {
                        logger.error("Unable to find lists", "friendController: getSharedLists", 10);
                        let apiResponse = response.generate(true, "Unable to find shared lists", 400, null);
                        reject(apiResponse);
                    }
                    else if (check.isEmpty(result)) {
                        logger.error("No shared lists found", "friendController:getSharedLists()", 10);
                        let apiResponse = response.generate(true, "No shared lists found", 500, null);
                        reject(apiResponse);
                    }
                    else {
                        logger.info("Shared Lists found & updated", "friendController: getSharedLists()", 10);
                        let lists = {};
                        lists.friend1SharedListResult = result;
                        resolve(lists);
                    }
                });//end find
            }
        });//end promise
    }//end updateSharedLists1

    let updateSharedLists2 = (lists) => {

        return new Promise((resolve, reject) => {
            ListModel.update({
                $and: [{ creatorId: req.params.friend2Id }, { listType: "public" }]
            }, { $push: { users: { userId: req.params.friend1Id } } }, { multi: true }, (err, result) => {
                if (err) {
                    logger.error("Unable to find lists", "friendController: getSharedLists", 10);
                    let apiResponse = response.generate(true, "Unable to find shared lists", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("No shared lists found", "friendController:getSharedLists()", 10);
                    let apiResponse = response.generate(true, "No shared lists found", 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info("Shared Lists found & updated", "friendController: getSharedLists()", 10);
                    lists.friend2SharedListResult = result;
                    resolve(lists);
                }
            });//end update
        });//end promise
    }//end updateSharedLists2

    updateSharedLists1(req, res)
        .then(updateSharedLists2)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Friends shared lists updated", 200, resolve);
            res.status(200);
            res.send(apiResponse);
        })
        .catch((err) => {
            res.status(err.status);
            res.send(err);
        });
}//end addUsersToSharedLists

let removeUsersFromSharedLists = (req, res) => {

    let updateSharedLists1 = () => {

        return new Promise((resolve, reject) => {
            if (check.isEmpty(req.params.friend1Id) || check.isEmpty(req.params.friend2Id)) {
                logger.error("Friends Ids are missing", "friendController: getSharedLists", 10);
                let apiResponse = response.generate(true, "Friends Ids are missing", 400, null);
                reject(apiResponse);
            }
            else {
                ListModel.update({
                    $and: [{ creatorId: req.params.friend1Id }, { listType: "public" }]
                }, { $pull: { users: { userId: req.params.friend2Id } } }, { multi: true }, (err, result) => {
                    if (err) {
                        logger.error("Unable to find lists", "friendController: getSharedLists", 10);
                        let apiResponse = response.generate(true, "Unable to find shared lists", 400, null);
                        reject(apiResponse);
                    }
                    else if (check.isEmpty(result)) {
                        logger.error("No shared lists found", "friendController:getSharedLists()", 10);
                        let apiResponse = response.generate(true, "No shared lists found", 500, null);
                        reject(apiResponse);
                    }
                    else {
                        logger.info("Shared Lists found & updated", "friendController: getSharedLists()", 10);
                        let lists = {};
                        lists.friend1SharedListResult = result;
                        resolve(lists);
                    }
                });//end find
            }
        });//end promise
    }//end updateSharedLists1

    let updateSharedLists2 = (lists) => {

        return new Promise((resolve, reject) => {
            ListModel.update({
                $and: [{ creatorId: req.params.friend2Id }, { listType: "public" }]
            }, { $pull: { users: { userId: req.params.friend1Id } } }, { multi: true }, (err, result) => {
                if (err) {
                    logger.error("Unable to find lists", "friendController: getSharedLists", 10);
                    let apiResponse = response.generate(true, "Unable to find shared lists", 400, null);
                    reject(apiResponse);
                }
                else if (check.isEmpty(result)) {
                    logger.error("No shared lists found", "friendController:getSharedLists()", 10);
                    let apiResponse = response.generate(true, "No shared lists found", 500, null);
                    reject(apiResponse);
                }
                else {
                    logger.info("Shared Lists found & updated", "friendController: getSharedLists()", 10);
                    lists.friend2SharedListResult = result;
                    resolve(lists);
                }
            });//end update
        });//end promise
    }//end updateSharedLists2

    updateSharedLists1(req, res)
        .then(updateSharedLists2)
        .then((resolve) => {
            let apiResponse = response.generate(false, "Friends shared lists updated", 200, resolve);
            res.status(200);
            res.send(apiResponse);
        })
        .catch((err) => {
            res.status(err.status);
            res.send(err);
        });
}//end removeUsersFromSharedLists

module.exports = {

    sendRequest: sendRequest,
    acceptRequest: acceptRequest,
    rejectRequest: rejectRequest,
    unFriend: unFriend,
    addUsersToSharedLists: addUsersToSharedLists,
    removeUsersFromSharedLists: removeUsersFromSharedLists

}// end exports