import axios from "axios";

export class CommonControllerModule {
  static getCentralDataStore() {
    return this.readCentralAdminJSON("CENTRAL_DATASTORE");
  }

  getConfigDataStore(payload) {
    console.log("REST API Payload : " + JSON.stringify(payload, null, 2));

    var multiFormData = new FormData();

    for (var keySet in payload) {
      multiFormData.append(keySet, payload[keySet]);
    }

    multiFormData.append("option", "CONFIG_DATASTORE");

    var apiResponse = "";

    return axios({
      url: "http://localhost:5000/writefileapi",
      method: "POST",
      data: multiFormData,
      headers: {
        "Content-type": "multipart/form-data",
        accept: "multipart/form-data"
      }
    }).then(
      res => {
        apiResponse = res;
        return apiResponse;
      }
    );
  }

  static getConfigSetDataStore() {
    return this.readCentralAdminJSON("CONFIG_SET_DATASTORE");
  }
}
