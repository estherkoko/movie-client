import React, { Component } from 'react';
import Search from '../Home/search';
import Favorites from '../Home/favorites';
import SearchResult from '../Home/search_result'

class _home extends Component {
 
    render() {
        return (
            <div className="container m-5 mx-auto pt-5 text-center">
                <Search />
                <SearchResult />
                <Favorites />
            </div>
        );
    }
}

export default _home;