import { Job } from '../types/job.types'
import { ensureStatusHistory } from './status.util'

export type CalendarEvent = {
  job: Job
  status: string
  time: number
  isApplied: boolean
}

export function dayKey(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}

export function getMonthMatrix(monthDate: Date): Date[][] {
  const year = monthDate.getFullYear()
  const month = monthDate.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const startOffset = firstOfMonth.getDay() // 0 = Sunday

  const weeks: Date[][] = []
  const cursor = new Date(year, month, 1 - startOffset)

  for (let week = 0; week < 6; week++) {
    const days: Date[] = []
    for (let day = 0; day < 7; day++) {
      days.push(new Date(cursor))
      cursor.setDate(cursor.getDate() + 1)
    }
    weeks.push(days)
  }

  return weeks
}

export function buildEventsByDay(jobs: Job[] = []): Map<string, CalendarEvent[]> {
  const map = new Map<string, CalendarEvent[]>()

  jobs.forEach((job) => {
    const history = ensureStatusHistory(job)
    history.forEach((event, index) => {
      const key = dayKey(new Date(event.time))
      const calendarEvent: CalendarEvent = {
        job,
        status: event.status,
        time: event.time,
        isApplied: index === 0,
      }
      const existing = map.get(key)
      if (existing) {
        existing.push(calendarEvent)
      } else {
        map.set(key, [calendarEvent])
      }
    })
  })

  return map
}
