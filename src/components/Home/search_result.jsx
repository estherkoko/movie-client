import React, { Component } from 'react';
import NoPoster from './../../assets/images/poster.png';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

class home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: '',
      comment: '',
      movieData: {
        Title: ''
      },
      movies: [],
      movieName: '',
      img: NoPoster,
      isNewMovie: false,
      modal: false,
      modalInfo: ''
    };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleRatedMovies = this.handleRatedMovies.bind(this);
    this.handleDeleteMovies = this.handleDeleteMovies.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  handleSubmit(event) {
    this.getMovieByTitle(this.state.movieName.toLowerCase());
    event.preventDefault();
  }
  modalHandler(modalStatus, durationBeforeHiding, modalBodyDescription) {
    this.setState({ modal: modalStatus, modalInfo: modalBodyDescription });
    setTimeout(function () {
      this.setState({ modal: false });
    }.bind(this), durationBeforeHiding);
  }

  handleMovieDataChange(event) {
    this.setState({ value: event.target.value });
  }
  handleInputChange(property) {
    return e => {
      this.setState({
        [property]: e.target.value
      });
    };
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

    fetch('https://gentle-temple-25159.herokuapp.com/api/v1/movies', {
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
      .catch(error => {
        console.error('Error:', error);
      });
    this.modalHandler(true, 5000, "Movie was successfully updated in the database");
    console.log(JSON.stringify(data));
    event.preventDefault();
  }

  getMovieByTitle(title) {
    fetch('https://gentle-temple-25159.herokuapp.com/api/v1/movie-search/' + title)
      .then(response => response.json())
      .then(movieData => {
        this.setState({ movieData });
        if (movieData.rating) {
          this.setState(
            {
              rating: movieData.rating,
              comment: movieData.comment,
              isNewMovie: false
            }
          );
          this.modalHandler(true, 5000, "Movie existed in the database");
        } else {
          this.setState(
            {
              rating: '',
              comment: '',
              isNewMovie: true
            }
          );
          this.modalHandler(true, 5000, "Movie was not in the database, new information retrieved from OMDB");
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
    fetch('https://gentle-temple-25159.herokuapp.com/api/v1/movies', {
      method: 'DELETE',
      body: JSON.stringify(data),
    }).then(res => res.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => console.error('Error:', error));
      this.modalHandler(true, 5000, "Movie was successfully deleted");
      console.log(JSON.stringify(data));
  }

  render() {
    const isNewMovie = this.state.isNewMovie;
    const hasMovie = (this.state.movieData.Title !== '');

    return (
      <div>
        <Modal isOpen={this.state.modal}>
          <ModalHeader toggle={this.toggle}>Alert!!</ModalHeader>
          <ModalBody>{this.state.modalInfo}</ModalBody>
        </Modal>
        <form onSubmit={this.handleSubmit}>
          <div className="input-group mb-3 pb-3">
            <input className="form-control py-2 pt-4 pb-4 pr-6 border-right-0 border" value={this.state.movieName} onChange={this.handleInputChange('movieName')} placeholder="Find a movie" type="search" />
            <span className="input-group-append">
              <button className="btn btn-outline-secondary border-left-0 border" type="button" onClick={this.handleSubmit}>
                <i className="fa fa-search fa-lg"></i>
              </button>
            </span>
          </div>
          <button className="btn btn-lg btn-light text-primary type mr-2 pt-2" onClick={this.handleSubmit}>Search Movie</button>
        </form>
        <div className={hasMovie ? '' : 'd-none'}>
          <div className="row mt-4" >
            <div className="col-md-4">
              <img src={this.state.img} alt="poster" class="img-fluid" />
            </div>
            <div className="col-md-8 text-left">
              <h2 className="capitalize">{this.state.movieData.Title}</h2>
              <h5 className="text-dark w-75">{this.state.movieData.Plot}</h5>
              <h5>Released On:<span className="text-muted"> {this.state.movieData.Year}</span> </h5>
              <h5 className="text-muted">{this.state.movieData.comments}</h5>
              <div className="w-50 pt-5">
                <h4 className="text-muted">Other Details:</h4>
                <input type="text" className="form-control mb-3" value={this.state.rating} placeholder="Ratings" onChange={this.handleInputChange('rating')} />
                <textarea className="form-control pb-5" aria-label="With textarea" type="text" value={this.state.comment} placeholder="Comments" onChange={this.handleInputChange('comment')}></textarea>
                <div>
                  <button className="btn btn-lg btn-dark text-white type mt-3 pt-2 mr-3" onClick={this.handleUpdate}>{isNewMovie ? 'Save' : 'Update'} Movie</button>
                  <button className="btn btn-lg btn-danger text-white type mt-3 mr-2 pt-2" onClick={this.handleDeleteMovies}>Delete Movie</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default home;