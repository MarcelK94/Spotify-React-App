import React, { Fragment } from "react";
import { Table, Row, Col } from "react-bootstrap";

export const DataTable = ({ array, playlist, setPlaylist }) => {
  return (
    <Table bordered responsive>
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Tracks</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {array.map(item => (
          <Fragment>
            <tr>
              <td>
                <img
                  className="playlist-icon"
                  src={item.images.length ? item.images[0].url : null}
                  alt="Playlist Icon"
                  />
              </td>
              <td>
                {item.name}
              </td>
              <td>
                {item.tracks.total}
              </td>
              <td>
                <div
                  className="toggle-playlist"
                  onClick={() => setPlaylist(item)}
                  >
                  {playlist && playlist.id === item.id ? (
                    <span class="chevron top"></span>
                  ) : (
                    <span class="chevron bottom"></span>
                  )}
                </div>
              </td>
            </tr>
            {playlist && playlist.id === item.id && (
              <tr>
                <td colSpan={4}>
                  <Row>
                    <Col className="justify-content-center" lg={2} sm={4}>
                      <img
                        className="playlist-icon large"
                        src={item.images.length ? item.images[0].url : null}
                        alt="Playlist Icon"
                        />
                    </Col>
                    <Col>
                      <label><b>{item.name}</b></label>
                      <p>{item.description}</p>
                      <a
                        className="play-button"
                        target="_blank"
                        href={item.uri}
                        rel="noreferrer"
                        >
                        Play in Spotify
                      </a>
                    </Col>
                  </Row>
                </td>
              </tr>
            )}
          </Fragment>
        ))}
      </tbody>
    </Table>
  )
}
