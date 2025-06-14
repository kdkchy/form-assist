
import { AxiosError, AxiosResponse } from 'axios';
import { TError } from "@/types/api/error"
import { api } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { TAnswersPayload } from '@/types/form/answer';

type MutationPayload = {
    slug: string;
    body: TAnswersPayload;
}

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<TError>) => void;
}
export const useCreateFormResponse = ({ onSuccess, onError }: IProps) => {
    return useMutation
    ({
        mutationFn: async ({ slug, body }: MutationPayload) => {
            const response = api.post(`/v1/forms/${slug}/responses`, body);
            return response;
        },
        onError: onError,
        onSuccess: onSuccess,
    });
};
