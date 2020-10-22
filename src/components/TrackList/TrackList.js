import React from "react";
import "./TrackList.css";
import Track from "../Track/Track";

class TrackList extends React.Component {
  render() {
    let tracklist;
    if (this.props.isPlaylist) {
      tracklist = this.props.tracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            isPlaylist={this.props.isPlaylist}
            removeTrack={this.props.removeTrack}
          />
        );
      });
    } else {
      tracklist = this.props.tracks.map((track) => {
        return (
          <Track
            track={track}
            key={track.id}
            isPlaylist={this.props.isPlaylist}
            addTrack={this.props.addTrack}
          />
        );
      });
    }

    return <div className='TrackList'>{tracklist}</div>;
  }
}

export default TrackList;
