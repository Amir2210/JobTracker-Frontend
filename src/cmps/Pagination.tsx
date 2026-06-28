import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FilterBy } from '../types/filter-sort';

interface PaginationProps {
  totalJobs: number | undefined;
  filterBy: FilterBy
  onSetFilter: (filterBy: FilterBy) => void;
}

const baseBtn = 'min-w-10 h-10 px-3 rounded-lg text-sm font-medium border transition flex items-center justify-center'
const idleBtn = `${baseBtn} bg-base-100 border-base-300 text-base-content hover:bg-base-200`
const activeBtn = `${baseBtn} bg-sky-500 border-sky-500 text-white shadow-sm`

export function Pagination({ totalJobs, filterBy, onSetFilter, }: PaginationProps) {
  const pageSize = 10
  const numOfPages = Math.ceil(totalJobs ? totalJobs / pageSize : 0)
  const [currentPage, setCurrentPage] = useState(filterBy.pageIdx || 0)
  const pagesToShow = 3 // Number of visible pages at a time

  function handlePageChange(page: number) {
    setCurrentPage(page);
    onSetFilter({ ...filterBy, pageIdx: page });
  }

  function handleNextPages() {
    const nextPage = Math.min(currentPage + pagesToShow, numOfPages - 1);
    handlePageChange(nextPage);
  }

  function handlePrevPages() {
    const prevPage = Math.max(currentPage - pagesToShow, 0);
    handlePageChange(prevPage);
  }

  function renderPaginationButtons() {
    if (numOfPages <= pagesToShow) {
      return [...Array(numOfPages)].map((_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={filterBy.pageIdx === i ? activeBtn : idleBtn}
        >
          {i + 1}
        </button>
      ));
    }

    const startPage = Math.max(0, Math.min(currentPage - Math.floor(pagesToShow / 2), numOfPages - pagesToShow));
    const endPage = Math.min(startPage + pagesToShow - 1, numOfPages - 1);

    const buttons = [];

    // First page button
    if (startPage > 0) {
      buttons.push(
        <button key={0} onClick={() => handlePageChange(0)} className={idleBtn}>
          1
        </button>
      );

      // "..." for previous pages
      buttons.push(
        <button key="prev-ellipsis" onClick={handlePrevPages} className={`${idleBtn} text-base-content/50`}>
          ...
        </button>
      );
    }

    // Visible page buttons
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={filterBy.pageIdx === i ? activeBtn : idleBtn}
        >
          {i + 1}
        </button>
      );
    }

    // "..." for next pages
    if (endPage < numOfPages - 1) {
      buttons.push(
        <button key="next-ellipsis" onClick={handleNextPages} className={`${idleBtn} text-base-content/50`}>
          ...
        </button>
      );

      // Last page button
      buttons.push(
        <button key={numOfPages - 1} onClick={() => handlePageChange(numOfPages - 1)} className={idleBtn}>
          {numOfPages}
        </button>
      );
    }

    return buttons;
  }

  if (numOfPages <= 1) return null

  const activePage = filterBy.pageIdx || 0

  return (
    <div className="my-6 flex flex-wrap justify-center items-center gap-2">
      <button
        onClick={() => handlePageChange(Math.max(activePage - 1, 0))}
        disabled={activePage === 0}
        className={`${idleBtn} disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label='Previous page'
      >
        <FaChevronLeft className='text-xs' />
      </button>
      {renderPaginationButtons()}
      <button
        onClick={() => handlePageChange(Math.min(activePage + 1, numOfPages - 1))}
        disabled={activePage >= numOfPages - 1}
        className={`${idleBtn} disabled:opacity-40 disabled:cursor-not-allowed`}
        aria-label='Next page'
      >
        <FaChevronRight className='text-xs' />
      </button>
    </div>
  );
}
