import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { WorkExperience as WorkExperienceType } from '@/types/profile';

interface WorkExperienceProps {
  workExperience: WorkExperienceType[];
  onWorkExperienceAdd: () => void;
  onWorkExperienceChange: (id: string, field: keyof WorkExperienceType, value: string) => void;
  onWorkExperienceRemove: (id: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const WorkExperience: React.FC<WorkExperienceProps> = ({
  workExperience,
  onWorkExperienceAdd,
  onWorkExperienceChange,
  onWorkExperienceRemove,
  onSubmit,
  isLoading,
}) => {
  return (
    <Card className="bg-white border-none rounded-lg shadow-none">
      <CardContent className="pt-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Work Experience</h2>
        <p className="text-gray-500 text-sm mb-6">Please provide details about your work experience and employment history.</p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Your Work Experience</h3>
            <Button type="button" onClick={onWorkExperienceAdd} className="bg-[#005f33] hover:bg-[#005f33] text-white">
              Add Work Experience
            </Button>
          </div>

          {workExperience.map((work) => (
            <div key={work.id} className="p-4 border border-gray-200 rounded-lg mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor={`company-${work.id}`}>Company Name</Label>
                  <Input
                    id={`company-${work.id}`}
                    value={work.companyName}
                    onChange={(e) => onWorkExperienceChange(work.id, 'companyName', e.target.value)}
                    placeholder="Enter company name"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`position-${work.id}`}>Position</Label>
                  <Input
                    id={`position-${work.id}`}
                    value={work.position}
                    onChange={(e) => onWorkExperienceChange(work.id, 'position', e.target.value)}
                    placeholder="Enter your position"
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`fromDate-${work.id}`}>From Date</Label>
                  <Input
                    id={`fromDate-${work.id}`}
                    type="date"
                    value={work.fromDate}
                    onChange={(e) => onWorkExperienceChange(work.id, 'fromDate', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`toDate-${work.id}`}>To Date</Label>
                  <Input
                    id={`toDate-${work.id}`}
                    type="date"
                    value={work.toDate}
                    onChange={(e) => onWorkExperienceChange(work.id, 'toDate', e.target.value)}
                    className="w-full"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor={`reason-${work.id}`}>Reason for Leaving</Label>
                  <Input
                    id={`reason-${work.id}`}
                    value={work.reasonForLeaving}
                    onChange={(e) => onWorkExperienceChange(work.id, 'reasonForLeaving', e.target.value)}
                    placeholder="Enter reason for leaving"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onWorkExperienceRemove(work.id)}
                  className="text-red-600 border-red-300 hover:bg-red-50"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          {workExperience.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No work experience added yet. Click "Add Work Experience" to get started.</p>
            </div>
          )}

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-300">
            <Button variant="outline" type="button" className="bg-white border border-[#005f33] text-[#005f33] w-[180px]">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-[#005f33] w-[180px] hover:bg-[#005f33] disabled:opacity-50"
            >
              {isLoading ? 'Saving...' : 'Save Work Experience'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WorkExperience;
