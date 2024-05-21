import { FilterBy, SortBy } from '../types/filter-sort'

export const jobsService = {
  getDefaultFilterBy,
  getDefaultSortBy
}

function getDefaultFilterBy(): FilterBy {
  return {
    txt: '',
    status: '',
    jobType: '',
  }
}

function getDefaultSortBy(): SortBy {
  return {
    subject: ''
  }
}