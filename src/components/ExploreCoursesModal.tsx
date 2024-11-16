import React from 'react';
import CourseDetail from './CourseDetail';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  students: number;
  image: string;
  price: string;
  curriculum: string[];
  outcomes: string[];
}

interface ExploreCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExploreCoursesModal({ isOpen, onClose }: ExploreCoursesModalProps) {
  const [selectedCourse, setSelectedCourse] = React.useState<Course | null>(null);

  const courses: Course[] = [
    {
      id: 1,
      title: "Full Stack Python Development",
      description: "Master Python, Django, and modern web development practices. Learn to build scalable web applications from scratch and deploy them to production.",
      duration: "24 weeks",
      students: 1500,
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=800",
      price: "$999",
      curriculum: [
        "Python Fundamentals & Advanced Concepts",
        "Django Framework & REST APIs",
        "Database Design with PostgreSQL",
        "Frontend Development with React",
        "DevOps & Deployment",
        "Real-world Project Implementation"
      ],
      outcomes: [
        "Build full-stack web applications",
        "Master Python programming",
        "Create RESTful APIs",
        "Implement authentication & authorization",
        "Deploy applications to production",
        "Work with databases effectively"
      ]
    },
    {
      id: 2,
      title: "MERN Stack Development",
      description: "Build modern web applications with MongoDB, Express, React, and Node.js. Learn the most popular JavaScript stack from industry experts.",
      duration: "20 weeks",
      students: 2000,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800",
      price: "$899",
      curriculum: [
        "JavaScript ES6+ & TypeScript",
        "React & Redux Toolkit",
        "Node.js & Express",
        "MongoDB & Mongoose",
        "Authentication & Security",
        "Real-time Applications with Socket.io"
      ],
      outcomes: [
        "Create modern single-page applications",
        "Build scalable backend APIs",
        "Work with NoSQL databases",
        "Implement real-time features",
        "Deploy full-stack applications",
        "Master state management"
      ]
    },
    {
      id: 3,
      title: "Data Science & Analytics",
      description: "Learn data analysis, machine learning, and visualization. Transform raw data into actionable insights using Python and industry-standard tools.",
      duration: "26 weeks",
      students: 1200,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      price: "$1299",
      curriculum: [
        "Python for Data Science",
        "Statistical Analysis",
        "Machine Learning Fundamentals",
        "Deep Learning & Neural Networks",
        "Data Visualization",
        "Big Data Processing"
      ],
      outcomes: [
        "Analyze complex datasets",
        "Build machine learning models",
        "Create data visualizations",
        "Process big data efficiently",
        "Make data-driven decisions",
        "Deploy ML models to production"
      ]
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {selectedCourse ? (
        <CourseDetail 
          course={selectedCourse} 
          onClose={() => setSelectedCourse(null)} 
        />
      ) : (
        <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Explore Our Courses</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition"
                  onClick={() => setSelectedCourse(course)}
                >
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-indigo-600 font-semibold">{course.price}</span>
                      <span className="text-gray-500">{course.duration}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}