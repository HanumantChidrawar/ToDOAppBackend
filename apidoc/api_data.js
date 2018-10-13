define({ "api": [
  {
    "group": "Friend",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friend/:friend1Id/:friend2Id/addUsersToSharedLists",
    "title": "api for adding users to sharedList of each others. (public ToDo list).",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "friend1Id",
            "description": "<p>Id of first User who want to share ToDo List. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "friend2Id",
            "description": "<p>Id of second User who want to share ToDo List. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Friends shared lists updated\",\n    \"status\": 200,\n    \"data\": {\n        \"friend1SharedListResult\": {\n            \"n\": 1,\n            \"nModified\": 1,\n            \"ok\": 1\n        },\n        \"friend2SharedListResult\": {\n            \"n\": 0,\n            \"nModified\": 0,\n            \"ok\": 1\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"error\": true,\n    \"message\": string,\n    \"status\": 400,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/friend.js",
    "groupTitle": "Friend",
    "name": "GetApiV1FriendFriend1idFriend2idAdduserstosharedlists"
  },
  {
    "group": "Friend",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friend/:friend1Id/:friend2Id/removeUsersFromSharedLists",
    "title": "api for removing themseleves from sharedList of each others. (public ToDo list).",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "friend1Id",
            "description": "<p>Id of first User who don't want to share ToDo List with second user . (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "friend2Id",
            "description": "<p>Id of second User who don't want to share ToDo List with first user. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Friends shared lists updated\",\n    \"status\": 200,\n    \"data\": {\n        \"friend1SharedListResult\": {\n            \"n\": 1,\n            \"nModified\": 1,\n            \"ok\": 1\n        },\n        \"friend2SharedListResult\": {\n            \"n\": 0,\n            \"nModified\": 0,\n            \"ok\": 1\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"error\": true,\n    \"message\": string,\n    \"status\": 400,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/friend.js",
    "groupTitle": "Friend",
    "name": "GetApiV1FriendFriend1idFriend2idRemoveusersfromsharedlists"
  },
  {
    "group": "Friend",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friend/:userId/:friendId/acceptRequest",
    "title": "api for accepting the friend request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of user who want to accept the request. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "friendId",
            "description": "<p>Id of friend whoose request is to be accepted. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Friend request accepted\",\n    \"status\": 200,\n    \"data\": {\n        \"receivedFriendRequests\": [],\n        \"userFriends\": [\n            {\n                \"friendId\": \"Y6eiRLmta\",\n                \"friendName\": \"Hanumant Patil\"\n            }\n        ],\n        \"sentFriendRequests\": [],\n        \"friends\": [\n            {\n                \"friendId\": \"uTuw2W--v\",\n                \"friendName\": \"Krishna Patil\"\n            }\n        ],\n        \"saveFriendResult\": {\n            \"n\": 1,\n            \"nModified\": 1,\n            \"ok\": 1\n        },\n        \"saveUserResult\": {\n            \"n\": 1,\n            \"nModified\": 1,\n            \"ok\": 1\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"error\": true,\n    \"message\": \"Friend request cannot be accepted\",\n    \"status\": 300,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/friend.js",
    "groupTitle": "Friend",
    "name": "GetApiV1FriendUseridFriendidAcceptrequest"
  },
  {
    "group": "Friend",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friend/:userId/:friendId/rejectRequest",
    "title": "api for rejecting the friend request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of user who want to reject the request. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "friendId",
            "description": "<p>Id of friend whoose request is to be rejected. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Friend request rejected\",\n    \"status\": 200,\n    \"data\": {\n        \"receivedFriendRequests\": [],\n        \"sentFriendRequests\": [],\n        \"saveFriendResult\": {\n            \"n\": 1,\n            \"nModified\": 1,\n            \"ok\": 1\n        },\n        \"saveUserResult\": {\n            \"n\": 1,\n            \"nModified\": 1,\n            \"ok\": 1\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"error\": true,\n    \"message\": \"Friend request cannot be rejected\",\n    \"status\": 300,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/friend.js",
    "groupTitle": "Friend",
    "name": "GetApiV1FriendUseridFriendidRejectrequest"
  },
  {
    "group": "Friend",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friend/:userId/:friendId/sendRequest",
    "title": "api for sending the friend request.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of user who want to send the request. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "friendId",
            "description": "<p>Id of friend whom want to send the request. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Friend received request updated\",\n    \"status\": 200,\n    \"data\": {\n        \"sentFriendRequests\": [\n            {\n                \"friendId\": \"uTuw2W--v\",\n                \"friendName\": \"Krishna Patil\"\n            }\n        ],\n        \"receivedFriendRequests\": [\n            {\n                \"friendId\": \"Y6eiRLmta\",\n                \"friendName\": \"Hanumant Patil\"\n            }\n        ],\n        \"saveFriendResult\": {\n            \"n\": 1,\n            \"nModified\": 1,\n            \"ok\": 1\n        },\n        \"saveUserResult\": {\n            \"n\": 1,\n            \"nModified\": 1,\n            \"ok\": 1\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"error\": true,\n    \"message\": \"Friend request cannot be sent already sent\",\n    \"status\": 305,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"Friend request cannot be sent already received\",\n    \"status\": 305,\n    \"data\": null\n}\n{\n    \"error\": true,\n    \"message\": \"Friend request cannot be sent already friends\",\n    \"status\": 305,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/friend.js",
    "groupTitle": "Friend",
    "name": "GetApiV1FriendUseridFriendidSendrequest"
  },
  {
    "group": "Friend",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/friend/:userId/:friendId/unFriend",
    "title": "api for deleting the friend.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of user who want to unfriend a friend. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "friendId",
            "description": "<p>Id of friend whoom to unfriend. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Friend deleted\",\n    \"status\": 200,\n    \"data\": {\n        \"userFriends\": [],\n        \"friends\": [],\n        \"saveFriendResult\": {\n            \"n\": 1,\n            \"nModified\": 1,\n            \"ok\": 1\n        },\n        \"saveUserResult\": {\n            \"n\": 1,\n            \"nModified\": 1,\n            \"ok\": 1\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"error\": true,\n    \"message\": \"No such Friend\",\n    \"status\": 300,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/friend.js",
    "groupTitle": "Friend",
    "name": "GetApiV1FriendUseridFriendidUnfriend"
  },
  {
    "group": "History",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/history/:listId/createHistoryList",
    "title": "api for creating the historyList for Todo list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>Id of the ToDo List for whom we need to create History in database. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"History List created \",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"5bbef87e5c58742d48cc6b41\",\n        \"objects\": [],\n        \"createdOn\": \"2018-10-11T07:15:10.000Z\",\n        \"listId\": \"crv321p5x\",\n        \"historyId\": \"rDq3xR3FM\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": string,\n        \"status\": 400,\n        \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/history.js",
    "groupTitle": "History",
    "name": "GetApiV1HistoryListidCreatehistorylist"
  },
  {
    "group": "History",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/history/:listId/deleteHistoryList",
    "title": "api for deleting the historyList for Todo list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>Id of the ToDo List for whom we need to create History in database. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"History List Deleted\",\n    \"status\": 200,\n    \"data\": null\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n        \"error\": true,\n        \"message\": string,\n        \"status\": 400,\n        \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/history.js",
    "groupTitle": "History",
    "name": "GetApiV1HistoryListidDeletehistorylist"
  },
  {
    "group": "History",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/history/:listId/deleteObject",
    "title": "api for deleting an Item/subItem in historyList for Todo list used in case of undo operation.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>Id of the ToDo List for whom we need to create History in database. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"History objects for list updated Successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1,\n        \"deletedObject\": {\n            \"_id\": \"5bbeee175c58742d48cc6b3c\",\n            \"__v\": 0,\n            \"listId\": \"crv321p5x\",\n            \"createdOn\": \"2018-10-11T06:30:47.000Z\",\n            \"createdBy\": \"Hanumant Patil\",\n            \"itemStatus\": false,\n            \"itemName\": \"Item2\",\n            \"itemId\": \"1luCEpXZB\",\n            \"operationType\": null\n        }\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"error\": true,\n    \"message\": \"History of List not found\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/history.js",
    "groupTitle": "History",
    "name": "GetApiV1HistoryListidDeleteobject"
  },
  {
    "group": "History",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/history/:listId/saveObject",
    "title": "api for saving an Item/subItem in historyList for Todo list used in case of undo operation.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>Id of the ToDo List for whom we need to create History in database. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "item",
            "description": "<p>flag used to indicate the type of element as item of the ToDo List. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>Id used to find the item and save it in the history of ToDo list. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItem",
            "description": "<p>flag used to indicate the type of element as subItem of the ToDo List. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>Id used to find the subItem and save it in the history of ToDo list. (body params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"History updated Successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 1,\n        \"nModified\": 1,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{\n    \"error\": true,\n    \"message\": \"History of List not found\",\n    \"status\": 500,\n    \"data\": null\n}",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/history.js",
    "groupTitle": "History",
    "name": "PostApiV1HistoryListidSaveobject"
  },
  {
    "group": "Item",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/:itemId/deleteItem",
    "title": "api for deletion of Item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>Id of the TODo list which is to be updated. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"error\": false,\n     \"message\": \"Item found & deleted \",\n     \"status\": 200,\n     \"data\": {\n         \"n\": 1,\n         \"ok\": 1\n     }\n }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 400,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/list.js",
    "groupTitle": "Item",
    "name": "GetApiV1ListsItemidDeleteitem"
  },
  {
    "group": "Item",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/:listId/getItems",
    "title": "api for geting the items of list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>Id of the ToDo whoose items are to be fetched.(route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"error\": false,\n     \"message\": \"items found\",\n     \"status\": 200,\n     \"data\": [\n         {\n             \"listId\": \"crv321p5x\",\n             \"createdOn\": \"2018-10-11T06:30:47.000Z\",\n             \"createdBy\": \"Hanumant Patil\",\n             \"itemStatus\": false,\n             \"itemName\": \"Item2\",\n             \"itemId\": \"1luCEpXZB\"\n         },\n         {\n             \"listId\": \"crv321p5x\",\n             \"createdOn\": \"2018-10-11T06:30:40.000Z\",\n             \"createdBy\": \"Hanumant Patil\",\n             \"itemStatus\": false,\n             \"itemName\": \"Item1\",\n             \"itemId\": \"iIorq2A8o\"\n         }\n     ]\n }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 400,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/list.js",
    "groupTitle": "Item",
    "name": "GetApiV1ListsListidGetitems"
  },
  {
    "group": "Item",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/createItem",
    "title": "api for Creation of Item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>Id of the TODo list which is to be updated. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>Name of the user who created the Item. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemName",
            "description": "<p>Name of the item which is to  be  created. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"error\": \"false\",\n     \"message\": \"Item Created\",\n     \"status\": 200,\n     \"data\": {\n         \"__v\": 0,\n         \"_id\": \"5bbeddb2f30eb80878c24859\",\n         \"listId\": \"lcpIG4HXk\",\n         \"createdOn\": \"2018-10-11T05:20:50.000Z\",\n         \"createdBy\": \"Hanumant Patil\",\n         \"itemStatus\": false,\n         \"itemName\": \"Item1\",\n         \"itemId\": \"-F-plPU5A\"\n     }\n }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": \"listId is missing\",\n               \"status\": 400,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/list.js",
    "groupTitle": "Item",
    "name": "PostApiV1ListsCreateitem"
  },
  {
    "group": "Item",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/updateItem",
    "title": "api for user updating the Item.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>Id of the TODo list which is to be updated. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemStatus",
            "description": "<p>Status of the Item which is to be updated. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemName",
            "description": "<p>New Name of the item which is to  be  updated. (body params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"error\": false,\n     \"message\": \"Item found & Updated \",\n     \"status\": 200,\n     \"data\": {\n         \"n\": 1,\n         \"nModified\": 1,\n         \"ok\": 1\n     }\n }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 400,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/list.js",
    "groupTitle": "Item",
    "name": "PostApiV1ListsUpdateitem"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/deleteList",
    "title": "api for deletion of ToDo List.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>Id of the TODo list which is to be updated. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"error\": false,\n     \"message\": \"List found & deleted \",\n     \"status\": 200,\n     \"data\": {\n         \"n\": 1,\n         \"ok\": 1\n     }\n }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": false,\n               \"message\": string,\n               \"status\": 500,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/list.js",
    "groupTitle": "List",
    "name": "GetApiV1ListsDeletelist"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/:listId/getlist",
    "title": "api for geting the list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>Id of the ToDo which is to be fetched.(route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"error\": false,\n     \"message\": \"List found\",\n     \"status\": 200,\n     \"data\": [\n         {\n             \"_id\": \"5bbedccff30eb80878c24858\",\n             \"__v\": 0,\n             \"createdOn\": \"2018-10-11T05:17:03.000Z\",\n             \"users\": [\n                 {\n                     \"userId\": \"Y6eiRLmta\"\n                 }\n             ],\n             \"listType\": \"public\",\n             \"createdBy\": \"Hanumant Patil\",\n             \"creatorId\": \"Y6eiRLmta\",\n             \"listName\": \"Fisrt List\",\n             \"listId\": \"crv321p5x\"\n         }\n     ]\n }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 400,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/list.js",
    "groupTitle": "List",
    "name": "GetApiV1ListsListidGetlist"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/:userId/:listType/getlists",
    "title": "api for geting the lists for user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user whoose lists are to be found.(route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listType",
            "description": "<p>type of the list which are to fetched.(route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"error\": false,\n     \"message\": \"Lists found\",\n     \"status\": 200,\n     \"data\": [\n         {\n             \"_id\": \"5bbedccff30eb80878c24858\",\n             \"__v\": 0,\n             \"createdOn\": \"2018-10-11T05:17:03.000Z\",\n             \"users\": [\n                 {\n                     \"userId\": \"Y6eiRLmta\"\n                 }\n             ],\n             \"listType\": \"public\",\n             \"createdBy\": \"Hanumant Patil\",\n             \"creatorId\": \"Y6eiRLmta\",\n             \"listName\": \"Fisrt List\",\n             \"listId\": \"crv321p5x\"\n         }\n     ]\n }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 400,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/list.js",
    "groupTitle": "List",
    "name": "GetApiV1ListsUseridListtypeGetlists"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/createList",
    "title": "api for creating the ToDO List.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listName",
            "description": "<p>Name of the ToDo list to be created. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listType",
            "description": "<p>Type of the ToDo list to be created should be either public / private. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user who is creating the ToDo lists. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"list created Successfully\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"5bbed93cf30eb80878c24857\",\n        \"createdOn\": \"2018-10-11T05:01:48.000Z\",\n        \"users\": [\n            {\n                \"userId\": \"Y6eiRLmta\"\n            }\n        ],\n        \"listType\": \"public\",\n        \"createdBy\": \"Hanumant Patil\",\n        \"creatorId\": \"Y6eiRLmta\",\n        \"listName\": \"Fisrt List\",\n        \"listId\": \"lcpIG4HXk\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": \"UserId is missing\",\n               \"status\": 400,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/list.js",
    "groupTitle": "List",
    "name": "PostApiV1ListsCreatelist"
  },
  {
    "group": "List",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/createList",
    "title": "api for updating the ToDo List.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listName",
            "description": "<p>Updated Name of the ToDo list. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "listId",
            "description": "<p>Id of the TODo list which is to be updated. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"error\": false,\n     \"message\": \"List found & Updated \",\n     \"status\": 200,\n     \"data\": {\n         \"n\": 1,\n         \"nModified\": 1,\n         \"ok\": 1\n     }\n }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": false,\n               \"message\": string,\n               \"status\": 500,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/list.js",
    "groupTitle": "List",
    "name": "PostApiV1ListsCreatelist"
  },
  {
    "group": "SubItem",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/getSubItems",
    "title": "api for geting the SubItems of list.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemIds",
            "description": "<p>Ids of the items in ToDo list whoose subItems are to be fetched.(query params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"error\": false,\n     \"message\": \"SubItems found\",\n     \"status\": 200,\n     \"data\": [\n         {\n             \"_id\": \"5bbeee6c5c58742d48cc6b3d\",\n             \"subItemName\": \"Sub item2\",\n             \"__v\": 0,\n             \"createdOn\": \"2018-10-11T06:32:12.000Z\",\n             \"createdBy\": \"Hanumant Patil\",\n             \"itemId\": \"iIorq2A8o\",\n             \"subItemStatus\": false,\n             \"subItemId\": \"HeYkC7QTl\"\n         },\n         {\n             \"_id\": \"5bbeee705c58742d48cc6b3e\",\n             \"subItemName\": \"Sub item1\",\n             \"__v\": 0,\n             \"createdOn\": \"2018-10-11T06:32:16.000Z\",\n             \"createdBy\": \"Hanumant Patil\",\n             \"itemId\": \"iIorq2A8o\",\n             \"subItemStatus\": false,\n             \"subItemId\": \"4J5ZTzz5e\"\n         },\n         {\n             \"_id\": \"5bbeee855c58742d48cc6b3f\",\n             \"subItemName\": \"Sub item1\",\n             \"__v\": 0,\n             \"createdOn\": \"2018-10-11T06:32:37.000Z\",\n             \"createdBy\": \"Hanumant Patil\",\n             \"itemId\": \"1luCEpXZB\",\n             \"subItemStatus\": false,\n             \"subItemId\": \"4iFEJek4O\"\n         },\n         {\n             \"_id\": \"5bbeee895c58742d48cc6b40\",\n             \"subItemName\": \"Sub item2\",\n             \"__v\": 0,\n             \"createdOn\": \"2018-10-11T06:32:41.000Z\",\n             \"createdBy\": \"Hanumant Patil\",\n             \"itemId\": \"1luCEpXZB\",\n             \"subItemStatus\": false,\n             \"subItemId\": \"8JGueBcih\"\n         }\n     ]\n }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 400,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/list.js",
    "groupTitle": "SubItem",
    "name": "GetApiV1ListsGetsubitems"
  },
  {
    "group": "SubItem",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/lists/:subItemId/deleteSubItem",
    "title": "api for deletion of subItem.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>Id of the TODo list which is to be updated. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"error\": false,\n     \"message\": \"SubItem found & deleted \",\n     \"status\": 200,\n     \"data\": {\n         \"n\": 1,\n         \"ok\": 1\n     }\n }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 400,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/list.js",
    "groupTitle": "SubItem",
    "name": "GetApiV1ListsSubitemidDeletesubitem"
  },
  {
    "group": "SubItem",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/createSubItem",
    "title": "api for creation of subItem.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "itemId",
            "description": "<p>Id of the TODo list which is to be updated. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userName",
            "description": "<p>Name of the user who is creating the subItem. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemName",
            "description": "<p>Name of the subItem to be created. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"error\": \"false\",\n     \"message\": \"SubItem Created\",\n     \"status\": 200,\n     \"data\": {\n         \"__v\": 0,\n         \"subItemName\": \"Sub item1\",\n         \"_id\": \"5bbee4f4f30eb80878c2485a\",\n         \"createdOn\": \"2018-10-11T05:51:48.000Z\",\n         \"createdBy\": \"Hanumant Patil\",\n         \"itemId\": \"-F-plPU5A\",\n         \"subItemStatus\": false,\n         \"subItemId\": \"4j4D-qCLr\"\n     }\n }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": \"itemId is missing\",\n               \"status\": 400,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/list.js",
    "groupTitle": "SubItem",
    "name": "PostApiV1ListsCreatesubitem"
  },
  {
    "group": "SubItem",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/lists/:subItemId/updateSubItem",
    "title": "api for updation of subItem.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemId",
            "description": "<p>Id of the TODo list which is to be updated. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemStatus",
            "description": "<p>status of the subItem which is to be updated. (body params) (optional)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "subItemName",
            "description": "<p>Name of the subItem to be updated. (body params) (optional)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n     \"error\": false,\n     \"message\": \"SubItem found & Updated \",\n     \"status\": 200,\n     \"data\": {\n         \"n\": 1,\n         \"nModified\": 1,\n         \"ok\": 1\n     }\n }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 400,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/list.js",
    "groupTitle": "SubItem",
    "name": "PostApiV1ListsSubitemidUpdatesubitem"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:email/forgotPassword",
    "title": "to send an reset email to user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User Details Found\",\n    \"status\": 200,\n    \"data\": \"Mail sent successfully\"\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 500,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "GetApiV1UsersEmailForgotpassword"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:email/getUser",
    "title": "to get all details about the user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of user whoose details will be returned. (route params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"User found\",\n    \"status\": 200,\n    \"data\": {\n        \"_id\": \"5bbed22af30eb80878c24854\",\n        \"__v\": 0,\n        \"createdOn\": \"2018-10-11T04:31:38.000Z\",\n        \"receivedFriendRequests\": [],\n        \"sentFriendRequests\": [],\n        \"friends\": [],\n        \"userVerified\": true,\n        \"country\": \"India\",\n        \"mobileNumber\": \"911234567890\",\n        \"email\": \"hanmantchidrawar@gmail.com\",\n        \"password\": \"$2a$10$Qvtzb0Lr/ooui.dEToJl9eO5it9owKqu1UBPIedGXqA0Cin3y1NQC\",\n        \"lastName\": \"Patil\",\n        \"firstName\": \"Hanumant\",\n        \"userId\": \"Y6eiRLmta\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n                \"error\": true,\n                \"message\": \"Invalid or Expired Token\",\n                \"status\": 404,\n                \"data\": null\n            }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "GetApiV1UsersEmailGetuser"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId/verifyUser",
    "title": "to mark user as verified.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"user found & verified\",\n    \"status\": 200,\n    \"data\": \"User Verified Successfully\"\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 500,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "GetApiV1UsersUseridVerifyuser"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/login",
    "title": "api for user login.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n                \"error\": false,\n                \"message\": \"login Successful\",\n                \"status\": 200,\n                \"data\": {\n                    \"authToken\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IlVMbUM3UG8xRCIsImlhdCI6MTUzOTIzMjYzNjU5OSwic3ViIjoiYXV0aFRva2VuIiwiZXhwIjoxNTM5MzE5MDM2LCJpc3MiOiJHcm91cENoYXRBcHAiLCJkYXRhIjp7InJlY2VpdmVkRnJpZW5kUmVxdWVzdHMiOltdLCJzZW50RnJpZW5kUmVxdWVzdHMiOltdLCJmcmllbmRzIjpbXSwidXNlclZlcmlmaWVkIjp0cnVlLCJjb3VudHJ5IjoiSW5kaWEiLCJtb2JpbGVOdW1iZXIiOiI5MTEyMzQ1Njc4OTAiLCJlbWFpbCI6Imhhbm1hbnRjaGlkcmF3YXJAZ21haWwuY29tIiwibGFzdE5hbWUiOiJQYXRpbCIsImZpcnN0TmFtZSI6IkhhbnVtYW50IiwidXNlcklkIjoiWTZlaVJMbXRhIn19.SN-QupC-yDq8MdqQb4RhLGW9hdLZRpG-fBEBl5oQiik\",\n                    \"userDetails\": {\n                        \"receivedFriendRequests\": [],\n                        \"sentFriendRequests\": [],\n                        \"friends\": [],\n                        \"userVerified\": true,\n                        \"country\": \"India\",\n                        \"mobileNumber\": \"911234567890\",\n                        \"email\": \"hanmantchidrawar@gmail.com\",\n                        \"lastName\": \"Patil\",\n                        \"firstName\": \"Hanumant\",\n                        \"userId\": \"Y6eiRLmta\"\n                    }\n                }\n            }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": \"User not Verified\",\n               \"status\": 305,\n               \"data\": null\n           }\n           or\n           {\n               \"error\": true,\n               \"message\": \"Password is incorrect\",\n               \"status\": 300,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostApiV1UsersLogin"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/resetPassword",
    "title": "to change the password of user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>Id of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>New password of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": false,\n    \"message\": \"Mail sent Successfully\",\n    \"status\": 200,\n    \"data\": \"Password reset successfull\"\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": true,\n               \"message\": string,\n               \"status\": 500r,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostApiV1UsersResetpassword"
  },
  {
    "group": "user",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/:userId/logout",
    "title": "to logout user.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>userId of the user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": true,\n    \"message\": \"User logged Out\",\n    \"status\": 200,\n    \"data\": {\n        \"n\": 0,\n        \"ok\": 1\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n                \"error\": true,\n                \"message\": string,\n                \"status\": 500,\n                \"data\": null\n            }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "user",
    "name": "PostApiV1UsersUseridLogout"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "get",
    "url": "/api/v1/users/:userId/getUsers",
    "title": "to get all the users other than the one who send his userId.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "authToken",
            "description": "<p>authToken of user for authorization. (route / body / query / header params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "userId",
            "description": "<p>of user which will ensure all other users are returned except current user. (route params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n                \"error\": false,\n                \"message\": \"Users found\",\n                \"status\": 200,\n                \"data\": [\n                    {\n                        \"_id\": \"5b724d82a11d030f24dcfffb\",\n                        \"__v\": 0,\n                        \"createdOn\": \"2018-08-14T03:33:22.000Z\",\n                        \"isAdmin\": false,\n                        \"userVerified\": true,\n                        \"country\": \"India\",\n                        \"userName\": \"Krishna\",\n                        \"mobileNumber\": \"8920014205\",\n                        \"email\": \"hanmantchidrawar@gmail.com\",\n                        \"password\": \"$2a$10$9nM0HSCZqCdeiK0UaihUwuk.dtvTanqb1USTeCAmxT33VU4G9B7Uq\",\n                        \"lastName\": \"Patil\",\n                        \"firstName\": \"Krishna\",\n                        \"userId\": \"KUej1lid4\"\n                    }\n                ]\n            }",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n                \"error\": true,\n                \"message\": \"Invalid or Expired Token\",\n                \"status\": 404,\n                \"data\": null\n            }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "GetApiV1UsersUseridGetusers"
  },
  {
    "group": "users",
    "version": "1.0.0",
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "api for user SignUp.",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "firstName",
            "description": "<p>First Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "lastName",
            "description": "<p>Last Name of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "email",
            "description": "<p>email of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "password",
            "description": "<p>password of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "mobileNumber",
            "description": "<p>Mobile Number of the user. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "country",
            "description": "<p>Country name of the user. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "myResponse",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{\n    \"error\": \"false\",\n    \"message\": \"User Created\",\n    \"status\": 200,\n    \"data\": {\n        \"__v\": 0,\n        \"_id\": \"5bbed22af30eb80878c24854\",\n        \"createdOn\": \"2018-10-11T04:31:38.000Z\",\n        \"receivedFriendRequests\": [],\n        \"sentFriendRequests\": [],\n        \"friends\": [],\n        \"userVerified\": false,\n        \"country\": \"India\",\n        \"mobileNumber\": \"911234567890\",\n        \"email\": \"hanmantchidrawar@gmail.com\",\n        \"lastName\": \"Patil\",\n        \"firstName\": \"Hanumant\",\n        \"userId\": \"Y6eiRLmta\"\n    }\n}",
          "type": "object"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "\n{\n               \"error\": \"true\",\n               \"message\": \"one or more parameter(s) are missing\",\n               \"status\": 500,\n               \"data\": null\n           }",
          "type": "json"
        }
      ]
    },
    "filename": "app/routes/user.js",
    "groupTitle": "users",
    "name": "PostApiV1UsersSignup"
  }
] });
