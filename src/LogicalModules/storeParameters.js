import axios from 'axios';

var storeItemParameters = (params) => {
    console.log(params);

    const serviceEndpoint = "http://" + window.location.hostname + ":5002/cionapi/storeparameter"

    axios({
        url: serviceEndpoint,
        headers:{
            'Accept':'application/json'
        },
        method: 'POST',
        data: params,
    }).then((res)=>{
        if(res){
            console.log("Parameters posted to API!");
            window.alert("Parameters have been stored for the selected item");
        }
    }).catch((err)=>{
        if(err){
            console.log("Something went wrong: ", err);
            window.alert("Something went wrong: ", err);
        }
    });

}

export default storeItemParameters;