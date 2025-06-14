import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { api } from '@/lib/axios';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import { setAuth } from '@/store/auth/authSlice'
import { Alert, Button, TextField, Typography } from '@mui/material';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { TAuthResponse } from '@/types/auth/auth';

const formSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required'),
})

type LoginFormInputs = Yup.InferType<typeof formSchema>

const Login = () => {
    const token = useSelector((state: RootState) => state.auth.token)

    if (token) {
        return <Navigate to="/" replace />
    }

    const dispatch = useDispatch<AppDispatch>()
    const [errorServer, setErrorServer] = useState('');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormInputs>({
        resolver: yupResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    })

    async function onSubmit(values: LoginFormInputs) {
        setErrorServer('');
        try {
            const response = await api.post('/v1/auth/login', {
                ...values,
            });

            const authResponse: TAuthResponse = response.data.user

            if (!authResponse.accessToken) {
                throw new Error("No credential returned")
            }

            dispatch(setAuth({
                token: authResponse.accessToken,
                user: {
                    name: authResponse.name,
                    email: authResponse.email
                }
            }))
            navigate('/forms', { replace: true });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorServer(error.response?.data.message);
            }
        }
    }

    return (
        <div>
            <Typography variant="h3" align="center" gutterBottom>
                Form Assist
            </Typography>
            <div className="bg-white p-5 rounded-xl">
                <Typography variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <form
                    className='!space-y-4'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextField
                        size="small"
                        label="Email"
                        fullWidth
                        margin="normal"
                        {...register('email')}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    <TextField
                        size="small"
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        {...register('password')}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />

                    {errorServer && (
                        <Alert severity="error">{errorServer}</Alert>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting}
                        sx={{ mt: 2 }}
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Login;
