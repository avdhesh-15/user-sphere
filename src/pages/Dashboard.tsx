
import Userlist from '../components/Userlist'
import { BackwardIcon, ForwardIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from 'react'
import type { User } from '../utils/User'
import { CgSpinner } from 'react-icons/cg';
import { BsMoon, BsSun } from "react-icons/bs"
import { useTheme } from '../context/ThemeContext';


const Dashboard: React.FC = () => {
    const [users, setUsers] = useState<User[]>([])
    const [page, setPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { theme, toggleTheme } = useTheme();
    const limit = 4
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`https://reqres.in/api/users?page=${page}&per_page=${limit}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': `${import.meta.env.VITE_REQRES_API_KEY}`
                    }
                })
                if (!res.ok) {
                    throw new Error('Failed to fetch users')
                }
                const data = await res.json()

                setUsers(data.data)
                console.log(data);
                setTotalPages(data.total_pages)
                setIsLoading(true)

            } catch (error) {
                console.log('Error:', error);
                setIsLoading(true)

            };
        }
        fetchUsers()
    }, [page])

    return (
        <div className='h-full w-11/12 flex flex-col gap-y-10 max-w-8xl '>
            <div className="flex items-center justify-between px-4">
                <p className='text-2xl font-medium'>Dashboard</p>
                <button className="border-2 border-gray-200 p-4 rounded-lg cursor-pointer" onClick={toggleTheme}>
                    {
                        theme === 'light' ? (<BsMoon className="w-5 h-5 "></BsMoon>):( <BsSun className="w-5 h-5"></BsSun>)
                    }
                </button>
            </div>
            <div className='w-full grid lg:grid-cols-3 grid-cols-3 space-y-3 space-x-8'>
                <div className='border border-gray-200 rounded-xl p-5  flex flex-col gap-y-5'>
                    <p className='font-medium'>Total Users</p>
                    <div className='flex flex-col gap-2'>
                        {
                            !isLoading && users.length === 0 ? (
                                <div className='w-full h-full flex items-center '>
                                    <CgSpinner className='animate-spin w-10 h-10' />
                                </div>
                            ) : (
                                <p className='text-gray-700 text-2xl'>{users.length * totalPages}</p>
                            )
                        }
                        <p className='text-xs text-green-400 bg-green-200 w-fit p-1 px-3 rounded-xl'>+100%</p>
                    </div>
                </div>
                <div className='border border-gray-200 rounded-xl p-5  flex flex-col gap-y-5'>
                    <p className='font-medium'>New Users</p>
                    <div className='flex flex-col gap-2'>
                        {
                            !isLoading && users.length === 0 ? (
                                <div className='w-full h-full flex items-center '>
                                    <CgSpinner className='animate-spin w-10 h-10' />
                                </div>
                            ) : (
                                <p className='text-gray-700 text-2xl'>{users.length}</p>
                            )
                        }
                        <p className='text-xs text-green-400 bg-green-200 w-fit p-1 px-3 rounded-xl'>+100% </p>

                    </div>
                </div>
                <div className='border border-gray-200 rounded-xl p-5  flex flex-col gap-y-5'>
                    <p className='font-medium'>Active Users</p>
                    <div className='flex flex-col gap-2'>
                        {
                            !isLoading && users.length === 0 ? (
                                <div className='w-full h-full flex items-center '>
                                    <CgSpinner className='animate-spin w-10 h-10' />
                                </div>
                            ) : (
                                <p className='text-gray-700 text-2xl'>{users.length}</p>
                            )
                        }
                        <p className='text-xs text-green-400 bg-green-200 w-fit p-1 px-3 rounded-xl'>+100%</p>

                    </div>
                </div>
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-200 min-h-96 ">
                {
                    !isLoading ? (
                        <div className='w-full h-full flex items-center justify-center p-20'>
                            <CgSpinner className='animate-spin w-10 h-10' />
                        </div>
                    ) : (
                        <>
                            <div className="w-full flex items-center justify-between p-4  gap-x-3">
                                <div className="flex items-center gap-x-3">
                                    <p className=" text-xl font-medium">User List</p>
                                    <p className="text-sm text-gray-600">10 users</p>
                                </div>
                                <div className="flex gap-x-3">
                                    <button className='cursor-pointer' disabled={page === 1} onClick={() => setPage((prev) => prev - 1)}>
                                        <BackwardIcon className=" w-5 h-5 text-gray-800"></BackwardIcon>
                                    </button>
                                    <button className='cursor-pointer' disabled={page === totalPages} onClick={() => setPage((prev) => prev + 1)}>
                                        <ForwardIcon className=" w-5 h-5 text-gray-800"></ForwardIcon>
                                    </button>
                                </div>
                            </div>
                            <Userlist users={users} />
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default Dashboard