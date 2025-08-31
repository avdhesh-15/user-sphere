import { NavLink } from "react-router-dom"
import { UsersIcon, WindowIcon } from "@heroicons/react/16/solid"



const Sidebar = () => {
  return (
    <div className="h-screen py-4  w-60 flex flex-col gap-y-8 px-6 border-e border-gray-200">
      <p className="text-2xl font-bold p-3 ">User Sphere</p>
      <nav className="flex flex-col gap-y-5 font-medium text-base text-gray-600">
        <NavLink to="/" className="flex items-center gap-x-2"><WindowIcon className="w-6 h-6 " /> Dashboard</NavLink>
        <NavLink to="/users" className="flex items-center gap-x-2"> <UsersIcon className="w-6 h-6 " />Users</NavLink>
      </nav>
      <div className="flex gap-3 w-full justify-evenly">
        
      </div>
    </div>
  )
}

export default Sidebar
