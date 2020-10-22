import React from "react";
import "./SearchResults.css";
import "../TrackList/TrackList";
import TrackList from "../TrackList/TrackList";

//Displays all the search results.
//Because Track components are either in search results or in a playlist, and that differentiates their functionality
//I pass the "isPlaylist" prop into every TrackList so the tracks within it know where they are.

class SearchResults extends React.Component {
  render() {
    return (
      <div className='SearchResults'>
        <h2>Results</h2>
        <br />
        <TrackList
          tracks={this.props.tracks}
          isPlaylist={false}
          addTrack={this.props.addTrack}
        />
      </div>
    );
  }
}

export default SearchResults;
