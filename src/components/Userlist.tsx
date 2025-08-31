
import type {User } from '../utils/User'

const Userlist = ({ users }: { users: User[] }) => {

    return (

        <table className="table-auto w-full border-collapse">
            <thead className="">
                <tr>
                    <th className="px-4 py-3 border-y border-gray-200 text-left  font-normal">Avatar</th>
                    <th className="px-4 py-3 border-y border-gray-200 text-left  font-normal">First Name</th>
                    <th className="px-4 py-3 border-y border-gray-200 text-left  font-normal">LastName</th>
                    <th className="px-4 py-3 border-y border-gray-200 text-left  font-normal">Email</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user) => (
                        <tr key={user.id}>
                            <td className="px-4 py-3 border-b border-gray-200 text-gray-600"> 
                                <div className="h-10 w-10 rounded-full overflow-hidden">

                                <img src={user.avatar} alt="" className="overflow-hidden bg-cover" />
                                </div>
                                </td>
                            <td className="px-4 py-3 border-b border-gray-200 text-gray-600">{user.first_name}</td>
                            <td className="px-4 py-3 border-b border-gray-200 text-gray-600">{user.last_name}</td>
                            <td className="px-4 py-3 border-b border-gray-200 text-gray-600">{user.email}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
};

export default Userlist;


