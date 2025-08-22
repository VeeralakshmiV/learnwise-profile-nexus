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
            <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full bg-repeat"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          ></div>
        </div>

        <div className="container mx-auto px-6 relative">
          {/* Special Offers Marquee */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20 mb-12">
          
            <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
              <Badge className="bg-accent text-accent-foreground w-fit">
                🚀 Join 50,000+ Successful Students
              </Badge>
              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-bold text-white text-center">
                🎉 Special Offers 🎉
              </h2>
              {/* Marquee */}
              <span className="overflow-hidden whitespace-nowrap w-full lg:w-auto flex-1">
                <div className="flex animate-marquee-left">
                  {[...offers, ...offers].map((offer, index) => (
                    <span
                      key={index}
                      className={`inline-block bg-gradient-to-r ${offer.color} text-white px-4 py-2 mx-3 rounded-full font-bold text-sm md:text-base`}
                    >
                      {offer.text}
                    </span>
                  ))}
                </div>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">50K+</div>
                  <div className="text-blue-200 text-sm">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">95%</div>
                  <div className="text-blue-200 text-sm">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">4.9★</div>
                  <div className="text-blue-200 text-sm">Rating</div>
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
      <section id="why-choose" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Choose Alpha Fly?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're not just another online learning platform. We're your partner in career transformation 
              with proven results and industry recognition.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border bg-card">
                <CardContent className="p-8 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-card-foreground mb-4">
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
          <div className="mt-20 bg-muted/30 rounded-2xl p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-muted-foreground">Course Completion Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">$75K</div>
                <div className="text-muted-foreground">Average Salary Increase</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">3 Months</div>
                <div className="text-muted-foreground">Average Job Placement</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Mentor Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Carousel */}
      <div id="courses">
        <CourseCarousel />
      </div>

      {/* Contact Form */}
      <ContactForm />

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-primary rounded text-primary-foreground px-3 py-1 font-bold text-xl">
                  AF
                </div>
                <span className="text-xl font-semibold text-foreground">Alpha Fly</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Transforming careers through quality education and practical skills development since 2013.
              </p>
            </div>

            {/* Courses */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Courses</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Full Stack Development</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Data Science & AI</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Cloud Computing</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Mobile Development</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Career Support</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Success Stories</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>info@alphafly.com</li>
                <li>+1 (555) 123-4567</li>
                <li>Follow us on social media</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Alpha Fly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;