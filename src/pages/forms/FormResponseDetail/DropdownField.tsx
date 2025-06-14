import { TQuestion } from '@/types/form/form';
import { FormControl, Select, MenuItem, FormHelperText, Typography } from '@mui/material';

export function DropdownField({
  question,
  register,
  errors,
}: {
  question: TQuestion;
  register: any;
  errors: any;
}) {
  const name = `question_${question.id}`;
  const choices = question.choices?.split(',').map(c => c.trim()) ?? [];

  return (
    <FormControl variant="filled" fullWidth error={!!errors[name]} className="!mb-4">
      <Typography variant='h6' className='!mb-1'>{question.name}</Typography>
      <Select
      size='small'
        id={name}
        displayEmpty
        defaultValue=""
        {...register(name)}
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem disabled value="">
          <em>Select</em>
        </MenuItem>
        {choices.map((choice, idx) => (
          <MenuItem key={idx} value={choice}>
            {choice}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}
