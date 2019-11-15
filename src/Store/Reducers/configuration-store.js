var initialStorageOptionState = {
    storageOption: "NO_STORAGE",
    configFileName: ""
};

var setConfigurationStorage = (state = initialStorageOptionState, action) => {
    switch (action.type) {
        case 'DB_MODE':
            return {
                ...state,
                storageOption: "db"
            }
        case 'JSON_MODE':
            return {
                ...state,
                storageOption: "json"
            }
        case 'JSON_FILE_SETTER':
            return{
                ...state,
                configFileName: "config-" + new Date().getTime() + ".json"
            }
        default:
            return {
                ...state
            }
    }
};

export default setConfigurationStorage;