import { Job } from '../types/job.types'

// Jobs in these statuses are considered closed/no longer in play.
export const TERMINAL_STATUSES = ['declined', 'Ghosting']

// "pending" means applied but no employer engagement yet.
export const NO_RESPONSE_STATUSES = ['pending', 'Ghosting']

export type Kpis = {
  total: number
  active: number
  responseRate: number
  appliedThisMonth: number
}

export function getKpis(jobs: Job[] = []): Kpis {
  const total = jobs.length

  const active = jobs.filter((job) => !TERMINAL_STATUSES.includes(job.status)).length

  const responded = jobs.filter((job) => !NO_RESPONSE_STATUSES.includes(job.status)).length
  const responseRate = total > 0 ? Math.round((responded / total) * 100) : 0

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  const appliedThisMonth = jobs.filter((job) => {
    const date = new Date(job.time)
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  }).length

  return { total, active, responseRate, appliedThisMonth }
}

export type ApplicationsByMonth = {
  labels: string[]
  counts: number[]
}

const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export function getApplicationsByMonth(jobs: Job[] = [], monthsBack = 6): ApplicationsByMonth {
  const now = new Date()
  const buckets: { key: string; label: string; count: number }[] = []
  const indexByKey = new Map<string, number>()

  // Build an ordered list of the last `monthsBack` months (oldest -> newest).
  for (let i = monthsBack - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const key = `${date.getFullYear()}-${date.getMonth()}`
    const label = `${MONTH_LABELS[date.getMonth()]} ${date.getFullYear()}`
    indexByKey.set(key, buckets.length)
    buckets.push({ key, label, count: 0 })
  }

  jobs.forEach((job) => {
    const date = new Date(job.time)
    const key = `${date.getFullYear()}-${date.getMonth()}`
    const idx = indexByKey.get(key)
    if (idx !== undefined) {
      buckets[idx].count++
    }
  })

  return {
    labels: buckets.map((bucket) => bucket.label),
    counts: buckets.map((bucket) => bucket.count),
  }
}
