import { useRef, useState } from 'react'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { IoIosArrowDropupCircle } from "react-icons/io";

export function FilterJob() {
  const [isfilterModalOpen, setIsfilterModalOpen] = useState(false)
  const filterModalRef = useRef(null)
  return (
    <section className='md:my-6  w-full  sm:shadow-xl my-4 sm:py-4 py-2 px-2 rounded-lg bg-white'>
      <div className="collapse ">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium flex items-center justify-between capitalize">
          filter jobs
          {isfilterModalOpen ? <IoIosArrowDropupCircle className='text-xl text-sky-400' /> : <IoIosArrowDropdownCircle className='text-xl text-sky-400' />}
        </div>
        <div className="collapse-content">
          <form className='flex flex-col' >
            <div className='grid sm:grid-cols-3  gap-5'>
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2' htmlFor="name">search job</label>
                <input id='name' name='txt' type="text" className="input border-sky-400 focus:border-sky-600 focus:outline-none  w-full max-w-xs" />
              </div>
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2' htmlFor="category">status</label>
                <select id='category' name='category' className="select border-sky-400 focus:border-sky-600 focus:outline-none w-full max-w-xs"  >
                  <option value={''}>all</option>
                  <option>Interview</option>
                  <option>Declined</option>
                  <option>Pending</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2' htmlFor="company">type</label>
                <select id='company' name='company' className="select border-sky-400 focus:border-sky-600 focus:outline-none w-full max-w-xs" >
                  <option value={''}>all</option>
                  <option>full-time</option>
                  <option>part-time</option>
                  <option>remote</option>
                  <option>internship</option>
                </select>
              </div>
              <div className='flex flex-col'>
                <label className='capitalize cursor-pointer mb-2' htmlFor="sortBy">sort by</label>
                <select id='sortBy' name='by' className="select border-sky-400 focus:border-sky-600 focus:outline-none w-full max-w-xs" >
                  <option value={'title'}>a-z</option>
                  <option value={'-title'}>z-a</option>
                  <option value={'price'}>latest</option>
                  <option value={'-price'}>oldest</option>
                </select>
              </div>
              <div className='flex flex-col justify-end'>
                <button className='btn bg-sky-400 text-white capitalize hover:bg-sky-600'>search</button>
              </div>
              <div className='flex flex-col justify-end'>
                <button className='btn bg-sky-700 text-white capitalize hover:bg-sky-800'>reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>

    </section>
  )
}