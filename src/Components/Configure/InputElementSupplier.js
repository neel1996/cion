import React, { Component } from 'react';

import { createStore } from 'redux';
import { connect } from 'react-redux';

import './Configure.css';

class InputElementSupplier extends Component {

    populateInput(inputType, hintText) {

        switch (inputType) {
            case 'textbox':
                return (
                    <div className="configure-text">
                        <input type="text" placeholder={hintText}></input>
                    </div>
                );
            case 'password':
                return (
                    <div className="configure-password">
                        <input type="password" placeholder={hintText}></input>
                    </div>
                );
            case 'select':
                return (
                    <div className="configure-select">
                        <select defaultValue="DEFAULT" onChange={
                            (event) => {
                                var selectedOption = event.target.value;

                                if (selectedOption === "database") {
                                    console.log("Selected : " + selectedOption);
                                    this.props.dbStorageOption();
                                } else {
                                    console.log("Selected : " + selectedOption);
                                    this.props.jsonStorageOption();
                                }
                            }
                        }>
                            <option value="DEFAULT" disabled hidden>
                                Select storage option
                            </option>
                            <option value="database">
                                {hintText[0]}
                            </option>
                            <option value="json">
                                {hintText[1]}
                            </option>
                        </select>
                    </div>
                );
            case 'textarea':
                return (
                    <div className="configure-textarea">
                        <textarea rows={hintText[0]} cols={hintText[1]} placeholder="How about you give a little description">

                        </textarea>
                    </div>
                )
            default:
                console.log("Input selector invalid");
        }

    }

    render() {
        return (
            <div className="configured-input">
                {this.populateInput(this.props.inputType, this.props.hintText)}
            </div>
        );
    }

}

const mapDispatchToProps = dispatch => {
    return {
        dbStorageOption: () => dispatch({ type: 'DB_MODE' }),
        jsonStorageOption: () => dispatch({ type: "JSON_MODE" })
    }
}

export default connect("", mapDispatchToProps)(InputElementSupplier);