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
  MapPin,
  Clock,
  Heart,
  Eye,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Search,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilteredJobs, selectHasApplied, setFilters, toggleFavorite } from '@/slices/jobsSlice';
import HeaderV2 from './Header';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';

// Mock table components to match applications table styling
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

const JobListingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  // Mock navigate function
  const navigate = useNavigate();

  // Get filtered jobs from Redux store
  const jobs = useSelector(selectFilteredJobs);

  // Filter jobs based on local search term (in addition to Redux filters)
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  // Get job type badge styling
  const getJobTypeBadge = (type: string, category: string) => {
    const isLearnership = category === 'Learnership';
    const color = isLearnership ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800';

    return <span className={`px-2 py-1 text-xs font-medium rounded-full ${color}`}>{type}</span>;
  };

  // Get appropriate icon based on job type
  const getJobTypeIcon = (category: string) => {
    return category === 'Learnership' ? GraduationCap : Briefcase;
  };

  // Handle view job details
  const handleViewJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  // Handle apply for job
  const handleApplyJob = (jobId: string) => {
    navigate(`/jobs/${jobId}`);
  };

  // Handle toggle favorite
  const handleToggleFavorite = (jobId: string) => {
    dispatch(toggleFavorite(jobId));
  };

  // Update search filters
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    dispatch(setFilters({ searchTerm: value }));
  };

  if (jobs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderV2 />

        <div className="container mx-auto mb-auto px-4 py-8">
          {/* Title Card */}
          <Card
            className="w-full min-h-[180px] mb-10 text-white border-none"
            style={{ background: 'linear-gradient(27deg, #182230 8.28%, #344054 91.72%)' }}
          >
            <CardHeader>
              <CardTitle className="text-4xl font-bold mb-8">Job Openings</CardTitle>
              <p className="text-gray-300 font-normal text-xl mt-2">Discover exciting career opportunities</p>
            </CardHeader>
          </Card>

          {/* Empty State */}
          <Card className="border border-[#D0D5DD] bg-white text-center py-12">
            <CardContent>
              <div className="max-w-md mx-auto">
                <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Jobs Available</h3>
                <p className="text-gray-600 mb-6">
                  There are currently no job openings available. Please check back later for new opportunities.
                </p>
                <Button className="bg-[#0086C9] hover:bg-[#0086C9]" onClick={() => window.location.reload()}>
                  Refresh Page
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
            <CardTitle className="text-4xl font-bold mb-8">Job Openings</CardTitle>
            <p className="text-gray-300 font-normal text-xl mt-2">
              Discover {jobs.length} exciting career opportunit{jobs.length !== 1 ? 'ies' : 'y'}
            </p>
          </CardHeader>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between gap-3 mb-6">
          <div className="flex items-center gap-2">
            {/* <Button variant="outline" className="bg-white border border-[#D0D5DD] hover:bg-gray-50">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filters
            </Button> */}
          </div>
          <div className="relative w-full md:w-64">
            <Input
              type="search"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4 border border-[#D0D5DD] bg-white"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-300" />
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <Card className="border border-[#D0D5DD] bg-white">
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-300 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Available Positions</h2>
              <span className="text-sm text-[#005f33] rounded-full border px-3 py-1 font-medium border-[#e5fadc] bg-green-50">
                {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''}
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
                  <TableHead className="font-medium">Location</TableHead>
                  <TableHead className="font-medium">Type</TableHead>
                  <TableHead className="font-medium">Closing Date</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job, index) => {
                  const hasApplied = useSelector((state: any) => selectHasApplied(state, job.id));
                  const JobTypeIcon = getJobTypeIcon(job.category);

                  return (
                    <TableRow
                      key={job.id}
                      className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200`}
                    >
                      <TableCell className="font-medium">
                        <button
                          onClick={() => handleViewJob(job.id)}
                          className="text-[#005f33] hover:underline text-left flex items-center"
                        >
                          <JobTypeIcon className="w-4 h-4 mr-2 text-gray-500" />
                          {job.title}
                        </button>
                      </TableCell>
                      <TableCell>{job.company}</TableCell>
                      <TableCell className="text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                      </TableCell>
                      <TableCell>{getJobTypeBadge(job.type, job.category)}</TableCell>
                      <TableCell className="text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(job.closingDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {hasApplied ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Applied</span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Open</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewJob(job.id)}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            {!hasApplied ? (
                              <DropdownMenuItem onClick={() => handleApplyJob(job.id)}>
                                <ExternalLink className="w-4 h-4 mr-2" />
                                Apply Now
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => navigate('/applications')}>
                                <Eye className="w-4 h-4 mr-2" />
                                View Application
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleToggleFavorite(job.id)}>
                              <Heart className={`w-4 h-4 mr-2 ${job.isFavorite ? 'fill-red-600 text-red-600' : ''}`} />
                              {job.isFavorite ? 'Remove from Favorites' : 'Save Job'}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-gray-300">
              <div className="text-sm text-gray-600">
                Showing {filteredJobs.length} of {jobs.length} jobs
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

export default JobListingsPage;
