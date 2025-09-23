// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OTPInput, OTPNotification, VerificationSuccess } from './pages-2/Verification';
import ApplicationStartScreen from './pages/ApplicationStartScreen';
import LoadingScreenExact, { LoadingScreen, LoadingScreenWithCustomSpinner } from './pages/LoadingScreen';
import AssetsPage from './pages/AssetsPage';
import CongratulationsScreen from './pages/CongratulationsScreen';
import EligibilityErrorPage from './pages/EligibilityErrorPage ';
import UploadDocumentsScreen from './pages/UploadDocumentsScreen';
import SavedApplicationsPage from './pages/SavedApplication';
import LoanApplicationConfirmation from './pages/LoanApplication';
import SelfieVerificationIntro from './pages/VerificationIntro';
import SelfieVerificationPage from './pages/PicturePage';
import Dashboard from './pages/v2/Dashboard';
import SignupForm from './pages/v2/SignupForm';
import ApplicationForm from './pages/v2/ApplicationForm';
import StatementsPage from './pages/Statements';
import LogCasePage from './pages/Case/LogCasePage';
import NotFound from './pages/NotFound';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './HOC/ProtectedRoute';
import EmailVerificationPage from './pages/EmailVerifcation';
import CasePage from './pages/Case';
import AccountPage from './pages/Accounts';
import DocumentsPage from './pages/Documents';
import DashboardPage from './pages/Dashboard';
import ApplicationPage from './pages/Application';
import CreateProfile from './pages/CreateProfile';
import CreateProfilePage from './pages/CreateProfile';
import AuthPage from './pages/Auth';
import IndivisualFlow from './pages/Application/Indivisual';
import EntityFlow from './pages/Application/Entity';
import PublicRoute from './HOC/PublicRoutes';
import ProfilePage from './pages-2/ProfilePage';
import JobDetailPage from './pages-2/JobDetail';
import JobListingsPage from './pages-2/JobListingsPage';
import ApplicationsListing from './pages-2/ApplicationsListing';
import AuthPageV2 from './pages-2/auth';
import ForgotPasswordPage from './pages-2/ForgotPasswordPage';
import OTPVerificationRoutes from './pages-2/Verification';
import AppliedJob from './pages-2/AppliedJob';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<AuthPageV2 />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/cases" element={<LogCasePage />} />
        <Route path="/verification" element={<OTPNotification />} />
        <Route path="/verification/enter-otp" element={<OTPInput />} />
        <Route path="/verification/success" element={<VerificationSuccess />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/applications" element={<ApplicationsListing />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/application/jobs/:id" element={<AppliedJob />} />
        <Route path="/jobs" element={<JobListingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
