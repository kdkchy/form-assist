import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormCreate from './FormCreate';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, useState } from 'react';

export default function DialogFormCreate(props: {onSuccess: () => void}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnSuccess = () => {
    setOpen(false)
    props.onSuccess()
  }

  return (
    <Fragment>
        <Button variant="contained" onClick={handleClickOpen}>
            Create new form
        </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
      >
        <DialogContent>
            <div className='flex justify-between mb-4'>
                <Typography variant="h6">Create Form</Typography>
                <CloseIcon className='cursor-pointer text-stone-500' onClick={handleClose}/>
            </div>
            <FormCreate onSuccess={handleOnSuccess}/>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}