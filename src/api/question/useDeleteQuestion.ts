import { api } from '@/lib/axios';
import { useMutation } from '@tanstack/react-query';

type TPayload = {
    slug: string,
    questionId: number
}
export const useDeleteQuestion = ({ onSuccess, onError }: { onSuccess: () => void, onError: () => void }) => {
    return useMutation({
        mutationFn: async ({slug, questionId} : TPayload) => {
            const response = await api.delete(`/v1/forms/${slug}/questions/${questionId}`);
            return response;
        },
        onSuccess: onSuccess,
        onError: onError,
    });
};
