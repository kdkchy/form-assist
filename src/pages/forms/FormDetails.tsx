import { Fragment } from 'react/jsx-runtime';
import { useFetchFormResponse } from '@/api/form/useFetchFormResponse';
import { useParams } from 'react-router';
import { Paper, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, FormLabel } from '@mui/material';
import { TQuestion, TSubmission } from '@/types/form/form';
import DialogFormResponse from './Details/DialogFormResponse';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { dateFormater } from '@/lib/utils';
import { useFetchForm } from '@/api/form/useFetchForm';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TabbedView } from '@/components/ui/tabs';
import DialogQuestionCreate from './Details/DialogQuestionCreate';
import { useState } from 'react';
import { Button, Snackbar } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DialogQuestionDelete from './Details/DialogQuestionDelete';
import { SnackBarSuccess } from '@/components/ui/snackbar';

export default function FormDetailPage() {
    const { slug } = useParams();
    const { error: errorForm, data: form, isFetching: isFetchingForm, refetch } = useFetchForm(slug!);
    const { error: errorResponse, data: responses, isFetching: isFetchingResponse } = useFetchFormResponse(slug!);
    const [openSnack, setOpenSnack] = useState<boolean>(false)

    const onSuccess = () => {
        setOpenSnack(true)
        refetch()
    }

    const [copied, setCopied] = useState(false);
    const currentUrl = window.location.href;
    const modifiedUrl = currentUrl.replace(/\/details$/, '/response');

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(modifiedUrl);
            setCopied(true);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    return (
        <Fragment>
            <SnackBarSuccess openSnack={openSnack} message='Question created successfully' />
            {/* Form Detail */}
            {!isFetchingForm && form && (
                <div className='mb-10'>
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
                            <Chip label={form.slug} className='mr-2 mb-4' />
                            <div className='flex'>
                                <Button
                                    size='small'
                                    variant="outlined"
                                    startIcon={<ContentCopyIcon />}
                                    onClick={handleCopy}
                                >
                                    Copy Form URL
                                </Button>
                                <div className='border-blue-400 mr-2 ml-2 mt-1 border-b-1 border-t-1 border-r-1 pb-1 pt-1 rounded-r-sm pr-2 pl-1'>
                                    <FormLabel className=''>
                                        {modifiedUrl}
                                    </FormLabel>
                                </div>
                                <Snackbar
                                    open={copied}
                                    autoHideDuration={2000}
                                    onClose={() => setCopied(false)}
                                    message="URL copied to clipboard!"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
            {isFetchingForm && <span className='mt-10 flex justify-center text-xl italic'>Loading...</span>}
            {!isFetchingForm && errorForm && (
                <span className='mt-10 flex justify-center text-xl italic text-red-500'>Cannot load data, try again later</span>
            )}

            {/* Responses */}
            <TabbedView
                tabs={[
                    {
                        label: 'Responses', content: <div>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><span className='text-lg font-bold'>Date</span></TableCell>
                                            <TableCell><span className='text-lg font-bold'>Name</span></TableCell>
                                            <TableCell><span className='text-lg font-bold'>Email</span></TableCell>
                                            <TableCell align='center'><span className='text-lg font-bold'>Email Verification</span></TableCell>
                                            <TableCell align='center'><span className='text-lg font-bold'>Action</span></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {!isFetchingResponse && responses && responses.map((response: TSubmission, index: number) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>{dateFormater(response.date)}</TableCell>
                                                <TableCell component="th" scope="row">
                                                    <p>{response.user.name}</p>
                                                </TableCell>
                                                <TableCell component="th" scope="row">
                                                    {response.user.email}
                                                </TableCell>
                                                <TableCell component="th" scope="row" align='center'>
                                                    {!response.user.email_verified_at ? (
                                                        <p className='text-blue-500'>Verified{' '}<TaskAltIcon fontSize="small" /></p>
                                                    ) : (
                                                        <p className='text-slate-500'>Unverified</p>
                                                    )}
                                                </TableCell>
                                                <TableCell align='center'><DialogFormResponse username={response.user.name} answers={response.answers} /></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {isFetchingResponse && <span className='mt-10 flex justify-center text-xl italic'>Loading...</span>}
                            {!isFetchingResponse && errorResponse && (
                                <span className='mt-10 flex justify-center text-xl italic text-red-500'>Cannot load data, try again later</span>
                            )}
                        </div>
                    },
                    {
                        label: 'Questions', content: <div>
                            <div className='mb-2'>
                                <DialogQuestionCreate slug={form?.slug!} onSuccess={onSuccess} />
                            </div>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell><span className='text-lg font-bold'>Type</span></TableCell>
                                            <TableCell><span className='text-lg font-bold'>Question</span></TableCell>
                                            <TableCell align='center'><span className='text-lg font-bold'>Requirement</span></TableCell>
                                            <TableCell align='center'><span className='text-lg font-bold'>Action</span></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {!isFetchingForm && form && form.questions.map((question: TQuestion, index: number) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    <Chip size='small' label={question.choice_type} color='success' />
                                                </TableCell>
                                                <TableCell>
                                                    <p>{question.name}</p>
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {question.is_required ? <Chip size='small' color='primary' variant='outlined' label='Required' /> : <Chip size='small' variant='filled' label='Optional' />}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <DialogQuestionDelete name={question.name} slug={form.slug} questionId={question.id} onSuccess={onSuccess} />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    },
                ]}
            />
        </Fragment>
    )
}