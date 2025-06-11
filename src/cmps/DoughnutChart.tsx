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
  codeAssignmentJobs: number
};

export function DoughnutChart({ pendingJobs, interviewJobs, declinedJobs, hrInterviewJobs, ghostingJobs, phoneCallJobs, codeAssignmentJobs }: DoughnutChartProps) {
  const data = {
    labels: ['Pending Jobs', 'Interviews Scheduled', 'Jobs Declined', 'HR Interviews', 'Ghosting', 'Phone Call', 'Code Assignment'],
    datasets: [
      {
        label: '# of Jobs',
        data: [pendingJobs, interviewJobs, declinedJobs, hrInterviewJobs, ghostingJobs, phoneCallJobs, codeAssignmentJobs],
        backgroundColor: [
          '#fed7aa',
          '#bfdbfe',
          '#fecaca',
          '#c084fc',
          '#D9DFC6',
          '#f9a8d4',
          '#a7f3d0'
        ],
        borderColor: [
          '#d97706',
          '#2563eb',
          '#dc2626',
          '#9333ea',
          '#727D73',
          '#ec4899',
          '#a7f3d0',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
}
