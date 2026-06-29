import { NavLink } from "react-router-dom"
import { IconType } from "react-icons"
import { FaBriefcase, FaPlus, FaChartPie, FaCalendarAlt } from "react-icons/fa"

type Link = {
  id: number,
  url: string,
  txt: string,
  icon: IconType
}

const links: Link[] = [
  {
    id: 1,
    url: '/jobs',
    txt: 'all jobs',
    icon: FaBriefcase
  },
  {
    id: 2,
    url: '/addJob',
    txt: 'add job',
    icon: FaPlus
  },
  {
    id: 3,
    url: '/stats',
    txt: 'stats',
    icon: FaChartPie
  },
  {
    id: 4,
    url: '/calendar',
    txt: 'calendar',
    icon: FaCalendarAlt
  },

]


export function NavLinks() {
  return (
    <>
      {links.map(link => {
        const { url, txt, id, icon: Icon } = link
        return (
          <li key={id}>
            <NavLink
              to={url}
              className={({ isActive }) =>
                `capitalize flex items-center gap-2 rounded-lg font-medium transition ${isActive ? 'bg-sky-100 text-sky-600' : 'text-base-content/70 hover:bg-base-200'}`
              }
            >
              <Icon className='text-base' />
              {txt}
            </NavLink>
          </li>
        )
      })}
    </>
  )
}
