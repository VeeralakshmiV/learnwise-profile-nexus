import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX, Star, Users,Clock, Badge,Camera,BookOpen, Award, Mail, Phone, MapPin, ChevronRight, Menu, X ,LogIn} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import TestimonialsSection from "@/components/TestimonialsSection";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { LoginForm } from '@/components/auth/LoginForm';
import { CourseChatbot } from '@/components/home/CourseChatbot';

type UserRole = 'admin' | 'staff' | 'student' | null;


const AlphaFlyLanding = () => {
  const [currentReel, setCurrentReel] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Mock video data - replace with actual video URLs
   const reels = [
    {
    id: 1,
    title: "Programming Fundamentals",
    filename: "/Videos/alphavideo1.mp4", 
    thumbnail: "/thumbnails/a11.jpg", 
    instagramUrl: "https://www.instagram.com/reel/xyz1/"
  },
    {
      id: 2,
      title: "Web Development Mastery",
      filename: "/Videos/alphavideo2.mp4",
      thumbnail: "/thumbnails/a9.jpg",
      instagramUrl: "https://www.instagram.com/reel/xyz2/"
    },
    {
      id: 3,
      title: "Data Science Excellence",
      filename: "/videos/alphavideo3.mp4",
      thumbnail: "/thumbnails/a10.jpg",
      instagramUrl: "https://www.instagram.com/reel/xyz3/"
    }
  ];

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'courses', label: 'Courses' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' }
  ];
  
    const features = [
    {
      icon: BookOpen,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with real-world experience"
    },
    {
      icon: Award,
      title: "Certified Programs",
      description: "Get industry-recognized certifications upon completion"
    },
    {
      icon: Clock,
      title: "Flexible Learning",
      description: "Study at your own pace with 24/7 access to materials"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join a vibrant community of learners and mentors"
    }
  ];

  // If user is authenticated, show appropriate dashboard
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
   

  // Auto-play reels
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentReel((prev) => (prev + 1) % reels.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, reels.length]);

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'courses', 'testimonials', 'contact'];
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReelClick = (index: number) => {
    setCurrentReel(index);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const courses = [
    {
      title: "Full Stack Development",
      description: "Master modern web development with React, Node.js, and MongoDB",
      duration: "6 months",
      // price: "₹25,000",
      rating: 4.8,
      image: "from-blue-500 to-cyan-500"
    },
    {
      title: "Data Science & AI",
      description: "Learn Python, Machine Learning, and AI for data-driven solutions",
      duration: "5 months",
      // price: "₹30,000",
      rating: 4.9,
      image: "from-purple-500 to-pink-500"
    },
    {
      title: "Cloud Computing (AWS)",
      description: "Master cloud infrastructure and DevOps with AWS certification",
      duration: "4 months",
      // price: "₹20,000",
      rating: 4.7,
      image: "from-green-500 to-blue-500"
    },
    {
      title: "Mobile App Development",
      description: "Build iOS and Android apps with React Native and Flutter",
      duration: "4 months",
      // price: "₹22,000",
      rating: 4.6,
      image: "from-orange-500 to-red-500"
    }
  ];

  
  
  const handleLoginClick = () => {
    navigate('/login');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
  <nav className="flex items-center justify-between flex-wrap gap-4 md:gap-0">
    
    {/* Left: Logo + Brand Name */}
<div className="flex items-center space-x-3">
  <img
    src="./thumbnails/logo1.png"
    alt="Alpha Fly Logo"
    className="w-30 h-14 object-cover"
  />

</div>

    {/* Center: Desktop Navigation */}
    <div className="hidden md:flex items-center space-x-8 ml-auto">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => scrollToSection(item.id)}
          className={`text-gray-700 hover:text-orange-600 transition-colors font-medium ${
            activeSection === item.id ? 'underline underline-offset-4 text-orange-600' : ''
          }`}
        >
          {item.label}
        </button>
      ))}
      <Button
      onClick={() => setShowLoginModal(true)}
       className="bg-gradient-to-r from-orange-500 to-orange-500 text-white px-6 py-2 rounded-md font-semibold hover:from-orange/90-600 hover:to-orange/90-600 transition-all transform hover:scale-105 shadow-lg">
        
      <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
    </div>

    {/* Right: Mobile Menu Button */}
    <div className="md:hidden ml-auto">
      <button onClick={toggleMenu} className="text-gray-700">
        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  </nav>

  {/* Mobile Menu */}
  {isMenuOpen && (
    <div className="md:hidden bg-white/90 backdrop-blur-lg border-t border-gray-200 py-4">
      <div className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              scrollToSection(item.id);
              setIsMenuOpen(false);
            }}
            className="text-gray-700 hover:text-blue-600 transition-colors font-medium text-left"
          >
            {item.label}
          </button>
        ))}
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold w-fit">
          Login
        </button>
      </div>
    </div>
  )}
</div>

      </header>


      {/* Hero Section with Instagram Reels in 3 Columns */}
<section
  id="home"
  className="relative pt-20 min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://lh3.googleusercontent.com/p/AF1QipOipp9TVp3ZhD0UeYSzd7T7cLFBsH7LZV51T6dw=s1360-w1360-h1020-rw')",
  }}
>
  {/* 🔹 Background Overlay */}
  <div className="absolute inset-0 bg-white/90 z-0" />

  {/* 🔹 Foreground Content */}
  <div className="container mx-auto px-4 relative z-10 pt-8">
    {/* 🔸 Heading */}
    <div className="text-center mb-12">
      <h1 className="text-3xl md:text-5xl font-bold mb-8 animate-fade-in">
<span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
  AlphaFly
