import React from 'react';
import { BookOpen, Clock, Users } from 'lucide-react';

interface CourseCardProps {
  title: string;
  description: string;
  duration: string;
  students: number;
  image: string;
}

export default function CourseCard({ title, description, duration, students, image }: CourseCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{students}+ students</span>
          </div>
        </div>
        <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
          Learn More
        </button>
      </div>
    </div>
  );
}