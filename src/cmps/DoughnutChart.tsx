import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  pendingJobs: number;
  interviewJobs: number;
  declinedJobs: number;
  hrInterviewJobs: number;
  ghostingJobs: number
};

export function DoughnutChart({ pendingJobs, interviewJobs, declinedJobs, hrInterviewJobs, ghostingJobs }: DoughnutChartProps) {
  const data = {
    labels: ['Pending jobs', 'Interviews Scheduled', 'Jobs Declined', 'HR Interviews', 'Ghosting'],
    datasets: [
      {
        label: '# of Jobs',
        data: [pendingJobs, interviewJobs, declinedJobs, hrInterviewJobs, ghostingJobs],
        backgroundColor: [
          '#fed7aa',
          '#bfdbfe',
          '#fecaca',
          '#E3A5C7',
          '#D9DFC6'
        ],
        borderColor: [
          '#d97706',
          '#2563eb',
          '#dc2626',
          '#BF2EF0',
          '#727D73'
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}