</span>
        <span className="text-black"> Computer Education</span>
      </h1>
      <p className="text-xl md:text-2lg text-black-300 max-w-4xl mx-auto mb-4 animate-fade-in leading-relaxed">
        Unlocking Minds, Empowering Futures
      </p>
    </div>

    {/* 🔸 Video Reels */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center items-center max-w-6xl mx-auto">
      {reels.map((reel, index) => (
        <div
          key={index}
          className="relative group w-full max-w-[320px] h-[380px] mx-auto"
        >
          <video
            className="w-full h-full rounded-lg shadow-lg object-cover"
            controls
            preload="metadata"
            muted
            playsInline
            poster={reel.thumbnail}
          >
            <source src={reel.filename} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Features Section */}
      <section className="py-20 bg-white relative">
      
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 animate-fade-in">
              Why Choose <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">AlphaFly?</span>
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto animate-fade-in">
              We provide world-class education with industry-relevant curriculum and hands-on experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-2xl transition-all duration-500 border-gray-700 bg-gray-500/50 backdrop-blur-sm hover:bg-gray-800/70 transform hover:scale-105 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-blue-500/25">
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-black mb-4 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-black-300 group-hover:text-gray-200 transition-colors">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
<section id="courses" 
   className="relative px-10 min-h-screen flex items-center justify-center bg-fixed bg-cover bg-center"
  style={{
    backgroundImage:
      "url('https://lh3.googleusercontent.com/gps-cs-s/AC9h4nptdlJ2Xyim2xyG5Q9Dkk2ht-F-niwBwfuj0clK1IGBvaueVMYH2U6xlpxc8ot7uu8D8SdoGPRBDT500MJl2u72hgl-82z8OhGx1oNRP0ckB3JTgG-fT1sxpoj1xxPwrK1zgyzY=s1360-w1360-h1020-rw')",
  }}
>
  {/* 🔹 Background Overlay */}
  <div className="absolute inset-0 bg-white/90 z-0" />
    {/* 🔹 Foreground Content */}
  <div className="container mx-auto px-4 relative z-10 pt-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Our <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">Courses</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        Comprehensive IT training programs designed to boost your career in the tech industry
      </p>
    </div>

    {/* Swiper with Custom Navigation */}
    <div className="relative">
      {/* Custom Prev Button */}
      <button
        className="swiper-button-prev-custom absolute -left-6 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-3 shadow hover:bg-blue-100 transition"
      >
        <ChevronRight className="w-5 h-5 rotate-180 text-gray-700" />
      </button>

      {/* Swiper Component */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={1}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="!px-10 py-10"
      >
        {courses.map((course, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-blue-300 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl h-full">
              <div className={`w-16 h-16 bg-gradient-to-r ${course.image} rounded-xl flex items-center justify-center mb-6`}>
                <BookOpen className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-3">{course.title}</h3>
              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="text-gray-700 ml-1">{course.rating}</span>
                  </div>
                </div>
                <span className="text-gray-500">{course.duration}</span>
              </div>

              <div className="flex items-center justify-between">
                {/* <span className="text-2xl font-bold text-blue-600">{course.price}</span> */}
                <button
                  onClick={() => alert('Please login to enroll course')}
                  className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-white px-6 py-2 rounded-full font-semibold hover:from-orange-500 hover:via-orange-600 hover:to-orange-700 transition-all transform hover:scale-105 flex items-center shadow-lg"
                >
                  Enroll Now
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Next Button */}
      <button
        className="swiper-button-next-custom absolute -right-6 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-3 shadow hover:bg-blue-100 transition"
      >
        <ChevronRight className="w-5 h-5 text-gray-700" />
      </button>
    </div>
  </div>
</section>

      {/* Testimonials Section */}
<TestimonialsSection />



      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                
                <img
                  src="./thumbnails/logo1.png"
                  alt="Alpha Fly Logo"
                  className="w-30 h-16 object-contain"
                />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transforming careers through quality education and practical skills development since 2008.
              </p>
              <div className="flex space-x-4">
                {/* Social Media Icons */}
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <span className="text-xs font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-pink-700 transition-colors">
                  <Camera className="h-4 w-4" />
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors">
                  <span className="text-xs font-bold">t</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {menuItems.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Courses */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Courses</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-white transition-colors cursor-pointer">Web Development</li>
                <li className="hover:text-white transition-colors cursor-pointer">Data Science</li>
                <li className="hover:text-white transition-colors cursor-pointer">UI/UX Design</li>
                <li className="hover:text-white transition-colors cursor-pointer">Machine Learning</li>
                <li className="hover:text-white transition-colors cursor-pointer">Digital Marketing</li>
              </ul>
            </div>
                        {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-3 text-gray-400">
                <p className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">📍</span>
                  <span>No 10, K S Complex, Old Bus Stand, Theni, Tamil Nadu 625531</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-green-400">📞</span>
                  <span>080158 01689</span>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="text-red-400">✉️</span>
                  <span>alphafly.edu@gmail.com</span>
                </p>
              </div>
            </div>
 
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 AlphaFly Computer Education. All rights reserved.</p>
          </div>
        </div>
      </footer>
       {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-white/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Login to Your Account</h2>
                <Button
                  variant="ghost"
                  onClick={() => setShowLoginModal(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </Button>
              </div>
              <LoginForm onLoginSuccess={() => setShowLoginModal(false)} />
            </div>
          </div>
        </div>
      )}

      {/* Course Chatbot - Temporarily disabled */}
      <CourseChatbot />
 


      <style>
        {`
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
        `}
      </style>
    </div>

    
  );
};

export default AlphaFlyLanding;