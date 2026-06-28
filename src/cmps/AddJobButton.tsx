import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";

function AddJobButton() {
  return (
    <Link
      to={'/addJob'}
      aria-label='Add new job'
      className="group fixed bottom-6 right-6 z-30 flex items-center gap-3 rounded-full bg-sky-500 text-white pl-5 pr-5 sm:pr-6 py-4 shadow-lg shadow-sky-500/30 transition hover:bg-sky-600 hover:scale-105 active:scale-95"
    >
      <FaPlus className='text-xl' />
      <span className='hidden sm:inline font-semibold capitalize whitespace-nowrap'>Add job</span>
    </Link>
  )
}

export default AddJobButton
