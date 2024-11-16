import React from 'react';
import { Clock, Users, BookOpen, CheckCircle2 } from 'lucide-react';

interface CourseDetailProps {
  course: {
    title: string;
    description: string;
    duration: string;
    students: number;
    image: string;
    price: string;
    curriculum: string[];
    outcomes: string[];
  };
  onClose: () => void;
}

export default function CourseDetail({ course, onClose }: CourseDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded-t-xl" />
          
          <div className="p-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h2>
            
            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center text-gray-600">
                <Clock className="h-5 w-5 mr-2" />
                <span>{course.duration}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-5 w-5 mr-2" />
                <span>{course.students}+ students</span>
              </div>
              <div className="flex items-center text-gray-600">
                <BookOpen className="h-5 w-5 mr-2" />
                <span>Online</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{course.description}</p>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">What you'll learn</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {course.outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-1" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Course Curriculum</h3>
              <div className="space-y-3">
                {course.curriculum.map((item, index) => (
                  <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <BookOpen className="h-5 w-5 text-indigo-600 mr-3" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t pt-6">
              <div className="text-2xl font-bold text-indigo-600">{course.price}</div>
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}