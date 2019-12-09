import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import DownIcon from "../../assets/sort-down-solid.svg";

import storeItemParameters from "../../LogicalModules/storeParameters";

export default class ParamItemAdder extends Component {
  constructor(props) {
    super(props);

    this.inputTextRef = React.createRef();

    this.state = {
      showInstructions: true,
      instructionToggleStyleAngle: 180,
      parameterFormEntry: [],
      parameterInputEntries: [],
      parameterLength: 0,
      isParamInputValid: true
    };
  }

  componentWillMount() {
    this.setState({
      parameterFormEntry: this.state.parameterFormEntry.concat(
        this.fetchParamForm()
      ),
      parameterLength: this.state.parameterLength + 1
    });
  }

  render() {
    return (
      <Fragment>
        <div className="add-params container justify-content-center jumbotron alert-primary">
          <div className="d-flex justify-content-around">
            <h2>Follow the instructions and add the parameter</h2>
            <div
              className="d-block justify-content-center my-2"
              onClick={() => {
                this.props.parentManipulator(this.props.principleId, false);
              }}
            >
              <span className="alert-danger p-2 h4 font-weight-bold">x</span>
            </div>
          </div>

          {this.state.showInstructions ? this.fetchInstructions() : null}

          <div
            className="d-flex justify-content-center mt-3"
            style={{
              transform: `rotate(${this.state.instructionToggleStyleAngle}deg)`
            }}
            onClick={event => {
              this.setState({
                instructionToggleStyleAngle:
                  this.state.instructionToggleStyleAngle - 180,
                showInstructions: !this.state.showInstructions
              });
            }}
          >
            <img src={DownIcon} width="15" alt="toggle-instructions"></img>
          </div>
        </div>
        <div>
          <div className="container my-5">
            <span className="display-4">
              {this.props.itemHolder.selectedItemName}
            </span>

            {!this.state.isParamInputValid ? (
              <div className="mx-2 my-5 pt-1 pd-1 pl-1 pr-1 alert-warning w-50">
                <p>Fill all the mandatory fields please</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="form-entry-wrapper pb-5">
          {this.state.parameterFormEntry.map(formElement => {
            return formElement;
          })}
        </div>

        <div
          className="btn btn-info p-2 w-100"
          style={{
            position: "fixed",
            bottom: "0",
            borderRadius: "0px !important"
          }}
          onClick={() => {
            this.saveFormEntries();
            var some = ""
          }}
        >
          Save changes
        </div>
      </Fragment>
    );
  }

  // Module to supply Header alert instructions
  // Visibility based on toggle state variable

  fetchInstructions = () => {
    return (
      <div className="instructions">
        <div className="mt-3">
          <mark className="my-2">Comparable parameter</mark>
          <span className="ml-2">
            - Property which can be directly compared.
          </span>
          <i>
            <div className="mx-5 mt-3" style={this.fieldSelectorStyle}>
              For instance, if you are to create a parameter for a smartphone,
              then the camera lens&#39;s mega pixels can be directly compared
            </div>
          </i>
        </div>
        <div className="mt-3">
          <mark>Differentiable parameter</mark>
          <span className="ml-2">
            - Property which can be differentiated from one another
          </span>
          <i>
            <div className="mx-5 mt-3" style={this.fieldSelectorStyle}>
              For instance, if you are to create a parameter for a smartphone,
              then the Processor in different phones can be differentiated from
              one another but cannot be directly compared.
            </div>
          </i>
        </div>
      </div>
    );
  };

  //End of Module

  // Form module with inputs
  // Will be pushed to the array for every add action

  fetchParamForm = uniqueKey => {
    var itemKey = `item-${uniqueKey || 0}`;

    return (
      <div
        className="d-flex justify-content-center parameter-form my-3"
        key={itemKey}
      >
        <input
          type="text"
          className="mx-2"
          placeholder="Enter Parameter name"
          id={`param-name-${itemKey}`}
          onChange={event => this.changeHandler("nameText", event, itemKey)}
          onClick={event => this.formInputClick(event)}
        ></input>
        <select
          className="btn btn-primary mx-2"
          defaultValue="default"
          onChange={event => this.changeHandler("typeSelector", event, itemKey)}
          id={`param-type-${itemKey}`}
          onClick={event => this.formInputClick(event)}
        >
          <option value="default" disabled hidden>
            Select parameter type
          </option>
          <option value="compare">Comparable parameter</option>
          <option value="difference">Differentiable Parameter</option>
        </select>

        <input
          type="text"
          id={`param-max-${itemKey}`}
          placeholder="Maximum limit"
          className="mx-2"
          onChange={event => this.changeHandler("maximumText", event, itemKey)}
          onClick={event => this.formInputClick(event)}
          disabled={true}
        ></input>

        <button className="btn btn-danger mx-2">Remove</button>
        <button
          className="btn btn-success mx-2"
          onClick={() => {
            return this.addFormEntry();
          }}
        >
          Add
        </button>
      </div>
    );
  };

  // End of Module

  // Concatenates each form entry to the state array

  addFormEntry = () => {
    this.setState({
      isParamInputValid: true
    });

    var formEntries = {
      name: this.state.parameterName,
      selectedType: this.state.parameterType,
      maxValue: this.state.parameterMaxValue
    };

    var stateSetterFlag = true;

    if (formEntries.selectedType === "compare") {
      for (let entry in formEntries) {
        if (formEntries[entry] === "" || formEntries[entry] === undefined) {
          stateSetterFlag = false;
        }
      }
    } else {
      if (formEntries.name === "" || formEntries.selectedType === "") {
        stateSetterFlag = false;
      }
    }

    if (stateSetterFlag) {
      this.setState({
        parameterFormEntry: this.state.parameterFormEntry.concat(
          this.fetchParamForm(this.state.parameterLength)
        ),
        parameterLength: this.state.parameterLength + 1,
        parameterInputEntries: this.state.parameterInputEntries.concat(
          formEntries
        )
      });
    } else {
      this.setState({
        isParamInputValid: false
      });
    }
  };

  //End of Module

  //Common change handler module for all input fields

  changeHandler(inputSource, event, itemKey) {
    switch (inputSource) {
      case "nameText":
        break;
      case "typeSelector":
        const selectedValue = event.target.value;

        var currentMaxValueText = document.getElementById(
          `param-max-${itemKey}`
        );
        const maxDomNode = ReactDOM.findDOMNode(currentMaxValueText);

        if (selectedValue === "difference") {
          maxDomNode.setAttribute("disabled", true);
          maxDomNode.innerHTML = "";
        } else {
          maxDomNode.removeAttribute("disabled");
        }
        break;
      case "maximumText":
        if (isNaN(event.target.value)) {
          event.target.value = "";
        }
        break;
      default:
        console.log("Invalid Input source");
    }
  }

  // Clearing input validation alert

  formInputClick(event) {
    event.preventDefault();
    this.setState({
      isParamInputValid: true
    });
  }

  //End of Module

  //Module to handle save change action
  //All the states will be extracted from states and sent to Node API for processing

  saveFormEntries() {
    var paramArray = [];

    this.state.parameterFormEntry.forEach(
      (element, index)=> {
        let paramName = ReactDOM.findDOMNode(document.getElementById(`param-name-item-${index}`)).value;
        let paramType = ReactDOM.findDOMNode(document.getElementById(`param-type-item-${index}`)).value;
        let paramMax = ReactDOM.findDOMNode(document.getElementById(`param-max-item-${index}`)).value;

        console.log(paramName)

        paramArray.push({
          paramName,
          paramType,
          paramMax
        })
      }
    )

    var paramItems = {
      principleId: this.props.principleId,
      paramArray
    };

    console.log(paramItems);

    storeItemParameters(paramItems);
  }
}
