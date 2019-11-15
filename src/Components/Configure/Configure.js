import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Configure.css';

import InputElementSupplier from './InputElementSupplier';
import { CommonControllerModule } from '../../common-controller';

class Configure extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageData: "",
            configFileName: ""
        };
    }

    checkStorageOption(storageOption) {
        if (storageOption === "db") {
            return (
                <div>
                    <InputElementSupplier inputType="textbox" hintText="DB Host IP Address" keyref="db-host-entry"></InputElementSupplier>
                    <InputElementSupplier inputType="textbox" hintText="DB Port" keyref="db-port-entry"></InputElementSupplier>
                    <InputElementSupplier inputType="textbox" hintText="DB username" keyref="db-username-entry"></InputElementSupplier>
                    <InputElementSupplier inputType="password" hintText="DB Password" keyref="db-password-entry"></InputElementSupplier>
                    <InputElementSupplier inputType="textbox" hintText="Database name" keyref="db-name-entry"></InputElementSupplier>
                </div>
            );
        } else if (storageOption === "json") {
            return (
                <div>
                    <div className="jsonfile-container d-block justify-content-center">
                        <div className="json-file-label">
                            <span>Master config file name</span>
                            <div>
                                <b>{this.props.jsonFileName}</b>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                null
            );
        }
    }

    populateImageToTile(event) {
        var imageURLParser = new FileReader();
        var imageFile = event.target.files[0];

        if (imageFile !== undefined && typeof imageFile !== undefined) {
            imageURLParser.readAsDataURL(event.target.files[0]);


            imageURLParser.onload = (event) => {
                var img = new Image();
                img.src = event.target.result;

                img.onload = () => {
                    const elem = document.createElement('canvas');
                    elem.width = 280;
                    elem.height = 250;
                    const ctx = elem.getContext('2d');

                    ctx.drawImage(img, 0, 0, 280, 250);
                    ctx.canvas.toBlob((blob) => {
                        const compressedImage = new File([blob], "principleThumbnail", {
                            type: 'image/jpeg',
                            lastModified: Date.now()
                        });
                    }, 'image/jpeg', 0.8);

                    this.props.setPrincipleThumbnail(elem.toDataURL('image/jpeg',1));
                    this.setState({
                        imageData: this.props.configuredData.principleThumbnail
                    });

                }
            };
        }
    }

    render() {
        return (
            <div className="Configure container">
                <div className="container">
                    <div className="jumbotron">
                        <h2>Add Primary stat entry</h2>
                        <p>This will act as the identifier or collection holding all comparison items</p>
                    </div>
                </div>
                <div className="input-fields d-flex justify-content-center">
                    <div className="configure-fields d-block justify-content-center mr-5">
                        <InputElementSupplier inputType="textbox" hintText="Name of the principle item" keyref="principle-name-entry"></InputElementSupplier>
                        <InputElementSupplier inputType="select" hintText={['Database', 'JSON Data file']} keyref="configure-datastore-option"></InputElementSupplier>
                        {
                            this.checkStorageOption(this.props.storageOption)
                        }
                        <InputElementSupplier inputType="textarea" hintText={[5, 25]} keyref=""></InputElementSupplier>
                    </div>

                    <div className="thumbnail-container ml-5">
                        <label htmlFor="element-thumbnail">
                            <div id="elm-thumbnail" style={this.state.imageData !== "" ? { "background": "url('" + this.state.imageData + "')" } : null}>
                                {
                                    this.state.imageData === "" ?
                                        <div>
                                            <span>Click and select an image to be the thumbnail</span>
                                            <div className="upload-ico d-block justify-content-center"></div>
                                        </div>
                                        :
                                        null
                                }
                            </div>
                        </label>

                        <input type="file" id="element-thumbnail" hidden onChange={
                            (event) => {
                                this.populateImageToTile(event);
                            }
                        }></input>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <div className="store-action btn btn-primary" onClick={
                        () => {
                            var storedConfigData = this.props.configuredData;
                            var parsedObject = JSON.parse(JSON.stringify(storedConfigData));
                            var storeConfigFlag = false;

                            var configStoreObject = {
                                'principleName': parsedObject['principleName'],
                                'principleDescription': parsedObject['principleDescription'],
                                'principleThumbnail': parsedObject['principleThumbnail'],
                                'storageOption': this.props.storageOption
                            }

                            if (this.props.storageOption === 'db') {
                                configStoreObject = {
                                    ...configStoreObject,
                                    'dbHostName': parsedObject['dbHostName'],
                                    'dbPortNumber': parsedObject['dbPortNumber'],
                                    'dbUserName': parsedObject['dbUserName'],
                                    'dbPassword': parsedObject['dbPassword'],
                                    'dbName': parsedObject['dbName']
                                };
                            }
                            else if (this.props.storageOption === 'json') {
                                configStoreObject = {
                                    ...configStoreObject,
                                    'configDataStore': this.props.jsonFileName
                                };
                            }

                            for (var storedKeys in configStoreObject) {
                                console.log("Entry : ", storedKeys);
                                if (configStoreObject[storedKeys] !== undefined && configStoreObject[storedKeys] !== "") {
                                    storeConfigFlag = true;
                                }
                                else {
                                    storeConfigFlag = false;
                                }
                            }

                            if (storeConfigFlag) {
                                var writeAPIResponse = CommonControllerModule.getConfigDataStore(configStoreObject);
                                alert(JSON.stringify(writeAPIResponse));
                            }
                            else {
                                alert("Data fields missing");
                            }
                        }
                    }>
                        Store element
                    </div>
                </div>

            </div>
        );
    }

}


const mapDispatchToProps = (dispatch) => {
    return {
        setPrincipleThumbnail: (imageData) => dispatch({ "type": "THUMBNAIL_CHANGE", "payload": imageData })
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        storageOption: state.setConfigurationStorage.storageOption,
        jsonFileName: state.setConfigurationStorage.configFileName,
        configuredData: state.getConfiguredData
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Configure);