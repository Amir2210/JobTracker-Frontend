import { JobView } from './JobsList'

export function JobCardSkeleton({ view = 'grid' }: { view?: JobView }) {
  if (view === 'list') {
    return (
      <div className='bg-base-100 rounded-xl border border-base-300 shadow-sm overflow-hidden'>
        <div className='h-1 w-full skeleton rounded-none' />
        <div className='flex items-center gap-4 p-4'>
          <div className='skeleton size-12 rounded-xl shrink-0' />
          <div className='grow flex flex-col gap-2'>
            <div className='skeleton h-4 w-40' />
            <div className='skeleton h-3 w-24' />
          </div>
          <div className='skeleton h-8 w-20 rounded-lg' />
          <div className='skeleton h-8 w-28 rounded-lg' />
        </div>
      </div>
    )
  }

  return (
    <div className='bg-base-100 rounded-xl border border-base-300 shadow-sm overflow-hidden h-fit'>
      <div className='h-1.5 w-full skeleton rounded-none' />
      <div className='p-5 flex flex-col gap-4'>
        <div className='flex items-start gap-4'>
          <div className='skeleton size-12 rounded-xl shrink-0' />
          <div className='grow flex flex-col gap-2'>
            <div className='skeleton h-4 w-3/4' />
            <div className='skeleton h-3 w-1/2' />
          </div>
          <div className='skeleton size-6 rounded' />
        </div>
        <div className='grid grid-cols-2 gap-3'>
          <div className='skeleton h-4 w-full' />
          <div className='skeleton h-4 w-full' />
          <div className='skeleton h-4 w-full' />
          <div className='skeleton h-8 w-24 rounded-lg' />
        </div>
        <div className='skeleton h-12 w-full rounded-lg' />
        <div className='flex gap-2'>
          <div className='skeleton h-8 w-20 rounded-lg' />
          <div className='skeleton h-8 w-20 rounded-lg' />
          <div className='skeleton h-8 w-20 rounded-lg' />
        </div>
      </div>
    </div>
  )
}
