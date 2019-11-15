import React, { Component } from 'react';
import axios from 'axios';

import './HomePage.css';

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            configuredItems: "",
            errorTile: "",
            hostName: `http://${window.location.hostname}`,
            parsedConfigurationItems: []
        };
    }

    componentDidMount() {
        axios({
            url: `${this.state.hostName}:5001/configureditems`,
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then((res) => {

            this.setState({
                configuredItems: res.data
            });

        }, (err) => {
            if (err) {
                this.setState({
                    errorTile: true
                });
            }
        });
    }

    parseResponseJSON(payload) {
        var parsedPayload = JSON.parse(JSON.stringify(payload)).configuredItems;

        let parsedItems = [];

        for (var i in parsedPayload) {
            parsedItems.push(
                {
                    principleName: parsedPayload[i].principleName,
                    principleDescription: parsedPayload[i].principleDescription,
                    principleThumbnail: parsedPayload[i].principleThumbnail.split("/").filter((elm)=>elm.includes(".jpeg"))
                }
            );
        }

        return parsedItems;

    }

    render() {
        return (
            <div>
                {
                    this.state.errorTile ?
                        <div>
                            <h1>Problem Invoking API from Server.</h1>
                            <p>Please reload and try again</p>
                        </div>
                        :
                        <div className="container">
                            {
                                this.state.configuredItems !== undefined && this.state.configuredItems !== "" ?
                                    <div className="configured-items-wrapper row justify-content-center">
                                        {
                                            this.parseResponseJSON(this.state.configuredItems).map((parsedItem) => {
                                                console.log(parsedItem)
                                                return(
                                                    <div className="card-content card my-3 mr-3">
                                                        <img src={`${this.state.hostName}:4000/thumbnailapi/${parsedItem.principleThumbnail}`} alt={parsedItem.principleName}></img>
                                                        <div className="card-body">
                                                            <h3>{parsedItem.principleName}</h3>
                                                            <p>{parsedItem.principleDescription}</p>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    :
                                    <h1 style={{ marginTop: '300px' }}>
                                        Loading...
                                    </h1>
                            }
                        </div>
                }
            </div>
        );
    }

}

export default HomePage;