import React, { Component } from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

/*To all who dare tread these hallowed grounds:
I'm sorry this is all a mess and doesn't make sense. Somehow, it all works.
I promise I'll learn more and get better at this as I practice and learn.
But for now, you're stuck trying to decypher what I've done here.
Godspeed.
*/

class App extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    //Because we're using the implicit login flow from Spotify, the section below checks if we've been redirected back to our app and grabs the token.
    const tokenFromURL = window.location.href.match(/access_token=([^&]*)/);
    if (tokenFromURL !== null) {
      window.history.pushState("test", "Title", "http://localhost:3000");
      this.state = {
        searchResults: [],
        playlist: [],
        playlistName: "",
        accessToken: tokenFromURL[1],
        searchTerm: "",
      };
    } else {
      this.state = {
        searchResults: [],
        playlist: [],
        playlistName: "",
        accessToken: "",
        searchTerm: "",
      };
    }
  }

  addTrack(track) {
    let newPlaylist = this.state.playlist;
    if (newPlaylist.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    newPlaylist.push(track);
    this.setState({ playlist: newPlaylist });
  }
  removeTrack(track) {
    let newPlaylist = [];
    newPlaylist = this.state.playlist.filter((savedTrack) => {
      return savedTrack.id !== track.id;
    });
    this.setState({ playlist: newPlaylist });
  }

  savePlaylist() {
    Spotify.save(
      this.state.playlistName,
      this.state.accessToken,
      this.state.playlist.map((track) => {
        return track.id;
      })
    );
    alert("Playlist succesfully saved");
    this.setState({ playlist: [], playlistName: "" });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  updateSearchTerm(term) {
    this.setState({ searchTerm: term });
  }

  getAccessToken() {
    this.setState({ accessToken: Spotify.getAccessToken() });
  }

  getSearchResults(term) {
    Spotify.search(term, this.state.accessToken).then((tracks) => {
      this.setState({ searchResults: tracks });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className='highlight'>mmm</span>ing
        </h1>
        <div className='App'>
          <SearchBar
            getToken={this.getAccessToken}
            token={this.state.accessToken}
            getSearchResults={this.getSearchResults}
            searchTerm={this.state.searchTerm}
            updateSearchTerm={this.updateSearchTerm}
          />
          <div className='App-playlist'>
            <SearchResults
              tracks={this.state.searchResults}
              addTrack={this.addTrack}
            />
            <Playlist
              playlist={this.state.playlist}
              playlistName={this.state.playlistName}
              removeTrack={this.removeTrack}
              onNameUpdate={this.updatePlaylistName}
              savePlaylist={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
