import { FilterBy } from '../types/filter-sort'

export const jobsService = {
  getDefaultFilterBy
}

function getDefaultFilterBy(): FilterBy {
  return {
    txt: '',
    status: '',
    jobType: '',
  }
}