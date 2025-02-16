import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
//components
import { Pagination } from '../cmps/Pagination'
import AddJobButton from '../cmps/AddJobButton'
import { JobsList } from '../cmps/JobsList'
import { Navbar } from '../cmps/Navbar'
import { FilterJob } from '../cmps/FilterJob'
//types
import { User, UserModule } from '../types/user.types'
import { FilterBy, SortBy } from '../types/filter-sort'
import { Job } from '../types/job.types'
//action
import { loadJobs, setFilterBy, setSortBy } from '../store/actions/user.actions'


export function Jobs() {
  const [isLastJobVisible, setIsLastJobVisible] = useState(false);
  const lastJobRef = useRef<HTMLDivElement | null>(null);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsLastJobVisible(entry.isIntersecting);
      },
      { threshold: 1.0 }
    );

    if (lastJobRef.current) {
      observer.observe(lastJobRef.current);
    }

    return () => {
      if (lastJobRef.current) {
        observer.unobserve(lastJobRef.current);
      }
    };
  }, [userJobs]);


  function onSetFilter(filterBy: FilterBy) {
    setFilterBy(filterBy)
  }

  function onSetSort(sortBy: SortBy) {
    setSortBy(sortBy)
  }

  return (
    <section >
      <Navbar />
      <div className='bg-base-200 min-h-screen'>
        <div className='small-container sm:big-container sm:mt-4 sm:py-4 py-2  '>
          <FilterJob filterBy={filterBy} onSetFilter={onSetFilter} sortBy={sortBy} onSetSort={onSetSort} />
          <h1 className='text-2xl capitalize font-medium'>{totalJobs} {totalJobs === 1 ? 'job' : 'jobs'} found</h1>
          /////////
          <JobsList isLoading={isLoading} userJobs={userJobs} lastJobRef={lastJobRef} />
          {/* <div className='grid sm:grid-cols-2 gap-5 mt-4'>
            {!isLoading && userJobs?.map((job, index: number) => <article ref={index === userJobs.length - 1 ? lastJobRef : null} key={job._id} className='sm:mt-4 sm:py-4 py-2 px-2 rounded-lg bg-base-100 h-fit'>
              <div className='flex gap-8 border-solid border-indigo-100 border-b py-3 px-3'>
                <div className={`text-4xl text-white font-mono font-bold size-14 flex justify-center items-center rounded-lg ${statusImgBgColor(job.status)}`}>{statusImg(job.status)}</div>
                <div>
                  <h1 className=' text-xl capitalize mb-1'>{job.position}</h1>
                  <h2 className=' capitalize'>{job.company}</h2>
                </div>
                <div className='flex ml-auto items-center'>
                  <CiStar className='text-4xl' />
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
          </div> */}
          //////////
          <Pagination totalJobs={totalJobs} filterBy={filterBy} onSetFilter={onSetFilter} />
          {!userJobs?.length && !filterBy.txt && !filterBy.status && !filterBy.jobType && <div className='flex flex-col justify-center items-center mt-4'>
            <img className='size-48 sm:size-96' src="https://res.cloudinary.com/dxm0sqcfp/image/upload/v1715154175/job%20tracker/ocfxopyi3lshmxzmucwd.svg" alt="" />
            <p className='capitalize mt-4 text-2xl sm:text-4xl'>add your first job <span className='link text-sky-400'><Link to={'/addJob'}>here</Link> </span></p>
          </div>}
        </div>
        {!isLastJobVisible && <AddJobButton />}
      </div>
    </section>
  )
}