import ReactPaginate from "react-paginate";

import { PaginationBlock } from "../app.styles";

const Pagination = ({ currentTodosCount, handlePagination, itemLimit }) => {
  const pageCount = Math.ceil(currentTodosCount / itemLimit);

  return (
    <PaginationBlock>
      <ReactPaginate
        nextLabel=">>"
        previousLabel="<<"
        breakLabel="..."
        pageRangeDisplayed={0}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        onPageChange={handlePagination}
        containerClassName="pagination-container"
      />
    </PaginationBlock>
  );
};

export default Pagination;
