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
     
    }

 
  
    getMovieByTitle(title) {
        fetch('https://gentle-temple-25159.herokuapp.com/api/v1/movie-search/' + title)
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
              
            </div>
        );
    }
}

export default search;