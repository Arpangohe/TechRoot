import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Clock, Users, BookOpen } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  students: number;
  price: number;
  curriculum: string[];
  requirements: string[];
}

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: course, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      if (!id) throw new Error('Course ID is required');
      const docRef = doc(db, 'courses', id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error('Course not found');
      return { id: docSnap.id, ...docSnap.data() } as Course;
    },
    enabled: !!id
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-gray-600 mb-6">{course.description}</p>

          <div className="flex items-center space-x-6 mb-8">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-indigo-600 mr-2" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-indigo-600 mr-2" />
              <span>{course.students} students</span>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-indigo-600 mr-2" />
              <span>By {course.instructor}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="col-span-2">
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Course Curriculum</h2>
                <div className="space-y-3">
                  {course.curriculum.map((item, index) => (
                    <div key={index} className="flex items-center bg-gray-50 p-3 rounded-lg">
                      <BookOpen className="h-5 w-5 text-indigo-600 mr-3" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2">
                  {course.requirements.map((req, index) => (
                    <li key={index} className="text-gray-600">{req}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-indigo-600 mb-4">
                  ${course.price}
                </div>
                <button className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition mb-4">
                  Enroll Now
                </button>
                <div className="text-sm text-gray-600">
                  <p>✓ Full lifetime access</p>
                  <p>✓ Access on mobile and desktop</p>
                  <p>✓ Certificate of completion</p>
                  <p>✓ 30-day money-back guarantee</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}