import { api } from '@/lib/axios';
import { TFormsResponse } from '@/types/form/form';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useFetchForms = () => {
    return useQuery({
        queryFn: async () => {
            const response = await api.get(`/v1/forms`);
            return response.data.forms as TFormsResponse[];
        },
        queryKey: ['fetch.forms'],
        placeholderData: keepPreviousData,
        refetchOnWindowFocus: false,
    });
};
