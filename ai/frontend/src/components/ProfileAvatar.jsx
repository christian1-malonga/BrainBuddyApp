import React, { useRef } from 'react';

const ProfileAvatar = ({ avatarUrl, fullName, onAvatarChange }) => {
  const fileInputRef = useRef();

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev) => {
        onAvatarChange(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center mb-8">
      <div
        className="w-20 h-20 rounded-full bg-gray-700 border-4 border-blue-400 overflow-hidden cursor-pointer hover:opacity-80 transition"
        onClick={handleAvatarClick}
        title="Change avatar"
      >
        {avatarUrl ? (
          <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="w-full h-full flex items-center justify-center text-4xl text-white">👤</span>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <div className="mt-3 text-white font-semibold text-lg text-center">
        {fullName}
      </div>
    </div>
  );
};

export default ProfileAvatar;
