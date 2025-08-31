import { BiPlus } from "react-icons/bi";
import { LuLayoutGrid, LuList } from "react-icons/lu";
import Card from "../components/Card";
import { useEffect, useState } from "react";
import type { User } from "../utils/User";
import Userlist from "../components/Userlist";
import { CgSpinner } from "react-icons/cg";

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isListView, setIsListView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://reqres.in/api/users?page=1&per_page=12", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": `${import.meta.env.VITE_REQRES_API_KEY}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data.data);
        setIsLoading(true);
      } catch (error) {
        console.log("Error:", error);
        setIsLoading(true);

      }
    };
    fetchUsers();
  }, []);

  const handleCreateUser = async () => {
    try {
      const res = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${import.meta.env.VITE_REQRES_API_KEY}`,
        },
        body: JSON.stringify({
          first_name: "New",
          last_name: "User",
          email: "newuser@example.com",
          avatar: "https://i.pravatar.cc/150?img=64",
        }),
      });

      const newUser = await res.json();
      setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);
    } catch (error) {
      console.log("Error creating user:", error);
    }
  };

  // Edit user
  const handleEditUser = async (id: number, updated: Partial<User>) => {
    try {
      const res = await fetch(`https://reqres.in/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${import.meta.env.VITE_REQRES_API_KEY}`,
        },
        body: JSON.stringify(updated),
      });
      await res.json();

      // Update local state
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...updated } : u))
      );
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  // Delete user
  const handleDeleteUser = async (id: number) => {
    try {
      await fetch(`https://reqres.in/api/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": `${import.meta.env.VITE_REQRES_API_KEY}`,
        },
      });

      // Update local state
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.log("Error deleting user:", error);
    }
  };

  return (
    <div className="h-full w-11/12 flex flex-col gap-y-10 max-w-8xl">
      <div className="flex items-center justify-between px-4 ">
        <p className="text-2xl font-medium">Users</p>
        <div className="flex items-center gap-x-5">
          <div className="flex items-center gap-x-2 border border-gray-200 rounded-lg px-4 py-2 cursor-pointer dark:" onClick={handleCreateUser} >
            <BiPlus className="text-lg" />
            <span className="text-base">Create User</span>
          </div>
          <button
            className="border border-gray-200 rounded-lg px-4 py-3 cursor-pointer"
            onClick={() => setIsListView(!isListView)}
          >
            {isListView ? (
              <LuList className="text-base" />
            ) : (
              <LuLayoutGrid className="text-base" />
            )}
          </button>
        </div>
      </div>
      {
        !isLoading ? (<div className='w-full h-full flex items-center justify-center'>
          <CgSpinner className='animate-spin w-10 h-10' />
        </div>) : (
          <>
            {isListView ? (
              <div className="overflow-x-auto rounded-xl border border-gray-200 ">
                <div className="flex items-center gap-x-3 py-4 px-4">
                  <p className="text-xl font-medium">User List</p>
                  <p className="text-sm text-gray-600">{users.length} users</p>
                </div>
                <Userlist users={users} />
              </div>
            ) : (
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 max-sm:grid-cols-1 grid-cols-3 lg:space-x-8 max-lg:space-x-3 px-10 self-center space-y-8 w-11/12">
                <Card users={users} onEdit={handleEditUser} onDelete={handleDeleteUser} />
              </div>
            )}
          </>
        )
      }


    </div>
  );
};

export default Users;
