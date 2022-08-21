import { toast } from 'react-toastify';
const TOAST_COLOR_CODES = {
    success: '#32cd32',
    error: '#f3454c',
};

export const showSuccess = (message) => {
    toast(message, {
        style: {
            textAlign: 'center',
            backgroundColor: TOAST_COLOR_CODES.success,
            color: '#fff',
        },
    });
};

export const showError = (error) => {
    toast(error?.response?.data?.message || error, {
        style: {
            textAlign: 'center',
            backgroundColor: TOAST_COLOR_CODES.error,
            color: '#fff',
        },
    });
};
