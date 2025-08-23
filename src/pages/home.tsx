import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Menu, X, Star, Award, Users, TrendingUp, Shield, Zap, BookOpen, Target, CheckCircle, Play } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { CountdownTimer } from "@/components/home/CountdownTimer";
import { CourseCarousel } from "@/components/home/CourseCarousel";
import { ContactForm } from "@/components/home/ContactForm";
import TestimonialsSection from "@/components/TestimonialsSection";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

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

  const features = [
    {
      icon: Award,
      title: "Industry Experts",
      description: "Learn from professionals with 10+ years of real-world experience"
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Join 50,000+ students in our active learning community"
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "95% of our graduates get promoted or land better jobs"
    },
    {
      icon: Shield,
      title: "Lifetime Access",
      description: "Keep learning with lifetime access to all course materials"
    },
    {
      icon: Zap,
      title: "Hands-on Projects",
      description: "Build real-world projects for your professional portfolio"
    },
    {
      icon: BookOpen,
      title: "Flexible Learning",
      description: "Study at your own pace with 24/7 online access"
    }
  ];

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

  const offers = [
    { text: "50% OFF Full Stack Course", color: "from-red-500 to-red-600" },
    { text: "Free Certification", color: "from-green-500 to-green-600" },
    { text: "Lifetime Access", color: "from-blue-500 to-blue-600" },
    { text: "1-on-1 Mentorship", color: "from-purple-500 to-purple-600" },
    { text: "Job Guarantee", color: "from-orange-500 to-orange-600" },
    { text: "Money Back Guarantee", color: "from-pink-500 to-pink-600" }
  ];

  return (
    <div className="min-h-screen">
      {/* Countdown Timer */}
      <CountdownTimer />

      {/* Navigation Header */}
      <header className="bg-card shadow-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="bg-primary rounded text-primary-foreground px-3 py-1 font-bold text-xl">
                  AF
                </div>
                <span className="text-xl font-semibold text-foreground">Alpha Fly</span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#courses" className="text-muted-foreground hover:text-foreground transition-colors">Courses</a>
              <a href="#why-choose" className="text-muted-foreground hover:text-foreground transition-colors">Why Choose Us</a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
              <Button 
                variant="ghost" 
                className="text-primary font-semibold"
                onClick={() => navigate('/login')}
              >
                LOGIN
              </Button>
              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => navigate('/login')}
              >
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-foreground hover:text-muted-foreground"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-border py-4">
              <div className="flex flex-col space-y-4">
                <a href="#courses" className="text-muted-foreground">Courses</a>
                <a href="#why-choose" className="text-muted-foreground">Why Choose Us</a>
                <a href="#contact" className="text-muted-foreground">Contact</a>
                <Button 
                  variant="ghost" 
                  className="text-primary font-semibold w-fit"
                  onClick={() => navigate('/login')}
                >
                  LOGIN
                </Button>
                <Button 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground w-fit"
                  onClick={() => navigate('/login')}
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>
      {/* Hero Section with Special Offers */}
      <section className="relative text-white py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0082fb 0%, #0064e0 100%)' }}>
        {/* Parallax Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full bg-repeat transform translate-y-0 transition-transform duration-1000"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>
        </div>
        
        {/* Floating Elements for Parallax */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse transform -translate-y-10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000 transform translate-y-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse delay-500"></div>

        <div className="container mx-auto px-6 relative">
          {/* Special Offers Marquee */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white/20 mb-12 transform hover:scale-105 transition-all duration-500">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6">
              <Badge className="bg-gradient-to-r from-accent/80 to-secondary/80 text-white border-white/20 px-4 py-2">
                🚀 Join 50,000+ Successful Students
              </Badge>
              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                🎉 Special Offers 🎉
              </h2>
              {/* Marquee */}
              <span className="overflow-hidden whitespace-nowrap w-full lg:w-auto flex-1">
                <div className="flex animate-marquee-left">
                  {[...offers, ...offers].map((offer, index) => (
                    <span
                      key={index}
                      className={`inline-block bg-gradient-to-r ${offer.color} text-white px-6 py-3 mx-4 rounded-full font-bold text-sm md:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
                    >
                      {offer.text}
                    </span>
                  ))}
                </div>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-10">
              <div className="text-center group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">50K+</div>
                <div className="text-blue-200 text-base font-medium">Students</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">95%</div>
                <div className="text-blue-200 text-base font-medium">Success Rate</div>
              </div>
              <div className="text-center group">
                <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform">4.9★</div>
                <div className="text-blue-200 text-base font-medium">Rating</div>
              </div>
            </div>
          </div>
        </div>
              {/* Hero Section */}
                  <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold mb-4">Get a Taste of Our Learning Experience</h3>
              <p className="text-blue-100">Watch these sample lessons from our most popular courses</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {videos.map((video) => (
                <Card key={video.id} className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden hover:bg-white/20 transition-all">
                  <CardContent className="p-0">
                    <div className="relative">
                      <video
                        className="w-full h-48 object-cover"
                        controls
                        preload="metadata"
                        poster={video.thumbnail}
                      >
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors flex items-center justify-center">
                        <Play className="h-12 w-12 text-white opacity-80 hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {video.title}
                      </h4>
                      <p className="text-blue-100 text-sm">
                        Experience our hands-on approach to learning with real-world projects.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
      </section>



      {/* Why Choose Alpha Fly */}
      <section id="why-choose" className="py-20 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Why Choose Us
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Why Choose <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Alpha Fly</span>?
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              We're not just another online learning platform. We're your partner in career transformation 
              with proven results and industry recognition that speaks for itself.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <Card key={index} className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/10">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-8 text-center relative">
                  <div className="bg-gradient-to-br from-primary to-primary/60 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/40 transition-all duration-500">
                    <feature.icon className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-card-foreground mb-4 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Success Metrics */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-3xl p-12 border border-primary/20 shadow-2xl">
            <h3 className="text-3xl font-bold text-center text-foreground mb-12">Our Track Record</h3>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">98%</div>
                <div className="text-muted-foreground font-medium">Course Completion Rate</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">$75K</div>
                <div className="text-muted-foreground font-medium">Average Salary Increase</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">3 Months</div>
                <div className="text-muted-foreground font-medium">Average Job Placement</div>
              </div>
              <div className="group">
                <div className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform">24/7</div>
                <div className="text-muted-foreground font-medium">Mentor Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Carousel */}
      <section className="bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div id="courses">
          <CourseCarousel />
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Contact Form */}
      <section className="bg-gradient-to-br from-background to-muted/20 relative">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16 pointer-events-none" />
        <ContactForm />
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-card to-muted/50 border-t border-border/50 py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-16 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="space-y-6 md:col-span-2">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-primary to-primary/60 rounded-xl text-primary-foreground px-4 py-2 font-bold text-2xl shadow-lg">
                  AF
                </div>
                <span className="text-2xl font-bold text-foreground">Alpha Fly</span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg max-w-md">
                Transforming careers through quality education and practical skills development since 2013. 
                Join thousands of successful graduates who've changed their lives with us.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground">
                  <Users className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground">
                  <Star className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground">
                  <TrendingUp className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Courses */}
            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Popular Courses</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Full Stack Development
                </a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Data Science & AI
                </a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Cloud Computing
                </a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Mobile Development
                </a></li>
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-foreground mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Help Center
                </a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Career Support
                </a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Success Stories
                </a></li>
                <li><a href="#" className="hover:text-primary transition-colors flex items-center group">
                  <ChevronRight className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform" />
                  Community
                </a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="bg-primary/5 rounded-2xl p-8 mb-12 border border-primary/10">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div className="font-semibold text-foreground">Email Us</div>
                <div className="text-muted-foreground">info@alphafly.com</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="font-semibold text-foreground">Call Us</div>
                <div className="text-muted-foreground">+1 (555) 123-4567</div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div className="font-semibold text-foreground">Follow Us</div>
                <div className="text-muted-foreground">Social Media</div>
              </div>
            </div>
          </div>

          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground">&copy; 2024 Alpha Fly. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;