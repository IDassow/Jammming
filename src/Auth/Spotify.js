const clientId = '4f19a7c59759424688add6df41ca5c11'; // Replace with your real client ID
const redirectUri = 'http://127.0.0.1:5173/';
let accessToken;

const Spotify = {
  getAccessToken() {
    if (accessToken) return accessToken;

    // Check URL for access token
    const tokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (tokenMatch && expiresInMatch) {
      accessToken = tokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);

      // Clear token when it expires
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);

      // Remove token from URL
      window.history.pushState('Access Token', null, '/');

      return accessToken;
    } else {
      // Redirect to Spotify auth
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = authUrl;
    }
  },

  search(term) {
    const token = this.getAccessToken();
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
      .then(response => {
        if (!response.ok) throw new Error(`Search failed: ${response.status}`);
        return response.json();
      })
      .then(jsonResponse => {
        if (!jsonResponse.tracks) return [];
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) return;

    const token = this.getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', { headers })
      .then(response => response.json())
      .then(jsonResponse => {
        userId = jsonResponse.id;
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ name })
        });
      })
      .then(response => response.json())
      .then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch(
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          {
            method: 'POST',
            headers,
            body: JSON.stringify({ uris: trackUris })
          }
        );
      });
  }
};

export default Spotify;
