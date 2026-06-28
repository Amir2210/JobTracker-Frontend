import { CalendarEvent, dayKey, getMonthMatrix } from '../utils/calendar.util'
import { statusImgBgColor } from '../utils/status.util'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

type CalendarProps = {
  monthDate: Date
  eventsByDay: Map<string, CalendarEvent[]>
  selectedDay: Date | null
  onSelectDay: (date: Date) => void
  onPrev: () => void
  onNext: () => void
  onToday: () => void
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const MAX_DOTS = 3

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function Calendar({ monthDate, eventsByDay, selectedDay, onSelectDay, onPrev, onNext, onToday }: CalendarProps) {
  const weeks = getMonthMatrix(monthDate)
  const today = new Date()
  const currentMonth = monthDate.getMonth()

  return (
    <section className='sm:shadow-xl sm:mt-4 p-4 sm:p-6 rounded-lg bg-base-100'>
      <header className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-medium'>{MONTHS[currentMonth]} {monthDate.getFullYear()}</h1>
        <div className='flex items-center gap-2'>
          <button onClick={onToday} className='btn btn-sm bg-sky-600 text-white capitalize hover:bg-sky-700 border-none'>today</button>
          <button onClick={onPrev} aria-label='Previous month' className='btn btn-sm btn-circle btn-ghost'><IoIosArrowBack className='text-xl' /></button>
          <button onClick={onNext} aria-label='Next month' className='btn btn-sm btn-circle btn-ghost'><IoIosArrowForward className='text-xl' /></button>
        </div>
      </header>

      <div className='grid grid-cols-7 gap-1 sm:gap-2'>
        {WEEKDAYS.map((day) => (
          <div key={day} className='text-center text-xs sm:text-sm font-medium text-slate-400 py-1'>{day}</div>
        ))}

        {weeks.map((week) =>
          week.map((date) => {
            const events = eventsByDay.get(dayKey(date)) ?? []
            const inMonth = date.getMonth() === currentMonth
            const isToday = isSameDay(date, today)
            const isSelected = selectedDay ? isSameDay(date, selectedDay) : false

            return (
              <button
                key={date.toISOString()}
                onClick={() => onSelectDay(date)}
                aria-label={`${date.toDateString()}, ${events.length} event(s)`}
                aria-pressed={isSelected}
                className={`min-h-16 sm:min-h-24 p-1 sm:p-2 rounded-lg border text-left align-top transition-colors
                  ${inMonth ? 'bg-base-100' : 'bg-base-200 opacity-50'}
                  ${isSelected ? 'border-sky-600 border-2' : 'border-indigo-100'}
                  hover:border-sky-400`}
              >
                <div className={`text-xs sm:text-sm font-medium flex justify-center items-center size-6 rounded-full mb-1
                  ${isToday ? 'bg-sky-600 text-white' : 'text-slate-600'}`}>
                  {date.getDate()}
                </div>
                <div className='flex flex-wrap gap-1'>
                  {events.slice(0, MAX_DOTS).map((event, idx) => (
                    <span
                      key={`${event.job._id}-${event.time}-${idx}`}
                      className={`size-2 sm:size-2.5 rounded-full ${statusImgBgColor(event.status)}`}
                      title={`${event.job.position} - ${event.status}`}
                    />
                  ))}
                  {events.length > MAX_DOTS && (
                    <span className='text-[10px] sm:text-xs text-slate-400 leading-none'>+{events.length - MAX_DOTS}</span>
                  )}
                </div>
              </button>
            )
          })
        )}
      </div>
    </section>
  )
}
