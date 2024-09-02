import { useEffect, useState } from 'react'
import { Navbar } from '../cmps/Navbar'
import { Job } from '../types/job.types'
import { addJob, editJob, loadJobs } from '../store/actions/user.actions'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { User, UserModule } from '../types/user.types'
import { IoIosArrowBack } from "react-icons/io";

function getEmptyNewJob(): Job {
  return {
    _id: uuidv4(),
    position: '',
    company: '',
    jobLocation: '',
    status: 'pending',
    jobType: 'full-time',
    time: Date.now(),
    description: ''
  }
}

export function AddJob() {
  const location = useLocation()
  const jobToEdit = location.state?.job as Job | undefined;
  const [job, setJob] = useState<Job>(jobToEdit || getEmptyNewJob())
  const navigate = useNavigate()
  const user: User | null = useSelector((storeState: UserModule) => storeState.userModule.loggedInUser)

  useEffect(() => {
    if (user) {
      loadJobs(user._id, { txt: '', status: '', jobType: '', pageIdx: 0 }, { subject: '' })
    }
  }, [])

  function handleInputsChange(ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) {
    const field = ev.target.name
    const value = ev.target.value
    setJob((job) => ({ ...job, [field]: value }))
  }

  async function onAddNewJob(ev: React.FormEvent) {
    ev.preventDefault()
    try {
      if (jobToEdit) {
        editJob(job)
        toast.success('job has been updated')
        navigate('/jobs')
      } else {
        console.log('job:', job)
        addJob(job)
        toast.success('a new job has been added')
        navigate('/jobs')
      }
    } catch (error) {
      console.log(error)
      toast.error('A new job cannot be added')
    }
  }

  function onClearInputs(ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    ev.preventDefault()
    setJob(getEmptyNewJob())
  }
  const { position, jobType, status, jobLocation, company, description } = job
  return (
    <section >
      <Navbar />
      <div className='bg-zinc-100 min-h-screen flex flex-col w-full'>
        <div className='small-container sm:big-container sm:shadow-xl sm:mt-4 sm:py-4 py-2 px-2 rounded-lg sm:bg-white'>
          {!jobToEdit ? (
            <div className='items-center'>
              <Link to={'/jobs'} className='btn text-sky-400 bg-white text-xl border-indigo-100 border'><IoIosArrowBack /></Link >
              <h1 className='text-3xl capitalize font-medium text-center mx-auto'>Add job</h1>
            </div>
          ) : (
            <div className='items-center'>
              <Link to={'/jobs'} className='btn text-sky-400 bg-white text-xl border-indigo-100 border'><IoIosArrowBack /></Link>
              <h1 className='text-3xl capitalize font-medium text-center mx-auto'>edit job</h1>
            </div>
          )}
          <form onSubmit={onAddNewJob} className='grid sm:grid-cols-3 gap-5 mt-4'>
            <div>
              <label className='text-xl' htmlFor="position">position</label>
              <input onChange={handleInputsChange} id='position' name='position' value={position} type="text" required className="input input-bordered w-full mt-3 border-sky-400 focus:border-sky-600 focus:outline-none bg-white" />
            </div>
            <div>
              <label className='text-xl' htmlFor="company">company</label>
              <input onChange={handleInputsChange} id='company' name='company' value={company} type="text" required className="input input-bordered w-full mt-3 border-sky-400 focus:border-sky-600 focus:outline-none bg-white" />
            </div>
            <div>
              <label className='text-xl' htmlFor="jobLocation">job location</label>
              <input onChange={handleInputsChange} id='jobLocation' name='jobLocation' value={jobLocation} type="text" required className="input input-bordered w-full mt-3 border-sky-400 focus:border-sky-600 focus:outline-none bg-white" />
            </div>
            <div>
              <label className='text-xl capitalize cursor-pointer mb-2' htmlFor="status">status</label>
              <select onChange={handleInputsChange} id='status' name='status' value={status} className="font-medium text-lg select border-solid border-2 border-sky-300 focus:border-sky-600 focus:outline-none w-full max-w-xs mt-3 bg-white">
                <option >pending</option>
                <option>interview</option>
                <option>declined</option>
                <option>HR Interview</option>
              </select>
            </div>
            <div>
              <label className='text-xl capitalize cursor-pointer mb-2' htmlFor="jobType">job type</label>
              <select onChange={handleInputsChange} id='jobType' name='jobType' value={jobType} className="font-medium text-lg select border-solid border-2 border-sky-300 focus:border-sky-600 focus:outline-none  w-full max-w-xs mt-3 bg-white">
                <option>full-time</option>
                <option>part-time</option>
                <option>remote</option>
                <option>internship</option>
              </select>
            </div>
            <div>
              <label className='text-xl capitalize cursor-pointer mb-2' htmlFor="jobType">description</label>
              <textarea onChange={handleInputsChange} name='description' value={description} className="input input-bordered w-full mt-3 border-sky-400 focus:border-sky-600 focus:outline-none bg-white pt-2"></textarea>
            </div>
            <div className='flex items-end gap-5'>
              <button type='button' onClick={onClearInputs} className='btn bg-sky-700 text-white capitalize hover:bg-sky-800 w-1/3 border-none'>clear</button>
              {!jobToEdit ? (
                <button type='submit' className='btn bg-sky-400 text-white capitalize hover:bg-sky-600 w-1/3 border-none'>add</button>
              ) : (
                <button type='submit' className='btn bg-sky-400 text-white capitalize hover:bg-sky-600 w-1/3 border-none'>update</button>
              )}
            </div>
            <Link to={'/jobs'} className='btn bg-indigo-400 text-white capitalize hover:bg-indigo-600 w-1/3 border-none'>back</Link>
          </form>
        </div>
      </div >
    </section >
  )
}