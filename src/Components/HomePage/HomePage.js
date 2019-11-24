import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import { Query } from 'react-apollo';

import gql from 'graphql-tag';

import './HomePage.css';

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            hostName: `http://${window.location.hostname}`
        };
    }

    render() {
        var configuredItemGQLClient = new ApolloClient({
            'uri': this.state.hostName + ":4001" + "/configdatagraph"
        });

        const GET_CONFIG_ITEMS_QUERY = gql`
            query ConfigDataQuery{
                configData {
                    principleName
                    principleThumbnail
                    principleDescription
                    principleId
                    totalItems
                  }
            }
        `;

        return (
            <ApolloProvider client={configuredItemGQLClient}>

                <div className={`container ${this.props.reference || "configured-item-container"}`}>
                    {
                        <div className="configured-items">
                            {
                                <div className="row justify-content-center">
                                    <Query query={GET_CONFIG_ITEMS_QUERY}>
                                        {
                                            ({ loading, err, data }) => {
                                                if (loading) {
                                                    return (
                                                        <div className="loading-wrapper d-flex justify-content-center my-5">
                                                            <div className="spinner-border">
                                                            </div>
                                                            <h3 className="mx-5">Loading...</h3>
                                                        </div>
                                                    )
                                                }

                                                if (err !== undefined) {
                                                    console.log("Error GQL : " + err);
                                                }

                                                if (data !== undefined) {
                                                    var configDataResultArray = data.configData;
                                                    return (
                                                        configDataResultArray.map((configDataResult) => {
                                                            return (
                                                                <Link to={`/configitem/${configDataResult.principleId}`} key={configDataResult.principleId}>
                                                                    <div className="card-content card my-3 mr-5">
                                                                        <img className="item-thumbnail" src={`${this.state.hostName}:5001/thumbnailapi/${configDataResult.principleThumbnail.split("/")[configDataResult.principleThumbnail.split("/").length - 1]}`} alt={configDataResult.principleName}></img>
                                                                        <div className="card-body">
                                                                            <h3>{configDataResult.principleName}</h3>
                                                                            <p>{configDataResult.principleDescription}</p>
                                                                            <div className="float-left">
                                                                                <p className="btn btn-secondary" disabled>{configDataResult.totalItems} Items in set</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            )
                                                        })
                                                    );
                                                }
                                                else {
                                                    return (
                                                        <div className="alert alert-danger container" style={{ marginTop: "50px" }}>
                                                            <h1>Server unavailable.</h1>
                                                            <p>Please reload or try again later</p>
                                                        </div>
                                                    );
                                                }
                                            }
                                        }
                                    </Query>
                                </div>

                            }
                        </div>
                    }
                </div>
            </ApolloProvider>
        );
    }

}

export default HomePage;