import { useEffect, useState } from "react";
import type { User } from "../utils/User";

type CardProps = {
  users: User[];
  onEdit: (id: number, updated: Partial<User>) => void;
  onDelete: (id: number) => void;
};

const Card = ({ users, onEdit, onDelete }: CardProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"edit" | "delete" | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const openModal = (type: "edit" | "delete", user: User) => {
    setModalType(type);
    setSelectedUser(user);
    setFormData({
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setModalType(null);
    setSelectedUser(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;

    if (modalType === "edit") {
      onEdit(selectedUser.id, formData);
    }

    if (modalType === "delete") {
      onDelete(selectedUser.id);
    }

    closeModal();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isOpen]);

  return (
    <>
      {users.map((user) => (
        <div className="h-fit max-w-76 flex flex-col items-center justify-center gap-y-5 rounded-xl border border-gray-200 p-4 max-md:px-1" key={user.id}
        >
          <div className="w-20 h-20 bg-gray-200 border border-gray-200 rounded-full overflow-hidden">
            <img src={user.avatar}  alt={user.first_name}  className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="flex flex-col items-center justify-center ">
            <div className="flex gap-x-2">
              <p>{user.first_name}</p>
              <p>{user.last_name}</p>
            </div>
            <p>{user.email}</p>
          </div>
          <div className="w-full flex-col items-center justify-center">
            <button  className="bg-blue-300 text-blue-800 px-4 py-2 rounded-full m-2 w-11/12 cursor-pointer" onClick={() => openModal("edit", user)}>Edit </button>
            <button className="bg-red-300 text-red-700 px-4 py-2 rounded-full m-2 w-11/12 cursor-pointer" onClick={() => openModal("delete", user)}> Delete</button>
          </div>
        </div>
      ))}

      {isOpen && selectedUser && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          id={selectedUser.id.toString()}
        >
          <div className="absolute inset-0 bg-black opacity-60" onClick={closeModal} />
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-1/3">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {modalType === "edit" && (
                <>
                  <h2 className="text-xl font-bold mb-4">Edit User</h2>
                  <div className="w-full flex justify-between">
                    <div className="flex flex-col gap-y-1">
                      <label>First Name</label>
                      <input
                        type="text"
                        value={formData.first_name}
                        onChange={(e) =>
                          setFormData({ ...formData, first_name: e.target.value })
                        }
                        className="border border-gray-200 focus-within:outline-gray-300 py-2 rounded-lg ps-2"
                      />
                    </div>
                    <div className="flex flex-col gap-y-1">
                      <label>Last Name</label>
                      <input
                        type="text"
                        value={formData.last_name}
                        onChange={(e) =>
                          setFormData({ ...formData, last_name: e.target.value })
                        }
                        className="border border-gray-200 focus-within:outline-gray-300 py-2 rounded-lg ps-2"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <label>Email</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="border border-gray-200 focus-within:outline-gray-300 py-2 rounded-lg ps-2"
                    />
                  </div>
                </>
              )}

              {modalType === "delete" && (
                <>
                  <h2 className="text-xl font-bold mb-4 text-red-600">Delete User</h2>
                  <p>
                    Are you sure you want to delete{" "}
                    <b>
                      {selectedUser.first_name} {selectedUser.last_name}
                    </b>
                    ?
                  </p>
                </>
              )}

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`px-4 py-2 rounded-lg ${
                    modalType === "delete"
                      ? "bg-red-500 text-white"
                      : "bg-blue-500 text-white"
                  }`}
                >
                  {modalType === "delete" ? "Delete" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
