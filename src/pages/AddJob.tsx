import { useState } from 'react'
import { Navbar } from '../cmps/Navbar'
import { Job } from '../types/job.types'
function getEmptyNewJob(): Job {
  return {
    position: '',
    company: '',
    jobLocation: '',
    status: 'pending',
    jobType: 'full-time'
  }
}

export function AddJob() {
  const [job, setJob] = useState(getEmptyNewJob())

  function handleInputsChange(ev: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const field = ev.target.name
    const value = ev.target.value
    setJob((job) => ({ ...job, [field]: value }))
  }

  function onAddNewJob(ev: React.FormEvent) {
    ev.preventDefault()
    console.log(job)
  }

  function onClearInputs(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.preventDefault()
    setJob(getEmptyNewJob())
  }

  const { position, jobType, status, jobLocation, company } = job
  return (
    <section >
      <Navbar />
      <div className='bg-zinc-100 h-screen flex flex-col w-full'>
        <div className='small-container sm:big-container sm:shadow-xl sm:mt-4 sm:py-4 py-2 px-2 rounded-lg sm:bg-white'>
          <h1 className='text-2xl capitalize font-medium'>Add job</h1>
          <form onSubmit={onAddNewJob} className='grid sm:grid-cols-3 gap-5 mt-4'>
            <div className=''>
              <label className='text-xl' htmlFor="position">position</label>
              <input onChange={handleInputsChange} id='position' name='position' value={position} type="text" required className="input input-bordered w-full mt-3 border-sky-400 focus:border-sky-600 focus:outline-none" />
            </div>
            <div>
              <label className='text-xl' htmlFor="company">company</label>
              <input onChange={handleInputsChange} id='company' name='company' value={company} type="text" required className="input input-bordered w-full mt-3 border-sky-400 focus:border-sky-600 focus:outline-none" />
            </div>
            <div>
              <label className='text-xl' htmlFor="jobLocation">job location</label>
              <input onChange={handleInputsChange} id='jobLocation' name='jobLocation' value={jobLocation} type="text" required className="input input-bordered w-full mt-3 border-sky-400 focus:border-sky-600 focus:outline-none" />
            </div>
            <div>
              <label className='text-xl capitalize cursor-pointer mb-2' htmlFor="status">status</label>
              <select onChange={handleInputsChange} id='status' name='status' value={status} className="font-medium text-lg select border-solid border-2 border-sky-300 focus:border-sky-600 focus:outline-none w-full max-w-xs mt-3">
                <option >pending</option>
                <option>interview</option>
                <option>declined</option>
              </select>
            </div>
            <div>
              <label className='text-xl capitalize cursor-pointer mb-2' htmlFor="jobType">job type</label>
              <select onChange={handleInputsChange} id='jobType' name='jobType' value={jobType} className="font-medium text-lg select border-solid border-2 border-sky-300 focus:border-sky-600 focus:outline-none  w-full max-w-xs mt-3">
                <option>full-time</option>
                <option>part-time</option>
                <option>remote</option>
                <option>internship</option>
              </select>
            </div>
            <div className='flex items-end gap-5'>
              <button type='button' onClick={onClearInputs} className='btn bg-sky-700 text-white capitalize hover:bg-sky-800 w-1/3'>clear</button>
              <button type='submit' className='btn bg-sky-400 text-white capitalize hover:bg-sky-600 w-1/3'>add</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}