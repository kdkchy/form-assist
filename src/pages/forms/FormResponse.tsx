import { Link, Navigate, useParams } from 'react-router';
import { Button, Chip, Typography } from '@mui/material';
import { useFetchForm } from '@/api/form/useFetchForm';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { buildValidationSchema } from './FormResponseDetail/YupResolver';
import { QuestionField } from './FormResponseDetail/QuestionField';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { transformAnswers } from '@/lib/utils';
import { useCreateFormResponse } from '@/api/form/useCreateFormResponse';
import { errorHelper } from '@/lib/errorHelper';

export default function FormResponse() {
    const token = useSelector((state: RootState) => state.auth.token)
    if (!token) {
        return <Navigate to="/auth/login" replace />
    }

    const { slug } = useParams();
    const { error: errorForm, data: form, isFetching: isFetchingForm } = useFetchForm(slug!);

    const schema = useMemo(() => {
        if (!form?.questions) return null;
        return buildValidationSchema(form.questions);
    }, [form?.questions]);

    const { setError, register, handleSubmit, control, watch, formState: { errors } } = useForm({
        resolver: schema ? yupResolver(schema) : undefined,
    });

    const [submitSuccess, setSubmitSuccess] = useState<boolean>(false)
    const { mutate, isPending } =
        useCreateFormResponse({
            onSuccess: () => { setSubmitSuccess(true) },
            onError: (error) => errorHelper(setError, error),
        });

    const onSubmit = (data: any) => {
        mutate({
            slug: slug!,
            body: transformAnswers(data)
        })
    };

    if (submitSuccess) {
        return (
            <div className=''>
                <div className='flex justify-center mb-4'>
                    <Typography variant='h4'>Congratulation, your response has been submited!</Typography>
                </div>
                <div className='flex justify-center'>
                    <Link to={`/`}>
                        <Button variant="text" >Go to dashboard</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className='lg:w-6/12 mx-auto w-full max-w-full overflow-x-hidden h-full'>
            {!isFetchingForm && form && (
                <div className='mb-10 space-y-4'>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {form.name}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}>{form.description}</Typography>
                            <div className='mb-4 mt-1'>
                                {form.allowed_domains.length > 0 && (<Typography sx={{ color: 'text.secondary' }}>Allowed Domain</Typography>)}
                                {form.allowed_domains.map((value, index) => {
                                    return (
                                        <Chip variant='outlined' label={value} key={index} className='mr-2' size='small' />
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {form.questions.map((q) => (
                                    <div key={q.id} className='mb-4 border-b-1 border-stone-200'>
                                        <QuestionField
                                            question={q}
                                            register={register}
                                            control={control}
                                            watch={watch}
                                            errors={errors}
                                        />
                                    </div>
                                ))}
                                <div className='block'>
                                    <Button disabled={isPending} type="submit" variant="contained">Submit</Button>
                                </div>
                            </form>

                        </CardContent>
                    </Card>
                </div>


            )}
            {isFetchingForm && <span className='mt-10 flex justify-center text-xl italic'>Loading...</span>}
            {!isFetchingForm && errorForm && (
                <span className='mt-10 flex justify-center text-xl italic text-red-500'>Cannot load data, try again later</span>
            )}
        </div>
    )
}