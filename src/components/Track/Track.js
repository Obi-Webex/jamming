import React from "react";
import "./Track.css";

//This is the logic for every track. If it's in a playlist determines if it has a + or a - next to it to add
//the song or remove it from the parent TrackList component.

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.handleAddTrack = this.handleAddTrack.bind(this);
    this.handleRemoveTrack = this.handleRemoveTrack.bind(this);
  }

  handleAddTrack() {
    this.props.addTrack(this.props.track);
  }

  handleRemoveTrack() {
    this.props.removeTrack(this.props.track);
  }

  renderAction() {
    return this.props.isPlaylist ? (
      <a className='Track-action' onClick={this.handleRemoveTrack}>
        -
      </a>
    ) : (
      <a className='Track-action' onClick={this.handleAddTrack}>
        +
      </a>
    );
  }

  render() {
    return (
      <div className='Track'>
        <div className='Track-information'>
          <h3>{this.props.track.name}</h3>
          <p>
            {this.props.track.artist} | {this.props.track.album}
          </p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
