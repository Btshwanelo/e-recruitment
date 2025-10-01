import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ContactFormData } from '@/types/profile';

interface ContactInfoProps {
  formData: ContactFormData;
  onFormDataChange: (data: ContactFormData) => void;
  getOptionsForSchema: (schemaName: string) => any[];
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ formData, onFormDataChange, getOptionsForSchema, onSubmit, isLoading }) => {
  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormDataChange({ ...formData, [name]: value });
  };

  return (
    <Card className="bg-white border-none rounded-lg shadow-none">
      <CardContent className="pt-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Contact info</h2>
        <p className="text-gray-500 text-sm mb-6">
          Please provide your contact information. This information will be used to communicate with you regarding job applications and
          other important updates.
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Email address</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleContactChange} className="w-full" />
              <p className="text-xs text-gray-500">This email will be used for all communications</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile number</Label>
              <Input
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleContactChange}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="alternativeNumber">Alternative number (optional)</Label>
              <Input
                id="alternativeNumber"
                name="alternativeNumber"
                value={formData.alternativeNumber}
                onChange={handleContactChange}
                className="w-full"
              />
            </div>
          </div>

          {/* Residential Address Section */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-4">Residential Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input
                  id="streetAddress"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleContactChange}
                  placeholder="Enter your street address"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleContactChange}
                  placeholder="Enter your city"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Select value={formData.provinceId} onValueChange={(value) => onFormDataChange({ ...formData, provinceId: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {getOptionsForSchema('ProvinceId').map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.lable}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleContactChange}
                  placeholder="Enter postal code"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select value={formData.countryId} onValueChange={(value) => onFormDataChange({ ...formData, countryId: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {getOptionsForSchema('CountryId').map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.lable}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-300">
            <Button variant="outline" type="button" className="bg-white border border-[#005f33] text-[#005f33] w-[180px]">
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-[#005f33] w-[180px] hover:bg-[#005f33] disabled:opacity-50">
              {isLoading ? 'Saving...' : 'Save Contact Info'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContactInfo;
