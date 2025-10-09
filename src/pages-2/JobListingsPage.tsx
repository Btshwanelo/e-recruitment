import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Grid3X3,
  List,
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

// Skeleton Loading Component
const SkeletonLoader = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.05 }}
        className="h-16 bg-gray-200 rounded-xl animate-pulse"
      />
    ))}
  </div>
);

// Grid View Component
const GridJobs = ({ jobs, hasApplied, handleViewJob, handleApplyJob, handleToggleFavorite, getJobTypeBadge, getJobTypeIcon, formatDate }: any) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6">
    {jobs.map((job: any, index: number) => {
      const jobHasApplied = hasApplied(job.id);
      const JobTypeIcon = getJobTypeIcon(job.category);

      return (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          whileHover={{ scale: 1.02, y: -2 }}
          className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-2 flex-1 min-w-0">
                <JobTypeIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-gray-900 text-base sm:text-lg leading-tight truncate">{job.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-mono truncate">{job.postNumber || `REF-${job.id.slice(-6).toUpperCase()}`}</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.8 }}
                animate={{ scale: job.isFavorite ? 1.3 : 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                onClick={() => handleToggleFavorite(job.id)}
                className={`p-2 rounded-full transition-colors ${
                  job.isFavorite ? 'text-red-600 bg-red-50' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                }`}
                title={job.isFavorite ? 'Remove from Favorites' : 'Save Job'}
              >
                <Heart className={`w-4 h-4 ${job.isFavorite ? 'fill-current' : ''}`} />
              </motion.button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="text-sm">{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">Closes {formatDate(job.closingDate)}</span>
              </div>
              <div className="flex items-center justify-between">
                {getJobTypeBadge(job.type, job.category)}
                {jobHasApplied ? (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">Applied</span>
                ) : (
                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-800">Open</span>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              {!jobHasApplied ? (
                <Button
                  onClick={() => handleApplyJob(job.id)}
                  className="flex-1 bg-[#005f33] hover:bg-[#004d2a] text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 hover:shadow-md"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
              ) : (
                <Button
                  onClick={() => window.location.href = '/applications'}
                  variant="outline"
                  className="flex-1 border-[#005f33] text-[#005f33] hover:bg-[#005f33] hover:text-white font-medium py-2 px-4 rounded-lg"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View App
                </Button>
              )}
              <Button
                onClick={() => handleViewJob(job.id)}
                variant="outline"
                className="px-3 py-2 border-gray-300 text-gray-600 hover:bg-gray-50 rounded-lg w-full sm:w-auto"
                title="View Details"
              >
                <Eye className="w-4 h-4 mr-2" />
                <span className="sm:hidden">View Details</span>
              </Button>
            </div>
          </div>
        </motion.div>
      );
    })}
  </div>
);

const JobListingsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
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

  // Debounced search
  const debouncedSearch = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (searchText: string, empTypes: string[]) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          dispatch(
            setFilters({
              searchTerm: searchText,
              employmentType: empTypes.join(', '),
            })
          );
          dispatch(resetPagination());
          fetchJobs(1, searchText, empTypes);
        }, 400);
      };
    })(),
    [dispatch, fetchJobs]
  );

  // Update search filters
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSearch(value, employmentTypes);
  };

  // Handle employment type filter
  const handleEmploymentTypeChange = (selectedTypes: string[]) => {
    setEmploymentTypes(selectedTypes);
    debouncedSearch(searchTerm, selectedTypes);
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
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <HeaderV2 />
        <div className="container mx-auto mb-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card
              className="w-full min-h-[180px] mb-10 text-white border-none shadow-xl"
              style={{ background: 'linear-gradient(27deg, #182230 8.28%, #344054 91.72%)' }}
            >
              <CardHeader>
                <CardTitle className="text-4xl font-bold mb-8">Job Openings</CardTitle>
                <p className="text-gray-300 font-normal text-xl mt-2">Loading available positions...</p>
              </CardHeader>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="border border-[#D0D5DD] bg-white shadow-lg rounded-xl">
              <CardContent className="p-6">
                <SkeletonLoader />
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <HeaderV2 />
        <div className="container mx-auto mb-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              className="w-full min-h-[180px] mb-10 text-white border-none shadow-xl"
              style={{ background: 'linear-gradient(27deg, #182230 8.28%, #344054 91.72%)' }}
            >
              <CardHeader>
                <CardTitle className="text-4xl font-bold mb-8">Job Openings</CardTitle>
                <p className="text-gray-300 font-normal text-xl mt-2">Error loading positions</p>
              </CardHeader>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="border border-[#D0D5DD] bg-white text-center py-12 shadow-lg rounded-xl">
              <CardContent>
                <div className="max-w-md mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  >
                    <span className="text-red-600 text-2xl">⚠️</span>
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Oops! Something went wrong</h3>
                  <p className="text-gray-600 mb-6">{error}</p>
                  <Button 
                    className="bg-[#0086C9] hover:bg-[#0070a3] text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200" 
                    onClick={() => window.location.reload()}
                  >
                    Try Again
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <HeaderV2 />

        <div className="container mx-auto mb-auto px-4 py-8">
          {/* Title Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card
              className="w-full min-h-[180px] mb-10 text-white border-none shadow-xl"
              style={{ background: 'linear-gradient(27deg, #182230 8.28%, #344054 91.72%)' }}
            >
              <CardHeader>
                <CardTitle className="text-4xl font-bold mb-8">Job Openings</CardTitle>
                <p className="text-gray-300 font-normal text-xl mt-2">Discover exciting career opportunities</p>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Empty State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="border border-[#D0D5DD] bg-white text-center py-12 shadow-lg rounded-xl">
              <CardContent>
                <div className="max-w-md mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  >
                    <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Hmm, no openings right now</h3>
                  <p className="text-gray-600 mb-6">
                    Check back soon or try different filters to discover new opportunities that match your interests.
                  </p>
                  <Button 
                    className="bg-[#0086C9] hover:bg-[#0070a3] text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200" 
                    onClick={() => window.location.reload()}
                  >
                    Refresh Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <HeaderV2 />

      <div className="container mx-auto mb-auto px-4 py-8">
        {/* Title Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card
            className="w-full min-h-[180px] mb-10 text-white border-none shadow-xl"
            style={{ background: 'linear-gradient(27deg, #182230 8.28%, #344054 91.72%)' }}
          >
            <CardHeader>
              <CardTitle className="text-4xl font-bold mb-8">Job Openings</CardTitle>
              <p className="text-gray-300 font-normal text-xl mt-2">
                Discover {jobs.length} exciting career opportunit{jobs.length !== 1 ? 'ies' : 'y'}
              </p>
            </CardHeader>
          </Card>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col gap-4 mb-6"
        >
          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Input
                type="search"
                placeholder="Search jobs by title, location, or post number..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 pr-4 border border-[#D0D5DD] bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 text-sm sm:text-base"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="text-gray-300 w-4 h-4" />
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button 
                onClick={handleSearch} 
                className="bg-[#0086C9] hover:bg-[#0070a3] text-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex-1 sm:flex-none"
              >
                <Search className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Search</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="bg-white border border-[#D0D5DD] hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex-1 sm:flex-none"
              >
                <Filter className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
              <Button 
                variant="outline" 
                onClick={handleClearFilters} 
                className="bg-white border border-[#D0D5DD] hover:bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex-1 sm:flex-none"
              >
                <X className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Clear</span>
              </Button>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-4 border border-[#D0D5DD] bg-white rounded-xl shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employment Type</label>
                      <MultiSelect
                        options={employmentTypeOptions}
                        selected={employmentTypes}
                        onChange={handleEmploymentTypeChange}
                        placeholder="Select employment types..."
                        className="border border-[#D0D5DD] bg-white rounded-xl"
                      />
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Jobs Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Card className="border border-[#D0D5DD] bg-white shadow-lg rounded-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 border-b border-gray-300 flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-gray-50 to-white gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <h2 className="text-lg font-semibold">Available Positions</h2>
                  <span className="text-sm text-[#005f33] rounded-full border px-3 py-1 font-medium border-[#e5fadc] bg-green-50">
                    {filteredJobs.length} Job{filteredJobs.length !== 1 ? 's' : ''}
                  </span>
                </div>
                
                {/* View Toggle */}
                <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1 w-full sm:w-auto">
                  <Button
                    variant={viewMode === 'table' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('table')}
                    className={`px-3 py-1 text-sm font-medium transition-all duration-200 flex-1 sm:flex-none ${
                      viewMode === 'table'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <List className="w-4 h-4 mr-1" />
                    <span className="hidden xs:inline">Table</span>
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1 text-sm font-medium transition-all duration-200 flex-1 sm:flex-none ${
                      viewMode === 'grid'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Grid3X3 className="w-4 h-4 mr-1" />
                    <span className="hidden xs:inline">Grid</span>
                  </Button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {viewMode === 'table' ? (
                  <motion.div
                    key="table"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
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
                            <motion.tr
                              key={job.id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05, duration: 0.3 }}
                              whileHover={{ scale: 1.01 }}
                              className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200 transition-all duration-200`}
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
                                  <motion.button
                                    whileTap={{ scale: 0.8 }}
                                    animate={{ scale: job.isFavorite ? 1.3 : 1 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    onClick={() => handleToggleFavorite(job.id)}
                                    className={`border-gray-300 hover:bg-gray-50 h-8 w-8 p-0 rounded border flex items-center justify-center transition-colors ${
                                      job.isFavorite ? 'text-red-600 border-red-300' : 'text-gray-600'
                                    }`}
                                    title={job.isFavorite ? 'Remove from Favorites' : 'Save Job'}
                                  >
                                    <Heart className={`w-4 h-4 ${job.isFavorite ? 'fill-red-600' : ''}`} />
                                  </motion.button>
                                </div>
                              </TableCell>
                            </motion.tr>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </motion.div>
                ) : (
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GridJobs
                      jobs={filteredJobs}
                      hasApplied={hasApplied}
                      handleViewJob={handleViewJob}
                      handleApplyJob={handleApplyJob}
                      handleToggleFavorite={handleToggleFavorite}
                      getJobTypeBadge={getJobTypeBadge}
                      getJobTypeIcon={getJobTypeIcon}
                      formatDate={formatDate}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Pagination */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex flex-col sm:flex-row items-center justify-between p-4 border-t border-gray-300 bg-gradient-to-r from-gray-50 to-white gap-4"
              >
                <div className="text-sm text-gray-600 text-center sm:text-left">
                  Showing {jobs.length} of {pagination.totalRecords} jobs (Page {pagination.currentPage} of {pagination.totalPages})
                </div>
                <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1 border text-sm font-semibold bg-white border-[#EAECF0] rounded-lg hover:shadow-md transition-all duration-200 flex-1 sm:flex-none"
                    disabled={pagination.currentPage <= 1}
                    onClick={handlePreviousPage}
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span className="hidden xs:inline">Previous</span>
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex gap-1 overflow-x-auto">
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageNumber = i + 1;
                      const isActive = pageNumber === pagination.currentPage;
                      return (
                        <Button
                          key={pageNumber}
                          variant={isActive ? 'default' : 'outline'}
                          size="sm"
                          className={`w-8 h-8 p-0 text-sm font-semibold rounded-lg transition-all duration-200 flex-shrink-0 ${
                            isActive ? 'bg-[#005f33] text-white shadow-md' : 'bg-white border-[#EAECF0] text-gray-700 hover:bg-gray-50 hover:shadow-sm'
                          }`}
                          onClick={() => handlePageChange(pageNumber)}
                        >
                          {pageNumber}
                        </Button>
                      );
                    })}
                    {pagination.totalPages > 5 && (
                      <>
                        <span className="px-2 py-1 text-gray-500 flex-shrink-0">...</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-8 h-8 p-0 text-sm font-semibold bg-white border-[#EAECF0] text-gray-700 hover:bg-gray-50 rounded-lg hover:shadow-sm transition-all duration-200 flex-shrink-0"
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
                    className="gap-1 border text-sm font-semibold bg-white border-[#EAECF0] rounded-lg hover:shadow-md transition-all duration-200 flex-1 sm:flex-none"
                    disabled={pagination.currentPage >= pagination.totalPages}
                    onClick={handleNextPage}
                  >
                    <span className="hidden xs:inline">Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default JobListingsPage;
