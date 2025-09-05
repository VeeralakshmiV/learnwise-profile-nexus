import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { CoursePreview } from '@/components/courses/CoursePreview';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  name: string;
  title?: string;
  description?: string;
  price: number;
  is_free: boolean;
  is_published: boolean;
  thumbnail_url?: string;
}

export const CourseCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const { toast } = useToast();
  const coursesPerView = 3;

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast({
        title: "Error",
        description: "Failed to load courses. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

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
  if (visibleCourses.length < coursesPerView && courses.length > coursesPerView) {
    visibleCourses.push(...courses.slice(0, coursesPerView - visibleCourses.length));
  }

  const handleEnrollClick = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleClosePreview = () => {
    setSelectedCourse(null);
  };

  if (loading) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading courses...</p>
          </div>
        </div>
      </section>
    );
  }

  if (courses.length === 0) {
    return (
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">Available Courses</h2>
            <p className="text-xl text-muted-foreground">No published courses available at the moment.</p>
          </div>
        </div>
      </section>
    );
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
                      src={course.thumbnail_url || "/thumbnails/a1.jpg"}
                      alt={course.title || course.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">
                      {course.is_free ? "Free" : "Premium"}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <CardTitle className="text-xl font-bold text-card-foreground mb-3 line-clamp-2">
                    {course.title || course.name}
                  </CardTitle>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {course.description || "Comprehensive course designed to help you master new skills"}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>4.8</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>Students</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    {course.is_free ? (
                      <span className="text-2xl font-bold text-green-600">Free</span>
                    ) : (
                      <span className="text-2xl font-bold text-primary">${course.price}</span>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    onClick={() => handleEnrollClick(course.id)}
                  >
                    Preview Course
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {selectedCourse && (
        <CoursePreview 
          courseId={selectedCourse} 
          onClose={handleClosePreview} 
        />
      )}
    </section>
  );
};