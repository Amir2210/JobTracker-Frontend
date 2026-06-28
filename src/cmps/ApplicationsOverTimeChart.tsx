import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { Job } from '../types/job.types'
import { getApplicationsByMonth } from '../utils/stats.util'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

type ApplicationsOverTimeChartProps = {
  jobs: Job[]
  monthsBack?: number
}

export function ApplicationsOverTimeChart({ jobs, monthsBack = 6 }: ApplicationsOverTimeChartProps) {
  const { labels, counts } = getApplicationsByMonth(jobs, monthsBack)

  const data = {
    labels,
    datasets: [
      {
        label: 'Applications',
        data: counts,
        backgroundColor: '#7dd3fc',
        borderColor: '#0284c7',
        borderWidth: 1,
        borderRadius: 6,
        maxBarThickness: 56,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx: { parsed: { y: number | null } }) => {
            const value = ctx.parsed.y ?? 0
            return ` ${value} ${value === 1 ? 'application' : 'applications'}`
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  return <Bar data={data} options={options} />
}
