import { clearAuthData } from '@/slices/authSlice';
import {
  User,
  Phone,
  Mail,
  GraduationCap,
  Calendar,
  Accessibility,
  Sofa,
  Users,
  PlugZap,
  UtensilsCrossed,
  Wifi,
  Dumbbell,
  Bed,
  Footprints,
  Bus,
  Coffee,
  Tv,
  Bath,
  Warehouse,
  KeyRound,
  Laptop,
} from 'lucide-react';

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(file);
  });
};

export const cleanAddressString = (...parts: (string | undefined)[]): string => {
  return parts
    .filter((part) => part !== '') // Filter out undefined and empty strings
    .join(' '); // Join remaining parts with a space
};

function* getIdGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const ids = getIdGenerator();

export const getId = (): number => ids.next().value || 0;

export const extractBase64FromDataUrl = (dataUrl: string) => {
  console.log('dataUrl', dataUrl);
  return dataUrl.split(',')[1];
};

export enum DocumentType {
  selfie = '591',
  roomPicture = '1055',
}

export const getDatesFromNextMonth = (dates: { value: string; label: string; code: string }[]) => {
  const currentDate = new Date();
  const nextMonth = currentDate.getMonth() + 2; // getMonth() is zero-indexed
  const nextYear = currentDate.getFullYear();

  return dates.filter(({ code }) => {
    const [day, month, year] = code.split('-').map(Number);
    return year > nextYear || (year === nextYear && month >= nextMonth);
  });
};

export const getDatesFromJuly2024 = (dates: { value: string; label: string; code: string }[]) => {
  const targetMonth = 7; // July
  const targetYear = 2024;

  return dates.filter(({ code }) => {
    const [day, month, year] = code.split('-').map(Number);
    return year > targetYear || (year === targetYear && month >= targetMonth);
  });
};

// export const getInitials = (data: { name?: string | null; firstName?: string | null; lastName?: string | null }): string => {
//   // Helper function to extract initials from a given string
//   const extractInitials = (str: string | null): string => {
//     if (!str) return '';
//     return str
//       .split(' ')
//       .map((word) => word.charAt(0))
//       .join('')
//       .toUpperCase();
//   };

//   // Use `name` if available, otherwise use `firstName` and `lastName`
//   if (data.name) {
//     return extractInitials(data.name);
//   }

//   const firstInitial = extractInitials(data.firstName);
//   const lastInitial = extractInitials(data.lastName);

//   return (firstInitial + lastInitial).toUpperCase();
// };

export const getInitials = (data: { name?: string | null; firstName?: string | null; lastName?: string | null }): string => {
  // Helper function to extract initials from a given string
  const extractInitials = (str: string | null): string => {
    if (!str) return '';
    return str
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase();
  };

  // Use `name` if available, otherwise use `firstName` and `lastName`
  let initials = data.name ? extractInitials(data.name) : extractInitials(data.firstName) + extractInitials(data.lastName);

  // Limit to maximum 3 characters
  return initials.slice(0, 3).toUpperCase();
};

//Possible options
//default,success,error,pending,purple,yellow,secondary,destructive,outline,
export const getStatusBadgeClass = (status) => {
  const statusMap = {
    'pending approval': 'pending',
    pendingapproval: 'pending',
    applicationinprogress: 'pending',
    'pending grading': 'pending',
    'pending institution review': 'pending',
    'pending signature': 'pending',
    'pending verification': 'pending',
    approved: 'success',
    verified: 'success',
    'grade a': 'success',
    'grade b': 'yellow',
    'grade c': 'blue',
    'grade d': 'purple',
    awaitingacademiceligibilitycheck: 'purple',
    unverified: 'error',
    'not yet registerd for 2025': 'error',
    registrationreceived: 'blue',
    invite: 'blue',
    transport: 'blue',
    'not yet registered for 2025': 'blue',
    'awaiting checkin': 'blue',
    allowed: 'success',
    disallowed: 'error',
    cancelled: 'error',
    rejected: 'error',
    'funding not found': 'error',
    funded: 'success',
    success: 'success',
    declined: 'error',
    revoked: 'yellow',
    terminated: 'error',
    default: 'default',
    new: 'blue',
    'in progress': 'yellow',
    resolved: 'success',
    active: 'success',
    pending: 'blue',
    'on hold': 'purple',
    'pending payment': 'yellow',
    draft: 'purple',
    'pending move-in': 'yellow',
    'pending renewal': 'purple',
    provisionallyfunded: 'success',
    issued: 'success',
    processed: 'blue',
    paid: 'pending',
  };
  return statusMap[status?.toLowerCase()] || statusMap.default;
};

export const getAmenityIcon = (amenityName) => {
  const iconMap = {
    Bed: Bed,
    Bathroom: Bath,
    TV: Tv,
    'Study Desk': Laptop,
    'Hub/IT Room': Laptop,
    'WIFI - Internet Connectivity': Wifi,
    WIFI: Wifi,
    Storage: Warehouse,
    Kitchen: UtensilsCrossed,
    'Common Room': Users,
    Laundry: Bath,
    Security: KeyRound,
    Parking: Bus,
    Cafeteria: Coffee,
    Gym: Dumbbell,
    'Laundry Rooms': Dumbbell,
    'Utility Area': Sofa,
    'Student Study Area': Dumbbell,
    'Back Up Generator': PlugZap,
    // Add more mappings as needed
    default: Footprints,
  };

  // Convert amenity name to lowercase and remove spaces for matching
  const normalizedName = amenityName.toLowerCase().replace(/\s+/g, '');
  const matchedIcon = Object.entries(iconMap).find(([key]) => normalizedName.includes(key.toLowerCase()));

  return matchedIcon ? matchedIcon[1] : iconMap.default;
};

export const handleLogOut = () => {};
