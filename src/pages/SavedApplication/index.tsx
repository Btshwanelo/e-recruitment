import React, { useEffect, useState } from 'react';
import { Check, ChevronDown, ChevronUp, Trash2, Pencil, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '@/Layouts/DefaultLayout';
import { useGetApplicationListingMutation } from '@/service/genericServices';
import useAuth from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { updateApplication } from '@/slices/loanSlice';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const SavedApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({ open: false, appId: null });
  
  const [GetApplicationListing, getProps] = useGetApplicationListingMutation();
  const navigate = useNavigate();
  const authDetails = useAuth();
  const dispatch = useDispatch();

  const handleResume =(id:string)=>{
    dispatch(
      updateApplication({
        currentStep: 0,
        isNewApplication: false,
        isExistingApplication: true,
        isResumeApplication: true,
        currentApplicationId: id,
      })
    );
    navigate('/application');
  }

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = () => {
    setIsLoading(true);
    GetApplicationListing({
      body: {
        "requestName": "GetApplicationListing",
        "RecordId": authDetails.user.relatedObjectId,
        "inputParamters": {
          "InputParameters": {
            "page": 1,
            "perPage": 10
          }
        }
      }
    });
  };

  useEffect(() => {
    if (getProps.isSuccess) {
      setApplications(getProps.data.ApplicationList || []);
      setIsLoading(false);
    }
  }, [getProps.isSuccess]);

  useEffect(() => {
    if (getProps.isError) {
      setIsLoading(false);
      // You could add error handling here
      console.error('Error fetching applications:', getProps.error);
    }
  }, [getProps.isError]);

  const handleResumeApplication = (application) => {
    // Find the edit action for this application
    const editAction = application.actions.find(action => action.type === 'edit');
    if (editAction) {
      // Extract application ID from the endpoint
      const appIdMatch = editAction.endpoint.match(/\/applications\/(\d+)\/edit/);
      const applicationId = appIdMatch ? appIdMatch[1] : null;
      
      if (applicationId) {
        dispatch(
          updateApplication({
            currentStep: 0, // Start from the first step
            isNewApplication: false,
            isExistingApplication: false,
            isResumeApplication: true,
            currentApplicationId: applicationId,
          })
        );
        navigate('/application');
      }
    }
  };

  const handleDeleteConfirm = (appId) => {
    setConfirmDialog({ open: true, appId });
  };

  const handleDeleteApplication = async () => {
    const application = applications.find(app => app.id === confirmDialog.appId);
    if (!application) return;
    
    const deleteAction = application.actions.find(action => action.type === 'delete');
    if (deleteAction) {
      try {
        // Implement your delete API call here using the action details
        // For example:
        // const response = await fetch(deleteAction.endpoint, {
        //   method: deleteAction.method,
        //   headers: { /* your headers */ },
        // });
        
        // After successful deletion, refresh the list
        setConfirmDialog({ open: false, appId: null });
        fetchApplications();
      } catch (error) {
        console.error('Error deleting application:', error);
      }
    }
  };

  const getStatusBadgeClass = (statusCode) => {
    // Map status codes to appropriate colors
    switch (statusCode) {
      case 1089: // Pending
        return "bg-yellow-100 text-yellow-800";
      case 1090: // Completed
        return "bg-green-100 text-green-800";
      case 1091: // Rejected
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (statusCode) => {
    switch (statusCode) {
      case 1089: // Pending
        return <AlertCircle size={12} className="mr-1" />;
      case 1090: // Completed
        return <Check size={12} className="mr-1" />;
      case 1091: // Rejected
        return <AlertCircle size={12} className="mr-1" />;
      default:
        return <AlertCircle size={12} className="mr-1" />;
    }
  };

  return (
    <DefaultLayout>
      <main className="container bg-white rounded-md mx-auto px-10 mt-20 py-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Saved Applications</h1>
          <Button 
            onClick={() => navigate('/application/new')}
            className="bg-primary text-white"
          >
            New Application
          </Button>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="bg-white border border-gray-200 rounded-md p-8 text-center">
            <p className="text-gray-500">Loading applications...</p>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && applications.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-md p-8 text-center">
            <p className="text-gray-500">No saved applications found.</p>
          </div>
        )}

        {/* Applications Table */}
        {!isLoading && applications.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-md overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 border-b border-gray-200 bg-gray-50">
              <div className="col-span-3 p-4 flex items-center text-sm font-medium text-gray-600">
                <span>Application No</span>
              </div>
              <div className="col-span-3 p-4 text-sm font-medium text-gray-600">Date</div>
              <div className="col-span-3 p-4 text-sm font-medium text-gray-600">Status</div>
              <div className="col-span-3 p-4 text-sm font-medium text-gray-600 text-right">Actions</div>
            </div>

            {/* Table Rows */}
            {applications.map((app) => (
              <div key={app.id} className="grid grid-cols-12 border-b border-gray-200 hover:bg-gray-50">
                <div className="col-span-3 p-4 text-sm font-medium">{app.applicationNumber}</div>
                <div className="col-span-3 p-4 text-sm text-gray-600">{app.displayDate}</div>
                <div className="col-span-3 p-4">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(app.statusCode)}`}>
                    {getStatusIcon(app.statusCode)}
                    {app.status}
                  </div>
                </div>
                <div className="col-span-3 p-4 flex space-x-2 justify-end">
                  <Button
                    variant="outline"
                    onClick={() => handleResume(app.id)}
                    className="text-sm border border-sky-500 bg-white text-sky-500 hover:bg-sky-50"
                  >
                    <Pencil className="w-4 h-4 mr-1" />
                    Resume
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDeleteConfirm(app.id)}
                    className="text-sm bg-white border border-red-500 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialog.open} onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this application and cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteApplication} className="bg-red-500 text-white hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DefaultLayout>
  );
};

export default SavedApplicationsPage;