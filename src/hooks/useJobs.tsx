import { RootState } from '@/store';
import { useSelector } from 'react-redux';

function useJobs() {
  const jobsDetails = useSelector((state: RootState) => state.jobs);

  return jobsDetails;
}

export default useJobs;
