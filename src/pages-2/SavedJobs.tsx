import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MultiSelect from '@/components/ui/multi-select';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Calendar,
  MapPin,
  Heart,
  Eye,
  ExternalLink,
  GraduationCap,
  Briefcase,
  Search,
  Filter,
  X,
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectFilteredJobs,
  setFilters,
  toggleFavorite,
  setJobsFromApi,
  setLoading,
  setError,
  setCurrentPage,
  selectPagination,
  clearFilters,
  resetPagination,
} from '@/slices/jobsSlice';
import { useExecuteRequest1Mutation } from '@/slices/services';
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

const TableHead = ({ children, className }: { children?: React.ReactNode; className?: string }) => (
  <th className={`px-4 py-3 text-left text-sm font-medium text-gray-700 ${className}`}>{children}</th>
);

const TableCell = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <td className={`px-4 py-4 text-sm ${className}`}>{children}</td>
);

const SavedJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const dispatch = useDispatch();

  // Employment type options
  const employmentTypeOptions = [
    { value: 'Internship', label: 'Internship' },
    { value: 'Learnership', label: 'Learnership' },
    { value: 'Full Time', label: 'Full Time' },
    { value: 'Part Time', label: 'Part Time' },
    { value: 'Contract', label: 'Contract' },
  ];

  // Mock navigate function
  const navigate = useNavigate();

  // API integration
  const [getJobs] = useExecuteRequest1Mutation();

  // Get filtered jobs from Redux store
  const jobs = useSelector(selectFilteredJobs);
  const isLoading = useSelector((state: any) => state.jobs.isLoading);
  const error = useSelector((state: any) => state.jobs.error);
  const pagination = useSelector(selectPagination);
  const hasAppliedSelector = useSelector((state: any) => state.jobs.applications);

  // Fetch jobs from API
  const fetchJobs = async (pageNumber: number = 1, searchText: string = '', empTypes: string[] = []) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));

      // Build employment type filter
      let employmentTypeFilter = 'Internship, Learnership';
      if (empTypes.length > 0) {
        employmentTypeFilter = empTypes.join(', ');
      }

      const result = await getJobs({
        body: {
          RequestName: 'JobVacancyListing',
          EntityName: 'JobVacancy',
          InputParamters: {
            PageNumber: pageNumber,
            PageSize: 12,
            SearchText: searchText,
            EmploymentType: employmentTypeFilter,
          },
        },
      }).unwrap();

      if (result?.Listing) {
        dispatch(
          setJobsFromApi({
            jobs: result.Listing,
            pagination: {
              pageSize: result.PageSize,
              recordCount: result.RecordCount,
              pages: result.Pages,
            },
          })
        );
        dispatch(setCurrentPage(pageNumber));
      }
    } catch (err: any) {
      console.error('Error fetching jobs:', err);
      dispatch(setError(err?.data?.clientMessage || 'Failed to fetch jobs'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Fetch jobs on component mount
  useEffect(() => {
    fetchJobs(1);
  }, [dispatch, getJobs]);

  // Filter jobs based on local search term (in addition to Redux filters)
  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.postNumber && job.postNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (job.applicationRef && job.applicationRef.toLowerCase().includes(searchTerm.toLowerCase()))
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
  };

  // Handle employment type filter
  const handleEmploymentTypeChange = (selectedTypes: string[]) => {
    setEmploymentTypes(selectedTypes);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setEmploymentTypes([]);
    dispatch(clearFilters());
    fetchJobs(1, '', []);
  };

  // Handle search button click
  const handleSearch = () => {
    dispatch(
      setFilters({
        searchTerm: searchTerm,
        employmentType: employmentTypes.join(', '),
      })
    );
    dispatch(resetPagination());
    fetchJobs(1, searchTerm, employmentTypes);
  };

  // Helper function to check if job has been applied to
  const hasApplied = (jobId: string) => {
    return hasAppliedSelector.some((app: any) => app.jobId === jobId);
  };

  // Pagination handlers
  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= pagination.totalPages) {
      fetchJobs(pageNumber, searchTerm, employmentTypes);
    }
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      handlePageChange(pagination.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      handlePageChange(pagination.currentPage + 1);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderV2 />
        <div className="container mx-auto mb-auto px-4 py-8">
          <Card
            className="w-full min-h-[180px] mb-10 text-white border-none"
            style={{ background: 'linear-gradient(27deg, #182230 8.28%, #344054 91.72%)' }}
          >
            <CardHeader>
              <CardTitle className="text-4xl font-bold mb-8">Job Openings</CardTitle>
              <p className="text-gray-300 font-normal text-xl mt-2">Loading available positions...</p>
            </CardHeader>
          </Card>
          <Card className="border border-[#D0D5DD] bg-white text-center py-12">
            <CardContent>
              <div className="max-w-md mx-auto">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#005f33] mx-auto mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Jobs</h3>
                <p className="text-gray-600">Please wait while we fetch the latest job openings...</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderV2 />
        <div className="container mx-auto mb-auto px-4 py-8">
          <Card
            className="w-full min-h-[180px] mb-10 text-white border-none"
            style={{ background: 'linear-gradient(27deg, #182230 8.28%, #344054 91.72%)' }}
          >
            <CardHeader>
              <CardTitle className="text-4xl font-bold mb-8">Job Openings</CardTitle>
              <p className="text-gray-300 font-normal text-xl mt-2">Error loading positions</p>
            </CardHeader>
          </Card>
          <Card className="border border-[#D0D5DD] bg-white text-center py-12">
            <CardContent>
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">⚠️</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Jobs</h3>
                <p className="text-gray-600 mb-6">{error}</p>
                <Button className="bg-[#0086C9] hover:bg-[#0086C9]" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

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
              <CardTitle className="text-4xl font-bold mb-8">Saved Jobs</CardTitle>
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
        <Card
          className="w-full min-h-[150px] mb-10 text-white border-none"
          style={{ background: 'linear-gradient(27deg, #182230 8.28%, #344054 91.72%)' }}
        >
          <CardHeader>
            <CardTitle className="text-4xl font-bold mb-8">Saved Jobs</CardTitle>
            <p className="text-gray-300 font-normal text-xl mt-2">
              {' '}
              Discover {jobs.length} exciting career opportunit{jobs.length !== 1 ? 'ies' : 'y'}
            </p>
          </CardHeader>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Input
                type="search"
                placeholder="Search jobs by title, location, or post number..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 pr-4 border border-[#D0D5DD] bg-white"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-300" />
              </div>
            </div>
            <Button onClick={handleSearch} className="bg-[#0086C9] hover:bg-[#0070a3] text-white">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="bg-white border border-[#D0D5DD] hover:bg-gray-50"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="outline" onClick={handleClearFilters} className="bg-white border border-[#D0D5DD] hover:bg-gray-50">
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>

          {/* Filter Panel */}
          {showFilters && (
            <Card className="p-4 border border-[#D0D5DD] bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                  <MultiSelect
                    options={employmentTypeOptions}
                    selected={employmentTypes}
                    onChange={handleEmploymentTypeChange}
                    placeholder="Select employment types..."
                    className="border border-[#D0D5DD] bg-white"
                  />
                </div>
              </div>
            </Card>
          )}
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
                      Post
                      <ArrowDown className="ml-1 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="font-medium">Post Number</TableHead>
                  <TableHead className="font-medium">Location/Center</TableHead>
                  <TableHead className="font-medium">Type</TableHead>
                  {/* <TableHead className="font-medium">Application Ref</TableHead> */}
                  <TableHead className="font-medium">Closing Date</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium text-center bg-gray-50">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job, index) => {
                  const jobHasApplied = hasApplied(job.id);
                  const JobTypeIcon = getJobTypeIcon(job.category);

                  return (
                    <TableRow
                      key={job.id}
                      className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200`}
                    >
                      <TableCell className="font-medium">
                        <button
                          onClick={() => handleViewJob(job.id)}
                          className="text-[#005f33] hover:underline hover:text-[#004d2a] text-left flex items-center font-medium transition-colors duration-200"
                        >
                          <JobTypeIcon className="w-4 h-4 mr-2 text-gray-500" />
                          {job.title}
                        </button>
                      </TableCell>
                      <TableCell className="text-gray-600 font-mono text-sm">
                        {job.postNumber || `REF-${job.id.slice(-6).toUpperCase()}`}
                      </TableCell>
                      <TableCell className="text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                      </TableCell>
                      <TableCell>{getJobTypeBadge(job.type, job.category)}</TableCell>
                      {/* <TableCell className="text-gray-600 font-mono text-sm">
                        {job.applicationRef || `APP-${job.id.slice(-8).toUpperCase()}`}
                      </TableCell> */}
                      <TableCell className="text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(job.closingDate)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {jobHasApplied ? (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Applied</span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Open</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center bg-gray-50">
                        <div className="flex items-center justify-center gap-2">
                          {/* Primary Action Button - Apply or View Application */}
                          {!jobHasApplied ? (
                            <Button
                              onClick={() => handleApplyJob(job.id)}
                              className="bg-[#005f33] hover:bg-[#004d2a] text-white text-sm font-semibold px-5 py-2 h-9 shadow-sm hover:shadow-md transition-all duration-200"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Apply Now
                            </Button>
                          ) : (
                            <Button
                              onClick={() => navigate('/applications')}
                              variant="outline"
                              className="border-[#005f33] text-[#005f33] hover:bg-[#005f33] hover:text-white text-sm font-medium px-4 py-2 h-8"
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View App
                            </Button>
                          )}

                          {/* Secondary Action Button - View Details */}
                          <Button
                            onClick={() => handleViewJob(job.id)}
                            variant="outline"
                            size="sm"
                            className="border-gray-300 text-gray-600 hover:bg-gray-50 h-8 w-8 p-0"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>

                          {/* Favorite Button */}
                          <Button
                            onClick={() => handleToggleFavorite(job.id)}
                            variant="outline"
                            size="sm"
                            className={`border-gray-300 hover:bg-gray-50 h-8 w-8 p-0 ${
                              job.isFavorite ? 'text-red-600 border-red-300' : 'text-gray-600'
                            }`}
                            title={job.isFavorite ? 'Remove from Favorites' : 'Save Job'}
                          >
                            <Heart className={`w-4 h-4 ${job.isFavorite ? 'fill-red-600' : ''}`} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-gray-300">
              <div className="text-sm text-gray-600">
                Showing {jobs.length} of {pagination.totalRecords} jobs (Page {pagination.currentPage} of {pagination.totalPages})
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 border text-sm font-semibold bg-white border-[#EAECF0]"
                  disabled={pagination.currentPage <= 1}
                  onClick={handlePreviousPage}
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>

                {/* Page Numbers */}
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const pageNumber = i + 1;
                    const isActive = pageNumber === pagination.currentPage;
                    return (
                      <Button
                        key={pageNumber}
                        variant={isActive ? 'default' : 'outline'}
                        size="sm"
                        className={`w-8 h-8 p-0 text-sm font-semibold ${
                          isActive ? 'bg-[#005f33] text-white' : 'bg-white border-[#EAECF0] text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </Button>
                    );
                  })}
                  {pagination.totalPages > 5 && (
                    <>
                      <span className="px-2 py-1 text-gray-500">...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-8 h-8 p-0 text-sm font-semibold bg-white border-[#EAECF0] text-gray-700 hover:bg-gray-50"
                        onClick={() => handlePageChange(pagination.totalPages)}
                      >
                        {pagination.totalPages}
                      </Button>
                    </>
                  )}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 border text-sm font-semibold bg-white border-[#EAECF0]"
                  disabled={pagination.currentPage >= pagination.totalPages}
                  onClick={handleNextPage}
                >
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

export default SavedJobs;
