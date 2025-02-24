import { useState } from 'react';
import { FilterBy } from '../types/filter-sort';

interface PaginationProps {
  totalJobs: number | undefined;
  totalFavoriteJobs: number | undefined
  isFavoriteShow: boolean
  filterBy: FilterBy
  onSetFilter: (filterBy: FilterBy) => void;
}

export function Pagination({ totalJobs, filterBy, onSetFilter, isFavoriteShow, totalFavoriteJobs }: PaginationProps) {
  const pageSize = 10
  const numOfPages = !isFavoriteShow ? Math.ceil(totalJobs ? totalJobs / pageSize : 0) : Math.ceil(totalFavoriteJobs ? totalFavoriteJobs / pageSize : 0)
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
          className={`btn shadow-lg text-lg ml-2 ${filterBy.pageIdx === i ? 'bg-sky-400 text-white border-base-300 border' : 'bg-zinc-100 border-indigo-100 border'}`}
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
        <button key={0} onClick={() => handlePageChange(0)} className="btn shadow-lg text-lg ml-2 bg-zinc-100 border-indigo-100 border">
          1
        </button>
      );

      // "..." for previous pages
      buttons.push(
        <button key="prev-ellipsis" onClick={handlePrevPages} className="btn shadow-lg text-lg ml-2 bg-gray-200 border-none">
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
          className={`btn shadow-lg text-lg ml-2 ${filterBy.pageIdx === i ? 'bg-sky-400 text-white border-base-300 border' : 'bg-zinc-100 border-indigo-100 border'}`}
        >
          {i + 1}
        </button>
      );
    }

    // "..." for next pages
    if (endPage < numOfPages - 1) {
      buttons.push(
        <button key="next-ellipsis" onClick={handleNextPages} className="btn shadow-lg text-lg ml-2 bg-gray-200 border-none">
          ...
        </button>
      );

      // Last page button
      buttons.push(
        <button key={numOfPages - 1} onClick={() => handlePageChange(numOfPages - 1)} className="btn shadow-lg text-lg ml-2 bg-zinc-100 border-indigo-100 border">
          {numOfPages}
        </button>
      );
    }

    return buttons;
  }

  return <div className="my-6 grid grid-cols-7 gap-2">{renderPaginationButtons()}</div>;
}
