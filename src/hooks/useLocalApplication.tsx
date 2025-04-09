import { RootState } from '@/store';
import { useSelector } from 'react-redux';

function useLocalApplication() {
  const applicationsDetails = useSelector((state: RootState) => state.appliaction);

  return applicationsDetails;
}

export default useLocalApplication;
