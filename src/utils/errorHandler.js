import toast from 'react-hot-toast';

export const handleError = (error, customMessage = 'Something went wrong') => {
  toast.error(`${customMessage}: ${error.message || error}`);
};
