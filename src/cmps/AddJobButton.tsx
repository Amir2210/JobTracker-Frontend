import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";

function AddJobButton() {
  return (
    <div className="card glass bg-white fixed  bottom-5 right-5">
      <div className="card-body justify-center items-center p-5 sm:p-8">
        <h2 className="card-title  text-black">Add Job</h2>
        <div className="card-actions ">
          <Link to={'/addJob'} className="btn bg-sky-400 text-white border-indigo-100 border" aria-label='Add new Job button'><FaPlus />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AddJobButton