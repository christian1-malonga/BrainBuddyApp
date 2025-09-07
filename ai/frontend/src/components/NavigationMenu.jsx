import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProfileAvatar from './ProfileAvatar';
import { useAuth } from '../hooks/useAuth.jsx';

const NavigationMenu = ({ onToggle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const [avatar, setAvatar] = useState(null);

    const toggleMenu = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        if (onToggle) {
            onToggle(newState);
        }
    };

    const menuItems = [
        { name: 'Navigation', path: '/navigation', icon: '🗺️' },
        { name: 'Transportation', path: '/transportation', icon: '🚌' },
        { name: 'E-learning', path: '/e-learning', icon: '📚' },
        { name: 'Profile', path: '/profile', icon: '👤' }
    ];

    return (
        <div className="relative">
            {/* Hamburger Button */}
            <button
                onClick={toggleMenu}
                className="relative z-50 p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300"
            >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                    <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block w-6 h-0.5 bg-white mt-1 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                </div>
            </button>

            {/* Menu Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                    onClick={toggleMenu}
                />
            )}

            {/* Menu Panel */}
            <div className={`fixed top-0 left-0 h-full w-80 bg-black/90 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 z-40 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-8 pt-12">
                    {/* User Profile Section */}
                    <ProfileAvatar
                        avatarUrl={avatar}
                        fullName={user ? `${user.name || ''} ${user.surName || ''}`.trim() : 'User'}
                        onAvatarChange={setAvatar}
                    />
                    <h2 className="text-2xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Menu
                    </h2>
                    <nav className="space-y-4">
                        {menuItems.map((item, index) => (
                            <Link
                                key={index}
                                to={item.path}
                                onClick={toggleMenu}
                                className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-400/30 transition-all duration-300 group"
                            >
                                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                                    {item.icon}
                                </span>
                                <span className="text-white font-medium text-lg">
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default NavigationMenu;