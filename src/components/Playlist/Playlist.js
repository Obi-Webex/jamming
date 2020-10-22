import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

//Handles how we render the playlist
//Because Track components are either in search results or in a playlist, and that differentiates their functionality
//I pass the "isPlaylist" prop into every TrackList so the tracks within it know where they are.

class Playlist extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  handleOnChange(e) {
    this.props.onNameUpdate(e.target.value);
  }

  handleOnClick() {
    this.props.savePlaylist();
  }

  render() {
    return (
      <div className='Playlist'>
        <input
          placeholder='New Playlist'
          value={this.props.playlistName}
          onChange={this.handleOnChange}
        />
        <TrackList
          tracks={this.props.playlist}
          isPlaylist={true}
          removeTrack={this.props.removeTrack}
        />
        <a className='Playlist-save' onClick={this.handleOnClick}>
          SAVE TO SPOTIFY
        </a>
      </div>
    );
  }
}

export default Playlist;
