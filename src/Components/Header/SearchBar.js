import React, {Component} from 'react';
import SearchHandler from '../../LogicalModules/searchHandler'

class SearchBar extends Component
{

    constructor(props){
        super(props);

        this.state={
            placeHolderName: this.props.placeHolder,
            defaultPlaceHolder: "Looking for something specific?"
        }
    }

    searchbarBuilder(){
        return(
            <div className="SearchbarContainer d-flex justify-content-between">
                <input className="search-input w-100" type="text" placeholder={
                    this.state.placeHolderName !== "" ?
                        this.state.placeHolderName
                    :
                        this.state.defaultPlaceHolder
                    } onChange={()=>{
                        
                    }}
                    >
                </input>
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