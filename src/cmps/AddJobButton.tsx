import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";

function AddJobButton() {
  return (
    <div className="card glass bg-white fixed sm:top-32 sm:left-32 sm:bottom-auto sm:right-auto bottom-5 right-5">
      <div className="card-body justify-center items-center p-5 sm:p-8">
        <h2 className="card-title font-semibold text-black">Add Job</h2>
        <div className="card-actions ">
          <Link to={'/addJob'} className="btn bg-sky-400 text-white border-none"><FaPlus />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AddJobButton