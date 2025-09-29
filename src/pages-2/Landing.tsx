import React, { useState } from 'react';
import { Search, MapPin, Heart, Menu, ChevronLeft, ChevronRight, Grid, Map, SlidersHorizontal, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import FooterV2 from './Footer';
import HeaderV2 from './Header';
import Footer from '@/components/Footer';

const JobOpeningsPage = () => {
  const [searchTags, setSearchTags] = useState(['Learnership', 'Graduate']);
  const [savedJobs, setSavedJobs] = useState([]);

  const jobs = [
    {
      id: 'POST-ITL-034',
      title: 'Information Technology Learnership',
      description: 'Supervise security operations and personnel at correctional facilities.',
      location: 'Bloemfontein, South Africa',
    },
    {
      id: 'POST-ITL-012',
      title: 'Correctional Services Learnership',
      description: 'Responsible for identifying, assessing, and mitigating operational risks within correctional facilities',
      location: 'Pretoria, South Africa',
    },
    {
      id: 'POST-ITL-012',
      title: 'Correctional Officer',
      description:
        'An 18-month learnership program focused on correctional services operations, rehabilitation programs, and offender management.',
      location: 'Johannesburg',
    },
    {
      id: 'POST-ITL-010',
      title: 'Social Worker',
      description:
        'A comprehensive 12-month IT learnership program designed to equip learners with essential IT skills within the correctional services environment.',
      location: 'Pretoria, SouthAfrica',
    },
  ];

  const removeTag = (tag) => {
    setSearchTags(searchTags.filter((t) => t !== tag));
  };

  const toggleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter((id) => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

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
              <div>
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
              </div>

              {/* Closing Date */}
              <div>
                <label className="block text-sm mb-2">Closing Date</label>
                <div className="bg-white rounded-lg p-2.5 text-gray-700 flex items-center justify-between">
                  <span className="text-sm">Jan 6 - Jan 13</span>
                  <ChevronLeft className="w-4 h-4 rotate-90" />
                </div>
              </div>

              {/* Center */}
              <div>
                <label className="block text-sm mb-2">Center</label>
                <div className="bg-white rounded-lg p-2.5 text-gray-700 flex items-center justify-between">
                  <span className="text-sm">All Centres</span>
                  <ChevronLeft className="w-4 h-4 rotate-90" />
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input type="text" placeholder="Search" className="pl-10 bg-white h-12" />
              </div>
              {/* <Button variant="outline" className="bg-white text-gray-700 h-12 px-4">
                <SlidersHorizontal className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">More filters</span>
              </Button> */}
              <Button variant="outline" className="bg-white text-gray-700 h-12 px-6">
                Clear
              </Button>
              <Button className="bg-[#0086C9] h-12 px-8">Search</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image Section */}
          <div className="hidden lg:block">
            <div className="sticky top-8 space-y-4">
              <img src={LoginBg} alt="Worker with South African flag" className="w-full object-cover rounded-lg" />
            </div>
          </div>

          {/* Jobs Listing */}
          <div className="lg:col-span-2">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-4">
                {/* <button className="text-sm text-gray-600 hover:text-gray-900 font-medium border-b-2 border-blue-600 pb-1">
                  Sort by date
                </button>
                <button className="text-sm text-gray-600 hover:text-gray-900">Sort by title</button> */}
              </div>
              <div className="flex">
                <button className="p-2 border-2 border-[#D0D5DD] rounded-tl-[8px] rounded-bl-[8px]">
                  <Grid className="w-5 h-5 text-[#344054]" />
                </button>
                <button className="p-2 border-t-2 border-b-2 border-r-2 border-[#D0D5DD] rounded-tr-[8px] rounded-br-[8px]">
                  <Map className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-2">
              {jobs.map((job) => (
                <Card key={job.id} className=" bg-white border border-[#E4E7EC]">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-sm text-[#026AA2] font-bold mb-1">{job.id}</div>
                        <h3 className="text-lg font-semibold text-[#101828] mb-2">{job.title}</h3>
                        <p className="text-[#475467] text-base mb-4">{job.description}</p>
                        <div className="flex items-center text-gray-500 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                      </div>
                      <div className="flex flex-row gap-2">
                        <Button className="bg-[#0086C9]">Apply</Button>
                        <button onClick={() => toggleSaveJob(job.id)} className="p-2 border border-[#7CD4FD] rounded">
                          <Heart className={`w-5 h-5 ${savedJobs.includes(job.id) ? 'fill-red-500 text-red-500' : 'text-[#026AA2]'}`} />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center border-t border-[#E4E7EC] justify-stretch mt-8">
              <Pagination className='mt-6'>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext href="#" />
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
