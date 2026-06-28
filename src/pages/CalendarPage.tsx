import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Navbar } from '../cmps/Navbar'
import { Calendar } from '../cmps/Calendar'
import { JobDetails } from '../cmps/JobDetails'
import { User, UserModule } from '../types/user.types'
import { FilterBy, SortBy } from '../types/filter-sort'
import { Job } from '../types/job.types'
import { loadJobs } from '../store/actions/user.actions'
import { buildEventsByDay, dayKey } from '../utils/calendar.util'
import { statusClass, statusImg, statusImgBgColor } from '../utils/status.util'
import { formatDate } from '../utils/util'
import { FaBug } from 'react-icons/fa'

export function CalendarPage() {
  const user: User | null = useSelector((storeState: UserModule) => storeState.userModule.loggedInUser)
  const filterBy: FilterBy = useSelector((storeState: UserModule) => storeState.userModule.filterBy)
  const sortBy: SortBy = useSelector((storeState: UserModule) => storeState.userModule.sortBy)
  const userJobs: Job[] | undefined = useSelector((storeState: UserModule) => storeState.userModule.loggedInUser?.allJobs)

  const [monthDate, setMonthDate] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<Date | null>(new Date())
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const isDemoUser = user?.fullName === 'demo user'

  useEffect(() => {
    if (user) {
      loadJobs(user._id, filterBy, sortBy)
    }
  }, [])

  const allJobs: Job[] = userJobs ?? []
  const eventsByDay = useMemo(() => buildEventsByDay(allJobs), [allJobs])

  const selectedEvents = selectedDay ? eventsByDay.get(dayKey(selectedDay)) ?? [] : []

  function onPrev() {
    setMonthDate((date) => new Date(date.getFullYear(), date.getMonth() - 1, 1))
  }
  function onNext() {
    setMonthDate((date) => new Date(date.getFullYear(), date.getMonth() + 1, 1))
  }
  function onToday() {
    const now = new Date()
    setMonthDate(now)
    setSelectedDay(now)
  }
  function onSelectDay(date: Date) {
    setSelectedDay(date)
    setMonthDate(new Date(date.getFullYear(), date.getMonth(), 1))
  }
  function onOpenJob(job: Job) {
    setSelectedJob(job)
    setIsDrawerOpen(true)
  }

  return (
    <>
      <Helmet>
        <title>Calendar - JobTracker</title>
        <meta name="description" content="View your job application activity on a monthly calendar in JobTracker." />
      </Helmet>
      <section>
        <Navbar />
        <div className='bg-base-200 min-h-screen'>
          <div className='small-container sm:big-container sm:mt-4 sm:py-4 py-2'>
            {!allJobs.length ? (
              <div className='flex flex-col justify-center items-center mt-10 text-center'>
                <FaBug className='text-6xl text-sky-400 mb-4' />
                <p className='capitalize text-2xl sm:text-3xl'>no data yet</p>
                <p className='mt-2 text-lg'>
                  <Link to={'/addJob'} className='link text-sky-600'>Add your first job</Link> to see your calendar.
                </p>
              </div>
            ) : (
              <>
                <Calendar
                  monthDate={monthDate}
                  eventsByDay={eventsByDay}
                  selectedDay={selectedDay}
                  onSelectDay={onSelectDay}
                  onPrev={onPrev}
                  onNext={onNext}
                  onToday={onToday}
                />

                {selectedDay && (
                  <div className='sm:shadow-xl mt-4 sm:mt-6 p-4 sm:p-6 rounded-lg bg-base-100'>
                    <h2 className='text-xl font-medium mb-3'>{formatDate(selectedDay.getTime())}</h2>
                    {selectedEvents.length ? (
                      <ul className='flex flex-col gap-2'>
                        {selectedEvents.map((event, idx) => (
                          <li key={`${event.job._id}-${event.time}-${idx}`}>
                            <button
                              onClick={() => onOpenJob(event.job)}
                              className='w-full flex items-center gap-4 p-3 rounded-lg border border-indigo-100 hover:border-sky-400 text-left'
                            >
                              <div className={`text-xl text-white size-10 flex justify-center items-center rounded-lg ${statusImgBgColor(event.status)}`}>
                                {statusImg(event.status)}
                              </div>
                              <div className='grow'>
                                <p className='capitalize font-medium'>{event.job.position}</p>
                                <p className='capitalize text-sm text-slate-500'>{event.job.company}</p>
                              </div>
                              <span className={`${statusClass(event.status)} btn btn-sm font-medium rounded-md cursor-auto capitalize`}>
                                {event.isApplied ? 'applied' : event.status}
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className='text-slate-500'>No activity on this day.</p>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {selectedJob && (
        <JobDetails
          job={selectedJob}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          isDemoUser={isDemoUser}
        />
      )}
    </>
  )
}
