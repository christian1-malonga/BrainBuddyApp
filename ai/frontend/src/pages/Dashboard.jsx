import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth.jsx';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import AIAssistant from "@/components/AIAssistant";
import NavigationMenu from '../components/NavigationMenu';


const Dashboard = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu open/close

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 relative overflow-hidden">
      {/* Animated background elements inspired by UrPal */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-pulse animation-delay-4000"></div>
        <div className="absolute bottom-1/2 left-1/2 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl animate-pulse animation-delay-6000"></div>
      </div>

      // Update the header section in Dashboard.jsx
      <header className="relative bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              {/* Add Navigation Menu */}
              <NavigationMenu onToggle={setIsMenuOpen} /> {/* Pass setter to NavigationMenu */}
        
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-30"></div>
                <div className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl border border-blue-400/20">
                  <h1 className="text-xl font-bold text-white tracking-wider inline-flex items-center gap-3">
                    BrainBuddy
                    {/* Abstract icon */}
                    <div className="inline-block">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg relative shadow-lg border border-cyan-300/30">
                        <div className="absolute inset-1 bg-gradient-to-br from-white/20 to-transparent rounded-md"></div>
                        <div className="absolute top-2 left-2 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse"></div>
                        <div className="absolute top-2 right-2 w-1 h-1 bg-white rounded-full opacity-80 animate-pulse animation-delay-1000"></div>
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-0.5 bg-white/60 rounded-full"></div>
                      </div>
                    </div>
                  </h1>
                </div>
              </div>
            </div>
      
            {/* Rest of the header remains the same */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-300 text-lg">
                Welcome, <span className="text-white font-medium">{user?.name || 'Student'}</span>
              </span>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/50 to-orange-500/50 rounded-lg blur-sm"></div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="relative bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 transition-all duration-200"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 transition-all duration-300 ${isMenuOpen ? 'ml-[calc(20rem+10px)]' : ''}`}> {/* Conditional margin-left */}
        <div className="space-y-12">
          
          {/* Welcome Section with UrPal-style typography */}
          <div className="text-center space-y-6">
            <h2 className="text-6xl md:text-7xl font-bold text-white leading-tight">
              WELCOME  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> {user?.name?.toUpperCase() || 'STUDENT'}</span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              You are in your
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                {" "}personalised space
              </span>
            </p>
          </div>

          {/* Stats Cards with UrPal-inspired glass morphism */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
              <Card className="relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-blue-400/30 transition-all duration-300 p-8">
                <div className="text-center space-y-4">
                  <div className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">12</div>
                  <div className="text-gray-300 text-lg">Courses in progress</div>
                </div>
              </Card>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
              <Card className="relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-green-400/30 transition-all duration-300 p-8">
                <div className="text-center space-y-4">
                  <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">85%</div>
                  <div className="text-gray-300 text-lg">Average Progress</div>
                </div>
              </Card>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
              <Card className="relative bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-400/30 transition-all duration-300 p-8">
                <div className="text-center space-y-4">
                  <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">24h</div>
                  <div className="text-gray-300 text-lg">Study Time This Week</div>
                </div>
              </Card>
            </div>
          </div>

          {/* Recent Activity with UrPal-inspired design */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl"></div>
            <Card className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8">
              <h3 className="text-3xl font-bold text-white mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Recent Activity
              </h3>
              <div className="space-y-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative flex items-center justify-between p-6 bg-white/5 rounded-xl border border-white/10 hover:border-green-400/30 transition-all duration-300">
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold text-lg">Advanced Mathematics</h4>
                      <p className="text-gray-400">Chapter 3: Integrals</p>
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-400/30">
                      <span className="text-green-400 font-medium">Completed</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative flex items-center justify-between p-6 bg-white/5 rounded-xl border border-white/10 hover:border-yellow-400/30 transition-all duration-300">
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold text-lg">Quantum Physics</h4>
                      <p className="text-gray-400">Lab 2: Photoelectric Effect</p>
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full border border-yellow-400/30">
                      <span className="text-yellow-400 font-medium">In Progress</span>
                    </div>
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative flex items-center justify-between p-6 bg-white/5 rounded-xl border border-white/10 hover:border-blue-400/30 transition-all duration-300">
                    <div className="space-y-2">
                      <h4 className="text-white font-semibold text-lg">Artificial Intelligence</h4>
                      <p className="text-gray-400">Final Project</p>
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full border border-blue-400/30">
                      <span className="text-blue-400 font-medium">Upcoming</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions with UrPal-inspired design */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl"></div>
            <Card className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8">
              <h3 className="text-3xl font-bold text-white mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <Button className="relative w-full h-24 bg-white/5 border border-white/10 hover:border-blue-400/30 hover:bg-white/10 flex flex-col items-center justify-center space-y-3 transition-all duration-300">
                    <span className="text-3xl">📚</span>
                    <span className="text-white font-medium">My courses</span>
                  </Button>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <Button className="relative w-full h-24 bg-white/5 border border-white/10 hover:border-green-400/30 hover:bg-white/10 flex flex-col items-center justify-center space-y-3 transition-all duration-300">
                    <span className="text-3xl">📝</span>
                    <span className="text-white font-medium">Assignments</span>
                  </Button>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <Button className="relative w-full h-24 bg-white/5 border border-white/10 hover:border-purple-400/30 hover:bg-white/10 flex flex-col items-center justify-center space-y-3 transition-all duration-300">
                    <span className="text-3xl">📊</span>
                    <span className="text-white font-medium">Statistics</span>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* AI Assistant */}
      <AIAssistant />
    </div>
  );
};

export default Dashboard;


