import { useRef, useState } from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io"
import { IoIosArrowDropupCircle } from "react-icons/io"
import { FilterBy, SortBy } from '../types/filter-sort'

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
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const filterModalRef = useRef<HTMLInputElement>(null)

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
    onSetFilter(filterByToEdit)
    onSetSort(sortByToEdit)
    if (filterModalRef.current) {
      filterModalRef.current.checked = false
      setIsFilterModalOpen(false)
    }
  }

  function handleReset() {
    const resetFilter: FilterBy = { txt: '', status: '', jobType: '', pageIdx: 0, isFavoriteShow: false }
    const resetSort: SortBy = { subject: '' }
    setFilterByToEdit(resetFilter)
    onSetFilter(resetFilter)
    setSortByToEdit(resetSort)
    onSetSort(resetSort)
    if (filterModalRef.current) {
      filterModalRef.current.checked = false
      setIsFilterModalOpen(false)
    }
  }

  return (
    <section className='md:my-6 w-full sm:shadow-xl my-4 sm:py-4 py-2 px-2 rounded-lg bg-base-100' aria-labelledby="filter-sort-heading">
      <h2 id="filter-sort-heading" className="sr-only">Filter and Sort Jobs</h2> {/* Screen Reader Only Header */}

      <div className="collapse">
        <input
          type="checkbox"
          ref={filterModalRef}
          onChange={() => setIsFilterModalOpen(!isFilterModalOpen)}
          aria-expanded={isFilterModalOpen}
          aria-controls="filter-form"
        />
        <div className="collapse-title text-xl font-medium flex items-center justify-between capitalize">
          <label htmlFor="filter-form">Filter jobs</label>
          {isFilterModalOpen ? <IoIosArrowDropupCircle className='text-xl text-sky-600' /> : <IoIosArrowDropdownCircle className='text-xl text-sky-600' />}
        </div>

        <div className="collapse-content" id="filter-form">
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <div className='grid sm:grid-cols-3 gap-5'>

              {/* Search Input */}
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2 text-lg' htmlFor="txt">Search job</label>
                <input
                  onChange={handleChange}
                  id='txt'
                  name='txt'
                  type="text"
                  value={filterByToEdit.txt}
                  className="input border-neutral-content focus:border-sky-600 focus:outline-none w-full max-w-xs bg-white text-gray-700"
                  aria-describedby="search-description"
                />
                <span id="search-description" className="sr-only">Enter a keyword to search for a job</span>
              </div>

              {/* Status Select */}
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2 text-lg' htmlFor="status">Status</label>
                <select
                  onChange={handleChange}
                  id='status'
                  name='status'
                  value={filterByToEdit.status}
                  className="select border-neutral-content focus:border-sky-600 focus:outline-none w-full max-w-xs bg-white text-gray-700"
                  aria-labelledby="status"
                >
                  <option value={''}>All</option>
                  <option value={'interview'}>Interview</option>
                  <option value={'declined'}>Declined</option>
                  <option value={'pending'}>Pending</option>
                  <option value={'HR Interview'}>HR Interview</option>
                  <option value={'phone call'}>phone call</option>
                  <option value={'code assignment'}>code assignment</option>
                  <option value={'Ghosting'}>Ghosting</option>
                </select>
              </div>

              {/* Job Type Select */}
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2 text-lg' htmlFor="jobType">Type</label>
                <select
                  onChange={handleChange}
                  id='jobType'
                  name='jobType'
                  value={filterByToEdit.jobType}
                  className="select border-neutral-content focus:border-sky-600 focus:outline-none w-full max-w-xs bg-white text-gray-700"
                  aria-labelledby="jobType"
                >
                  <option value={''}>All</option>
                  <option value={'full-time'}>Full-Time</option>
                  <option value={'part-time'}>Part-Time</option>
                  <option value={'remote'}>Remote</option>
                  <option value={'internship'}>Internship</option>
                </select>
              </div>

              {/* Sort Select */}
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2 text-lg' htmlFor="sortBy">Sort By</label>
                <select
                  onChange={handleSortChange}
                  id='sortBy'
                  name='subject'
                  value={sortByToEdit.subject}
                  className="select border-neutral-content focus:border-sky-600 focus:outline-none w-full max-w-xs bg-white text-gray-700"
                  aria-labelledby="sortBy"
                >
                  <option className='hidden' value={''}></option>
                  <option value={'position'}>A-Z</option>
                  <option value={'-position'}>Z-A</option>
                  <option value={'-time'}>Newest</option>
                  <option value={'time'}>Oldest</option>
                </select>
              </div>

              <div className='flex items-center justify-start'>
                <fieldset className="fieldset p-4 bg-base-100 border border-sky-600 rounded-box w-48">
                  <legend className="fieldset-legend capitalize text-lg">{filterByToEdit.isFavoriteShow ? 'show favorite' : 'show all jobs'}</legend>
                  <label className="fieldset-label">
                    <input type="checkbox" className="toggle" onChange={handleChange} id='isFavoriteShow' name='isFavoriteShow' />
                  </label>
                </fieldset>
              </div>

              {/* Submit Button */}
              <div className='flex flex-col justify-end'>
                <button
                  type='submit'
                  className='btn bg-sky-600 text-white capitalize hover:bg-sky-700 border-none'
                  aria-label="Apply filters to search jobs"
                >
                  Search
                </button>
              </div>

              {/* Reset Button */}
              <div className='flex flex-col justify-end'>
                <button
                  type='button'
                  onClick={handleReset}
                  className='btn bg-sky-700 text-white capitalize hover:bg-sky-800 border-none'
                  aria-label="Clear all filters"
                >
                  Clear Filters
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </section>

  )
}

