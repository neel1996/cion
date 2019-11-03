var initialInputDataState = {
    "principleName":"",
    "principleDescription":"",
    "principleThumbnail":"",
    "dbHostName":"",
    "dbPortNumber":"",
    "dbUserName":"",
    "dbPassword":"",
    "dbName":""
};

var configuredData = (state = initialInputDataState, action) => {

    switch(action.type){
        case 'PRINCIPLE_NAME_CHANGE':
            return{
                ...state,
                "principleName": action.payload
            }
        case 'PRINCIPLE_DESCRIPTION_CHANGE':
            return{
                ...state,
                "principleDescription": action.payload
            }
        case 'DB_HOSTNAME_CHANGE':
            return{
                ...state,
                "dbHostName":action.payload
            }
        case 'DB_PORT_CHANGE':
            return{
                ...state,
                "dbPortNumber":action.payload
            }
        case 'DB_USERNAME_CHANGE':
            return{
                ...state,
                "dbUserName":action.payload
            }
        case 'DB_PASSWORD_CHANGE':
            return{
                ...state,
                "dbPassword":action.payload
            }
        case 'DB_NAME_CHANGE':
            return{
                ...state,
                "dbName":action.payload
            }
        case 'THUMBNAIL_CHANGE':
            return{
                ...state,
                "principleThumbnail": action.payload
            }
        default:
            return{
                ...state
            };
    }

};

export default configuredData;