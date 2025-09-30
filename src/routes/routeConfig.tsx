// routes/routeConfig.js
import { Navigate } from 'react-router-dom';

// Import all components
import NotFoundPage from '../pages/NotFound/index.tsx';

// Protected route components
import JobOpeningsPage from '@/pages-2/Landing.tsx';
import JobDetailPage from '@/pages-2/JobDetail.tsx';
import ForgotPasswordPage from '@/pages-2/ForgotPasswordPage.tsx';
import { OTPInput, OTPNotification, VerificationSuccess } from '@/pages-2/Verification.tsx';
import AuthPageV2 from '@/pages-2/auth.tsx';
import ApplicationsListing from '@/pages-2/ApplicationsListing.tsx';
import AppliedJob from '@/pages-2/AppliedJob.tsx';
import ProfilePage from '@/pages-2/ProfilePage.tsx';

// Public routes configuration
export const publicRoutes = [
  {
    path: '/',
    element: <JobOpeningsPage />,
    requiresPublicRoute: false,
  },
  {
    path: '/jobs/:id',
    element: <JobDetailPage />,
    requiresPublicRoute: false,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />,
    requiresPublicRoute: false,
  },
  {
    path: '/verification',
    element: <OTPNotification />,
    requiresPublicRoute: false,
  },
  {
    path: '/verification/enter-otp',
    element: <OTPInput />,
    requiresPublicRoute: false,
  },
  {
    path: '/verification/success',
    element: <VerificationSuccess />,
    requiresPublicRoute: false,
  },
];

// Protected routes configuration
export const protectedRoutes = [
  // Home and main routes
  {
    path: '/auth',
    element: <AuthPageV2 />,
  },
  {
    path: '/applications',
    element: <ApplicationsListing />,
    // requiresPublicRoute: false,
  },
  {
    path: '/applications/jobs/:id',
    element: <AppliedJob />,
    // requiresPublicRoute: false,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    // requiresPublicRoute: false,
  },
];

// Special routes (404, etc.)
export const specialRoutes = [
  {
    path: '*',
    element: <NotFoundPage />,
  },
];
