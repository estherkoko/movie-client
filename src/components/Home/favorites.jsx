import React, { Component } from 'react';

class favorites extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
        }
    };
    componentDidMount() {
        this.getAllMovies();
    }

    getAllMovies() {
        fetch('https://gentle-temple-25159.herokuapp.com/api/v1/movies')
            .then(response => response.json())
            .then(movies => {
                this.setState({ movies });
                console.log(this.state.movies);
            });
    }

    render() {
        const movieLists = this.state.movies.map((movie) =>
            <div className="col-md-4" key={movie._id}>
                <img src={movie.Poster} height="350px" alt="poster"/>
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