import React from "react";
import { Pagination } from "react-bootstrap";

export const Paginator = ({ total, onClick, activePage }) => {
  const pages = Math.ceil(total/10);
  const getListItems = () => {
    const items = [];
    for(let int = 1; int <= pages; int++) {
      items.push(
        <Pagination.Item
          key={int}
          active={int === activePage}
          onClick={() => onClick(int)}
          >
          {int}
        </Pagination.Item>
      )
    }

    return items;
  }
  return (
    <Pagination>
      <Pagination.First
        disabled={activePage === 1}
        onClick={() => onClick(1)}
        />
      <Pagination.Prev
        disabled={activePage === 1}
        onClick={() => onClick(activePage - 1)}
        />
      {getListItems()}
      <Pagination.Next
        disabled={activePage === pages}
        onClick={() => onClick(activePage + 1)}
        />
      <Pagination.Last
        disabled={activePage === pages}
        onClick={() => onClick(pages)}
        />
    </Pagination>
  )
}
