import ReactPaginate from "react-paginate";

import { PaginationBlock } from "../app.styles";

const Pagination = ({ todosCount, handlePagination, itemLimit }) => {
  const pageCount = Math.ceil(todosCount / itemLimit);

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
