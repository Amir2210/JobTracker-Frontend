//types
import { RefObject } from 'react'
import { Job } from '../types/job.types'
import { JobsPreview } from './JobsPreview'
// LOADER
import { FallingLines } from 'react-loader-spinner'
//interface
interface jobListProps {
  isLoading: boolean
  userJobs: Job[] | undefined
  lastJobRef?: RefObject<HTMLDivElement>
}


export function JobsList({ isLoading, userJobs, lastJobRef }: jobListProps) {

  return (
    <div className='grid sm:grid-cols-2 gap-5 mt-4'>
      {!isLoading && userJobs?.map((job, index: number) => <JobsPreview key={job._id} job={job} index={index} userJobs={userJobs} lastJobRef={lastJobRef} />)}
      {isLoading && <FallingLines
        color="#38bdf8"
        width="100"
        visible={true}
      />}
    </div>
  )
}
