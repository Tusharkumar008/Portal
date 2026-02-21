import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navigation } from '@/components/ui-custom/Navigation';
import { Footer } from '@/components/ui-custom/Footer';
import { PageTransition } from '@/components/ui-custom/PageTransition';
import { LandingPage } from '@/pages/LandingPage';
import { JobsPage } from '@/pages/JobsPage';
import { CompaniesPage } from '@/pages/CompaniesPage';
import { DashboardPage } from '@/pages/DashboardPage';
import PostJobPage from '@/pages/PostJobPage';
import RecruiterDashboard from '@/pages/RecruiterDashboard';
import { LoginPage } from '@/pages/LoginPage';
import { SignupPage } from '@/pages/SignupPage';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from '@/components/ScrollToTop'; // Clean, single import!
import ProfilePage from '@/pages/ProfilePage';
import ChatPage from '@/pages/ChatPage';

// Public Route Component (redirects to dashboard if already logged in)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#F05A44]" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Navigation />
      <PageTransition>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/companies" element={<CompaniesPage />} />
          
          {/* Auth Routes - Redirect to dashboard if already logged in */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          
          {/* ADD YOUR NEW ROUTES RIGHT HERE 👇 */}
          {/* Shared Protected Routes (Both Users & Recruiters can edit profiles and chat) */}
          <Route 
            path="/profile" 
            element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} 
          />
          <Route 
            path="/chat" 
            element={<ProtectedRoute><ChatPage /></ProtectedRoute>} 
          />
          {/* END OF NEW ROUTES 👆 */}

          {/* Recruiter Routes */}
          <Route 
            path="/post-job" 
            element={
              <ProtectedRoute requireRecruiter={true}>
                <PostJobPage />
              </ProtectedRoute>
            } 
          />
          
          
          {/* Recruiter Routes */}
          <Route 
            path="/post-job" 
            element={
              <ProtectedRoute requireRecruiter={true}>
                <PostJobPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/recruit/jobs" 
            element={
              <ProtectedRoute requireRole="recruiter">
                <RecruiterDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </PageTransition>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop /> {/* <--- Added right here inside the Router! */}
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;