export type StatusEvent = {
  status: string,
  time: number
}

export type Job = {
  _id: string,
  position: string,
  company: string,
  jobLocation: string,
  status: string,
  jobType: string,
  time: number,
  description: string,
  isFavorite: boolean,
  statusHistory?: StatusEvent[]
}