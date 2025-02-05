import { useSelector } from 'react-redux'
import { Navbar } from '../cmps/Navbar'
import { User, UserModule } from '../types/user.types'
import { Job } from '../types/job.types'
import { MdOutlinePendingActions } from "react-icons/md"
import { FaLocationArrow } from "react-icons/fa"
import { FaBug } from "react-icons/fa"
import { AiOutlineSchedule } from "react-icons/ai";
import { FaSuitcase } from "react-icons/fa"
import { FaCalendarAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { formatDate } from '../utils/util'
import { deleteJob, loadJobs, setFilterBy, setSortBy } from '../store/actions/user.actions'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { FilterJob } from '../cmps/FilterJob'
import { FilterBy, SortBy } from '../types/filter-sort'
// LOADER
import { FallingLines } from 'react-loader-spinner'
import { Pagination } from '../cmps/Pagination'
import AddJobButton from '../cmps/AddJobButton'


export function Jobs() {
  const userJobs: Job[] | undefined = useSelector((storeState: UserModule) => storeState.userModule.loggedInUser?.jobs)
  const user: User | null = useSelector((storeState: UserModule) => storeState.userModule.loggedInUser)
  const totalJobs = user?.totalFilteredJobs
  const filterBy: FilterBy = useSelector((storeState: UserModule) => storeState.userModule.filterBy)
  const sortBy: SortBy = useSelector((storeState: UserModule) => storeState.userModule.sortBy)
  const isLoading: boolean = useSelector((storeState: UserModule) => storeState.userModule.isLoading)
  useEffect(() => {
    if (user) {
      loadJobs(user._id, filterBy, sortBy)
    }
    return () => {
    }
  }, [filterBy, sortBy])

  // useEffect(() => {
  //   const reloaded = localStorage.getItem('pageReloaded');

  //   if (!reloaded) {
  //     // Set the flag to indicate the page has been reloaded
  //     localStorage.setItem('pageReloaded', 'true');
  //     // Reload the page
  //     window.location.reload();
  //   }
  //   return () => {
  //     resetFilterAndSortBy()
  //     localStorage.removeItem('pageReloaded');
  //   }
  // }, [])

  function onSetFilter(filterBy: FilterBy) {
    setFilterBy(filterBy)
  }

  function onSetSort(sortBy: SortBy) {
    setSortBy(sortBy)
  }

  function statusClass(status: string): string {
    if (status === 'pending') {
      return 'bg-orange-200 text-orange-600 hover:bg-orange-200 border-none'
    } else if (status === 'interview') {
      return 'bg-blue-200 text-blue-600 hover:bg-blue-200 border-none'
    } else if (status === 'HR Interview') {
      return 'bg-purple-200 text-purple-600 hover:bg-purple-200 border-none'
    }
    else {
      return 'bg-red-200 text-red-600 hover:bg-red-200 border-none'
    }
  }

  function statusImg(status: string): JSX.Element | undefined {
    if (status === 'pending') {
      return <MdOutlinePendingActions />
    } else if (status === 'interview') {
      return <AiOutlineSchedule />
    } else if (status === 'HR Interview') {
      return <ImProfile />
    }
    else {
      return <FaBug />
    }
  }

  async function onDeleteJob(job_id: string) {
    try {
      deleteJob(job_id)
      toast.success('Job deleted successfully')
      // window.location.reload()
    } catch (error) {
      console.log(error)
      toast.error('Unfortunately, we could not delete a job')
    }
  }
  return (
    <section >
      <Navbar />
      <div className='bg-base-200 min-h-screen'>
        <div className='small-container sm:big-container sm:mt-4 sm:py-4 py-2  '>
          <FilterJob filterBy={filterBy} onSetFilter={onSetFilter} sortBy={sortBy} onSetSort={onSetSort} />
          <h1 className='text-2xl capitalize font-medium'>{totalJobs} {totalJobs === 1 ? 'job' : 'jobs'} found</h1>
          <div className='grid sm:grid-cols-2 gap-5 mt-4'>
            {!isLoading && userJobs?.map(job => <article key={job._id} className='sm:mt-4 sm:py-4 py-2 px-2 rounded-lg bg-base-100 h-fit'>
              <div className='flex gap-8 border-solid border-indigo-100 border-b py-3 px-3'>
                <div className='text-4xl bg-sky-400 text-white font-mono font-bold size-14 flex justify-center items-center rounded-lg'>{statusImg(job.status)}</div>
                <div>
                  <h1 className=' text-xl capitalize mb-1'>{job.position}</h1>
                  <h2 className=' capitalize'>{job.company}</h2>
                </div>
              </div>
              <div className='grid sm:grid-cols-2 gap-6 sm:gap-8 py-3 px-3'>
                <div className='flex items-center gap-5'>
                  <FaLocationArrow className='text-slate-400' />
                  <p className=' text-lg capitalize'>{job.jobLocation}</p>
                </div>
                <div className='flex items-center gap-5'>
                  <FaSuitcase className='text-slate-400' />
                  <p className=' text-lg capitalize'>{job.jobType}</p>
                </div>
              </div>
              <div className='grid sm:grid-cols-2 gap-6 sm:gap-8 py-3 px-3'>
                <div className='flex items-center gap-5'>
                  <FaCalendarAlt className='text-slate-400' />
                  <p className=' text-lg capitalize'>{formatDate(job.time)}</p>
                </div>
                <div tabIndex={0} className=" sm:hidden collapse collapse-arrow border-indigo-100 border">
                  <div className="collapse-title text-xl">Description:</div>
                  <div className="collapse-content">
                    <p>{job.description}</p>
                  </div>
                </div>
                <div className='flex items-center gap-5'>
                  <p className={`${statusClass(job.status)} btn  font-medium rounded-md cursor-auto`}>{job.status}</p>
                </div>
              </div>
              <div tabIndex={0} className="hidden sm:grid collapse collapse-arrow border-indigo-100 border">
                <div className="collapse-title text-xl">Description:</div>
                <div className="collapse-content">
                  <p>{job.description}</p>
                </div>
              </div>
              <div className='flex gap-5 py-3 px-3'>
                <div className='flex items-center '>
                  <Link to={'/addJob'} state={{ job }} className='btn capitalize bg-lime-100 text-lime-600 rounded-md hover:bg-lime-200 border-none'>edit</Link>
                </div>
                <div className='flex items-center '>
                  <button onClick={() => onDeleteJob(job._id)} className='btn capitalize bg-red-100 text-red-600 shadow-lg shadow-red100/50 hover:bg-red-200 border-none'>delete</button>
                </div>
              </div>
            </article>)}
            {isLoading && <FallingLines
              color="#38bdf8"
              width="100"
              visible={true}
            />}
          </div>
          <Pagination totalJobs={totalJobs} filterBy={filterBy} onSetFilter={onSetFilter} />
          {!userJobs?.length && !filterBy.txt && !filterBy.status && !filterBy.jobType && <div className='flex flex-col justify-center items-center mt-4'>
            <img className='size-48 sm:size-96' src="https://res.cloudinary.com/dxm0sqcfp/image/upload/v1715154175/job%20tracker/ocfxopyi3lshmxzmucwd.svg" alt="" />
            <p className='capitalize mt-4 text-2xl sm:text-4xl'>add your first job <span className='link text-sky-400'><Link to={'/addJob'}>here</Link> </span></p>
          </div>}
        </div>
        <AddJobButton />
      </div>
    </section>
  )
}