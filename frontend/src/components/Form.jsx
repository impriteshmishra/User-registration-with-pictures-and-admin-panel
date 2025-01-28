import React, { useRef, useState } from "react";
import axios from "axios";

function Form() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({ name: "", username: "" });

  const [images, setImages] = useState(null);

  const URL = import.meta.env.VITE_APP_URL_BACKEND;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // console.log("Selected name:", e.target);
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
    // console.log("Selected Files:", e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();

    data.append("name", formData.name);
    data.append("username", formData.username);
    if (images) {
      for (let i = 0; i < images.length; i++) {
        // console.log("single image", images[i]);

        data.append("images", images[i]);
      }
    }
    // console.log("all image", images);

    // console.log("formdata", data);

    try {
      await axios.post(`${URL}/api/v1/user/register`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Registered successfully");
      setLoading(false);
      setFormData({
        name: "",
        username: "",
      })
      setImages(null);
     
      
    } catch (error) {
      // console.error(error);
      setLoading(false);
      alert("Error during registration");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Social Media Handle
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="pictures"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Pictures
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleFileChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? (
            <div className="flex justify-center items-center space-x-2">
              <div className="w-5 h-5 border-4 border-t-4 border-white rounded-full animate-spin"></div>
              <span>Loading...</span>
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
}

export default Form;
