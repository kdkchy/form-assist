import { api } from '@/lib/axios';
import { TSubmission } from '@/types/form/form';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchFormResponse = (slug: string) => {
    return useQuery({
        queryFn: async () => {
            const response = await api.get(`/v1/forms/${slug}/responses`);
            return response.data.responses as TSubmission[];
        },
        queryKey: ['fetch.form-responses'],
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    });
};
