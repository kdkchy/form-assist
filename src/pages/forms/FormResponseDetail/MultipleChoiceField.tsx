import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { TQuestion } from '@/types/form/form';

export function MultipleChoiceField({
  question,
  control,
  errors,
}: {
  question: TQuestion;
  control: any;
  errors: any;
}) {
  const name = `question_${question.id}`;
  const choices = question.choices?.split(',').map((c) => c.trim()) || [];

  return (
    <FormControl component="fieldset" error={!!errors[name]} className="!mb-4">
      <Typography variant="h6" className="!mb-1">
        {question.name}
      </Typography>
      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <RadioGroup {...field}>
            {choices.map((choice, index) => (
              <FormControlLabel
                key={index}
                value={choice}
                control={<Radio />}
                label={choice}
              />
            ))}
          </RadioGroup>
        )}
      />
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}
