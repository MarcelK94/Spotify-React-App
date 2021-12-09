import React, { Component, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.scss";
import { fetchApiToken, fetchGenres, fetchPlaylists } from "./api";
import { Dropdown, Header, DataTable, Paginator, Loader } from "./components";

require('dotenv').config();

class App extends Component {
  state = {
    token: null,
    genres: [],
    genre: null,
    playlists: [],
    playlist: null,
    activePage: 1,
    showPagination: false,
    total: 0,
    loading: true,
    loadingType: "genre"
  }

  async componentDidMount() {
    try {
      const response = await fetchApiToken();
      const genres = await fetchGenres(response.access_token);
      this.setState({
        token: response.access_token,
        genres: genres.categories.items
      })
    } catch(err) {
      console.log(err)
    } finally {
      this.setLoading("genre", false);
    }
  }

  setLoading(type, loading = true) {
    this.setState({
      loadingType: loading ? type : "",
      loading
    });
  }

  async setGenre(value) {
    const { genres, token } = this.state;
    const genre = genres.find(genre => genre.id === value);
    this.setLoading("playlist");
    try {
      const response = await fetchPlaylists(token, value);
      this.setState({
        genre,
        playlists: response.playlists.items,
        showPagination: response.playlists.total > 10,
        total: response.playlists.total,
        activePage: 1
      });
    } catch (err) {
      console.log(err)
    } finally {
      this.setLoading("playlist", false);
    }

  }

  async setPage(page) {
    const { token, genre: { id } } = this.state;
    this.setLoading("playlist");
    try {
      const response = await fetchPlaylists(token, id, page);
      this.setState({
        activePage: page,
        playlists: response.playlists.items
      })
    } catch (err) {
      console.log(err)
    } finally {
      this.setLoading("playlist", false);
    }
  }

  render() {
    const {
      genres,
      playlists,
      playlist,
      activePage,
      showPagination,
      total,
      loading,
      loadingType
    } = this.state;
    return (
      <Fragment>
        <Header />
        <Container className="pt-2">
          <Row>
            <Col>
              <Dropdown
                options={genres.map(option => {
                  return { label: option.name, value: option.id }
                })}
                selectOption={value => this.setGenre(value)}
                loading={loading}
                />
            </Col>
          </Row>
          {playlists.length > 0 && (
            <Row className="justify-content-center mt-5">
              <Col>
                <DataTable
                  array={playlists}
                  playlist={playlist}
                  setPlaylist={
                    item => this.setState({
                      playlist: playlist && item.id === playlist.id ? null : item
                    })
                  }
                  />
                {showPagination && (
                  <Paginator
                    total={total}
                    activePage={activePage}
                    onClick={
                      page => this.setPage(page)
                    }
                    />
                )}
                <Loader loading={loading && loadingType === "playlist"} />
              </Col>
            </Row>
          )}
        </Container>
      </Fragment>
    );
  }
}

export default App;
