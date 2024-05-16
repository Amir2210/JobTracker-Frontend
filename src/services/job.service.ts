import { Job } from '../types/job.types'
import { httpService } from './http.service'

export const jobService = {
  save
}


function save(job: Job) {
  if (job._id) {
    // second parameter is the body of the url
    return httpService.put(`job/${job._id}`, job)
  } else {
    return httpService.post('job', job)
  }
}
