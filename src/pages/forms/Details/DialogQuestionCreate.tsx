import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import QuestionCreate from './QuestionCreate';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, useState } from 'react';

export default function DialogQuestionCreate(props: {slug: string, onSuccess: () => void}) {
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
            Create new question
        </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
      >
        <DialogContent>
            <div className='flex justify-between mb-4'>
                <Typography variant="h6">Create Question</Typography>
                <CloseIcon className='cursor-pointer text-stone-500' onClick={handleClose}/>
            </div>
            <QuestionCreate slug={props.slug} onSuccess={handleOnSuccess}/>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}