const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const authorization = require("../middlewares/auth");

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;

    // defining routes.


    // params: firstName, lastName, email, mobileNumber, password, country
    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    /**
         * @apiGroup users
         * @apiVersion  1.0.0
         * @api {post} /api/v1/users/signup api for user SignUp.
         *
         * @apiParam {string} firstName First Name of the user. (body params) (required)
         * @apiParam {string} lastName Last Name of the user. (body params) (required)
         * @apiParam {string} email email of the user. (body params) (required)
         * @apiParam {string} password password of the user. (body params) (required)
         * @apiParam {string} mobileNumber Mobile Number of the user. (body params) (required)
         * @apiParam {string} country Country name of the user. (body params) (required)
         *  
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": "false",
                "message": "User Created",
                "status": 200,
                "data": {
                    "__v": 0,
                    "_id": "5bbed22af30eb80878c24854",
                    "createdOn": "2018-10-11T04:31:38.000Z",
                    "receivedFriendRequests": [],
                    "sentFriendRequests": [],
                    "friends": [],
                    "userVerified": false,
                    "country": "India",
                    "mobileNumber": "911234567890",
                    "email": "hanmantchidrawar@gmail.com",
                    "lastName": "Patil",
                    "firstName": "Hanumant",
                    "userId": "Y6eiRLmta"
                }
            }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": "true",
                "message": "one or more parameter(s) are missing",
                "status": 500,
                "data": null
            }    
        */


    // params: email, password.
    app.post(`${baseUrl}/login`, userController.loginFunction);
    /**
       * @apiGroup user
       * @apiVersion  1.0.0
       * @api {post} /api/v1/users/login api for user login.
       *
       * @apiParam {string} email email of the user. (body params) (required)
       * @apiParam {string} password password of the user. (body params) (required)
       *
       * @apiSuccess {object} myResponse shows error status, message, http status code, result.
       * 
       * @apiSuccessExample {object} Success-Response:
       * {
               "error": false,
               "message": "login Successful",
               "status": 200,
               "data": {
                   "authToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlVMbUM3UG8xRCIsImlhdCI6MTUzOTIzMjYzNjU5OSwic3ViIjoiYXV0aFRva2VuIiwiZXhwIjoxNTM5MzE5MDM2LCJpc3MiOiJHcm91cENoYXRBcHAiLCJkYXRhIjp7InJlY2VpdmVkRnJpZW5kUmVxdWVzdHMiOltdLCJzZW50RnJpZW5kUmVxdWVzdHMiOltdLCJmcmllbmRzIjpbXSwidXNlclZlcmlmaWVkIjp0cnVlLCJjb3VudHJ5IjoiSW5kaWEiLCJtb2JpbGVOdW1iZXIiOiI5MTEyMzQ1Njc4OTAiLCJlbWFpbCI6Imhhbm1hbnRjaGlkcmF3YXJAZ21haWwuY29tIiwibGFzdE5hbWUiOiJQYXRpbCIsImZpcnN0TmFtZSI6IkhhbnVtYW50IiwidXNlcklkIjoiWTZlaVJMbXRhIn19.SN-QupC-yDq8MdqQb4RhLGW9hdLZRpG-fBEBl5oQiik",
                   "userDetails": {
                       "receivedFriendRequests": [],
                       "sentFriendRequests": [],
                       "friends": [],
                       "userVerified": true,
                       "country": "India",
                       "mobileNumber": "911234567890",
                       "email": "hanmantchidrawar@gmail.com",
                       "lastName": "Patil",
                       "firstName": "Hanumant",
                       "userId": "Y6eiRLmta"
                   }
               }
           }  
       *  @apiErrorExample {json} Error-Response:
       *
       *  {
               "error": true,
               "message": "User not Verified",
               "status": 305,
               "data": null
           }
           or
           {
               "error": true,
               "message": "Password is incorrect",
               "status": 300,
               "data": null
           }
      */


    // auth token params: userId.
    app.post(`${baseUrl}/:userId/logout`, userController.logout);
    /**
         * @apiGroup user
         * @apiVersion  1.0.0
         * @api {post} /api/v1/users/:userId/logout to logout user.
         *
         * @apiParam {string} userId userId of the user. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": true,
                "message": "User logged Out",
                "status": 200,
                "data": {
                    "n": 0,
                    "ok": 1
                }
            }
          *  @apiErrorExample {json} Error-Response:
          *
          * {
                "error": true,
                "message": string,
                "status": 500,
                "data": null
            }
     */

    app.get(`${baseUrl}/:userId/verifyUser`, userController.verifyUser);
    /**
         * @apiGroup user
         * @apiVersion  1.0.0
         * @api {get} /api/v1/users/:userId/verifyUser to mark user as verified.
         *
         * @apiParam {string} userId Id of the user. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
                {
                    "error": false,
                    "message": "user found & verified",
                    "status": 200,
                    "data": "User Verified Successfully"
                }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 500,
                "data": null
            }        
        */
    app.get(`${baseUrl}/:email/forgotPassword`, userController.sendResetLink);
    /**
         * @apiGroup user
         * @apiVersion  1.0.0
         * @api {get} /api/v1/users/:email/forgotPassword to send an reset email to user.
         *
         * @apiParam {string} email Email of the user. (route params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
                {
                    "error": false,
                    "message": "User Details Found",
                    "status": 200,
                    "data": "Mail sent successfully"
                }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 500,
                "data": null
            }        
        */
    app.get(`${baseUrl}/:email/getUser`, authorization.isAuthorized, userController.getUser)
    /**
         * @apiGroup user
         * @apiVersion  1.0.0
         * @api {get} /api/v1/users/:email/getUser to get all details about the user.
         *
         * @apiParam {string} email email of user whoose details will be returned. (route params) (required)
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
            {
                "error": false,
                "message": "User found",
                "status": 200,
                "data": {
                    "_id": "5bbed22af30eb80878c24854",
                    "__v": 0,
                    "createdOn": "2018-10-11T04:31:38.000Z",
                    "receivedFriendRequests": [],
                    "sentFriendRequests": [],
                    "friends": [],
                    "userVerified": true,
                    "country": "India",
                    "mobileNumber": "911234567890",
                    "email": "hanmantchidrawar@gmail.com",
                    "password": "$2a$10$Qvtzb0Lr/ooui.dEToJl9eO5it9owKqu1UBPIedGXqA0Cin3y1NQC",
                    "lastName": "Patil",
                    "firstName": "Hanumant",
                    "userId": "Y6eiRLmta"
                }
            }            
          *  @apiErrorExample {json} Error-Response:
          *
          * {
                "error": true,
                "message": "Invalid or Expired Token",
                "status": 404,
                "data": null
            }
        */

    app.get(`${baseUrl}/:userId/getUsers`, userController.getUsers)
    /**
         * @apiGroup users
         * @apiVersion  1.0.0
         * @api {get} /api/v1/users/:userId/getUsers to get all the users other than the one who send his userId.
         *
         * @apiParam {string} authToken authToken of user for authorization. (route / body / query / header params) (required)
         * @apiParam {string} userId of user which will ensure all other users are returned except current user. (route params) (required)
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
         * {
                "error": false,
                "message": "Users found",
                "status": 200,
                "data": [
                    {
                        "_id": "5b724d82a11d030f24dcfffb",
                        "__v": 0,
                        "createdOn": "2018-08-14T03:33:22.000Z",
                        "isAdmin": false,
                        "userVerified": true,
                        "country": "India",
                        "userName": "Krishna",
                        "mobileNumber": "8920014205",
                        "email": "hanmantchidrawar@gmail.com",
                        "password": "$2a$10$9nM0HSCZqCdeiK0UaihUwuk.dtvTanqb1USTeCAmxT33VU4G9B7Uq",
                        "lastName": "Patil",
                        "firstName": "Krishna",
                        "userId": "KUej1lid4"
                    }
                ]
            }   
         *  @apiErrorExample {json} Error-Response:
         *
         * {
                "error": true,
                "message": "Invalid or Expired Token",
                "status": 404,
                "data": null
            }
        */

    app.post(`${baseUrl}/resetPassword`, userController.resetPassword);

    /**
         * @apiGroup user
         * @apiVersion  1.0.0
         * @api {post} /api/v1/users/resetPassword to change the password of user.
         *
         * @apiParam {string} userId Id of the user. (body params) (required)
         * @apiParam {string} password New password of the user. (body params) (required)
         *
         * @apiSuccess {object} myResponse shows error status, message, http status code, result.
         * 
         * @apiSuccessExample {object} Success-Response:
                {
                    "error": false,
                    "message": "Mail sent Successfully",
                    "status": 200,
                    "data": "Password reset successfull"
                }
        *  @apiErrorExample {json} Error-Response:
        *
        *  {
                "error": true,
                "message": string,
                "status": 500r,
                "data": null
            }        
        */
}
