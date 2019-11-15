import React, { Component } from 'react';

import { connect } from 'react-redux';

import './Configure.css';

class InputElementSupplier extends Component {

    populateInput(inputType, hintText) {

        switch (inputType) {
            case 'textbox':
                return (
                    <div className="configure-text">
                        <input type="text" placeholder={hintText} onBlur={
                            (event) => {
                                this.handleInput(this.props.keyref, event);
                            }
                        }></input>
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
                                    this.props.jsonFileNameSetter();
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
                        <textarea rows={hintText[0]} cols={hintText[1]} placeholder="How about you give a little description" onBlur={
                            (event) => {
                                this.handleInput("principle-description-entry", event);
                            }
                        }>

                        </textarea>
                    </div>
                )
            default:
                console.log("Input selector invalid");
        }

    }

    handleInput(keyRef, event) {
        switch (keyRef) {
            case 'principle-name-entry':
                this.props.passInputValueToReducer('PRINCIPLE_NAME_CHANGE', event.target.value);
                break;
            case 'principle-description-entry':
                this.props.passInputValueToReducer('PRINCIPLE_DESCRIPTION_CHANGE', event.target.value);
                break;
            case 'db-host-entry':
                this.props.passInputValueToReducer('DB_HOSTNAME_CHANGE', event.target.value);
                break;
            case 'db-port-entry':
                this.props.passInputValueToReducer('DB_PORT_CHANGE', event.target.value);
                break;
            case 'db-username-entry':
                this.props.passInputValueToReducer('DB_USERNAME_CHANGE', event.target.value);
                break;
            case 'db-password-entry':
                this.props.passInputValueToReducer('DB_PASSWORD_CHANGE', event.target.value);
                break;
            case 'db-name-entry':
                this.props.passInputValueToReducer('DB_NAME_CHANGE', event.target.value);
                break;
            default:
                console.log("Invalid Key reference");
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
        jsonStorageOption: () => dispatch({ type: 'JSON_MODE' }),
        jsonFileNameSetter: () => dispatch({ 'type': 'JSON_FILE_SETTER' }),
        passInputValueToReducer: (type, value) => dispatch({ type: type, payload: value })
    }
}

export default connect("", mapDispatchToProps)(InputElementSupplier);