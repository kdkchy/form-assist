import { api } from '@/lib/axios';
import { TFormDetails } from '@/types/form/form';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchForm = (slug: string) => {
    return useQuery({
        queryFn: async () => {
            const response = await api.get(`/v1/forms/${slug}`);
            return response.data.form as TFormDetails;
        },
        queryKey: ['fetch.form', slug],
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    });
};
