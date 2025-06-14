import { ShortAnswerField } from './ShortAnswerField';
import { ParagraphField } from './ParagraphField';
import { DateField } from './DateField';
import { DropdownField } from './DropdownField';
import { MultipleChoiceField } from './MultipleChoiceField';
import { CheckboxesField } from './CheckboxesField';
import { TQuestion } from '@/types/form/form';


export function QuestionField({ question, ...props }: {
  question: TQuestion;
  register: any;
  control: any;
  watch: any;
  errors: any;
}) {
  switch (question.choice_type) {
    case 'short answer':
      return <ShortAnswerField question={question} {...props} />;
    case 'paragraph':
      return <ParagraphField question={question} {...props} />;
    case 'date':
      return <DateField question={question} {...props} />;
    case 'dropdown':
      return <DropdownField question={question} {...props} />;
    case 'multiple choice':
      return <MultipleChoiceField question={question} {...props} />;
    case 'checkboxes':
      return <CheckboxesField question={question} {...props} />;
    default:
      return null;
  }
}
