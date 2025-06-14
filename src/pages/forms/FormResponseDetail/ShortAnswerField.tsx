import { TextField, Typography } from '@mui/material';
import { TQuestion } from '@/types/form/form';

export function ShortAnswerField({ question, register, errors }: {
  question: TQuestion;
  register: any;
  errors: any;
}) {
  const name = `question_${question.id}`;
  return (
    <div className='!mb-6'>
      <Typography variant='h6' className='!mb-1'>{question.name}</Typography>
      <TextField
        size='small'
        variant="filled"
        label='Answer'
        fullWidth
        {...register(name)}
        error={!!errors[name]}
        helperText={errors[name]?.message}
      />
    </div>
  );
}
