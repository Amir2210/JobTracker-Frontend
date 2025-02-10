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
    const resetFilter: FilterBy = { txt: '', status: '', jobType: '', pageIdx: 0 }
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
    <section className='md:my-6 w-full sm:shadow-xl my-4 sm:py-4 py-2 px-2 rounded-lg bg-base-100'>
      <div className="collapse">
        <input type="checkbox" ref={filterModalRef} onChange={() => setIsFilterModalOpen(!isFilterModalOpen)} />
        <div className="collapse-title text-xl font-medium flex items-center justify-between capitalize">
          filter jobs
          {isFilterModalOpen ? <IoIosArrowDropupCircle className='text-xl text-sky-400' /> : <IoIosArrowDropdownCircle className='text-xl text-sky-400' />}
        </div>
        <div className="collapse-content">
          <form className='flex flex-col' onSubmit={handleSubmit}>
            <div className='grid sm:grid-cols-3 gap-5'>
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2 text-lg' htmlFor="txt">search job</label>
                <input onChange={handleChange} id='txt' name='txt' type="text" value={filterByToEdit.txt} className="input border-neutral-content focus:border-sky-600 focus:outline-none w-full max-w-xs bg-white text-gray-700" />
              </div>
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2 text-lg' htmlFor="status">status</label>
                <select onChange={handleChange} id='status' name='status' value={filterByToEdit.status} className="select border-neutral-content focus:border-sky-600 focus:outline-none w-full max-w-xs bg-white text-gray-700">
                  <option value={''}>all</option>
                  <option className='capitalize'>interview</option>
                  <option className='capitalize'>declined</option>
                  <option className='capitalize'>pending</option>
                  <option className='capitalize'>HR Interview</option>
                  <option className='capitalize'>Ghosting</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2 text-lg' htmlFor="jobType">type</label>
                <select onChange={handleChange} id='jobType' name='jobType' value={filterByToEdit.jobType} className="select border-neutral-content focus:border-sky-600 focus:outline-none w-full max-w-xs bg-white text-gray-700">
                  <option value={''}>all</option>
                  <option className='capitalize'>full-time</option>
                  <option className='capitalize'>part-time</option>
                  <option className='capitalize'>remote</option>
                  <option className='capitalize'>internship</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2 text-lg' htmlFor="sortBy">sort by</label>
                <select onChange={handleSortChange} id='sortBy' name='subject' value={sortByToEdit.subject} className="select border-neutral-content focus:border-sky-600 focus:outline-none w-full max-w-xs bg-white text-gray-700">
                  <option className='hidden' value={''}></option>
                  <option value={'position'}>a-z</option>
                  <option value={'-position'}>z-a</option>
                  <option value={'-time'}>newest</option>
                  <option value={'time'}>oldest</option>
                </select>
              </div>
              <div className='flex flex-col justify-end'>
                <button type='submit' className='btn bg-sky-400 text-white capitalize hover:bg-sky-600 border-none'>search</button>
              </div>
              <div className='flex flex-col justify-end'>
                <button type='button' onClick={handleReset} className='btn bg-sky-700 text-white capitalize hover:bg-sky-800 border-none'>clear filters</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

