import * as Yup from 'yup'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Button, Switch, FormControlLabel, Box, Typography, IconButton, Snackbar } from '@mui/material'
import { useCreateForm } from '@/api/form/useCreateForm'
import { errorHelper } from '@/lib/errorHelper'
import { TFormCreateRequest } from '@/types/form/form'
import { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const formCreateSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    slug: Yup.string()
        .required('Slug is required')
        .matches(
            /^[a-zA-Z0-9.-]+$/,
            'Only alphanumeric characters, dashes (-), and dots (.) are allowed. No spaces.'
        ),
    limit_one_response: Yup.boolean().required(),
    allowed_domains: Yup
        .array()
        .of(
            Yup.string()
                .trim()
                .matches(
                    /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/,
                    'Only root domains like "example.id" are allowed (no www or subdomains)'
                )
                .required() // ensures non-empty strings are validated
        )
        .compact((v) => !v) // removes empty strings
        .optional(),
    description: Yup.string().notRequired(),
})

const FormCreate = (props: { onSuccess: () => void }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const {
        control,
        handleSubmit,
        register,
        formState: { errors },
        setError,
        watch,
        setValue
    } = useForm<TFormCreateRequest>({
        // @ts-expect-error: resolver assignment is intentionally ignored
        resolver: yupResolver(formCreateSchema),
        defaultValues: {
            name: '',
            slug: '',
            description: '',
            limit_one_response: false,
            allowed_domains: ['']
        },
    })
    useEffect(() => {
        const current = watch('allowed_domains')
        if (!current || current.length === 0) {
            setValue('allowed_domains', [''])
        }
    }, [])

    const { fields, append, remove } = useFieldArray({
        control,
        // @ts-expect-error: name assignment is intentionally ignored        
        name: 'allowed_domains',
    });

    const { mutate } =
        useCreateForm({
            onSuccess: () => {
                <Snackbar
                    open={true}
                    autoHideDuration={6000}
                    message="Form created successfully"
                />
                props.onSuccess()
            },
            onError: (error) => errorHelper(setError, error),
        });

    const onSubmit = (data: any) => {
        setIsLoading(true)
        mutate(data as TFormCreateRequest)
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 800, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
                size="small"
                label="Name"
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
            />

            <TextField
                size="small"
                label="Slug"
                {...register('slug')}
                error={!!errors.slug}
                helperText={errors.slug?.message}
            />

            <Box>
                <Typography variant="body1" gutterBottom>Allowed Domains</Typography>
                {fields.map((field, index) => (
                    <Box key={field.id} display="flex" alignItems="center" gap={1} mb={1}>
                        <TextField
                            size="small"
                            fullWidth
                            {...register(`allowed_domains.${index}`)}
                            error={!!errors.allowed_domains?.[index]}
                            helperText={errors.allowed_domains?.[index]?.message}
                            placeholder="domain.com"
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
                    Add Domain
                </Button>
            </Box>


            <TextField
                size="small"
                label="Description"
                multiline
                minRows={3}
                {...register('description')}
                error={!!errors.description}
                helperText={errors.description?.message}
            />

            <FormControlLabel
                control={
                    <Controller
                        name="limit_one_response"
                        control={control}
                        render={({ field }) => (
                            <Switch {...field} checked={field.value} />
                        )}
                    />
                }
                label="Limit One Response"
            />

            <Button disabled={isLoading} type="submit" variant="contained">Submit</Button>
        </Box>
    )
}

export default FormCreate
