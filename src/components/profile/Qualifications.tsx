import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Qualification } from '@/types/profile';

interface QualificationsProps {
  qualifications: Qualification[];
  onQualificationAdd: () => void;
  onQualificationChange: (id: string, field: 'qualification' | 'institution' | 'yearObtained', value: string) => void;
  onQualificationRemove: (id: string) => void;
  getOptionsForSchema: (schemaName: string) => any[];
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const Qualifications: React.FC<QualificationsProps> = ({
  qualifications,
  onQualificationAdd,
  onQualificationChange,
  onQualificationRemove,
  getOptionsForSchema,
  onSubmit,
  isLoading,
}) => {
  return (
    <Card className="bg-white border-none rounded-lg shadow-none">
      <CardContent className="pt-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Qualifications</h2>
        <p className="text-gray-500 text-sm mb-6">
          Please provide details about your educational qualifications and certifications.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Your Qualifications</h3>
            <Button type="button" onClick={onQualificationAdd} className="bg-[#005f33] hover:bg-[#005f33] text-white">
              Add Qualification
            </Button>
          </div>

          {qualifications.map((qualification) => (
            <div
              key={qualification.id}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 border border-gray-200 rounded-lg"
            >
              <div className="space-y-2">
                <Label htmlFor={`qualification-${qualification.id}`}>Qualification</Label>
                <Select
                  value={qualification.qualification}
                  onValueChange={(value) => onQualificationChange(qualification.id, 'qualification', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select qualification" />
                  </SelectTrigger>
                  <SelectContent>
                    {getOptionsForSchema('QualificationTypeId').map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.lable}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`institution-${qualification.id}`}>Institution</Label>
                <Input
                  id={`institution-${qualification.id}`}
                  value={qualification.institution}
                  onChange={(e) => onQualificationChange(qualification.id, 'institution', e.target.value)}
                  placeholder="e.g., University of Cape Town"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`year-${qualification.id}`}>Year Obtained</Label>
                <Input
                  id={`year-${qualification.id}`}
                  value={qualification.yearObtained}
                  onChange={(e) => onQualificationChange(qualification.id, 'yearObtained', e.target.value)}
                  placeholder="e.g., 2020"
                  className="w-full"
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onQualificationRemove(qualification.id)}
                  className="w-full text-red-600 h-11 border-red-300 hover:bg-red-50"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}

          {qualifications.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No qualifications added yet. Click "Add Qualification" to get started.</p>
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
              {isLoading ? 'Saving...' : 'Save Qualifications'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Qualifications;
