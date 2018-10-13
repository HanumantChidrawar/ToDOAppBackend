const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./../libs/loggerLib');

//for event driven programming
const events = require('events');
const eventEmitter = new events.EventEmitter();


const tokenLib = require('./../libs/tokenLib');
const check = require('./../libs/checkLib');
const response = require('./../libs/responseLib');
const UserModel = mongoose.model('User');


//importing redisLibrary
const redisLib = require("./redisLib");

let setServer = (server) => {
    let io = socketio.listen(server);//collection of all the connections on server

    let myIo = io.of('');//global instance of io can be used for cross socket communication.

    //main event handler all events will be inside it.
    myIo.on('connection', (socket) => {
        socket.emit('verifyUser', 'user verified');

        //code to verify the user and setting him online

        socket.on('set-user', (authToken) => {
            tokenLib.verifyClaimsWithoutSecret(authToken, (err, user) => {
                if (err) {
                    socket.emit('auth-error', { status: 500, error: 'Incorrect AuthToken' });
                }
                else {
                    let currentUser = user.data;
                    socket.userId = currentUser.userId;// setting socket userId
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`;
                    let key = currentUser.userId;
                    let value = fullName;
                    let setUserOnline = redisLib.setANewOnlineUserInHash("onlineUsersToDo", key, value, (err, result) => {
                        if (err) {
                            logger.error(err.message, "socketLib:SetANewOnlineUserInHash", 10);
                        }
                        else {

                            redisLib.getAllUsersInAHash('onlineUsersToDo', (err, result) => {

                                if (err) {
                                    console.log(err);
                                }
                                else {

                                    //placing every user in one global room
                                    socket.join("globalRoom");
                                    //socket.broadcast.to("globalRoom").emit('online-user-list', result);
                                    myIo.to("globalRoom").emit('online-user-list', result);

                                }
                            });

                        }
                    });//end setNewOnlineUsersInHash

                }
            });//end verifyClaimsWithoutSecret
        });//end set-user event

        socket.on("updateFriend", (data) => {
            myIo.emit(data.friendId, data);//event to update user about any new Friend request/ accept request/ reject/unfriend.
        });//end updateFriend

        socket.on("listUpdate", (data) => {
            let data1 = { updateList: true, message: data.message };
            for (let friend of data.friends) {
                myIo.emit(friend.friendId, data1);
            }
        })//end listUpdate

        socket.on("itemUpdate", (data) => {
            let data1 = { updateitem: true, message: data.message };
            for (let user of data.users) {
                myIo.emit(user.userId, data1);
            }
        })//end itemUpdate

        socket.on('disconnect', () => {
            //user will emit when disconnected
            //will remove user from online user list

            if (socket.userId) {
                redisLib.deleteUserFromHash('onlineUsersToDo', socket.userId);
                redisLib.getAllUsersInAHash('onlineUsersToDo', (err, result) => {
                    if (err) {
                        logger.error(err.message, "socketLib:getAllUsersInAHash", 10);
                    }
                    else {
                        socket.leave("globalRoom");
                        myIo.to("globalRoom").emit('online-user-list', result);
                    }
                });//end getAllUsersInAHash
            }
        });//end disconnect event


    });//end connection event
}//end setServer

//database operations should be kept outside the socket.io  code


module.exports = {
    setServer: setServer
}
