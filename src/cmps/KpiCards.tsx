import { Job } from '../types/job.types'
import { getKpis } from '../utils/stats.util'
import { FaBriefcase } from 'react-icons/fa'
import { FaBolt } from 'react-icons/fa6'
import { FaReply } from 'react-icons/fa6'
import { FaCalendarDay } from 'react-icons/fa6'

type KpiCardsProps = {
  jobs: Job[]
}

type CardConfig = {
  label: string
  value: string
  icon: JSX.Element
  accent: string
  iconBg: string
  valueColor: string
}

export function KpiCards({ jobs }: KpiCardsProps) {
  const { total, active, responseRate, appliedThisMonth } = getKpis(jobs)

  const cards: CardConfig[] = [
    {
      label: 'Total Applications',
      value: `${total}`,
      icon: <FaBriefcase className='text-4xl' />,
      accent: 'border-sky-500',
      iconBg: 'bg-sky-200 text-sky-600',
      valueColor: 'text-sky-600',
    },
    {
      label: 'Active Applications',
      value: `${active}`,
      icon: <FaBolt className='text-4xl' />,
      accent: 'border-indigo-500',
      iconBg: 'bg-indigo-200 text-indigo-600',
      valueColor: 'text-indigo-600',
    },
    {
      label: 'Response Rate',
      value: `${responseRate}%`,
      icon: <FaReply className='text-4xl' />,
      accent: 'border-teal-500',
      iconBg: 'bg-teal-200 text-teal-600',
      valueColor: 'text-teal-600',
    },
    {
      label: 'Applied This Month',
      value: `${appliedThisMonth}`,
      icon: <FaCalendarDay className='text-4xl' />,
      accent: 'border-amber-500',
      iconBg: 'bg-amber-200 text-amber-600',
      valueColor: 'text-amber-600',
    },
  ]

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
      {cards.map((card) => (
        <div key={card.label} className={`sm:shadow-xl sm:mt-4 p-6 rounded-lg bg-white border-b-4 ${card.accent}`}>
          <div className='flex items-center justify-between'>
            <p className={`text-4xl ${card.valueColor}`}>{card.value}</p>
            <div className={`p-2 rounded-md ${card.iconBg}`}>{card.icon}</div>
          </div>
          <p className='mt-4 font-mono text-lg text-sky-950'>{card.label}</p>
        </div>
      ))}
    </div>
  )
}
