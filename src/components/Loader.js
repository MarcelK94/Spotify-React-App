import React from "react";
import { Spinner } from "react-bootstrap";

export const Loader = ({ loading }) => {
  return (
    <div className={`spinner-container ${loading ? ' active' : null}`}>
      <Spinner animation="border" role="status" />
    </div>
  )
}
