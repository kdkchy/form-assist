import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, useState } from 'react';
import { TAnswer } from '@/types/form/form';

export default function DialogFormResponse(props: {answers: TAnswer, username: string}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Fragment>
        <Button variant="contained" onClick={handleClickOpen}>
            View Response
        </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClick={handleClose}
      >
        <DialogContent>
            <div className='flex justify-between mb-4'>
                <Typography variant="h6">Answer From: {props.username}</Typography>
                <CloseIcon className='cursor-pointer text-stone-500' onClick={handleClose}/>
            </div>
            <div>
            {Object.entries(props.answers).map(([key, value]) => (
              <div key={key} className='mb-4 border-b-1 border-stone-200'>
                <p className='font-bold italic'>{key}</p>
                <p>{String(value)}</p>
              </div>
            ))}
            </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}