import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const courses = [
  {
    id: 1,
    title: "Full Stack Web Development",
    description: "Master modern web development with React, Node.js, and databases",
    price: "$299",
    originalPrice: "$599",
    duration: "12 weeks",
    students: "2,500+",
    rating: 4.9,
    image: "/thumbnails/a1.jpg",
    level: "Beginner to Advanced"
  },
  {
    id: 2,
    title: "Data Science & AI",
    description: "Learn Python, machine learning, and artificial intelligence",
    price: "$399",
    originalPrice: "$799",
    duration: "16 weeks",
    students: "1,800+",
    rating: 4.8,
    image: "/thumbnails/a2.jpg",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "Cloud Computing with AWS",
    description: "Become an AWS certified cloud architect and engineer",
    price: "$349",
    originalPrice: "$699",
    duration: "10 weeks",
    students: "1,200+",
    rating: 4.9,
    image: "/thumbnails/a3.jpg",
    level: "Intermediate"
  },
  {
    id: 4,
    title: "Mobile App Development",
    description: "Build iOS and Android apps with React Native",
    price: "$279",
    originalPrice: "$559",
    duration: "8 weeks",
    students: "900+",
    rating: 4.7,
    image: "/thumbnails/a4.jpg",
    level: "Beginner"
  },
  {
    id: 5,
    title: "Cybersecurity Specialist",
    description: "Learn ethical hacking and cybersecurity fundamentals",
    price: "$429",
    originalPrice: "$859",
    duration: "14 weeks",
    students: "750+",
    rating: 4.8,
    image: "/thumbnails/a5.jpg",
    level: "Advanced"
  }
];

export const CourseCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const coursesPerView = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + coursesPerView >= courses.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? courses.length - coursesPerView : prev - 1
    );
  };

  const visibleCourses = courses.slice(currentIndex, currentIndex + coursesPerView);
  if (visibleCourses.length < coursesPerView) {
    visibleCourses.push(...courses.slice(0, coursesPerView - visibleCourses.length));
  }

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Available Courses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our comprehensive selection of industry-relevant courses designed to accelerate your career
          </p>
        </div>

        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="rounded-full bg-card hover:bg-muted"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="rounded-full bg-card hover:bg-muted"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {visibleCourses.map((course, index) => (
              <Card key={`${course.id}-${index}`} className="group hover:shadow-xl transition-all duration-300 border-border bg-card">
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      {course.level}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-bold text-card-foreground mb-3 line-clamp-2">
                    {course.title}
                  </CardTitle>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl font-bold text-primary">{course.price}</span>
                    <span className="text-lg text-muted-foreground line-through">{course.originalPrice}</span>
                    <Badge variant="destructive" className="text-xs">50% OFF</Badge>
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                    Enroll Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};