import React from "react";
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ArrowDown, ArrowLeft, ArrowRight, HelpCircle, MoreVertical, SlidersHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import HeaderV2 from "./Header";

// Job type definition
interface Job {
  id: string;
  name: string;
  department: string;
  employmentType: string;
  expiryDate: string;
}

const JobListingsPage: React.FC = () => {
    const navigate = useNavigate()
  // Sample job data
  const jobs: Job[] = [
    {
        id: "1",
        name:  "Analyst: Operational Risk Management",
        department: "Admin",
        employmentType: "Full - time",
        expiryDate: "9/5/2025"
      },
 
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      {/* <header className="bg-[#F2F4F7] py-4 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-20 h-20 rounded flex items-center justify-center">
              <img src="/logo-2.svg" alt="EZRA Logo" className="w-6 h-6" />
            </div>
            <nav className="ml-8 hidden md:flex space-x-6">
              <a href="#" className="text-[#475467] font-semibold hover:text-blue-500">Home</a>
              <a href="#" className="text-[#475467] font-semibold hover:text-blue-500">
                EZRA Jobs <span className="ml-1"></span>
              </a>
              <a href="#" className="text-[#475467] font-semibold hover:text-blue-500">
                EZRA News <span className="ml-1"></span>
              </a>
              <a href="#" className="text-[#475467] font-semibold hover:text-blue-500">Contact Us</a>
            </nav>
          </div>
        </div>
      </header> */}
      <HeaderV2 />

      <div className="container mx-auto px-4 py-8">
        {/* Title Card */}
         <Card 
          className="w-full min-h-[180px] mb-10 text-white border-none" 
          style={{ background: "linear-gradient(27deg, #182230 8.28%, #344054 91.72%)" }}
        >
          <CardHeader>
            <CardTitle className="text-4xl font-bold mb-8">Job Openings</CardTitle>
            <p className="text-gray-300 font-normal text-xl mt-2">View and apply for a job</p>
          </CardHeader>
        </Card>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-end gap-3 mb-6">
          <Button variant="outline" className="w-full  font-semibold border border-[#D0D5DD] bg-white md:w-auto">
            Filters
            <SlidersHorizontal className="mr-2 h-4 w-4" />
          </Button>
          <div className="relative w-full md:w-64">
            <Input
              type="search"
              placeholder="Search"
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
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Jobs Table */}
        <Card className=" border border-[#D0D5DD] bg-white">
          <CardContent className="p-0">
            <div className="p-4 border-b border-gray-300 flex items-center gap-2">
              <h2 className="text-lg font-semibold">Job Openings</h2>
              <span className="text-sm text-[#2B6EDF] rounded-full border px-2 font-medium border-[#DCE7FA]">100 Jobs</span>
            </div>
        
            <Table className="border-collapse [&_tr]:border-b [&_tr]:border-gray-200 ">
  <TableHeader className="border-b border-gray-300">
    <TableRow className="bg-gray-50 border-b border-gray-300">
      <TableHead className="font-medium">
        <div className="flex items-center">
          Name
          <ArrowDown className="ml-1 h-4 w-4" />
        </div>
      </TableHead>
      <TableHead className="font-medium">
        <div className="flex items-center">
          Department
          <HelpCircle className="ml-1 h-4 w-4 text-gray-400" />
        </div>
      </TableHead>
      <TableHead className="font-medium">Employment type</TableHead>
      <TableHead className="font-medium">Expiry date</TableHead>
      <TableHead className="w-10"></TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {jobs.map((job, index) => (
      <TableRow 
        key={job.id} 
        className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} border-b border-gray-200`}
      >
        <TableCell className="font-medium">
          <Link to={`/jobs/${job.id}`} className=" hover:underline">
            {job.name}
          </Link>
        </TableCell>
        <TableCell>{job.department}</TableCell>
        <TableCell>{job.employmentType}</TableCell>
        <TableCell>{job.expiryDate}</TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>View details</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>navigate(`/jobs/${job.id}`)}>Apply now</DropdownMenuItem>
              <DropdownMenuItem>Save job</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
            
            {/* Pagination */}
            <div className="flex items-center justify-between p-4 border-t border-gray-300">
              <Button variant="outline" size="sm" className="gap-1 border text-sm font-semibold bg-white border-[#EAECF0]">
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button variant="outline" size="sm" className="gap-1 border text-sm font-semibold bg-white border-[#EAECF0]">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-[#0086C9] fixed text-white w-full bottom-0 py-6 mt-10">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <img src="/logo-2.svg" alt="EZRA Logo" className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm">© 2077 EZRA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobListingsPage;