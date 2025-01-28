import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate= useNavigate();
  
  const handleNavigate = ()=>{
    navigate("/adminDashboard")
  }

  useEffect(() => {
    const fetchUsers = async () => {
      console.log(id);

      try {
        const response = await axios.get(
          `http://localhost:3500/api/v1/admin/user/${id}`,
          {
            withCredentials: true,
          }
        );
        console.log(response);

        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between bg-purple-600 text-white p-4">
      <h1 className="text-2xl font-bold flex items-center justify-center ">
        Admin Dashnbard
      </h1>
      <button className="bg-white cursor-pointer text-purple-600 font-semibold p-2 rounded-md" onClick={handleNavigate}>Back to Dashboard</button>
      </div>
     

      <div className="w-4xl mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-bold mb-6 text-center">User Details</h1>
        <div className="grid grid-cols-1 w-full  md:grid-cols-2 gap-6">
          <div className=" w-full p-4 rounded-lg ">
            <h2 className="text-lg  font-semibold">Name: {users.name}</h2>
            <p className="text-gray-600">Social media userId: @{users.username}</p>
            <p className="text-black font-semibold ">All images:</p>
            <div className="flex items-center gap-3 py-3">
            {users.images && users.images.length > 0 ? (
               users.images.map((image, index) => (
                  <img className="transition-transform duration-200 hover:scale-115" key={index} src={image} alt={`User Image ${index + 1}`} />
               ))
            ) : (
               <p>No images uploaded</p>
            )}
         </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
