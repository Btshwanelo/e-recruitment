import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ChevronDown, User, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';

const LogCasePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    queryType: '',
    description: '',
    priority: 'medium',
    contactEmail: '',
    contactPhone: ''
  });
  const [errors, setErrors] = useState<{
    queryType?: string;
    description?: string;
    contactEmail?: string;
    contactPhone?: string;
    general?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.queryType) {
      newErrors.queryType = 'Please select a query type';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (formData.contactEmail && !/\S+@\S+\.\S+/.test(formData.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    if (formData.contactPhone && formData.contactPhone.length < 10) {
      newErrors.contactPhone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      setErrors({});

      // Simulate API call delay
      setTimeout(() => {
        // In a real app, this would submit the case to your backend
        setIsSubmitted(true);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleBackToAuth = () => {
    navigate('/');
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
        {/* Logo */}
        <div className="mb-2">
          <img src="/dcs-logo.png" alt="RHS Services Logo" className="h-20" />
        </div>

        <div className="w-full max-w-md">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Case Submitted Successfully!</h1>
            <p className="text-gray-600 mb-6">
              Your case has been logged and assigned reference number: <span className="font-semibold text-[#005f33]">CASE-{Date.now().toString().slice(-6)}</span>
            </p>
            <p className="text-sm text-gray-500 mb-8">
              You will receive an email confirmation shortly. Our team will review your case and get back to you within 24-48 hours.
            </p>
            <div className="space-y-3">
              <Button 
                onClick={() => setIsSubmitted(false)} 
                className="w-full py-3 bg-[#005f33] hover:bg-[#004d2a] text-white font-medium rounded"
              >
                Log Another Case
              </Button>
              <Button 
                onClick={handleBackToAuth} 
                variant="outline" 
                className="w-full py-3 border-[#005f33] text-[#005f33] hover:bg-[#005f33] hover:text-white font-medium rounded"
              >
                Back to Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
      {/* Logo */}
      <div className="mb-2">
        <img src="/dcs-logo.png" alt="RHS Services Logo" className="h-20" />
      </div>

      <div className="w-full max-w-md">

        {/* Form Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Log a Case</h1>
          <p className="text-gray-600 max-w-md mx-auto">
            Need help with your job application? Our support team is here to assist you with any questions or issues.
          </p>
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="p-3 mb-6 text-sm rounded bg-red-100 text-red-700 flex items-center">
            <AlertCircle size={16} className="mr-2" /> {errors.general}
          </div>
        )}

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Query Type */}
          <div className="space-y-2">
            <label htmlFor="queryType" className="block text-sm font-medium text-gray-700">
              Type of Query *
            </label>
            <Select value={formData.queryType} onValueChange={(value) => handleInputChange('queryType', value)}>
              <SelectTrigger className={`w-full border-gray-300 rounded ${errors.queryType ? 'border-red-500' : ''}`}>
                <SelectValue placeholder="Select a query type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="application-status">Application Status Inquiry</SelectItem>
                <SelectItem value="application-technical">Technical Support</SelectItem>
                <SelectItem value="application-feedback">Application Feedback</SelectItem>
                <SelectItem value="application-complaint">Application Complaint</SelectItem>
                <SelectItem value="document-upload">Document Upload Issue</SelectItem>
                <SelectItem value="interview-scheduling">Interview Scheduling</SelectItem>
                <SelectItem value="profile-update">Profile Update Request</SelectItem>
                <SelectItem value="general">General Inquiry</SelectItem>
              </SelectContent>
            </Select>
            {errors.queryType && <p className="text-sm text-red-600">{errors.queryType}</p>}
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority Level
            </label>
            <Select value={formData.priority} onValueChange={(value) => handleInputChange('priority', value)}>
              <SelectTrigger className="w-full border-gray-300 rounded">
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low - General inquiry</SelectItem>
                <SelectItem value="medium">Medium - Standard request</SelectItem>
                <SelectItem value="high">High - Urgent matter</SelectItem>
                <SelectItem value="critical">Critical - Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700">
                Contact Email
              </label>
              <Input 
                id="contactEmail" 
                type="email" 
                placeholder="your.email@example.com" 
                value={formData.contactEmail}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                className={`w-full border-gray-300 rounded ${errors.contactEmail ? 'border-red-500' : ''}`}
              />
              {errors.contactEmail && <p className="text-sm text-red-600">{errors.contactEmail}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700">
                Contact Phone
              </label>
              <Input 
                id="contactPhone" 
                type="tel" 
                placeholder="+27 12 345 6789" 
                value={formData.contactPhone}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                className={`w-full border-gray-300 rounded ${errors.contactPhone ? 'border-red-500' : ''}`}
              />
              {errors.contactPhone && <p className="text-sm text-red-600">{errors.contactPhone}</p>}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <Textarea 
              id="description" 
              placeholder="Please provide a detailed description of your issue or inquiry..." 
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`w-full min-h-32 border-gray-300 rounded ${errors.description ? 'border-red-500' : ''}`}
            />
            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
            <p className="text-xs text-gray-500">Minimum 10 characters required</p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full py-3 bg-[#005f33] hover:bg-[#004d2a] text-white font-medium rounded" 
              disabled={isLoading}
            >
              {isLoading ? 'Submitting Case...' : 'Submit Case'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogCasePage;
