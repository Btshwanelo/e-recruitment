import React, { useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { AlertCircle } from 'lucide-react';
import { useResetProfileMutation } from '@/services/externalLogonService';
import { ButtonLoader } from './ui/button-loader';
import useCurrentUser from '@/hooks/useCurrentUser';
import { showSuccessToast } from '@/components/SuccessToast';
import { useDispatch } from 'react-redux';
import { showErrorToast } from './ErrorToast ';
import { useNavigate } from 'react-router-dom';
import {
  clearDetails,
  updateInProgressStep,
  updateIsCreateProfile,
  updateNavigation,
  updateProfileComplete,
  updateProfileDetails,
  updateRequestResults,
} from '@/slices/detailsSlice';
import { useGetCurrentUserMutation } from '@/services/apiService';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';

interface ProfileResetModalProps {
  isOpen: boolean;
  onCancell: (open: boolean) => void;
  onOpenChange: (open: boolean) => void;
}

const ProfileResetModal = ({ isOpen, onCancell, onOpenChange }: ProfileResetModalProps) => {
  const [resetProfile, { isSuccess, isLoading, isError, error }] = useResetProfileMutation();
  const [
    getCurrentUser,
    { isLoading: isLoadingCurrentUser, isSuccess: isSuccessCurrentUser, isError: isErrorCurrentUser, data: CurrentUser, reset },
  ] = useGetCurrentUserMutation();

  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileReset = () => {
    resetProfile({
      body: {
        entityName: 'ExternalLogon',
        requestName: 'ResetProfileReq',
        recordId: currentUser.externalLogonId,
      },
    });
  };

  useEffect(() => {
    if (isSuccess) {
      showSuccessToast('Profile reset successfully');
      getCurrentUser({
        body: {
          entityName: 'ExternalLogon',
          requestName: 'RetrieveCurrentUser',
          inputParamters: {
            ExternalLogonId: currentUser.externalLogonId,
          },
        },
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log('err', error);
      showErrorToast(error.data || 'Failed to reset profile. Please try again.');
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccessCurrentUser && CurrentUser?.createProfile === false && CurrentUser?.isProfileComplete === false) {
      dispatch(updateNavigation(CurrentUser.navigation));
      dispatch(updateIsCreateProfile(CurrentUser?.createProfile));
      dispatch(updateProfileComplete(CurrentUser.isProfileComplete));
      dispatch(updateInProgressStep(CurrentUser?.inProgressStep));
      dispatch(updateProfileDetails(CurrentUser.profileDetails));
      dispatch(updateRequestResults(CurrentUser.requestResults));
      reset();
      navigate('/onboarding');
    }
    if (isSuccessCurrentUser && CurrentUser?.createProfile === false && CurrentUser?.isProfileComplete === true) {
      dispatch(updateNavigation(CurrentUser.navigation));
      dispatch(updateIsCreateProfile(CurrentUser?.createProfile));
      dispatch(updateProfileComplete(CurrentUser.isProfileComplete));
      dispatch(updateRequestResults(CurrentUser.requestResults));
      reset();
      navigate('/c1');
    }
    if (isSuccessCurrentUser && CurrentUser?.createProfile == true) {
      dispatch(updateIsCreateProfile(CurrentUser?.createProfile));
      // reset();
      // dispatch(clearDetails());
      navigate('/profile/create?type=p');
    }
  }, [isSuccessCurrentUser, CurrentUser]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-red-600 flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            Reset Profile Confirmation
          </DialogTitle>
          <DialogDescription className="space-y-3">
            <p className="font-medium text-gray-900">Are you sure you want to reset your profile?</p>
            <div className="space-y-2 text-gray-600">
              <p>This action will:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Delete all your current profile information</li>
                <li>Remove your existing user type selection</li>
                <li>Require you to select user type on the next logon</li>
                <li>Clear all associated data and preferences</li>
              </ul>
            </div>
            <p className="font-medium text-red-600">This action cannot be undone.</p>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2 sm:justify-end mt-4">
          <Button type="button" variant="outline" onClick={() => onCancell(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="button" className="bg-red-500 hover:bg-red-600" onClick={handleProfileReset} disabled={isLoading}>
            {isLoading ? <ButtonLoader /> : 'Yes, Reset My Profile'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileResetModal;
