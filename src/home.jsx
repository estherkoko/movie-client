import React, { Component } from 'react';
import NoPoster from './assets/images/poster.png';
import Video from './assets/images/video.png';
import Bin from './assets/images/bin.png'

class home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      movieName: '',
      rating: '',
      comment: '',
      img: NoPoster,
      movieData: {},
      movies: [],

    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleRatedMovies = this.handleRatedMovies.bind(this);
    this.handleDeleteMovies = this.handleDeleteMovies.bind(this);

  }
  componentDidMount() {
    fetch('https://gentle-temple-25159.herokuapp.com/api/v1/movies')
      .then(response => response.json())
      .then(movies => {
        this.setState({ movies })
        console.log('this.states.movies')
      });
  }
  handleInputChange(property) {
    return e => {
      this.setState({
        [property]: e.target.value
      });
    };
  }

  handleMovieDataChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.getMovieByTitle(this.state.movieName.toLowerCase());
    event.preventDefault();
  }

  handleRatedMovies(event) {
    this.getRatedMovies(this.state.movieData.Title);
    event.preventDefault();
  }

  handleDeleteMovies(event) {
    this.deleteMovie(this.state.movieData.Title);
    event.preventDefault();
  }

  handleUpdate(event) {
    let data = {};
    data.Title = this.state.movieData.Title.toLowerCase();
    data.Year = this.state.movieData.Year;
    data.Poster = this.state.movieData.Poster;
    data.Plot = this.state.movieData.Plot;
    data.rating = this.state.rating;
    data.comment = this.state.comment;
    if (this.state.movieData.hasOwnProperty('_id')) {
      data.id = this.state.movieData._id.$oid;
    }

    fetch('http://localhost:4567/api/v1/movies', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'

      }
    }).then(res => res.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => console.error('Error:', error));
    console.log(JSON.stringify(data));
    event.preventDefault();
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

  deleteMovie() {
    let data = {};
    data.Title = this.state.movieData.Title.toLowerCase();
    fetch('http://localhost:4567/api/v1/movies', {
      method: 'DELETE',
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => console.error('Error:', error));
    console.log(JSON.stringify(data), 'hello');
  }

  imageExists(image_url){
    fetch(image_url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
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
      <div className="search-bg">
        <img src={Video} alt="video" className="pb-4" height="100px" />
        <div className="w-75 mx-auto pb-3">
          <h5>Hey there, welcome to SceneMax! I am your new and improved movie search portal.</h5>
          <h5>What Can I Do? Glad you asked :).</h5>
          <h5>I can help you fetch any movie you like and details. As a bonus, you can review the movie and add it to your rated movies list</h5>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3 pb-5">
            <input type="text" className="form-control rounded-pill pt-4 pb-4 pr-2" value={this.state.movieName} onChange={this.handleInputChange('movieName')} placeholder="Find a movie" />
            <i class="fa fa-search" aria-hidden="true"></i>
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default"><button className="btn btn-dark type" value="Submit">
              </button></span>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col-md-4">
            <img src={this.state.img} alt="poster" />
            <button className="btn btn-lg btn-dark text-white type mt-3 px-5 pt-2" onClick={this.handleUpdate}>Save Movie</button>
            <button className="btn btn-lg btn-dark text-white type mt-3 px-5 pt-2" onClick={this.handleDeleteMovies}>Delete Movie</button>
          </div>
          <div className="col-md-8 text-left">
            <h2 className="capitalize">{this.state.movieData.Title}<span onClick={this.handleDeleteMovies}><img src={Bin} alt="bin" height="25px"/></span></h2>
            <h5 className="text-muted w-75">{this.state.movieData.Plot} <span className="text-primary"> {this.state.movieData.Year}</span></h5>
            <h5 className="text-muted">{this.state.movieData.comments}</h5>
            <div className="w-50 pt-5">
              <h4 className="text-muted">Other Details:</h4>
              <input type="text" className="form-control mb-3" value={this.state.rating} placeholder="Ratings" onChange={this.handleInputChange('rating')} />
              <textarea className="form-control pb-5" aria-label="With textarea" type="text" value={this.state.comment} placeholder="Comments" onChange={this.handleInputChange('comment')}></textarea>
            </div>
          </div>
        </div>

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

export default home;