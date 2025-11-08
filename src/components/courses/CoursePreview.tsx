import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, BookOpen, DollarSign, Eye, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CoursePreviewProps {
  courseId: string;
  onClose: () => void;
}

export const CoursePreview: React.FC<CoursePreviewProps> = ({ courseId, onClose }) => {
  const [course, setCourse] = useState<any>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      const { data: sectionsData, error: sectionsError } = await supabase
        .from('course_sections')
        .select('*, course_content(*)')
        .eq('course_id', courseId)
        .order('order_index');

      if (sectionsError) throw sectionsError;
      setSections(sectionsData || []);
    } catch (error) {
      console.error('Error fetching course:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-xl max-w-4xl w-full p-8">
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-border">
          <h2 className="text-2xl font-semibold text-foreground">Course Preview</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {course && (
            <div className="space-y-6">
              {/* Course Header */}
              <div className="space-y-4">
                {course.thumbnail_url && (
                  <div className="w-full h-64 overflow-hidden rounded-lg">
                    <img 
                      src={course.thumbnail_url} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-3xl font-bold text-foreground">{course.title}</h3>
                    <Badge variant={course.is_published ? "default" : "secondary"}>
                      {course.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{course.is_free ? 'Free' : `₹${course.price}`}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>Created: {new Date(course.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Course Content */}
              <Tabs defaultValue="overview" className="w-full">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <h4 className="font-semibold text-lg mb-2 text-foreground">Description</h4>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {course.description || 'No description available'}
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="content" className="space-y-4">
                  {sections.length > 0 ? (
                    sections.map((section: any, index: number) => (
                      <Card key={section.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg mb-2 text-foreground">{section.title}</h4>
                              {section.course_content && section.course_content.length > 0 ? (
                                <ul className="space-y-2">
                                  {section.course_content.map((content: any) => (
                                    <li key={content.id} className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <BookOpen className="h-4 w-4" />
                                      <span>{content.title}</span>
                                      <Badge variant="outline" className="ml-auto">
                                        {content.content_type}
                                      </Badge>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-muted-foreground">No content in this section</p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="pt-6">
                        <p className="text-center text-muted-foreground">No sections available</p>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
        
        <div className="flex justify-end gap-2 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button 
            onClick={() => window.open(`/courses/${courseId}`, '_blank')}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            Open Full View
          </Button>
        </div>
      </div>
    </div>
  );
};