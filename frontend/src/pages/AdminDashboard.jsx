import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://userdetailsregistered-viewbyadmin-backend.onrender.com/api/v1/admin/users",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [users]);
  
  const handleClickForm = ()=>{
    navigate("/");
  }

  const handleUserClick = (userId) => {
    navigate(`/adminDashboard/User/${userId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between bg-purple-600 p-3 sticky top-0">
      <h1 className="text-2xl font-bold text-white">
        Welcome to Admin Dashboard
      </h1>
      <button className='text-purple-600 bg-white rounded-md p-2 cursor-pointer font-semibold' onClick={handleClickForm}>Go back to user form</button>
      </div>
      
      <div className="w-3xl mx-auto p-4">
        <h2 className="font-semibold py-5">List of all registered users:</h2>
        {users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li
                key={user._id}
                onClick={() => handleUserClick(user._id)}
                className="cursor-pointer p-2 border rounded-lg hover:bg-gray-100"
              >
                {user.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
