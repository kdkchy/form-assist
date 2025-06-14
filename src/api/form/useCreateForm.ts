
import { AxiosError, AxiosResponse } from 'axios';
import { TError } from "@/types/api/error"
import { TFormCreateRequest } from '@/types/form/form';
import { api } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<TError>) => void;
}
export const useCreateForm = ({ onSuccess, onError }: IProps) => {
    return useMutation
    ({
        mutationFn: async (body: TFormCreateRequest) => {
            const response = api.post(`/v1/forms`, body);
            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};
