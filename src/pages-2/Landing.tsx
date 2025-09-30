import { useEffect, useState } from 'react';
import { Search, MapPin, Heart, TableOfContents, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import MultiSelect from '@/components/ui/multi-select';
import LoginBg from '@/assets/mockup.png';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import HeaderV2 from './Header';
import Footer from '@/components/Footer';
import { useExecuteRequest1Mutation } from '@/slices/services';
import { useSelector, useDispatch } from 'react-redux';
import {
  setJobsFromApi,
  setLoading,
  setError,
  setCurrentPage,
  selectPagination,
  setFilters,
  clearFilters,
  resetPagination,
} from '@/slices/jobsSlice';
import { useNavigate } from 'react-router-dom';

const JobOpeningsPage = () => {
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid'); // Add view mode state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Employment type options
  const employmentTypeOptions = [
    { value: 'Internship', label: 'Internship' },
    { value: 'Learnership', label: 'Learnership' },
    { value: 'Full Time', label: 'Full Time' },
    { value: 'Part Time', label: 'Part Time' },
    { value: 'Contract', label: 'Contract' },
  ];

  const [getJobs] = useExecuteRequest1Mutation();

  // Get jobs from Redux store
  const jobs = useSelector((state: any) => state.jobs.jobs);
  const isLoading = useSelector((state: any) => state.jobs.isLoading);
  const error = useSelector((state: any) => state.jobs.error);
  const pagination = useSelector(selectPagination);

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


  const toggleSaveJob = (jobId: string) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  // Add view mode toggle handler
  const handleViewModeChange = (mode: 'grid' | 'table') => {
    setViewMode(mode);
  };

  // Format job data for display
  const formatJobForDisplay = (job: any) => {
    return {
      id: job.postNumber,
      title: job.title,
      description: job.description || `Position: ${job.title} at ${job.location}`,
      location: job.location,
      type: job.type,
      category: job.category,
      closingDate: job.closingDate,
      jobVacancyId: job.id,
    };
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

  // Search and filter handlers
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleEmploymentTypeChange = (selectedTypes: string[]) => {
    setEmploymentTypes(selectedTypes);
  };

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

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderV2 />
        <div className="bg-gradient-to-r from-[#182230] to-[#475467] text-white py-8 container mx-auto rounded-2xl my-6 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl text-[#FCFCFD] font-bold mb-2">Job Openings</h1>
            <p className="text-[#FCFCFD] text-lg mb-6">Loading available positions...</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#0086C9] mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Jobs</h3>
              <p className="text-gray-600">Please wait while we fetch the latest job openings...</p>
            </div>
          </div>
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
        <div className="bg-gradient-to-r from-[#182230] to-[#475467] text-white py-8 container mx-auto rounded-2xl my-6 md:py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl text-[#FCFCFD] font-bold mb-2">Job Openings</h1>
            <p className="text-[#FCFCFD] text-lg mb-6">Error loading positions</p>
          </div>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-2xl">⚠️</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Jobs</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <Button className="bg-[#0086C9] hover:bg-[#0086C9]" onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HeaderV2 />

      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-[#182230] to-[#475467] text-white py-8 container mx-auto rounded-2xl my-6 md:py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl  text-[#FCFCFD] font-bold mb-2">Job Openings</h1>
          <p className="text-[#FCFCFD] text-lg mb-6">View and apply for a job</p>

          {/* Search Filters */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search Tags */}
              {/* <div>
                <label className="block text-sm mb-2">Search</label>
                <div className="bg-white rounded-lg p-2 flex flex-wrap gap-2 items-center">
                  {searchTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-gray-200 text-gray-700">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-1">
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div> */}

              {/* Employment Type Filter */}
              <div>
                <label className="block text-sm mb-2">Employment Type</label>
                <MultiSelect
                  options={employmentTypeOptions}
                  selected={employmentTypes}
                  onChange={handleEmploymentTypeChange}
                  placeholder="Select employment types..."
                  className="h-12 text-black"
                />
              </div>

              {/* Center */}
              {/* <div>
                <label className="block text-sm mb-2">Center</label>
                <div className="bg-white rounded-lg p-2.5 text-gray-700 flex items-center justify-between">
                  <span className="text-sm">All Centres</span>
                  <ChevronLeft className="w-4 h-4 rotate-90" />
                </div>
              </div> */}
            </div>

            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search jobs by title, location, or post number..."
                  className="pl-10 bg-white text-black h-12"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button variant="outline" className="bg-white text-gray-700 h-12 px-6" onClick={handleClearFilters}>
                Clear
              </Button>
              <Button className="bg-[#0086C9] h-12 px-8" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className={`grid grid-cols-1 gap-8 ${viewMode === 'table' ? 'lg:grid-cols-1' : 'lg:grid-cols-3'}`}>
          {/* Image Section - Hidden in table view */}
          {viewMode === 'grid' && (
            <div className="hidden lg:block">
              <div className="sticky top-8 space-y-4">
                <img src={LoginBg} alt="Worker with South African flag" className="w-full object-cover rounded-lg" />
              </div>
            </div>
          )}

          {/* Jobs Listing */}
          <div className={viewMode === 'table' ? 'w-full' : 'lg:col-span-2'}>
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                {/* <button className="text-sm text-gray-600 hover:text-gray-900 font-medium border-b-2 border-blue-600 pb-1">
                  Sort by date
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-900">Sort by title</button> */}
              </div>
              <div className="flex">
                <button 
                  className={`p-2 border-2 border-[#D0D5DD] rounded-tl-[8px] rounded-bl-[8px] ${
                    viewMode === 'table' ? 'bg-[#0086C9] text-white' : 'bg-white text-[#344054]'
                  }`}
                  onClick={() => handleViewModeChange('table')}
                >
                  <TableOfContents className="w-5 h-5" />
                </button>
                <button 
                  className={`p-2 border-t-2 border-b-2 border-r-2 border-[#D0D5DD] rounded-tr-[8px] rounded-br-[8px] ${
                    viewMode === 'grid' ? 'bg-[#0086C9] text-white' : 'bg-white text-[#344054]'
                  }`}
                  onClick={() => handleViewModeChange('grid')}
                >
                  <LayoutGrid className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Job Cards/Table */}
            <div className="space-y-2">
              {jobs.length === 0 ? (
                <Card className="bg-white border border-[#E4E7EC]">
                  <CardContent className="p-12 text-center">
                    <div className="max-w-md mx-auto">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-gray-400 text-2xl">📋</span>
                      </div>
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
              ) : viewMode === 'grid' ? (
                // Grid View (existing implementation)
                jobs.map((job: any) => {
                  const displayJob = formatJobForDisplay(job);
                  return (
                    <Card key={job.id} className="bg-white border border-[#E4E7EC]">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="text-sm text-[#026AA2] font-bold mb-1">{displayJob.id}</div>
                            <h3 className="text-lg font-semibold text-[#101828] mb-2">{displayJob.title}</h3>
                            <p className="text-[#475467] text-base mb-4">{displayJob.description}</p>
                            <div className="flex items-center text-gray-500 text-sm">
                              <MapPin className="w-4 h-4 mr-1" />
                              {displayJob.location}
                            </div>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{displayJob.type}</span>
                              <span className="text-xs text-gray-500">
                                Closes: {new Date(displayJob.closingDate).toLocaleDateString('en-GB')}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row gap-2">
                            <Button className="bg-[#0086C9]" onClick={() => navigate(`/jobs/${displayJob.jobVacancyId}`)}>
                              Apply
                            </Button>
                            <button onClick={() => toggleSaveJob(job.id)} className="p-2 border border-[#7CD4FD] rounded">
                              <Heart className={`w-5 h-5 ${savedJobs.includes(job.id) ? 'fill-red-500 text-red-500' : 'text-[#026AA2]'}`} />
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                // Table View (new implementation)
                <div className="bg-white border border-[#E4E7EC] rounded-lg overflow-hidden w-full">
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-full">
                      <thead className="bg-gray-50 border-b border-[#E4E7EC]">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job Details</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closing Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-[#E4E7EC]">
                        {jobs.map((job: any) => {
                          const displayJob = formatJobForDisplay(job);
                          return (
                            <tr key={job.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div>
                                  <div className="text-sm text-[#026AA2] font-bold">{displayJob.id}</div>
                                  <div className="text-lg font-semibold text-[#101828] mb-1">{displayJob.title}</div>
                                  <div className="text-sm text-[#475467] line-clamp-2">{displayJob.description}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center text-sm text-gray-500">
                                  <MapPin className="w-4 h-4 mr-1" />
                                  {displayJob.location}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{displayJob.type}</span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-gray-500">
                                  {new Date(displayJob.closingDate).toLocaleDateString('en-GB')}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <Button 
                                    size="sm" 
                                    className="bg-[#0086C9] hover:bg-[#0086C9]" 
                                    onClick={() => navigate(`/jobs/${displayJob.jobVacancyId}`)}
                                  >
                                    Apply
                                  </Button>
                                  <button 
                                    onClick={() => toggleSaveJob(job.id)} 
                                    className="p-2 border border-[#7CD4FD] rounded hover:bg-gray-50"
                                  >
                                    <Heart className={`w-4 h-4 ${savedJobs.includes(job.id) ? 'fill-red-500 text-red-500' : 'text-[#026AA2]'}`} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-[#E4E7EC] mt-8 py-4">
              <Pagination className="mt-0">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handlePreviousPage();
                      }}
                      className={pagination.currentPage <= 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  {/* Page Numbers */}
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const pageNumber = i + 1;
                    const isActive = pageNumber === pagination.currentPage;
                    return (
                      <PaginationItem key={pageNumber}>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pageNumber);
                          }}
                          isActive={isActive}
                          className="cursor-pointer border-none text-black bg-inherit shadow-none hover:bg-inherit"
                        >
                          {pageNumber}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {pagination.totalPages > 5 && (
                    <>
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handlePageChange(pagination.totalPages);
                          }}
                          className="cursor-pointer"
                        >
                          {pagination.totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNextPage();
                      }}
                      className={pagination.currentPage >= pagination.totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default JobOpeningsPage;
