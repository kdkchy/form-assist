
import { TError } from '@/types/api/error';
import { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

export function errorHelper(
    setError: UseFormSetError<any>,
    error: AxiosError<TError>
) {
    if (error.response?.data.errors) {
        const obj = error.response?.data?.errors;
        for (const [key, value] of Object.entries(obj)) {
            setError(key, {
                type: 'custom',
                message: value as string,
            });
        }
    }
}
