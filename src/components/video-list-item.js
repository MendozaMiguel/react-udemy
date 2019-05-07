import React from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";

const VideoListItem = ({ movie }) => {
  // console.log({ movie });
  return (
    <li className="list-group-item">
      <div className="media">
        <div className="media-left">
          <img
            className="media-object img-rounded"
            height="100px"
            width="100px"
            src={`${IMAGE_BASE_URL}${movie.backdrop_path}`}
          />
        </div>
      </div>
      <div className="media-body">
        <h5 className="title_list_item">Un film recommendé : {movie.title}</h5>
      </div>
    </li>
  );
};

export default VideoListItem;
