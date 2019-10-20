import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';

class MenuItem extends Component
{
    constructor(props){
        super(props);

        this.state = {

        };
    }

    render(){
        return(
            <div className="MenuItems d-flex justify-content-around">
                <NavLink to="/compare" activeClassName="active-link">
                    <div className="menu-item">COMPARE</div>
                </NavLink>
                <NavLink to="/sort" activeClassName="active-link">
                    <div className="menu-item">SORT</div>
                </NavLink>
                <NavLink to="/additem" activeClassName="active-link">
                    <div className="menu-item">ADD ENTRY</div>
                </NavLink>
            </div>
        );
    }
}

export default MenuItem;