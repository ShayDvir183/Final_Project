import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { IVacation, setAdminDialogOpen } from '../../store/reducers/vacationsReducer';
import { createVacationAction, editVacationAction, getVacationsAction } from '../../store/asyncFunction/vacations';
import { Box } from '@mui/system';
import { InputAdornment, InputLabel, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import "../helpers";
const theme = createTheme({
    palette: {
        primary: {
            main: '#7e57c2',
        },
        divider: '#f50057',
        secondary: {
            main: '#f44336',
        },
        text: {
            primary: "#fff"
        },
    },
});
export interface IVacationAdd {
    description: string,
    destination: string,
    image: string,
    from_date: Date,
    to_date: Date,
    price: number,
}
const color = "#c44242";

export default function FormDialog() {
    const dispatch = useAppDispatch();
    const [description, setDescription] = React.useState('');
    const [price, setPrice] = React.useState(0);
    const [imageQuery, setImageQuery] = React.useState('');
    const [destination, setDestination] = React.useState('');
    const [from_date, setFromDate] = React.useState(new Date());
    const [to_date, setToDate] = React.useState(new Date());
    const [bgColor, setBgColor] = React.useState('#fff');
    let {isOpen,edit ,editVacation} = useAppSelector((state: any) => state.vacations.adminDialogOpen);
    function clearStates() {
        setDescription("")
        setPrice(0)
        setImageQuery('')
        setDestination('')
        setFromDate(new Date())
        setToDate(new Date())
    }
    const handleClose = () => {
        dispatch(setAdminDialogOpen({isOpen:false,edit:false}));
        clearStates()

    };
    async function vacationAction() {
        if (to_date < from_date) { return alert("Please Check Your Vacation Dates Dear Admin") }
        if (!description || !price || !imageQuery || !destination || !from_date || !to_date) {
            return alert("Please fill all fields")
        }
       if(edit){
        editVacation = {
            id:editVacation.id, description: description, price: price, image: imageQuery, destination: destination, from_date: from_date, to_date: to_date
        }
        editVacationAction(editVacation)
       }
        else{
            const vacation = { id: -1, description: description, price: price, image: imageQuery, destination: destination, from_date: from_date, to_date: to_date, ammount_of_followers: 0 }
            createVacationAction(vacation)
        }
        handleClose()
    }
    return (
        <ThemeProvider theme={theme}>

            <Dialog sx={{ textAlign: "center" }} open={isOpen} maxWidth="md" onClose={handleClose}


                scroll="paper"
            >
                <DialogTitle textAlign={"center"} sx={{ background: "#6B5B95" }} color="#fff">
                    Hello Dear Admin, please add a new vacation to the system.
                </DialogTitle>
                <DialogContent sx={{ background: "#F7CAC9" }} dividers={true} >
                    <Box>
                        <InputLabel >Destination</InputLabel>
                        <TextField
                            placeholder='Destination'
                            onFocus={(e: any) => {
                                e.target.style.backgroundColor = "#fff"
                                e.target.style.color = "#000000"
                            }}
                            onBlur={(e: any) => {
                                e.target.style.backgroundColor = ""
                                e.target.style.color = ""
                            }}
                            sx={{
                                textDecorationColor: "#000000", borderColor: "ActiveBorder", borderRadius: "5px"
                            }}
                            margin="dense"
                            id="Destination"
                            type="text"
                            variant="outlined"
                            onChange={(e: any) => { setDestination(e.target.value) }}
                        />
                        <InputLabel>Price</InputLabel>

                        <TextField
                        inputProps={{ min: 0}}
                            onFocus={(e: any) => {
                                e.target.style.backgroundColor = "#fff"
                                e.target.style.color = "#000000"
                            }}
                            onBlur={(e: any) => {
                                e.target.style.backgroundColor = ""
                                e.target.style.color = ""
                            }}
                            sx={{ textDecorationColor: "#000000", borderColor: "ActiveBorder", borderRadius: "5px" }}
                            placeholder='Price'
                            InputProps={{
                                endAdornment: <InputAdornment sx={{ color: bgColor }} position="end">$</InputAdornment>,
                            }}
                            
                            margin="dense"
                            id="Price"
                            type="number"
                            variant="outlined"
                            onKeyDown={(e: any) => { 
                             
                                setPrice(e.target.value) }}

                        />
                        <InputLabel>Image-Adress</InputLabel>

                        <TextField
                            onFocus={(e: any) => {
                                e.target.style.backgroundColor = "#fff"
                                e.target.style.color = "#000000"
                            }}
                            onBlur={(e: any) => {
                                e.target.style.backgroundColor = ""
                                e.target.style.color = ""
                            }}
                            sx={{ textDecorationColor: "#000000", borderColor: "ActiveBorder", borderRadius: "5px" }}
                            placeholder='Image-Address'
                            margin="dense"
                            id="Image"
                            type="text"
                            variant="outlined"
                            onChange={(e: any) => { setImageQuery(e.target.value) }}

                        />
                        <Box component="div" sx={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                            <Box component="div" sx={{ marginRight: "5px" }}>
                                <InputLabel>From-Date</InputLabel>
                                <TextField
                                    onFocus={(e: any) => {
                                        e.target.style.backgroundColor = "#fff"
                                        e.target.style.color = "#000000"
                                    }}
                                    onBlur={(e: any) => {
                                        e.target.style.backgroundColor = ""
                                        e.target.style.color = ""
                                    }}
                                    sx={{ textDecorationColor: "#000000", borderColor: "ActiveBorder", borderRadius: "5px" }}
                                    margin="dense"
                                    id="from_date"
                                    type="date"
                                    variant="outlined"
                                    onChange={(e: any) => {
                                        console.log(e.target.value)
                                        setFromDate(e.target.value)
                                    }}
                                    inputProps={{
                                        max: to_date
                                    }}
                                />
                            </Box>
                            <Box component="div">

                                <InputLabel>To-Date</InputLabel>

                                <TextField
                                    onFocus={(e: any) => {
                                        e.target.style.backgroundColor = "#fff"
                                        e.target.style.color = "#000000"
                                    }}
                                    onBlur={(e: any) => {
                                        e.target.style.backgroundColor = ""
                                        e.target.style.color = ""
                                    }}
                                    sx={{ textDecorationColor: "#000000", borderColor: "ActiveBorder", borderRadius: "5px" }}
                                    margin="dense"
                                    id="to_date"
                                    inputMode='numeric'
                                    type="date"
                                    variant="outlined"
                                    onChange={(e: any) => {

                                        setToDate(e.target.value)
                                    }}
                                    inputProps={{
                                        min: from_date
                                    }}

                                />
                            </Box>
                        </Box>
                        <InputLabel>Description</InputLabel>
                        <TextField
                            onFocus={(e: any) => {
                                e.target.style.backgroundColor = "#fff"
                                e.target.style.color = "#000000"
                            }}
                            onBlur={(e: any) => {
                                e.target.style.backgroundColor = ""
                                e.target.style.color = ""
                            }}
                            sx={{ textDecorationColor: "#000000", borderColor: "ActiveBorder", borderRadius: "5px" }}

                            placeholder='Description'
                            margin="dense"
                            id="description"
                            type="text"
                            onChange={(e: any) => { setDescription(e.target.value) }}
                            variant="outlined"
                        />
                    </Box>

                </DialogContent>
                <DialogActions sx={{ background: "#FFf", justifyContent: "center" }} >
                    <Button sx={{ backgroud: "#DD4124", color: "#9B2335" }} onClick={handleClose}>Cancel</Button>
                    <Button sx={{ backgroud: "#DD4124", color: "#9B2335" }} onClick={vacationAction}>Add</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>

    );
}
