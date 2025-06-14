export type TQuestionCreateRequest = {
    name: string;
    choice_type: 'short answer' | 'paragraph' | 'date' | 'multiple choice' | 'dropdown' | 'checkboxes';
    choices?: string[];
    is_required: boolean
}