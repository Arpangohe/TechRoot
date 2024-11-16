import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Users, BookOpen, DollarSign } from 'lucide-react';

interface Student {
  id: string;
  email: string;
  enrolledCourses: number;
  joinedAt: string;
}

interface Course {
  id: string;
  title: string;
  enrollments: number;
  revenue: number;
}

export default function AdminDashboard() {
  const { data: students, isLoading: loadingStudents } = useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, 'users'));
      return snapshot.docs
        .filter(doc => doc.data().role === 'student')
        .map(doc => ({ id: doc.id, ...doc.data() })) as Student[];
    }
  });

  const { data: courses, isLoading: loadingCourses } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, 'courses'));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Course[];
    }
  });

  if (loadingStudents || loadingCourses) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const totalRevenue = courses?.reduce((acc, course) => acc + course.revenue, 0) || 0;
  const totalStudents = students?.length || 0;
  const totalCourses = courses?.length || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor your platform's performance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Students</p>
              <p className="text-2xl font-bold">{totalStudents}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <BookOpen className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Active Courses</p>
              <p className="text-2xl font-bold">{totalCourses}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-indigo-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold">${totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Recent Students</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {students?.slice(0, 5).map((student) => (
              <div key={student.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{student.email}</h3>
                    <p className="text-sm text-gray-500">Joined: {student.joinedAt}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {student.enrolledCourses} courses
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Popular Courses</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {courses?.slice(0, 5).map((course) => (
              <div key={course.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-500">{course.enrollments} students</p>
                  </div>
                  <div className="text-sm font-semibold text-indigo-600">
                    ${course.revenue}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}