import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

type DoughnutChartProps = {
  pendingJobs: number;
  interviewJobs: number;
  declinedJobs: number;
  hrInterviewJobs: number;
  ghostingJobs: number
  phoneCallJobs: number
};

export function DoughnutChart({ pendingJobs, interviewJobs, declinedJobs, hrInterviewJobs, ghostingJobs, phoneCallJobs }: DoughnutChartProps) {
  const data = {
    labels: ['Pending Jobs', 'Interviews Scheduled', 'Jobs Declined', 'HR Interviews', 'Ghosting', 'Phone Call'],
    datasets: [
      {
        label: '# of Jobs',
        data: [pendingJobs, interviewJobs, declinedJobs, hrInterviewJobs, ghostingJobs, phoneCallJobs],
        backgroundColor: [
          '#fed7aa',
          '#bfdbfe',
          '#fecaca',
          '#c084fc',
          '#D9DFC6',
          '#f9a8d4 '
        ],
        borderColor: [
          '#d97706',
          '#2563eb',
          '#dc2626',
          '#9333ea',
          '#727D73',
          '#ec4899',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}
