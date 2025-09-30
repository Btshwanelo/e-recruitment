// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRoutes from './routes';

function App() {
  return (
    // <Router>
    //   <Routes>
    //     {/* Public Routes */}
    //     <Route path="/" element={<JobOpeningsPage />} />
    //     <Route path="/auth" element={<AuthPageV2 />} />
    //     <Route path="/forgot-password" element={<ForgotPasswordPage />} />
    //     <Route path="/cases" element={<LogCasePage />} />
    //     <Route path="/verification" element={<OTPNotification />} />
    //     <Route path="/verification/enter-otp" element={<OTPInput />} />
    //     <Route path="/verification/success" element={<VerificationSuccess />} />
    //     <Route path="/profile" element={<ProfilePage />} />
    //     <Route path="/applications" element={<ApplicationsListing />} />
    //     <Route path="/jobs/:id" element={<JobDetailPage />} />
    //     <Route path="/application/jobs/:id" element={<AppliedJob />} />
    //     <Route path="/jobs" element={<JobListingsPage />} />
    //     <Route path="*" element={<NotFound />} />
    //   </Routes>
    // </Router>
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
