import { Navbar } from '../cmps/Navbar';

export function AddJob() {
  return (
    <section >
      <Navbar />
      <div className='bg-zinc-100 h-screen flex flex-col w-full'>
        <div className='small-container sm:big-container sm:shadow-xl sm:mt-4 sm:py-4 py-2 px-2 rounded-lg sm:bg-white'>
          <h1 className='text-2xl capitalize font-medium'>Add job</h1>
          <form className='grid sm:grid-cols-3 gap-5 mt-4'>
            <div className=''>
              <label className='text-xl' htmlFor="">position</label>
              <input type="text" className="input input-bordered w-full mt-3" />
            </div>
            <div>
              <label className='text-xl' htmlFor="">company</label>
              <input type="text" className="input input-bordered w-full mt-3" />
            </div>
            <div>
              <label className='text-xl' htmlFor="">job location</label>
              <input type="text" className="input input-bordered w-full mt-3" />
            </div>
            <div>
              <label className='text-xl capitalize cursor-pointer mb-2' htmlFor="category">select category</label>
              <select className="select border-solid border-2 border-sky-300 focus:border-sky-600 focus:outline-none  w-full max-w-xs mt-3">
                <option>interview</option>
                <option>declined</option>
                <option>pending</option>
              </select>
            </div>
            <div>
              <label className='text-xl capitalize cursor-pointer mb-2' htmlFor="category">job type</label>
              <select className="select border-solid border-2 border-sky-300 focus:border-sky-600 focus:outline-none  w-full max-w-xs mt-3">
                <option>full-time</option>
                <option>part-time</option>
                <option>remote</option>
                <option>internship</option>
              </select>
            </div>
            <div className='flex items-end gap-5'>
              <button className='btn bg-sky-700 text-white capitalize hover:bg-sky-800 w-1/3'>clear</button>
              <button className='btn bg-sky-400 text-white capitalize hover:bg-sky-600 w-1/3'>add</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}