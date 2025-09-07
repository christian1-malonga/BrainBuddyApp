import React, { useState, useEffect } from 'react';
import AIAssistant from "@/components/AIAssistant";

const AuthLayout = ({ children, title, subtitle, isAuthenticated = false }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkle, setSparkle] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Sparkling eyes animation for logo
  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      setSparkle(true);
      setTimeout(() => setSparkle(false), 300);
    }, 1500);

    return () => clearInterval(sparkleInterval);
  }, []);

  const LogoRobotHead = ({ size = "w-12 h-12" }) => (
    <div className={`${size} relative`}>
      {/* Head Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 rounded-full shadow-lg">
        {/* 3D Lighting Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-blue-700/40 via-transparent to-transparent rounded-full"></div>
      </div>

      {/* Eyes Container */}
      <div className="absolute top-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
        {/* Left Eye */}
        <div className="relative w-2 h-2">
          <div className="absolute inset-0 bg-white rounded-full shadow-inner">
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gray-800 rounded-full">
              <div
                className={`absolute top-0 left-0 w-0.5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  sparkle ? 'opacity-100 scale-150' : 'opacity-80'
                }`}
              ></div>
            </div>
          </div>
        </div>

        {/* Right Eye */}
        <div className="relative w-2 h-2">
          <div className="absolute inset-0 bg-white rounded-full shadow-inner">
            <div className="absolute top-0.5 left-0.5 w-1 h-1 bg-gray-800 rounded-full">
              <div
                className={`absolute top-0 left-0 w-0.5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                  sparkle ? 'opacity-100 scale-150' : 'opacity-80'
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Welcoming Smile */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
        <div className="w-3 h-1 bg-gray-800 rounded-full" style={{
          clipPath: 'ellipse(50% 100% at 50% 0%)',
          transform: 'scaleY(0.5)'
        }}></div>
      </div>

      {/* Cheek highlights for 3D effect */}
      <div className="absolute top-2 left-1 w-1.5 h-1.5 bg-white/20 rounded-full blur-sm"></div>
      <div className="absolute top-2 right-1 w-1.5 h-1.5 bg-white/20 rounded-full blur-sm"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex flex-col relative overflow-hidden">
      {/* Animated background elements inspired by UrPal */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center p-4 lg:p-8 min-h-0">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left side - Branding with UrPal-inspired design */}
            <div className="hidden lg:block text-center lg:text-left space-y-8">
              {/* Logo section */}
              <div className="space-y-6">
                <div className="inline-block">
                  <div className="relative">
                    {/* Glow effect behind logo */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-lg opacity-30"></div>
                    <div className="relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl border border-blue-400/20">
                      <h1 className="text-3xl font-bold text-white tracking-wider inline-flex items-center gap-4">
                        BrainBuddy
                        {/* New robot head logo */}
                        <div className="inline-block">
                          <LogoRobotHead />
                        </div>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main heading with UrPal-style typography */}
              <div className="space-y-4">
                <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
                  Your Intelligent <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Platform
                  </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Join thousands of students who are transforming their education with AI-powered learning.
                </p>
              </div>

              {/* Stats cards with UrPal-inspired design */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-blue-400/30 transition-all duration-300">
                    <div className="text-2xl font-bold text-blue-400 mb-2">10k+</div>
                    <div className="text-sm text-gray-300">Active students</div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-green-400/30 transition-all duration-300">
                    <div className="text-2xl font-bold text-green-400 mb-2">500+</div>
                    <div className="text-sm text-gray-300">Available Courses</div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm group-hover:blur-none transition-all duration-300"></div>
                  <div className="relative text-center p-6 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                    <div className="text-2xl font-bold text-purple-400 mb-2">98%</div>
                    <div className="text-sm text-gray-300">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Auth Form with UrPal-inspired design */}
            <div className="w-full max-w-md mx-auto">
              {/* Mobile logo */}
              <div className="lg:hidden text-center mb-8">
                <div className="inline-block">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-30"></div>
                    <div className="relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-xl border border-blue-400/20">
                      <h1 className="text-xl font-bold text-white tracking-wider inline-flex items-center gap-3">
                        BrainBuddy
                        <div className="inline-block">
                          <LogoRobotHead size="w-8 h-8" />
                        </div>
                      </h1>
                    </div>
                  </div>
                </div>

                {title && (
                  <div className="mt-6">
                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                    {subtitle && (
                      <p className="text-gray-300 mt-2 text-base">{subtitle}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Form container with UrPal-inspired glass morphism */}
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                {/* Form background */}
                <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-8">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kyra */}
      <AIAssistant isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default AuthLayout;