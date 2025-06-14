import * as yup from 'yup';
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import {
    Box,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Checkbox,
    FormControlLabel,
    IconButton,
    Button,
    Typography,
} from '@mui/material';
import { TQuestionCreateRequest } from '@/types/form/question';
import { errorHelper } from '@/lib/errorHelper';
import { useCreateQuestion } from '@/api/question/useCreateQuestion';
import { useState } from 'react';

const choiceTypesWithOptions = ['multiple choice', 'dropdown', 'checkboxes'];

const choiceTypes = [
    'short answer',
    'paragraph',
    'date',
    'multiple choice',
    'dropdown',
    'checkboxes',
] as const;

const questionSchema = yup.object({
    name: yup.string().required('Question name is required'),
    choice_type: yup
        .string()
        .oneOf(choiceTypes, 'Invalid choice type')
        .required('Choice type is required'),
    is_required: yup.boolean().required(),
    choices: yup.array().of(yup.string().required()).when('choice_type', {
        is: (val: string) =>
            ['multiple choice', 'dropdown', 'checkboxes'].includes(val),
        then: (schema) => schema.min(1, 'At least one choice is required'),
        otherwise: (schema) => schema.notRequired().nullable(),
    }),
});

type QuestionFormData = yup.InferType<typeof questionSchema>;

const QuestionCreate = (props: { slug: string, onSuccess: () => void }) => {
    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
    } = useForm<QuestionFormData>({
        // @ts-expect-error: resolver assignment is intentionally ignored
        resolver: yupResolver(questionSchema),
        defaultValues: {
            name: '',
            choice_type: 'short answer',
            is_required: false,
            choices: [],
        },
    });
    const { fields, append, remove } = useFieldArray({
        control,
        // @ts-expect-error: name assignment is intentionally ignored  
        name: 'choices',
    });

    const watchChoiceType = watch('choice_type');
    
    const { mutate } =
        useCreateQuestion({
            onSuccess: () => {
                props.onSuccess()
            },
            onError: (error) => errorHelper(setError, error),
        });

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const onSubmit = (data: any) => {
        setIsLoading(true)
        mutate({ body: data as TQuestionCreateRequest, slug: props.slug })
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <FormControl error={!!errors.name} fullWidth>
                <TextField
                    size='small'
                    label="Question Name"
                    variant="outlined"
                    {...register('name')}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                />
            </FormControl>

            <FormControl size='small' error={!!errors.choice_type} fullWidth>
                <InputLabel id="choice-type-label">Choice Type</InputLabel>
                <Select
                    labelId="choice-type-label"
                    label="Choice Type"
                    defaultValue=""
                    {...register('choice_type')}
                >
                    <MenuItem value="short answer">Short Answer</MenuItem>
                    <MenuItem value="paragraph">Paragraph</MenuItem>
                    <MenuItem value="date">Date</MenuItem>
                    <MenuItem value="multiple choice">Multiple Choice</MenuItem>
                    <MenuItem value="dropdown">Dropdown</MenuItem>
                    <MenuItem value="checkboxes">Checkboxes</MenuItem>
                </Select>
                <FormHelperText>{errors.choice_type?.message}</FormHelperText>
            </FormControl>

            {choiceTypesWithOptions.includes(watchChoiceType) && (
                <Box>
                    <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        Choices
                    </Typography>
                    {fields.map((field, index) => (
                        <Box key={field.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                            <TextField
                                size='small'
                                fullWidth
                                {...register(`choices.${index}`)}
                                error={!!errors.choices?.[index]}
                                helperText={errors.choices?.[index]?.message}
                                placeholder={`Choice ${index + 1}`}
                            />
                            <IconButton onClick={() => remove(index)} color="error">
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={() => append('')}
                    >
                        Add Choice
                    </Button>
                    {typeof errors.choices?.message === 'string' && (
                        <FormHelperText error>{errors.choices.message}</FormHelperText>
                    )}
                </Box>
            )}

            <FormControlLabel
                control={<Checkbox {...register('is_required')} />}
                label="Required"
            />

            <Button disabled={isLoading} type="submit" variant="contained" color="primary">
                Submit
            </Button>
        </Box>
    );

}
export default QuestionCreate;