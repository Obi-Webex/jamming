import React from "react";
import "./SearchBar.css";

//Displays the searchbar at the top.
//The "button" (it's not a button) will display a log in prompt instead of search if there is no access token.

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  handleOnClick() {
    if (this.props.token) {
      this.props.getSearchResults(this.props.searchTerm);
    } else {
      this.props.getToken();
    }
  }

  handleOnChange(e) {
    this.props.updateSearchTerm(e.target.value);
  }

  renderButton() {
    if (this.props.token) {
      return <a onClick={this.handleOnClick}>SEARCH</a>;
    } else {
      return <a onClick={this.handleOnClick}>LOG IN TO SPOTIFY</a>;
    }
  }

  render() {
    return (
      <div className='SearchBar'>
        <div className='SearchBar-input'>
          <input
            onChange={this.handleOnChange}
            placeholder='Search by artist, title or album'
          />
        </div>
        <div className='SearchBar-submit'>{this.renderButton()}</div>
      </div>
    );
  }
}

export default SearchBar;
