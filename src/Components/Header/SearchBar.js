import React, {Component} from 'react';

class SearchBar extends Component
{

    constructor(props){
        super(props);

        this.state={

        }
    }

    searchbarBuilder(){
        return(
            <div className="SearchbarContainer d-flex justify-content-between">
                <input className="search-input w-100" type="text" placeholder="Looking for something specific?"></input>
                <div className="search-ico"></div>
            </div>
        );
    }

    render(){
        return(
            <div>
                {this.searchbarBuilder()}
            </div>
        );
    }

}

export default SearchBar;