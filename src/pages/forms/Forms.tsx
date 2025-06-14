import { Fragment } from 'react/jsx-runtime';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useFetchForms } from '@/api/form/useFetchForms';
import { TFormsResponse } from '@/types/form/form';
import Chip from '@mui/material/Chip';
import DialogFormCreate from './Details/DialogFormCreate';
import { Link } from 'react-router-dom';
import { SnackBarSuccess } from '@/components/ui/snackbar';
import { useState } from 'react';

export default function FormsPage() {
    const { error, data: forms, isFetching, refetch } = useFetchForms();
    const [openSnack, setOpenSnack] = useState<boolean>(false)

    const onSuccess = () => {
        setOpenSnack(true)
        refetch()
    }
    return (
        <Fragment>
            <SnackBarSuccess openSnack={openSnack} message='Form created successfully' />
            <div className='mb-4'>
                <DialogFormCreate onSuccess={onSuccess} />
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><span className='text-lg font-bold'>Name</span></TableCell>
                            <TableCell><span className='text-lg font-bold'>Slug</span></TableCell>
                            <TableCell><span className='text-lg font-bold'>Description</span></TableCell>
                            <TableCell align='center'><span className='text-lg font-bold'>Single Response</span></TableCell>
                            <TableCell align='center'><span className='text-lg font-bold'>Action</span></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!isFetching && forms && forms.map((form: TFormsResponse) => (
                            <TableRow
                                key={form.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {form.name}
                                </TableCell>
                                <TableCell>{form.slug}</TableCell>
                                <TableCell>{form.description}</TableCell>
                                <TableCell align='center'>{form.limit_one_response ? <Chip label="Yes" color="secondary" /> : <Chip label="No" />}</TableCell>
                                <TableCell className='space-x-2' align='center'>
                                    <Link to={`${form.slug}/details`}>
                                        <Button size='small' variant='contained'>Detail</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isFetching && <span className='mt-10 flex justify-center text-xl italic'>Loading...</span>}
            {!isFetching && error && (
                <span className='mt-10 flex justify-center text-xl italic text-red-500'>Cannot load data, try again later</span>
            )}
        </Fragment>
    )
}