import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../store/authStore';
import { BookOpen, Clock, Trophy } from 'lucide-react';

interface Course {
  id: string;
  title: string;
  progress: number;
  lastAccessed: string;
}

export default function StudentDashboard() {
  const { user } = useAuthStore();

  const { data: enrolledCourses, isLoading } = useQuery({
    queryKey: ['enrolledCourses', user?.uid],
    queryFn: async () => {
      const q = query(
        collection(db, 'enrollments'),
        where('userId', '==', user?.uid)
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Course[];
    },
    enabled: !!user
  });

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-gray-600">Track your learning progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Enrolled Courses</p>
              <p className="text-2xl font-bold">{enrolledCourses?.length || 0}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Hours Learned</p>
              <p className="text-2xl font-bold">24</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Trophy className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Certificates</p>
              <p className="text-2xl font-bold">2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {enrolledCourses?.map((course) => (
            <div key={course.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-500">Last accessed: {course.lastAccessed}</p>
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="text-sm text-gray-600">Progress</div>
                    <div className="text-lg font-semibold text-indigo-600">{course.progress}%</div>
                  </div>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                    Continue
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}