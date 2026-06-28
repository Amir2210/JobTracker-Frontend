import { statusClass, statusImg, statusImgBgColor } from '../utils/status.util'
import { FaStar, FaBriefcase, FaReply } from 'react-icons/fa'
import { FaSuitcase, FaLocationArrow } from 'react-icons/fa'

const MINI_WEEKDAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

// Sample dots keyed by day-of-month for the mini calendar preview.
const SAMPLE_CALENDAR: Record<number, string[]> = {
  3: ['pending'],
  9: ['interview', 'pending'],
  14: ['HR Interview'],
  18: ['phone call'],
  21: ['code assignment', 'interview'],
  27: ['declined'],
}

export function HomeShowcase() {
  return (
    <section className='bg-white py-16'>
      <div className='small-container sm:big-container'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold capitalize'>See it in action</h2>
          <p className='mt-3 text-lg text-slate-500'>A clean, focused workspace for every application you send.</p>
        </div>

        <div className='grid lg:grid-cols-3 gap-6'>
          {/* Mini job card */}
          <div className='rounded-xl border border-indigo-100 shadow-lg p-5 bg-white'>
            <div className='flex gap-4 items-center border-b border-indigo-100 pb-3'>
              <div className={`text-2xl text-white size-12 flex justify-center items-center rounded-lg ${statusImgBgColor('interview')}`}>
                {statusImg('interview')}
              </div>
              <div className='grow'>
                <h3 className='capitalize font-medium'>Frontend Developer</h3>
                <p className='capitalize text-sm text-slate-500'>Acme Inc</p>
              </div>
              <FaStar className='text-xl text-amber-400' />
            </div>
            <div className='flex items-center gap-3 mt-3 text-sm text-slate-600'>
              <FaLocationArrow className='text-slate-400' /> Remote
            </div>
            <div className='flex items-center gap-3 mt-2 text-sm text-slate-600'>
              <FaSuitcase className='text-slate-400' /> Full-time
            </div>
            <span className={`${statusClass('interview')} btn btn-sm mt-4 font-medium rounded-md cursor-auto capitalize`}>interview</span>
          </div>

          {/* KPI cards */}
          <div className='grid grid-cols-2 gap-4 content-start'>
            <div className='rounded-xl bg-white border-b-4 border-sky-500 shadow-lg p-5'>
              <div className='flex items-center justify-between'>
                <p className='text-3xl text-sky-600'>42</p>
                <div className='p-2 rounded-md bg-sky-200 text-sky-600'><FaBriefcase className='text-2xl' /></div>
              </div>
              <p className='mt-3 font-mono text-sm text-sky-950'>Total applications</p>
            </div>
            <div className='rounded-xl bg-white border-b-4 border-teal-500 shadow-lg p-5'>
              <div className='flex items-center justify-between'>
                <p className='text-3xl text-teal-600'>38%</p>
                <div className='p-2 rounded-md bg-teal-200 text-teal-600'><FaReply className='text-2xl' /></div>
              </div>
              <p className='mt-3 font-mono text-sm text-sky-950'>Response rate</p>
            </div>
            <div className='rounded-xl bg-white border-b-4 border-indigo-500 shadow-lg p-5 col-span-2'>
              <div className='flex items-center justify-between'>
                <p className='text-3xl text-indigo-600'>12</p>
                <p className='font-mono text-sm text-sky-950'>Active this month</p>
              </div>
            </div>
          </div>

          {/* Mini calendar */}
          <div className='rounded-xl border border-indigo-100 shadow-lg p-5 bg-white'>
            <div className='flex items-center justify-between mb-3'>
              <h3 className='font-medium'>This month</h3>
              <span className='text-sm text-slate-400'>Activity</span>
            </div>
            <div className='grid grid-cols-7 gap-1'>
              {MINI_WEEKDAYS.map((day, idx) => (
                <div key={idx} className='text-center text-[10px] text-slate-400'>{day}</div>
              ))}
              {Array.from({ length: 30 }, (_, i) => i + 1).map((dayNum) => {
                const dots = SAMPLE_CALENDAR[dayNum] ?? []
                return (
                  <div key={dayNum} className='aspect-square rounded border border-indigo-50 flex flex-col items-center justify-start p-0.5'>
                    <span className='text-[9px] text-slate-500'>{dayNum}</span>
                    <div className='flex flex-wrap gap-0.5 justify-center'>
                      {dots.map((status, idx) => (
                        <span key={idx} className={`size-1.5 rounded-full ${statusImgBgColor(status)}`} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
