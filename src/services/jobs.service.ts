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
    pageIdx: 0
  }
}

function getDefaultSortBy(): SortBy {
  return {
    subject: ''
  }
}