import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

import SearchBar from './SearchBar';
import MenuItems from './MenuItem';


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <div className="Header container-fluid d-flex justify-content-around">
                <div className="left-header-container d-flex">
                    <Link to="/">
                        <div className="LogoContainer"></div>
                    </Link>

                    <SearchBar placeHolder=""></SearchBar>
                </div>
                <MenuItems></MenuItems>
            </div>
        );
    }
}

export default Header;