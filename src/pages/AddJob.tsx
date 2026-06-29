import { useState } from 'react'
import { Navbar } from '../cmps/Navbar'
import { Job } from '../types/job.types'
import { addJob, editJob } from '../store/actions/user.actions'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoIosArrowBack } from "react-icons/io"
import { FaBriefcase, FaBuilding, FaMapMarkerAlt, FaSuitcase, FaRegFileAlt } from "react-icons/fa"
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { Helmet } from "react-helmet-async";
import { STATUS_OPTIONS } from '../utils/status.util'


function getEmptyNewJob(): Job {
  return {
    _id: uuidv4(),
    position: '',
    company: '',
    jobLocation: '',
    status: 'pending',
    jobType: 'full-time',
    time: Date.now(),
    description: '',
    isFavorite: false
  }
}

const inputClass = 'w-full bg-base-200 border border-base-300 rounded-xl py-2.5 pl-10 pr-3 outline-none transition focus:bg-base-100 focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 text-base-content'
const selectClass = 'w-full bg-base-200 border border-base-300 rounded-xl py-2.5 px-3 outline-none transition focus:bg-base-100 focus:ring-2 focus:ring-sky-400/40 focus:border-sky-400 text-base-content capitalize'
const labelClass = 'block mb-1.5 text-sm font-medium text-base-content/70 capitalize'

export function AddJob() {
  const location = useLocation()
  const jobToEdit = location.state?.job as Job | undefined;
  const [job, setJob] = useState<Job>(jobToEdit || getEmptyNewJob())
  const navigate = useNavigate()
  const { executeRecaptcha } = useGoogleReCaptcha()


  function handleInputsChange(ev: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) {
    const field = ev.target.name
    const value = ev.target.value
    setJob((job) => ({ ...job, [field]: value }))
  }

  async function onAddNewJob(ev: React.FormEvent) {
    ev.preventDefault()
    if (!executeRecaptcha) {
      toast.error("reCAPTCHA is not ready. Please try again.")
      return
    }
    try {
      const token = await executeRecaptcha("addJob") // ✅ Generate reCAPTCHA token
      if (jobToEdit) {
        editJob(job)
        toast.success('job has been updated')
        navigate('/jobs')
      } else {
        await addJob(job, token)
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
    <>
      <Helmet>
        <title>{jobToEdit ? "Edit Job - Job Tracker" : "Add Job - Job Tracker"}</title>
        <meta
          name="description"
          content="Easily add, edit, and track job applications in Job Tracker. Manage job positions, status, and descriptions effortlessly."
        />
      </Helmet>
      <section>
        <Navbar />
        <div className='bg-base-200 min-h-screen'>
          <div className='small-container sm:big-container sm:mt-4 py-4'>
            <div className='max-w-2xl mx-auto bg-base-100 rounded-2xl shadow-xl border border-base-300 p-6 sm:p-8'>
              {/* Header */}
              <div className='flex items-center gap-4 mb-6'>
                <Link to={'/jobs'} className='btn btn-circle btn-ghost border border-base-300' aria-label='Back to jobs'>
                  <IoIosArrowBack className='text-xl' />
                </Link>
                <div>
                  <h1 className='text-2xl sm:text-3xl font-semibold capitalize'>{jobToEdit ? 'edit job' : 'add job'}</h1>
                  <p className='text-sm text-base-content/60'>{jobToEdit ? 'Update the details of this application.' : 'Track a new job application.'}</p>
                </div>
              </div>

              <form onSubmit={onAddNewJob} className='grid sm:grid-cols-2 gap-4'>
                <div>
                  <label className={labelClass} htmlFor="position">position</label>
                  <div className='relative'>
                    <FaBriefcase className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40' />
                    <input onChange={handleInputsChange} id='position' name='position' value={position} type="text" required className={inputClass} placeholder='e.g. Frontend Developer' />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="company">company</label>
                  <div className='relative'>
                    <FaBuilding className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40' />
                    <input onChange={handleInputsChange} id='company' name='company' value={company} type="text" required className={inputClass} placeholder='e.g. Acme Inc.' />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="jobLocation">job location</label>
                  <div className='relative'>
                    <FaMapMarkerAlt className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40' />
                    <input onChange={handleInputsChange} id='jobLocation' name='jobLocation' value={jobLocation} type="text" required className={inputClass} placeholder='e.g. Remote / Tel Aviv' />
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="jobType">job type</label>
                  <div className='relative'>
                    <FaSuitcase className='absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-base-content/40 z-10' />
                    <select onChange={handleInputsChange} id='jobType' name='jobType' value={jobType} className={`${selectClass} pl-10`}>
                      <option>full-time</option>
                      <option>part-time</option>
                      <option>remote</option>
                      <option>internship</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className={labelClass} htmlFor="status">status</label>
                  <select onChange={handleInputsChange} id='status' name='status' value={status} className={selectClass}>
                    {STATUS_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className='sm:col-span-2'>
                  <label className={labelClass} htmlFor="description">description</label>
                  <div className='relative'>
                    <FaRegFileAlt className='absolute left-3.5 top-3 w-4 h-4 text-base-content/40' />
                    <textarea onChange={handleInputsChange} id='description' name='description' value={description} rows={4} className={`${inputClass} pt-2.5 resize-y`} placeholder='Notes about the role, interview, etc.'></textarea>
                  </div>
                </div>

                <div className='sm:col-span-2 flex flex-wrap gap-3 pt-2'>
                  <button type='submit' className='btn bg-sky-500 hover:bg-sky-600 text-white border-none rounded-xl px-8 capitalize grow sm:grow-0 active:scale-[0.99]'>
                    {jobToEdit ? 'update' : 'add'}
                  </button>
                  <button type='button' onClick={onClearInputs} className='btn bg-base-200 hover:bg-base-300 border-base-300 rounded-xl px-6 capitalize active:scale-[0.99]'>clear</button>
                  <Link to={'/jobs'} className='btn btn-ghost rounded-xl px-6 capitalize ml-auto'>cancel</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
