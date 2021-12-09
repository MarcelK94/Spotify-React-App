const SPOTIFY_URL = process.env.REACT_APP_API_BASE_URL;
const AUTH_URL = process.env.REACT_APP_API_AUTH_URL;
const ENCODED_AUTH_TOKEN = btoa(`${process.env.REACT_APP_SPOTIFY_CLIENT_ID}:${process.env.REACT_APP_SPOTIFY_CLIENT_SECRET}`);

export const fetchApiToken = async () => {
  const response = await fetch(AUTH_URL + "/token", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${ENCODED_AUTH_TOKEN}`
    },
    body: 'grant_type=client_credentials'
  });

  return await response.json();
}

export const fetchGenres = async (token) => {
  const response = await fetch(SPOTIFY_URL + "/browse/categories?locale=sv_US", {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return await response.json();
}

export const fetchPlaylists = async (token, genreId, page = 1) => {
  const offset = (page * 10) - 10;
  const response = await fetch(SPOTIFY_URL + `/browse/categories/${genreId}/playlists?limit=10&offset=${offset}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return await response.json();
}
