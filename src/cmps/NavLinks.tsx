import { NavLink } from "react-router-dom"
const links = [
  {
    id: 1,
    url: '/jobs',
    txt: 'all jobs'
  },
  {
    id: 2,
    url: '/addJob',
    txt: 'add job'
  },
  {
    id: 3,
    url: '/stats',
    txt: 'stats'
  },

]


export function NavLinks() {
  return (
    <>
      {links.map(link => {
        const { url, txt, id } = link
        return (
          <li key={id}>
            <NavLink className='capitalize ml-2' to={url}>{txt}</NavLink>
          </li>
        )
      })}
    </>
  )
}