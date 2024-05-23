import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  pendingJobs: number;
  interviewJobs: number;
  declinedJobs: number;
};

export function DoughnutChart({ pendingJobs, interviewJobs, declinedJobs }: DoughnutChartProps) {
  const data = {
    labels: ['Pending jobs', 'Interviews Scheduled', 'Jobs Declined'],
    datasets: [
      {
        label: '# of Jobs',
        data: [pendingJobs, interviewJobs, declinedJobs],
        backgroundColor: [
          '#fed7aa',
          '#bfdbfe',
          '#fecaca',
        ],
        borderColor: [
          '#d97706',
          '#2563eb',
          '#dc2626',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}
