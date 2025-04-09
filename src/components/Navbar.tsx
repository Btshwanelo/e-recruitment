import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu';
import { getInitials } from '@/utils';
import NotificationDrawer from './NotificationDrawer';
import { BellIcon, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import { RootState } from '@/store';
import Logo from '@/assets/logo-black.png';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthData } from '@/slices/authSlice';

const Navbar = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigations = useSelector((state: RootState) => state.details.navigation);
  const userDetails = useSelector((state: RootState) => state.details.requestResults);
  const quickActions = useSelector((state: RootState) => state.quickActions.quickActions);
  const filteredNav = navigations.filter((item) => item.placementText === 'Top' || item.placementText === 'Top & Bottom');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileNavigation = () => {
    navigate(`/${userDetails.relatedObjectIdObjectTypeCode === 'Employee' ? 'student' : 'ap'}/edit-profile`);
  };

  const handleLogout = () => {
    dispatch(clearAuthData());
    navigate('/login');
  };

  const getUserType = () => {
    if (userDetails.relatedObjectIdObjectTypeCode === 'Supplier') {
      if (userDetails.aPtype === 'Institution') {
        return 'Institution';
      }
      return 'Accommodation Provider';
    }
    if (userDetails.relatedObjectIdObjectTypeCode === 'Employee') {
      return 'Student';
    }
    return '';
  };

  return (
    <div>
      {/* Desktop Navigation */}
      <nav className="hidden md:block border-b bg-white border-orange-500">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex-shrink-0">
              <img src={Logo} alt="NSFAS" className="h-12" />
            </Link>

            <div className="flex items-center space-x-8">
              {filteredNav?.map((item) => (
                <Link key={item.navigate} to={item.navigate} className="text-md font-medium">
                  {item.title}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <span className="inline-flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-sm text-[#363F72] bg-[#F8F9FC] border border-[#D5D9EB] py-1 px-2 rounded-full font-medium max-w-[200px]">
                {getUserType()}
              </span>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <div className="h-9 w-9 cursor-pointer rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                    {getInitials(userDetails)}
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {userDetails.aPtype != 'Institution' && (
                    <DropdownMenuCheckboxItem onClick={handleProfileNavigation}>Profile</DropdownMenuCheckboxItem>
                  )}
                  <DropdownMenuCheckboxItem onClick={handleLogout}>Log out</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="relative cursor-pointer">
                <BellIcon className="h-6 w-6" onClick={() => setNotificationOpen(true)} />
                {quickActions.length > 0 && (
                  <span className="absolute -top-[0.45rem] -right-[0.5rem] text-white bg-orange-500 rounded-full font-medium  text-xs px-[0.35rem]">
                    {quickActions.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden border-b bg-white border-orange-500">
        <div className="flex items-center justify-between px-4 h-20">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-8 w-8 text-black" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] p-0">
              <div className="flex flex-col">
                <div className="p-4 border-b">
                  <img src={Logo} alt="NSFAS" className="h-12" />
                </div>
                <div className="flex flex-col py-2">
                  {navigations.map((item) => (
                    <Link
                      key={item.navigate}
                      to={item.navigate}
                      className="px-4 py-3 text-gray-900 hover:bg-gray-100"
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center whitespace-nowrap overflow-hidden text-ellipsis text-sm text-[#363F72] bg-[#F8F9FC] border border-[#D5D9EB] py-1 px-2 rounded-full font-medium max-w-[200px]">
              {getUserType()}
            </span>

            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <div className="h-9 w-9 cursor-pointer rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                  {getInitials(userDetails)}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {userDetails.aPtype != 'Institution' && (
                  <DropdownMenuCheckboxItem onClick={handleProfileNavigation}>Profile</DropdownMenuCheckboxItem>
                )}
                <DropdownMenuCheckboxItem onClick={handleLogout}>Log out</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="relative cursor-pointer">
              <BellIcon className="h-6 w-6" onClick={() => setNotificationOpen(true)} />
              {quickActions.length > 0 && (
                <span className="absolute -top-[0.45rem] -right-[0.5rem] text-white bg-orange-500 rounded-full font-medium  text-xs px-[0.35rem]">
                  {quickActions.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      <NotificationDrawer open={notificationOpen} onOpenChange={setNotificationOpen} />
    </div>
  );
};

export default Navbar;
