import React, { Component } from 'react';

class favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
        }
    };
    componentDidMount() {
        fetch('http://localhost:4567/api/v1/')
            .then(response => response.json())
            .then(movies => {
                this.setState({ movies })
                console.log('this.states.movies')
            });
    }

    render() {
        const movieLists = this.state.movies.map((movie) =>
            <div className="col-md-4" key={movie.Title}>
                <img src={movie.Poster} height="350px" />
                <h4 className="capitalize pt-3 text--muted">{movie.Title}</h4>
            </div>

        );
        return (
            <div>
                <div className="col-md-4">
                    <h3 className="text-left mb-5 mt-5">Favorite Movies</h3>
                </div>
                <div className="row mb-3">
                    {movieLists}
                </div>
            </div>
        );
    }
}

export default favorites;