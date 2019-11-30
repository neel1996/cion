import React, { Component } from "react";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import ParameterAdder from "./ParamItemAdder";

import "./ParamItemSelector.css";

class ParameterConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hostName: `http://${window.location.hostname}`,
	  selectedItemId: "",
	  selectedItemName: "",
	  selectedItemThumbnail: "",
      inEditMode: true
    };
  }

  render() {
    const graphQLClient = new ApolloClient({
      uri: `${this.state.hostName}:4001/configdatagraph`
    });

    const GET_CONFIG_ITEMS_QUERY = gql`
      query ConfigDataQuery {
        configData {
          principleId
          principleThumbnail
          principleName
          principleDescription
        }
      }
    `;

    const cardStyle = {
      padding: "15px",
      borderRadius: "5px",
      boxShadow: "0px 0px 20px rgba(0,0,0,0.1)",
      width: "auto"
    };

    return (
      // Check if an item was selected for adding parameters
      // Render item selector if not, Render parameter console if yes

      !this.state.inEditMode ? (
        <ApolloProvider client={graphQLClient}>
          <div className="add-params container d-block justify-content-center">
            <div className="jumbotron">
              <h3>
                Below are the available entities. Click the desired one to add
                the parameters
              </h3>
            </div>

            <div className="row">
              <Query query={GET_CONFIG_ITEMS_QUERY}>
                {({ loading, error, data }) => {
                  if (loading) {
                    return (
                      <div className="loading-wrapper d-flex justify-content-center my-5">
                        <div className="spinner-border"></div>
                        <h3 className="mx-5">Loading...</h3>
                      </div>
                    );
                  }

                  if (error) {
                    return (
                      <div className="alert alert-danger">
                        <h2>API Server Cannot be reached!</h2>
                        <p>Reload and try again or check the server process</p>
                      </div>
                    );
                  }

                  if (data !== undefined) {
                    return (
                      <div className="row container justify-content-center">
                        {data.configData.map(element => {
                          var imgThumb = element.principleThumbnail.split("/")[
                            element.principleThumbnail.split("/").length - 1
                          ];
                          return (
                            <div
                              className="col d-block mx-5"
                              style={cardStyle}
                              key={element.principleId}
                              onClick={() => {
                                this.setState({
                                  principleId: element.principleId
                                });
                                this.handleCardClick({...element}, true);
                              }}
                            >
                              <div>
                                <div className="rounded"
                                  style={{
                                    'backgroundImage': `url("${this.state.hostName}:5001/thumbnailapi/${imgThumb}")`,
									'display': 'block',
									'width': '100%',
									'height': '180px',
									'backgroundSize': '100% 100%'
                                  }}
                                ></div>
                              </div>
                              <div className="my-3">
                                <h4>{element.principleName}</h4>
                                <p>{element.principleDescription}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  }
                }}
              </Query>
            </div>
          </div>
        </ApolloProvider>
      ) : (
        <ParameterAdder
          parentManipulator={this.handleCardClick}
          itemHolder={this.state}
        ></ParameterAdder>
      )
    );
  }

  handleCardClick = (itemCollector={}, editModeSelector) => {
    this.setState({
	  inEditMode: editModeSelector,
	  selectedItemName: itemCollector.principleName,
	  selectedItemThumbnail: itemCollector.principleThumbnail
    });
  };
}

export default ParameterConfiguration;
