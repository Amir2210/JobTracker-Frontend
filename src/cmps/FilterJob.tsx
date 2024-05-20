import { useRef, useState } from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io"
import { IoIosArrowDropupCircle } from "react-icons/io"
import { FilterBy } from '../types/filter-sort'

type FilterProps = {
  filterBy: FilterBy,
  onSetFilter: (filterBy: FilterBy) => void
}

type FilterByToEdit = FilterBy & {
  [key: string]: string | number | boolean | string[];
}

export function FilterJob({ filterBy, onSetFilter }: FilterProps) {
  const [filterByToEdit, setFilterByToEdit] = useState<FilterByToEdit>({ ...filterBy })
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

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    onSetFilter(filterByToEdit)
    if (filterModalRef.current) {
      filterModalRef.current.checked = false
      setIsFilterModalOpen(false)
    }
  }

  function handleReset() {
    const resetFilter: FilterBy = { txt: '', status: '', jobType: '' }
    setFilterByToEdit(resetFilter)
    onSetFilter(resetFilter)
  }

  return (
    <section className='md:my-6 w-full sm:shadow-xl my-4 sm:py-4 py-2 px-2 rounded-lg bg-white'>
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
                <input onChange={handleChange} id='txt' name='txt' type="text" value={filterByToEdit.txt} className="input border-sky-400 focus:border-sky-600 focus:outline-none w-full max-w-xs" />
              </div>
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2 text-lg' htmlFor="status">status</label>
                <select onChange={handleChange} id='status' name='status' value={filterByToEdit.status} className="select border-sky-400 focus:border-sky-600 focus:outline-none w-full max-w-xs">
                  <option value={''}>all</option>
                  <option>Interview</option>
                  <option>Declined</option>
                  <option>Pending</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2 text-lg' htmlFor="jobType">type</label>
                <select onChange={handleChange} id='jobType' name='jobType' value={filterByToEdit.jobType} className="select border-sky-400 focus:border-sky-600 focus:outline-none w-full max-w-xs">
                  <option value={''}>all</option>
                  <option>full-time</option>
                  <option>part-time</option>
                  <option>remote</option>
                  <option>internship</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2 text-lg' htmlFor="sortBy">sort by</label>
                <select id='sortBy' name='by' className="select border-sky-400 focus:border-sky-600 focus:outline-none w-full max-w-xs">
                  <option value={'title'}>a-z</option>
                  <option value={'-title'}>z-a</option>
                  <option value={'latest'}>latest</option>
                  <option value={'oldest'}>oldest</option>
                </select>
              </div>
              <div className='flex flex-col justify-end'>
                <button type='submit' className='btn bg-sky-400 text-white capitalize hover:bg-sky-600'>search</button>
              </div>
              <div className='flex flex-col justify-end'>
                <button type='button' onClick={handleReset} className='btn bg-sky-700 text-white capitalize hover:bg-sky-800'>reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

