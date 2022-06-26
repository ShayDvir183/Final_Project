import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setAdminDialogOpen } from '../../store/reducers/vacationsReducer';
import { createVacationAction, getVacationsAction } from '../../store/asyncFunction/vacations';
import { Box } from '@mui/system';

export default function FormDialog() {
    const dispatch = useAppDispatch();
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [image, setImage] = React.useState('');
    const [destination, setDestination] = React.useState('');
    const [from_date, setFromDate] = React.useState(new Date());
    const [to_date, setToDate] = React.useState(new Date());
    const isOpen = useAppSelector((state: any) => state.vacations.adminDialogOpen);


    const handleClose = () => {
        dispatch(setAdminDialogOpen(false))

    };
    async function addVacation() {
        if (!description || !price || !image || !destination || !from_date || !to_date) {
            return alert("Please fill all fields")
        }
        const vacation = { description: description, price: price, image: image, destination: destination, from_date: from_date, to_date: to_date, ammount_of_followers: 0 }
        createVacationAction(vacation)
        getVacationsAction()
    }

    return (
        <div style={{ "height": "400px", "width": "400px" }}>
            <Dialog sx={{ "textAlign": "center" }} fullWidth={true} open={isOpen} onClose={handleClose}>
                <DialogTitle textAlign={"center"} >Add-Vacation</DialogTitle>
                <DialogContent >
                    <DialogContentText textAlign={"center"}>
                        Hello Dear Admin, please add a new vacation to the system.
                    </DialogContentText>
                    <Box>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Destination"
                            label="Destination"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e: any) => { setDestination(e.target.value) }}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Price"
                            label="Price"
                            type="number"
                            fullWidth
                            variant="standard"
                            onChange={(e: any) => { setPrice(e.target.value) }}

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="Image"
                            label="Image-Adress"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e: any) => { setImage(e.target.value) }}

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="from_date"
                            type="datetime-local"
                            fullWidth
                            variant="standard"
                            onChange={(e: any) => { setFromDate(e.target.value) }}

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="to_date"
                            type="datetime-local"
                            fullWidth
                            variant="standard"
                            onChange={(e: any) => { setToDate(e.target.value) }}

                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="description"
                            label="Description"
                            type="text"
                            fullWidth
                            onChange={(e: any) => { setDescription(e.target.value) }}
                            variant="standard"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={addVacation}>Add</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
