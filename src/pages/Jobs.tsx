import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from "react-helmet-async"
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
  const [isLastJobVisible, setIsLastJobVisible] = useState(false)
  const lastJobRef = useRef<HTMLDivElement | null>(null)
  const [isFavoriteShow, setIsFavoriteShow] = useState(false)
  const userJobs: Job[] | undefined = useSelector((storeState: UserModule) => storeState.userModule.loggedInUser?.jobs)
  const userFavoriteJobs: Job[] | undefined = useSelector((storeState: UserModule) => storeState.userModule.loggedInUser?.jobs?.filter(job => job.isFavorite))
  const totalFavoriteJobs: number | undefined = userFavoriteJobs?.length
  const user: User | null = useSelector((storeState: UserModule) => storeState.userModule.loggedInUser)
  const isDemoUser = user?.fullName === 'demo user'
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
  }, [filterBy, sortBy,])

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
    <>
      <Helmet>
        <title>Job Listings - JobTracker</title>
        <meta name="description" content="Browse and filter your job applications on JobTracker. Find favorite jobs, sort by criteria, and manage your job search effectively." />
      </Helmet>
      <section >
        <Navbar />
        <div className='bg-base-200 min-h-screen'>
          <div className='small-container sm:big-container sm:mt-4 sm:py-4 py-2  '>
            <FilterJob filterBy={filterBy} onSetFilter={onSetFilter} sortBy={sortBy} onSetSort={onSetSort} />
            <div className='flex justify-between items-center'>
              {isFavoriteShow ? <h1 className='text-2xl capitalize font-medium'>{userFavoriteJobs?.length} favorite {userFavoriteJobs?.length === 1 ? 'job' : 'jobs'} found</h1> : <h1 className='text-2xl capitalize font-medium'>{totalJobs} {totalJobs === 1 ? 'job' : 'jobs'} found</h1>}
              <button onClick={() => setIsFavoriteShow(!isFavoriteShow)} className=' btn bg-sky-400 hover:bg-sky-600 text-white text-lg sm:text-xl capitalize font-medium'>{isFavoriteShow ? 'show all jobs' : 'show favorite jobs'}</button>
            </div>
            <JobsList isDemoUser={isDemoUser} isLoading={isLoading} userJobs={userJobs} lastJobRef={lastJobRef} userFavoriteJobs={userFavoriteJobs} isFavoriteShow={isFavoriteShow} />
            <Pagination isFavoriteShow={isFavoriteShow} totalFavoriteJobs={totalFavoriteJobs} totalJobs={totalJobs} filterBy={filterBy} onSetFilter={onSetFilter} />
            {!userJobs?.length && !filterBy.txt && !filterBy.status && !filterBy.jobType && <div className='flex flex-col justify-center items-center mt-4'>
              <img className='size-48 sm:size-96' src="https://res.cloudinary.com/dxm0sqcfp/image/upload/v1715154175/job%20tracker/ocfxopyi3lshmxzmucwd.svg" alt="" />
              <p className='capitalize mt-4 text-2xl sm:text-4xl'>add your first job <span className='link text-sky-400'><Link to={'/addJob'}>here</Link> </span></p>
            </div>}
          </div>
          {!isLastJobVisible && <AddJobButton />}
        </div>
      </section>
    </>
  )
}