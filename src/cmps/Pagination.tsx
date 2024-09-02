import { useState } from 'react';
import { FilterBy } from '../types/filter-sort'

interface PaginationProps {
  totalJobs: number | undefined
  filterBy: FilterBy,
  onSetFilter: (filterBy: FilterBy) => void;
}
export function Pagination({ totalJobs, filterBy, onSetFilter }: PaginationProps) {
  const [, setFilterByToEdit] = useState({ ...filterBy })
  const pageSize = 10
  const numOfButtons = Math.ceil(totalJobs ? totalJobs / pageSize : 0)

  function handlePageChange(page: number) {
    const newPagination = {
      ...filterBy,
      pageIdx: page
    }
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, pageIdx: page }))
    onSetFilter(newPagination)
  }

  function renderPaginationButtons() {
    const buttons = []
    for (let i = 0; i < numOfButtons; i++) {
      buttons.push(
        <button key={i} onClick={() => handlePageChange(i)} className={`btn shadow-lg text-lg ml-4 ${filterBy.pageIdx === i ? 'bg-sky-400 text-white border-indigo-100 border' : 'bg-zinc-100 border-indigo-100 border'}`}>{i + 1}</button>
      )
    }
    return buttons
  }

  return (
    <div className='my-6 flex flex-wrap gap-2'>
      {renderPaginationButtons()}

    </div>
  )
}