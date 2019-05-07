import React, { Component } from "react";
import SearchBar from "../components/search-bar";
import VideoList from "./video-list";
import VideoDetail from "../components/video-detail";
import Video from "../components/video";

import axios from "axios";
const POPULAR_MOVIES_URL =
  "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images";
const API_END_POINT = "https://api.themoviedb.org/3/";
const API_KEY = "api_key=b0bac479b9d62ba6b9aac4c7c7dbb1d0";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { movieList: {}, currentMovie: {} };
  }

  componentWillMount() {
    this.initMovies();
  }

  initMovies() {
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(
      function(response) {
        // console.log(response);
        this.setState(
          {
            movieList: response.data.results.slice(1, 6),
            currentMovie: response.data.results[0]
          },
          function() {
            this.applyMovieToCurrentMovie();
          }
        );
        // console.log(this.state.movieList, "les films d'apres");
        // console.log(this.state.currentMovie, "premier film");
      }.bind(this)
    );
  }

  applyMovieToCurrentMovie() {
    axios
      .get(
        `${API_END_POINT}movie/${
          this.state.currentMovie.id
        }?${API_KEY}&append_to_response=videos&include_adult=false`
      )
      .then(
        function(response) {
          console.log(response);
          // this.setState({});
          const youtubeKey = response.data.videos.results[0].key;
          let newCurrentMovieState = this.state.currentMovie;
          newCurrentMovieState.videoId = youtubeKey;
          this.setState({ currentMovie: newCurrentMovieState });
          console.log(newCurrentMovieState);
        }.bind(this)
      );
  }

  render() {
    const renderVideoList = () => {
      if (this.state.movieList.length >= 5) {
        return <VideoList movieList={this.state.movieList} />;
      }
    };
    return (
      <div>
        <div className="search_bar">
          <SearchBar />
        </div>
        <div className="row">
          <div className="col-md-8">
            <Video videoId={this.state.currentMovie.videoId} />
            <VideoDetail
              title={this.state.currentMovie.title}
              description={this.state.currentMovie.overview}
            />
          </div>
          <div className="col-md-4"> {renderVideoList()}</div>
        </div>
      </div>
    );
  }
}

export default App;
