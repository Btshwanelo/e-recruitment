import { RootState } from '@/store';
import { useSelector } from 'react-redux';

function useLoan() {
  const loanDetails = useSelector((state: RootState) => state.loan);

  return loanDetails;
}

export default useLoan;
