import React from 'react';
import { ArrowRight, BookOpen, Code, Database } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export default function Hero({ onExplore }: HeroProps) {
  return (
    <div id="home" className="pt-20 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Master Modern Tech Skills with <span className="text-indigo-600">TechRoot</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Transform your career with our comprehensive courses in Full Stack Development and Data Science. 
            Learn from industry experts and build real-world projects.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={onExplore}
              className="bg-indigo-600 text-white px-8 py-3 rounded-full hover:bg-indigo-700 transition flex items-center"
            >
              Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-indigo-600 text-indigo-600 px-8 py-3 rounded-full hover:bg-indigo-50 transition">
              View Demo
            </button>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-2">
              <Code className="h-6 w-6 text-indigo-600" />
              <span className="text-gray-700">Full Stack Development</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Database className="h-6 w-6 text-indigo-600" />
              <span className="text-gray-700">Data Science</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <BookOpen className="h-6 w-6 text-indigo-600" />
              <span className="text-gray-700">Expert Mentorship</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}