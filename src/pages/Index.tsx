import { useState } from 'react';
import HomePage from '@/components/HomePage';
import AuthPage from '@/components/AuthPage';
import CoursesPage from '@/components/CoursesPage';
import CoursePage from '@/components/CoursePage';
import ResultsPage from '@/components/ResultsPage';
import CertificatesPage from '@/components/CertificatesPage';

export type User = {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessonsCount: number;
  category: string;
  progress?: number;
  enrolled?: boolean;
};

const Index = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'auth' | 'courses' | 'course' | 'results' | 'certificates'>('home');
  const [user, setUser] = useState<User | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('home');
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setCurrentPage('course');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'auth':
        return <AuthPage onLogin={handleLogin} onBack={() => setCurrentPage('home')} />;
      case 'courses':
        return <CoursesPage user={user} onNavigate={setCurrentPage} onCourseSelect={handleCourseSelect} onLogout={handleLogout} />;
      case 'course':
        return <CoursePage course={selectedCourse} onNavigate={setCurrentPage} onBack={() => setCurrentPage('courses')} user={user} onLogout={handleLogout} />;
      case 'results':
        return <ResultsPage user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      case 'certificates':
        return <CertificatesPage user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
      default:
        return <HomePage user={user} onNavigate={setCurrentPage} onLogout={handleLogout} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderPage()}
    </div>
  );
};

export default Index;
