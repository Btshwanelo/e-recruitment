import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ChevronDown, User, Bookmark, FileText, LogIn, UserPlus } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { clearAuthData } from '@/slices/authSlice';

const HeaderV2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authData = useSelector((state: RootState) => state.auth);

  console.log('authData', authData);
  const handleLogout = () => {
    dispatch(clearAuthData());
    navigate('/');
  };

  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo on the left */}
        <div className="flex items-center">
          <div onClick={() => navigate('/')} className="w-20 h-14 cursor-pointer rounded flex items-center justify-center">
            <img src="/dcs-logo.png" alt="EZRA Logo" className="w-24 h-auto" />
          </div>
        </div>

        {/* Dropdown menus on the right */}
        <div className="flex items-center space-x-4">
          {/* My Jobs Dropdown - Only show if logged in */}
          {
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-1 text-[#475467] font-semibold hover:text-[#005f33] hover:bg-gray-50"
                >
                  <span>My Jobs</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border-none">
                <DropdownMenuItem
                  onClick={() => navigate('/profile')}
                  className="flex items-center space-x-2 cursor-pointer hover:bg-white"
                >
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </DropdownMenuItem>
                {/* <DropdownMenuItem onClick={() => navigate('/saved-jobs')} className="flex items-center space-x-2 cursor-pointer">
                  <Bookmark className="w-4 h-4" />
                  <span>My Saved Jobs</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem onClick={() => navigate('/applications')} className="flex items-center space-x-2 cursor-pointer">
                  <FileText className="w-4 h-4" />
                  <span>Applied Jobs</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          }

          {/* Sign In Dropdown - Only show if NOT logged in */}
          {!authData.isAuthenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center space-x-1 text-[#475467] font-semibold hover:text-[#005f33] hover:bg-gray-50"
                >
                  <span>Sign In</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border-none">
                <DropdownMenuItem onClick={() => navigate('/auth?1=login')} className="flex items-center space-x-2 cursor-pointer">
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/auth?i=register')} className="flex items-center space-x-2 cursor-pointer">
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Logout Button - Only show if logged in */}
          {authData.isAuthenticated && (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2 bg-white text-black border-none shadow-none hover:shadow-none hover:bg-white transition-colors"
            >
              <span>Logout</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderV2;
