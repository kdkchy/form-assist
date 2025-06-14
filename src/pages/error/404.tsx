import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className='h-full w-screen'>
            <Box textAlign="center" mt={10}>
                <Typography variant="h2">
                    404
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Page Not Found
                </Typography>
                <p className='underline italic cursor-pointer' onClick={() => navigate(-1)}>go back</p>
            </Box>
        </div>
    )
}
