import { TQuestion } from '@/types/form/form';
import * as Yup from 'yup';

export function buildValidationSchema(questions: TQuestion[]) {
  const shape: Record<string, any> = {};

  questions.forEach((q) => {
    const key = `question_${q.id}`;
    const required = q.is_required;

    switch (q.choice_type) {
      case 'short answer':
      case 'paragraph':
        shape[key] = Yup.string();
        if (required) shape[key] = shape[key].required('This field is required');
        break;

      case 'date':
        shape[key] = Yup.date();
        if (required) shape[key] = shape[key].required('This field is required');
        break;

      case 'dropdown':
      case 'multiple choice':
        shape[key] = Yup.string().oneOf(q.choices.split(',').map((s) => s.trim()));
        if (required) shape[key] = shape[key].required('This field is required');
        break;

      case 'checkboxes':
        shape[key] = Yup.array()
          .of(Yup.string().oneOf(q.choices.split(',').map((s) => s.trim())))
          .min(required ? 1 : 0, 'Please select at least one option');
        break;
    }
  });

  return Yup.object().shape(shape);
}
