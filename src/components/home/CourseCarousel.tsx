import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, Users, ChevronLeft, ChevronRight, Search, Grid, List } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [coursesPerPage, setCoursesPerPage] = useState(50);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const { toast } = useToast();

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

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }).slice(0, coursesPerPage);

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
    <section id="courses" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Courses
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse the list of courses below, or use the search bar or dropdown lists to discover more.
          </p>
        </div>

        {/* Course Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Left side controls */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Select value={`${coursesPerPage}`} onValueChange={(value) => setCoursesPerPage(parseInt(value))}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Show courses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="25">Show 25 courses</SelectItem>
                  <SelectItem value="50">Show 50 courses</SelectItem>
                  <SelectItem value="100">Show 100 courses</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Show All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Show All Categories</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Right side controls */}
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search Products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'}`}>
          {filteredCourses.map((course) => (
            <Card key={course.id} className="group hover:shadow-xl transition-all duration-300 border-border bg-card overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden">
                  <img
                    src={course.thumbnail_url || "/thumbnails/a1.jpg"}
                    alt={course.title || course.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <CardTitle className="text-lg font-bold text-card-foreground mb-3 line-clamp-2 min-h-[3.5rem]">
                  {course.title || course.name}
                </CardTitle>
                
                <div className="flex items-center gap-2 mb-4">
                  {course.is_free ? (
                    <span className="text-xl font-bold text-green-600">Free</span>
                  ) : (
                    <span className="text-xl font-bold text-primary">₹{course.price}</span>
                  )}
                </div>
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button 
                  className="w-full bg-[#4A3B7A] hover:bg-[#4A3B7A]/90 text-white"
                  onClick={() => handleEnrollClick(course.id)}
                >
                  Add to cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-12 gap-4">
          <span className="text-sm text-muted-foreground">
            Showing 1 to {Math.min(coursesPerPage, filteredCourses.length)} of {filteredCourses.length} courses
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              &lt;
            </Button>
            <Button variant="default" size="sm" className="bg-[#4A3B7A] hover:bg-[#4A3B7A]/90">
              1
            </Button>
            <Button variant="outline" size="sm" disabled>
              &gt;
            </Button>
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