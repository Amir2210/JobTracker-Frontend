import { useState } from 'react'
import { FaSearch, FaSlidersH, FaTimes } from 'react-icons/fa'
import { FilterBy, SortBy } from '../types/filter-sort'
import { STATUS_OPTIONS, statusClass } from '../utils/status.util'

type FilterProps = {
  filterBy: FilterBy,
  onSetFilter: (filterBy: FilterBy) => void
  sortBy: SortBy
  onSetSort: (sortBy: SortBy) => void
}


type FilterByToEdit = FilterBy & {
  [key: string]: string | number | boolean | string[];
}

type SortByToEdit = SortBy & {
  [key: string]: string | number | boolean | string[];
}

export function FilterJob({ filterBy, onSetFilter, sortBy, onSetSort }: FilterProps) {
  const [filterByToEdit, setFilterByToEdit] = useState<FilterByToEdit>({ ...filterBy })
  const [sortByToEdit, setSortByToEdit] = useState<SortByToEdit>({ ...sortBy })
  const [isMoreOpen, setIsMoreOpen] = useState(false)

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { value, name: field, type } = event.target

    let newValue: string | number | boolean | string[] = value
    if (type === 'number') {
      newValue = +value
    } else if (type === 'checkbox') {
      newValue = (event.target as HTMLInputElement).checked
    } else if (type === 'select-multiple') {
      newValue = Array.from((event.target as HTMLSelectElement).selectedOptions, (option) => option.value)
    }

    setFilterByToEdit((prevFilter: FilterByToEdit) => ({ ...prevFilter, [field]: newValue }))
  }


  function handleSortChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { value, name: field, type } = event.target

    let newValue: string | number | boolean | string[] = value
    if (type === 'number') {
      newValue = +value
    } else if (type === 'checkbox') {
      newValue = (event.target as HTMLInputElement).checked
    } else if (type === 'select-multiple') {
      newValue = Array.from((event.target as HTMLSelectElement).selectedOptions, (option) => option.value)
    }

    setSortByToEdit((prevSort: SortByToEdit) => ({ ...prevSort, [field]: newValue }))
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    onSetFilter({ ...filterByToEdit, pageIdx: 0 })
    onSetSort(sortByToEdit)
    setIsMoreOpen(false)
  }

  function handleReset() {
    const resetFilter: FilterBy = { txt: '', status: '', jobType: '', pageIdx: 0, isFavoriteShow: false }
    const resetSort: SortBy = { subject: '' }
    setFilterByToEdit(resetFilter)
    onSetFilter(resetFilter)
    setSortByToEdit(resetSort)
    onSetSort(resetSort)
    setIsMoreOpen(false)
  }

  // Quick status chips apply immediately against the currently applied filter
  function onSelectStatus(status: string) {
    setFilterByToEdit((prev) => ({ ...prev, status }))
    onSetFilter({ ...filterBy, status, pageIdx: 0 })
  }

  const hasActiveFilters = !!(filterBy.txt || filterBy.status || filterBy.jobType || filterBy.isFavoriteShow || sortBy.subject)

  return (
    <section className='w-full bg-base-100 rounded-2xl shadow-sm border border-base-300 p-4 sm:p-5 sticky top-2 z-20' aria-labelledby="filter-sort-heading">
      <h2 id="filter-sort-heading" className="sr-only">Filter and Sort Jobs</h2>

      {/* Search row */}
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-3'>
        <div className='relative grow'>
          <FaSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40' />
          <input
            onChange={handleChange}
            id='txt'
            name='txt'
            type="text"
            value={filterByToEdit.txt}
            placeholder='Search by position or company...'
            className="w-full bg-base-200 border border-base-300 rounded-xl py-2.5 pl-11 pr-4 outline-none transition focus:bg-base-100 focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 text-base-content"
            aria-label='Search jobs'
          />
        </div>
        <div className='flex gap-2'>
          <button type='submit' className='btn bg-sky-500 hover:bg-sky-600 text-white border-none rounded-xl px-6 capitalize'>
            <FaSearch className='sm:hidden' /> Search
          </button>
          <button
            type='button'
            onClick={() => setIsMoreOpen((prev) => !prev)}
            className={`btn rounded-xl border-base-300 capitalize gap-2 ${isMoreOpen ? 'bg-sky-100 text-sky-600 border-sky-300' : 'bg-base-100'}`}
            aria-expanded={isMoreOpen}
            aria-controls='more-filters'
          >
            <FaSlidersH /> Filters
          </button>
        </div>
      </form>

      {/* Quick status chips */}
      <div className='mt-4 flex gap-2 overflow-x-auto pb-1'>
        <button
          type='button'
          onClick={() => onSelectStatus('')}
          className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium capitalize transition ${!filterBy.status ? 'bg-sky-500 text-white' : 'bg-base-200 text-base-content/70 hover:bg-base-300'}`}
        >
          All
        </button>
        {STATUS_OPTIONS.map((status) => {
          const isActive = filterBy.status === status
          return (
            <button
              key={status}
              type='button'
              onClick={() => onSelectStatus(status)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium capitalize transition border border-transparent ${isActive ? `${statusClass(status)} ring-2 ring-offset-1 ring-base-300` : 'bg-base-200 text-base-content/70 hover:bg-base-300'}`}
            >
              {status}
            </button>
          )
        })}
      </div>

      {/* More filters disclosure */}
      {isMoreOpen && (
        <form id='more-filters' onSubmit={handleSubmit} className='mt-4 pt-4 border-t border-base-300 grid sm:grid-cols-3 gap-4'>
          <div className='flex flex-col'>
            <label className='capitalize mb-1.5 text-sm font-medium text-base-content/70' htmlFor="jobType">Job type</label>
            <select
              onChange={handleChange}
              id='jobType'
              name='jobType'
              value={filterByToEdit.jobType}
              className="select border-base-300 focus:border-sky-500 focus:outline-none w-full bg-base-200 text-base-content rounded-xl"
            >
              <option value={''}>All</option>
              <option value={'full-time'}>Full-Time</option>
              <option value={'part-time'}>Part-Time</option>
              <option value={'remote'}>Remote</option>
              <option value={'internship'}>Internship</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='capitalize mb-1.5 text-sm font-medium text-base-content/70' htmlFor="sortBy">Sort by</label>
            <select
              onChange={handleSortChange}
              id='sortBy'
              name='subject'
              value={sortByToEdit.subject}
              className="select border-base-300 focus:border-sky-500 focus:outline-none w-full bg-base-200 text-base-content rounded-xl"
            >
              <option value={''}>Default</option>
              <option value={'position'}>A-Z</option>
              <option value={'-position'}>Z-A</option>
              <option value={'-time'}>Newest</option>
              <option value={'time'}>Oldest</option>
            </select>
          </div>

          <div className='flex flex-col'>
            <label className='capitalize mb-1.5 text-sm font-medium text-base-content/70'>Favorites</label>
            <label className='flex items-center gap-3 bg-base-200 border border-base-300 rounded-xl px-4 h-12 cursor-pointer'>
              <input type="checkbox" className="toggle toggle-sm" checked={!!filterByToEdit.isFavoriteShow} onChange={handleChange} id='isFavoriteShow' name='isFavoriteShow' />
              <span className='capitalize text-sm'>{filterByToEdit.isFavoriteShow ? 'Showing favorites' : 'Show all jobs'}</span>
            </label>
          </div>

          <div className='sm:col-span-3 flex flex-wrap gap-2 justify-end'>
            {hasActiveFilters && (
              <button type='button' onClick={handleReset} className='btn btn-ghost capitalize gap-2 rounded-xl'>
                <FaTimes /> Clear filters
              </button>
            )}
            <button type='submit' className='btn bg-sky-500 hover:bg-sky-600 text-white border-none rounded-xl px-6 capitalize'>Apply</button>
          </div>
        </form>
      )}
    </section>
  )
}
