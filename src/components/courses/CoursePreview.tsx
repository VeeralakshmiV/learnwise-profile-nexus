import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface CoursePreviewProps {
  courseId: string;
  onClose: () => void;
}

export const CoursePreview: React.FC<CoursePreviewProps> = ({ courseId, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full h-3/4 flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Course Preview</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex-1 p-4">
          <p className="text-gray-600">Course ID: {courseId}</p>
          <p className="text-gray-500 mt-2">Preview functionality will be implemented here.</p>
        </div>
      </div>
    </div>
  );
};