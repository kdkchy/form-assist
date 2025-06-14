
import { AxiosError, AxiosResponse } from 'axios';
import { TError } from "@/types/api/error"
import { api } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';
import { TQuestionCreateRequest } from '@/types/form/question';

type MutationPayload = {
    slug: string;
    body: TQuestionCreateRequest;
};

interface IProps {
    onSuccess: (data: AxiosResponse) => void;
    onError: (error: AxiosError<TError>) => void;
}
export const useCreateQuestion = ({ onSuccess, onError }: IProps) => {
    return useMutation
        ({
            mutationFn: async ({ slug, body }: MutationPayload) => {
                const response = api.post(`/v1/forms/${slug}/questions`, body);
                return response;
            },
            onError: onError,
            onSuccess: onSuccess,
        });
};
