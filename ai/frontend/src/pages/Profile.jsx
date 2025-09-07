// pages/Profile.jsx
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    studentId: user?.studentId || '',
    faculty: user?.faculty || '',
    year: user?.year || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800">
      {/* Header */}
      <div className="bg-black/20 backdrop-blur-xl border-b border-white/10 p-6">
        <h1 className="text-4xl font-bold text-white text-center">
          Student Profile
        </h1>
        <p className="text-gray-300 text-center mt-2">
          Manage your personal information
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          {/* Profile Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-3xl font-bold">
                  {formData.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{formData.name}</h2>
                <p className="text-gray-400">{formData.studentId}</p>
                <p className="text-gray-400">{formData.faculty}</p>
              </div>
            </div>
            
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-6 py-2 bg-blue-500/20 border border-blue-400/30 rounded-xl text-blue-400 hover:bg-blue-500/30 transition-all duration-300"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {/* Profile Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Student ID
              </label>
              <input
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none disabled:opacity-50"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Faculty
              </label>
              <select
                name="faculty"
                value={formData.faculty}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-400/50 focus:outline-none disabled:opacity-50"
              >
                <option value="">Select Faculty</option>
                <option value="Engineering">Engineering</option>
                <option value="Medicine">Medicine</option>
                <option value="Veterinary">Veterinary</option>
                <option value="Business">Business</option>
                <option value="Arts">Arts & Sciences</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Academic Year
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-400/50 focus:outline-none disabled:opacity-50"
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="graduate">Graduate</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none disabled:opacity-50"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Address
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows="3"
                className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:border-blue-400/50 focus:outline-none disabled:opacity-50 resize-none"
              />
            </div>
          </div>

          {/* Save Button */}
          {isEditing && (
            <div className="flex justify-end mt-8">
              <button
                onClick={handleSave}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>

        {/* Academic Information */}
        <div className="mt-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Academic Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">3.7</div>
              <div className="text-gray-400">GPA</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">24</div>
              <div className="text-gray-400">Credits Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">2</div>
              <div className="text-gray-400">Years Remaining</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;