import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  pendingJobs: number;
  interviewJobs: number;
  declinedJobs: number;
  hrInterviewJobs: number;
};

export function DoughnutChart({ pendingJobs, interviewJobs, declinedJobs, hrInterviewJobs }: DoughnutChartProps) {
  const data = {
    labels: ['Pending jobs', 'Interviews Scheduled', 'Jobs Declined', 'HR Interviews'],
    datasets: [
      {
        label: '# of Jobs',
        data: [pendingJobs, interviewJobs, declinedJobs, hrInterviewJobs],
        backgroundColor: [
          '#fed7aa',
          '#bfdbfe',
          '#fecaca',
          '#E3A5C7'
        ],
        borderColor: [
          '#d97706',
          '#2563eb',
          '#dc2626',
          '#BF2EF0'
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}
