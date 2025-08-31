import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

const MainLayout: React.FC = () => {
    return (
        <div className='w-full h-screen overflow-hidden flex'>
            <div className='flex h-screen max-md:hidden'>
                <Sidebar />
            </div>
            <div className='flex-1 py-7 flex flex-row items-center justify-center overflow-y-auto'>
                <Outlet/>
            </div>
        </div>
    )
}

export default MainLayout