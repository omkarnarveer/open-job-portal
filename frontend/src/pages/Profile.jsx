import React, { useEffect, useState } from "react";
import client from "../api/client";
import { useAuth } from "../auth/AuthContext";
import { FaSave, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

export default function Profile() {
  const { user, logout } = useAuth();

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    company_name: "",
    avatar: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const res = await client.get("/api/auth/me/");
          const { first_name, last_name, email, phone, company_name, avatar } =
            res.data;
          setForm((f) => ({
            ...f,
            first_name,
            last_name,
            email,
            phone,
            company_name,
          }));
          setPreview(avatar || null);
        } catch (error) {
          console.error("Failed to load profile:", error);
          setError("Failed to load profile.");
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((f) => ({ ...f, avatar: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      await client.put("/api/auth/me/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err);
      setError("Failed to update profile.");
    }
  };

  return (
    <div className="container mx-auto p-6 flex justify-center min-h-screen font-poppins">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">My Profile</h2>
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary-blue ring-offset-4 ring-offset-white shadow-lg">
            {preview ? (
              <img
                src={preview}
                alt="Avatar Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUserCircle className="w-full h-full text-gray-300" />
            )}
          </div>
          <p className="mt-4 text-lg font-semibold text-gray-800">{user?.username || 'Guest'}</p>
        </div>

        {message && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 rounded-md" role="alert">
            <p className="font-bold">Success</p>
            <p>{message}</p>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">First Name</label>
            <input
              className="shadow-inner appearance-none border-2 border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-accent-teal focus:border-transparent transition-all duration-200"
              name="first_name"
              value={form.first_name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Last Name</label>
            <input
              className="shadow-inner appearance-none border-2 border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-accent-teal focus:border-transparent transition-all duration-200"
              name="last_name"
              value={form.last_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
            <input
              className="shadow-inner appearance-none border-2 border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight bg-gray-100 cursor-not-allowed"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Phone</label>
            <input
              className="shadow-inner appearance-none border-2 border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-accent-teal focus:border-transparent transition-all duration-200"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Company Name</label>
            <input
              className="shadow-inner appearance-none border-2 border-gray-300 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-accent-teal focus:border-transparent transition-all duration-200"
              name="company_name"
              value={form.company_name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">Avatar</label>
            <input
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-primary-blue hover:file:bg-blue-100"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </div>

          <div className="flex justify-between items-center pt-6">
            <button
              type="submit"
              className="flex items-center space-x-2 bg-primary-blue hover:bg-accent-teal text-white font-bold py-3 px-6 rounded-full shadow-lg focus:outline-none focus:shadow-outline transition-all duration-200"
            >
              <FaSave />
              <span>Save Changes</span>
            </button>
            <button
              type="button"
              onClick={logout}
              className="flex items-center space-x-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-full shadow-lg focus:outline-none focus:shadow-outline transition-all duration-200"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}