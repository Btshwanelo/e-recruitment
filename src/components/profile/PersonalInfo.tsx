import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ProfileFormData } from '@/types/profile';

interface PersonalInfoProps {
  formData: ProfileFormData;
  onFormDataChange: (data: ProfileFormData) => void;
  onTitleChange: (value: string) => void;
  onDisabilityStatusChange: (value: string) => void;
  onLanguageAdd: () => void;
  onLanguageChange: (id: string, field: 'language' | 'speakingProficiency' | 'readWriteProficiency', value: string) => void;
  onLanguageRemove: (id: string) => void;
  getOptionsForSchema: (schemaName: string) => any[];
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  formData,
  onFormDataChange,
  onTitleChange,
  onDisabilityStatusChange,
  onLanguageAdd,
  onLanguageChange,
  onLanguageRemove,
  getOptionsForSchema,
  onSubmit,
  isLoading,
}) => {
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormDataChange({ ...formData, [name]: value });
  };

  return (
    <Card className="bg-white border-none rounded-lg shadow-none">
      <CardContent className="pt-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Personal info</h2>
        <p className="text-gray-500 text-sm mb-4">
          Please provide some information about yourself. The First Name and Last Name you provide will be displayed alongside any comments,
          forum posts, or ideas you make on the site.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          The Email Address and Phone number will not be displayed on the site. Your Organization and Title are optional. They will be
          displayed with your comments and forum posts.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Select value={formData.title} onValueChange={onTitleChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a title" />
                </SelectTrigger>
                <SelectContent>
                  {getOptionsForSchema('TitleId').map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.lable}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="firstName">First name(s)</Label>
              <Input id="firstName" name="firstName" value={formData.firstName} onChange={handlePersonalChange} className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="initial">Initial</Label>
              <Input id="initial" name="initial" value={formData.initial} onChange={handlePersonalChange} className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handlePersonalChange} className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="idNumber">ID number</Label>
              <Input id="idNumber" name="idNumber" value={formData.idNumber} onChange={handlePersonalChange} className="w-full" />
              <p className="text-xs text-gray-500">Your ID number as it appears in your SA ID</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" value={formData.age} onChange={handlePersonalChange} className="w-full" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="race">Race</Label>
              <Select value={formData.race} onValueChange={(value) => onFormDataChange({ ...formData, race: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select race" />
                </SelectTrigger>
                <SelectContent>
                  {getOptionsForSchema('RaceId').map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.lable}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Date of birth</Label>
              <Input
                id="dateOfBirth"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handlePersonalChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => onFormDataChange({ ...formData, gender: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  {getOptionsForSchema('GenderId').map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.lable}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="passportNumber">Passport Number (optional)</Label>
              <Input
                id="passportNumber"
                name="passportNumber"
                value={formData.passportNumber}
                onChange={handlePersonalChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rightToWork">Right to Work status</Label>
              <Select value={formData.rightToWork} onValueChange={(value) => onFormDataChange({ ...formData, rightToWork: value })}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {getOptionsForSchema('RightToWorkStatusId').map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.lable}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="disabilityStatus">Disability Status</Label>
              <Select value={formData.disabilityStatus} onValueChange={onDisabilityStatusChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select disability status" />
                </SelectTrigger>
                <SelectContent>
                  {getOptionsForSchema('Disabled').map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.lable}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.disabilityStatus === 'Yes' && (
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="disabilityNature">Nature of Disability</Label>
                <Input
                  id="disabilityNature"
                  name="disabilityNature"
                  value={formData.disabilityNature}
                  onChange={handlePersonalChange}
                  placeholder="Please describe the nature of your disability"
                  className="w-full"
                />
              </div>
            )}
          </div>

          {/* Languages Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Languages & Proficiency</h3>
              <Button type="button" onClick={onLanguageAdd} className="bg-[#005f33] hover:bg-[#005f33] text-white">
                Add Language
              </Button>
            </div>

            {formData.languages.map((language) => (
              <div key={language.id} className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4 p-4 border border-gray-200 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor={`language-${language.id}`}>Language</Label>
                  <Select value={language.language} onValueChange={(value) => onLanguageChange(language.id, 'language', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      {getOptionsForSchema('LanguageId').map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.lable}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`speaking-${language.id}`}>Speaking Proficiency</Label>
                  <Select value={language.speakingProficiency} onValueChange={(value) => onLanguageChange(language.id, 'speakingProficiency', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select speaking level" />
                    </SelectTrigger>
                    <SelectContent>
                      {getOptionsForSchema('SpeakingProficiencyId').map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.lable}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`readwrite-${language.id}`}>Read/Write Proficiency</Label>
                  <Select value={language.readWriteProficiency} onValueChange={(value) => onLanguageChange(language.id, 'readWriteProficiency', value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select read/write level" />
                    </SelectTrigger>
                    <SelectContent>
                      {getOptionsForSchema('ReadOrWriteProficiencyId').map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.lable}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onLanguageRemove(language.id)}
                    className="w-full h-11 text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}

            {formData.languages.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No languages added yet. Click "Add Language" to get started.</p>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-300">
            <Button variant="outline" type="button" className="bg-white border border-[#005f33] text-[#005f33] w-[180px]">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#005f33] w-[180px] hover:bg-[#005f33] disabled:opacity-50">
              {isLoading ? 'Saving...' : 'Save Personal Info'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PersonalInfo;
