var initialState = {
    storageOption: "NO_STORAGE"
};

var setConfigurationStorage = function(state = initialState, action){
    switch(action.type){
        case 'DB_MODE':
            return{
                ...state,
                storageOption: "db"
            }
        case 'JSON_MODE':
            return{
                ...state,
                storageOption: "json"
            }
        default:
            console.log("Invalid Action Type");
            return{
                ...state
            }
    }
}

export default setConfigurationStorage;