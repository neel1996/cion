import React, { Component } from 'react';

import InputElementSupplier from './InputElementSupplier';
import SearchBar from '../Header/SearchBar';
import HomePageContent from '../HomePage/HomePage';

import './ParameterConfigure.css';

class ParameterConfiguration extends Component {


    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="add-params container d-block justify-content-center">
                <div className="jumbotron">
                    <h3>Below are the available entities. Click the desired one to add the parameters</h3>
                </div>
                <div>
                    <HomePageContent reference="parameterPage"></HomePageContent>
                </div>
            </div>
        );
    }

}

export default ParameterConfiguration;