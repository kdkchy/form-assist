import { Alert, Snackbar } from "@mui/material";

export function SnackBarSuccess(props: {openSnack: boolean, onClose: () => void, message: string}) {
    return (
        <Snackbar
            open={props.openSnack}
            autoHideDuration={6000}
            onClose={props.onClose}
        >
            <Alert
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
            >
                {props.message}
            </Alert>
        </Snackbar>
    )
}