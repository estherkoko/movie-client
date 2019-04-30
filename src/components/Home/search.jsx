import React, { Component } from 'react';
import Video from './../../assets/images/video.png';
import NoPoster from './../../assets/images/poster.png';


class search extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movieName: '',
            img: NoPoster,
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.getMovieByTitle(this.state.movieName.toLowerCase());
        event.preventDefault();
    }
    handleInputChange(property) {
        return e => {
            this.setState({
                [property]: e.target.value
            });
        };
    }
    getMovieByTitle(title) {
        fetch('http://localhost:4567/api/v1/movie-search/' + title)
            .then(response => response.json())
            .then(movieData => {
                this.setState({ movieData });
                if (movieData.rating) {
                    this.setState({ rating: movieData.rating, comment: movieData.comment });
                } else {
                    this.setState(
                        {
                            rating: '',
                            comment: '',
                        }
                    );
                }
                if (movieData.Poster === "N/A") {
                    this.setState({ img: NoPoster })
                }
                if (movieData.Poster !== "N/A") {
                    this.setState({ img: movieData.Poster })
                }
                console.log(this.state.movieData);
            });
    }
    
    render() {
        return (
            <div>
                <img src={Video} alt="video" className="pb-4" height="100px" />
                <div className="w-75 mx-auto pb-3">
                    <h5>Hey there, welcome to SceneMax! I am your new and improved movie search portal.</h5>
                    <h5>What Can I Do? Glad you asked :).</h5>
                    <h5>I can help you fetch any movie you like and details. As a bonus, you can review the movie and add it to your rated movies list</h5>
                </div>
                <form >
                    <div class="input-group mb-3 pb-3">
                        <input className="form-control py-2 pt-4 pb-4 pr-6 border-right-0 border" value={this.state.movieName} onChange={this.handleInputChange('movieName')} placeholder="Find a movie" type="search" />
                        <span className="input-group-append">
                            <button className="btn btn-outline-secondary border-left-0 border" type="button" onClick={this.handleSubmit} >
                                <i className="fa fa-search fa-lg"></i>
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        );
    }
}

export default search;