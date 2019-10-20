import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Configure.css';

import InputElementSupplier from './InputElementSupplier';

class Configure extends Component {

    constructor(props) {
        super(props);

        this.state = {
            imageData: ""
        };
    }

    checkStorageOption(storageOption) {
        if (storageOption === "db") {
            return (
                <div>
                    <InputElementSupplier inputType="textbox" hintText="DB Host IP Address"></InputElementSupplier>
                    <InputElementSupplier inputType="textbox" hintText="DB Port"></InputElementSupplier>
                    <InputElementSupplier inputType="textbox" hintText="DB username"></InputElementSupplier>
                    <InputElementSupplier inputType="password" hintText="DB Password"></InputElementSupplier>
                    <InputElementSupplier inputType="textbox" hintText="Database name"></InputElementSupplier>
                </div>
            );
        } else if (storageOption === "json") {
            return (
                <div>
                    <div>
                        <label htmlFor="json-file-uploader" className="json-file-label">
                            Click to choose the JSON file
                        </label>
                    </div>

                    <input type="file" id="json-file-uploader" accept=".json" hidden onChange={(event)=>{
                        var fileName = event.target.files[0];
                        console.log(fileName);
                    }}></input>
                </div>
            );
        }
        else {
            return (
                null
            );
        }
    }

    populateImageToTitle(event) {
        var imageURLParser = new FileReader();
        imageURLParser.readAsDataURL(event.target.files[0]);
        imageURLParser.onload = () => {
            this.setState(
                {
                    imageData: imageURLParser.result
                }
            )
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
                        <InputElementSupplier inputType="textbox" hintText="Name of the principle item"></InputElementSupplier>
                        <InputElementSupplier inputType="select" hintText={['Database', 'JSON Data file']}></InputElementSupplier>
                        {
                            this.checkStorageOption(this.props.storageOption)
                        }
                        <InputElementSupplier inputType="textarea" hintText={[5, 25]}></InputElementSupplier>
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

                        <input type="file" id="element-thumbnail" hidden onChange={this.populateImageToTitle.bind(this)}></input>
                    </div>
                </div>

                <div className="d-flex justify-content-center">
                    <div className="store-action btn btn-primary">
                        Store element
                    </div>
                </div>

            </div>
        );
    }

}


const mapStateToProps = (state) => {
    return {
        storageOption: state.storageOption
    }
}


export default connect(mapStateToProps)(Configure);