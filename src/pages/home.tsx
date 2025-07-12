import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Star, Play, Menu, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const videos = [
    {
      id: 1,
      title: "Programming Fundamentals",
      src: "/Videos/alphavideo1.mp4",
      thumbnail: "/thumbnails/a1.jpg"
    },
    {
      id: 2,
      title: "Web Development Mastery", 
      src: "/Videos/alphavideo2.mp4",
      thumbnail: "/thumbnails/a2.jpg"
    },
    {
      id: 3,
      title: "Data Science Excellence",
      src: "/Videos/alphavideo3.mp4", 
      thumbnail: "/thumbnails/a3.jpg"
    }
  ];

  // If user is authenticated, redirect to dashboard
  useEffect(() => {
    if (user && profile) {
      if (profile.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (profile.role === 'staff') {
        navigate('/staff/dashboard');
      } else if (profile.role === 'student') {
        navigate('/student/dashboard');
      }
    }
  }, [user, profile, navigate]);
   
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 1) % 1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-primary rounded text-white px-3 py-1 font-bold text-xl">
                  G
                </div>
                <span className="text-xl font-semibold text-gray-900">Great Learning</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Button variant="outline" className="text-white bg-primary hover:bg-primary/90">
                Explore Programs
              </Button>
              <a href="#" className="text-gray-700 hover:text-gray-900">Career Support</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Success Stories</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">Enterprise</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">For Recruiters</a>
              <a href="#" className="text-gray-700 hover:text-gray-900">More</a>
              <Button 
                variant="ghost" 
                className="text-primary font-semibold"
                onClick={() => navigate('/login')}
              >
                LOGIN
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <div className="flex flex-col space-y-4">
                <Button variant="outline" className="text-white bg-primary hover:bg-primary/90 w-fit">
                  Explore Programs
                </Button>
                <a href="#" className="text-gray-700">Career Support</a>
                <a href="#" className="text-gray-700">Success Stories</a>
                <a href="#" className="text-gray-700">Enterprise</a>
                <a href="#" className="text-gray-700">For Recruiters</a>
                <a href="#" className="text-gray-700">More</a>
                <Button 
                  variant="ghost" 
                  className="text-primary font-semibold w-fit"
                  onClick={() => navigate('/login')}
                >
                  LOGIN
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Navigation arrows */}
            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            {/* Hero Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center py-20">
              {/* Left Content */}
              <div className="space-y-8">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  11 years of Accelerating{' '}
                  <span className="block">Career Growth</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed">
                  Trusted by 12.4 million professionals to build industry-relevant and future-ready skills.
                </p>
                
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">4/5 alumni landed their dream roles*</span>
                </p>
                
                <Button className="bg-primary text-white px-8 py-6 text-lg font-semibold rounded-lg hover:bg-primary/90 transition-colors">
                  EXPLORE PROGRAMS
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Right Content - Hero Image */}
              <div className="relative">
                <img
                  src="/lovable-uploads/5e66a2e4-499d-45ae-a268-c89458064c22.png"
                  alt="Professional with tablet"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>

            {/* Rating indicators */}
            <div className="flex items-center justify-center space-x-8 pb-8">
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.8</span>
                <span className="text-gray-600 text-sm">Trustpilot</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.89</span>
                <span className="text-gray-600 text-sm">Course Report</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.97</span>
                <span className="text-gray-600 text-sm">Switchup</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-semibold">4.7</span>
                <span className="text-gray-600 text-sm">Career Karma</span>
              </div>
            </div>

            {/* Carousel indicators */}
            <div className="flex items-center justify-center space-x-2 pb-8">
              <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Sub-sections */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Our Learning Experience
            </h2>
            <p className="text-xl text-gray-600">
              Discover how our courses transform careers through hands-on learning
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {videos.map((video, index) => (
              <div key={video.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative">
                  <video
                    className="w-full h-64 object-cover"
                    controls
                    preload="metadata"
                    poster={video.thumbnail}
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-20 transition-opacity flex items-center justify-center">
                    <Play className="h-12 w-12 text-white opacity-0 hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600">
                    Experience our comprehensive curriculum designed for real-world applications.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-primary rounded text-white px-3 py-1 font-bold text-xl">
                  G
                </div>
                <span className="text-xl font-semibold">Great Learning</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transforming careers through quality education and practical skills development.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Programs</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Data Science</a></li>
                <li><a href="#" className="hover:text-white">AI & ML</a></li>
                <li><a href="#" className="hover:text-white">Cloud Computing</a></li>
                <li><a href="#" className="hover:text-white">Full Stack</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Career Support</a></li>
                <li><a href="#" className="hover:text-white">Success Stories</a></li>
                <li><a href="#" className="hover:text-white">Community</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>contact@greatlearning.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Follow us on social media</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Great Learning. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;