import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  MoreVertical,
  SlidersHorizontal,
  Calendar,
  Building,
  Eye,
  ExternalLink,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectApplications, selectJobById, updateApplicationStatus } from '@/slices/jobsSlice';
import HeaderV2 from './Header';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

// Mock table components since they're not available
const Table = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <table className={`w-full ${className}`}>{children}</table>
);

const TableHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <thead className={className}>{children}</thead>
);

const TableBody = ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>;

const TableRow = ({ children, className }: { children: React.ReactNode; className?: string }) => <tr className={className}>{children}</tr>;

const TableHead = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <th className={`px-4 py-3 text-left text-sm font-medium text-gray-700 ${className}`}>{children}</th>
);

const TableCell = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-4 text-sm ${className}`}>{children}</td>
);

const ApplicationsListing: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  // Mock navigate function
  const navigate = useNavigate();
  // Get applications from Redux store
  const applications = useSelector(selectApplications);

  // Get job details for each application
  const applicationsWithJobDetails = applications.map((application) => {
    const job = useSelector((state: any) => selectJobById(state, application.jobId));
    return {
      ...application,
      job,
    };
  });

  // Filter applications based on search term
  const filteredApplications = applicationsWithJobDetails.filter(
    (application) =>
      application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Get status badge styling
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      submitted: { color: 'bg-blue-100 text-blue-800', label: 'Submitted' },
      under_review: { color: 'bg-yellow-100 text-yellow-800', label: 'Under Review' },
      shortlisted: { color: 'bg-green-100 text-green-800', label: 'Shortlisted' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejected' },
      accepted: { color: 'bg-emerald-100 text-emerald-800', label: 'Accepted' },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.submitted;

    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${config.color}`}>{config.label}</span>;
  };

  // Handle view job details
  const handleViewJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  // Handle withdraw application (mock function)
  const handleWithdrawApplication = (applicationId: string) => {
    // In a real app, this would make an API call
    console.log('Withdrawing application:', applicationId);
    // You could dispatch an action to update the application status or remove it
  };

  if (applications.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderV2 />

        <div className="container mx-auto mb-auto px-4 py-8">
          {/* Title Card */}
          <Card
            className="w-full min-h-[150px] mb-10 text-white border-none"
            style={{ background: 'linear-gradient(27deg, #182230 8.28%, #344054 91.72%)' }}
          >
            <CardHeader>
              <CardTitle className="text-4xl font-bold mb-8">My Applications</CardTitle>
              <p className="text-gray-300 font-normal text-xl mt-2">Track the status of your job applications</p>
            </CardHeader>
          </Card>

          {/* Empty State */}
          <Card className="border border-[#D0D5DD] bg-white text-center py-12">
            <CardContent>
              <div className="max-w-md mx-auto">
                <Building className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Yet</h3>
                <p className="text-gray-600 mb-6">
                  You haven't applied for any jobs yet. Start exploring opportunities and submit your applications.
                </p>
                <Button className="bg-[#0086C9] hover:bg-[#0086C9]" onClick={() => navigate('/')}>
                  Browse Jobs
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <HeaderV2 />

      <div className="container mx-auto mb-auto px-4 py-8">
        {/* Title Card */}
        <Card
          className="w-full min-h-[180px] mb-10 text-white border-none"
          style={{ background: 'linear-gradient(27deg, #182230 8.28%, #344054 91.72%)' }}
        >
          <CardHeader>
            <CardTitle className="text-4xl font-bold mb-8">My Applications</CardTitle>
            <p className="text-gray-300 font-normal text-xl mt-2">
              Track the status of your {applications.length} job application{applications.length !== 1 ? 's' : ''}
            </p>
          </CardHeader>
        </Card>

        {/* Search */}
        <div className="flex flex-col md:flex-row justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" className="bg-[#005f33] text-white border-none" onClick={() => navigate('/')}>
              Browse More Jobs
            </Button>
          </div>
          <div className="relative w-full md:w-64">
            <Input
              type="search"
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 border border-[#D0D5DD] bg-white"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <Card className="border border-[#D0D5DD] bg-white">
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-300 flex items-center justify-between">
              <h2 className="text-lg font-semibold">My Job Applications</h2>
              <span className="text-sm text-[#005f33] rounded-full border px-3 py-1 font-medium border-[#dcfade] bg-green-50">
                {filteredApplications.length} Application{filteredApplications.length !== 1 ? 's' : ''}
              </span>
            </div>

            <Table className="border-collapse w-full">
              <TableHeader className="border-b border-gray-300">
                <TableRow className="bg-gray-50 border-b border-gray-300">
                  <TableHead className="font-medium">
                    <div className="flex items-center">
                      Job Title
                      <ArrowDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="font-medium">Company</TableHead>
                  <TableHead className="font-medium">Applied Date</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Job Type</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application, index) => (
                  <TableRow
                    key={application.id}
                    className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200`}
                  >
                    <TableCell className="font-medium">
                      <button onClick={() => handleViewJob(application.jobId)} className="text-[#005f33] hover:underline text-left">
                        {application.jobTitle}
                      </button>
                    </TableCell>
                    <TableCell>{application.company}</TableCell>
                    <TableCell className="text-gray-600">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(application.appliedDate)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(application.status)}</TableCell>
                    <TableCell>
                      <span className="text-gray-600">{application.job?.type || 'N/A'}</span>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewJob(application.jobId)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Job Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => navigate(`/jobs/${application.jobId}`)}>
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Go to Job Page
                          </DropdownMenuItem>
                          {application.status === 'submitted' && (
                            <DropdownMenuItem
                              onClick={() => handleWithdrawApplication(application.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              Withdraw Application
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination - Simple version for now */}
            <div className="flex items-center justify-between p-4 border-t border-gray-300">
              <div className="text-sm text-gray-600">
                Showing {filteredApplications.length} of {applications.length} applications
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1 border text-sm font-semibold bg-white border-[#EAECF0]" disabled>
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="gap-1 border text-sm font-semibold bg-white border-[#EAECF0]" disabled>
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ApplicationsListing;
