"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var clientID = "7f5b8e3693e14d378aa55bbf02d5a91a";
var redirectURI = "http://localhost:3000/"; // Contains all the functions I need for accessing the Spotify API

var Spotify = {
  search: function search(term, token) {
    return fetch("https://api.spotify.com/v1/search?q=".concat(term, "&type=track&limit=10"), {
      headers: {
        Authorization: "Bearer ".concat(token)
      }
    }).then(function (response) {
      return response.json();
    }).then(function (jsonResponse) {
      if (jsonResponse.tracks.items) {
        return jsonResponse.tracks.items.map(function (track) {
          return {
            id: track.uri,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name
          };
        });
      }
    });
  },
  save: function save(name, token, playlist) {
    return fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer ".concat(token)
      }
    }).then(function (response) {
      return response.json();
    }).then(function (jsonResponse) {
      return jsonResponse.id;
    }).then(function (id) {
      return fetch("https://api.spotify.com/v1/users/".concat(id, "/playlists"), {
        method: "POST",
        headers: {
          Authorization: "Bearer ".concat(token),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          "public": false
        })
      });
    }).then(function (response) {
      return response.json();
    }).then(function (jsonResponse) {
      return jsonResponse.id;
    }).then(function (id) {
      return fetch("https://api.spotify.com/v1/playlists/".concat(id, "/tracks"), {
        method: "POST",
        headers: {
          Authorization: "Bearer ".concat(token),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          uris: playlist
        })
      });
    })["catch"](function (error) {
      return console.error("Error: ", error);
    });
  },
  getAccessToken: function getAccessToken() {
    debugger;
    var tokenFromURL = window.location.href.match(/access_token=([^&]*)/);

    if (tokenFromURL) {
      return tokenFromURL[1];
    } else {
      var url = "https://accounts.spotify.com/authorize?client_id=".concat(clientID, "&response_type=token&scope=playlist-modify-private&redirect_uri=").concat(redirectURI);
      window.location = url;
    }
  }
};
var _default = Spotify;
exports["default"] = _default;