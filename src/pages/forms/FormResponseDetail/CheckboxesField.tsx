import { TQuestion } from '@/types/form/form';
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Typography,
} from '@mui/material'
import { Controller } from 'react-hook-form';

export function CheckboxesField({ question, control, errors }: {
  question: TQuestion;
  control: any;
  errors: any;
}) {
  const name = `question_${question.id}`;
  const choices = question.choices?.split(',').map((c) => c.trim()) ?? [];

  return (
    <FormControl component="fieldset" error={!!errors[name]} className="!mb-4">
      <Typography variant='h6' className='!mb-1'>{question.name}</Typography>
      <FormGroup>
        <Controller
          name={name}
          control={control}
          defaultValue={[]}
          render={({ field }) => {
            const { value = [], onChange } = field;

            const handleToggle = (choice: string) => {
              if (value.includes(choice)) {
                onChange(value.filter((v: string) => v !== choice));
              } else {
                onChange([...value, choice]);
              }
            };

            return (
              <>
                {choices.map((choice, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={value.includes(choice)}
                        onChange={() => handleToggle(choice)}
                      />
                    }
                    label={choice}
                  />
                ))}
              </>
            );
          }}
        />
      </FormGroup>
      <FormHelperText>{errors[name]?.message}</FormHelperText>
    </FormControl>
  );
}
