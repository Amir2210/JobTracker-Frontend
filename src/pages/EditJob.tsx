import { useLocation } from 'react-router-dom'
import { Job } from '../types/job.types'
import { v4 as uuidv4 } from 'uuid'
function getEmptyNewJob(): Job {
  return {
    _id: uuidv4(),
    position: '',
    company: '',
    jobLocation: '',
    status: 'pending',
    jobType: 'full-time',
    time: Date.now()
  }
}

export function EditJob() {
  const location = useLocation();
  const job = location.state?.job;
  console.log(job)


  return (
    <h1> edit job</h1 >
  )
}