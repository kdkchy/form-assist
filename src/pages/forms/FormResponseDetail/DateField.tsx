import { TextField, Typography } from '@mui/material';
import { TQuestion } from '@/types/form/form';

export function DateField({
  question,
  register,
  errors,
}: {
  question: TQuestion;
  register: any;
  errors: any;
}) {
  const name = `question_${question.id}`;
  return (
    <div className=''>
      <Typography variant='h6' className='!mb-1'>{question.name}</Typography>
      <TextField
        variant="filled"
        className="!mb-4"
        type="date"
        fullWidth
        {...register(name)}
        InputLabelProps={{ shrink: true }}
        error={!!errors[name]}
        helperText={errors[name]?.message}
      />

    </div>
  );
}
