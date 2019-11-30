import React, { Component, Fragment } from "react";

import DownIcon from "../../assets/sort-down-solid.svg";

export default class ParamItemAdder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInstructions: true,
      instructionToggleStyleAngle: 180,
      parameterFormEntry: [],
      parameterName: [],
      parameterType: [],
      parameterLength: 0
    };
  }

  componentDidMount(){
    this.setState({
      parameterFormEntry: this.state.parameterFormEntry.concat(this.fetchParamForm()),
      parameterLength: this.state.parameterLength + 1
    })
  }

  render() {
    const fieldSelectorStyle = {
      fontSize: "14px",
      color: "#000",
      padding: "10px"
    };

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
            <img src={DownIcon} width="15"></img>
          </div>
        </div>
        <div>
          <div className="container display-4 my-5">
            {this.props.itemHolder.selectedItemName}
          </div>
        </div>

        <div className="form-entry-wrapper pb-5">
            {
                this.state.parameterFormEntry.length <= 2 ?
                (
                    this.state.parameterFormEntry
                )
                :
                (
                    this.state.parameterFormEntry.map((formElement) => {
                      return(
                          formElement
                      )
                    })
                )
            }
        </div>

        <div
          className="btn btn-info p-2 w-100"
          style={{
            position: "fixed",
            bottom: "0",
            borderRadius: "0px !important"
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
                then the camera lens's mega pixels can be directly compared
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
                then the Processor in different phones can be differentiated
                from one another but cannot be directly compared.
              </div>
            </i>
          </div>
        </div>
      );
    };

    //End of Module

    // Form module with inputs
    // Will be pushed to the array for every add action

    fetchParamForm = (uniqueKey) => {
      return (
        <div className="d-flex justify-content-center parameter-form my-3" key={uniqueKey}>
          <input
            type="text"
            className="mx-2"
            placeholder="Enter Parameter name"
          ></input>
          <select className="btn btn-primary mx-2">
            <option value="compare">Comparable parameter</option>
            <option value="difference">Differentiable Parameter</option>
          </select>
          <input
            type="text"
            placeholder="Maximum limit"
            className="mx-2"
          ></input>
          <button className="btn btn-danger mx-2">Remove</button>
          <button className="btn btn-success mx-2" onClick={() => {return this.addFormEntry()}}>Add</button>
        </div>
      );
    };

    // End of Module

    // Concatenates each form entry to the state array

    addFormEntry = () => {
      console.log("Adding...");
      this.setState({
        parameterFormEntry: this.state.parameterFormEntry.concat(this.fetchParamForm(this.state.parameterLength)),
        parameterLength: this.state.parameterLength + 1
      })
    }

    //End of Module

}
