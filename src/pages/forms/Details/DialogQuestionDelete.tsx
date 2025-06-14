import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { DialogActions, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, useState } from 'react';
import { useDeleteQuestion } from '@/api/question/useDeleteQuestion';

export default function DialogQuestionDelete(props: {name: string, slug: string, questionId: number, onSuccess: () => void}) {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    mutate,
    isPending,
} = useDeleteQuestion({
    onSuccess: () => {
      props.onSuccess()
    },
    onError: () => {}
});

const deleteHandler = () => {
    mutate({
      slug: props.slug,
      questionId: props.questionId
    });
};

  return (
    <Fragment>
        <Button variant="contained" color='error' onClick={handleClickOpen}>
            Delete
        </Button>
      <Dialog
        fullWidth={true}
        maxWidth={"sm"}
        open={open}
      >
        <DialogContent>
            <div className='flex justify-between mb-4'>
                <Typography variant="h6">Delete Question</Typography>
                <CloseIcon className='cursor-pointer text-stone-500' onClick={handleClose}/>
            </div>
            <p>Are you sure want to delete this question?</p>
            <p className='italic'>Question: {props.name}</p>
        </DialogContent>
        <DialogActions>
          <Button disabled={isPending} color='error' autoFocus onClick={deleteHandler}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}