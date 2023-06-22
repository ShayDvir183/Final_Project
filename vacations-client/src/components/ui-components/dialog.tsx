import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setAdminDialogOpen } from "../../store/reducers/vacationsReducer";
import {
  createVacationAction,
  editVacationAction,
} from "../../store/asyncFunction/vacations";
import { Box } from "@mui/system";
import { InputAdornment, InputLabel, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import styles from "./cssFiles/dialog.module.css";
const theme = createTheme({
  palette: {
    primary: {
      main: "#7e57c2",
    },
    divider: "#f50057",
    secondary: {
      main: "#f44336",
    },
    text: {
      primary: "#fff",
    },
  },
});
export interface IVacationAdd {
  description: string;
  destination: string;
  image: string;
  from_date: Date;
  to_date: Date;
  price: number;
}

export default function FormDialog() {
  const dispatch = useAppDispatch();
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [imageQuery, setImageQuery] = useState("");
  const [destination, setDestination] = useState("");
  const [from_date, setFromDate] = useState(new Date());
  const [to_date, setToDate] = useState(new Date());
  let { isOpen, edit, editVacation, text } = useAppSelector(
    (state: any) => state.vacations.adminDialogOpen
  );
  function clearStates() {
    setDescription("");
    setPrice(0);
    setImageQuery("");
    setDestination("");
    setFromDate(new Date());
    setToDate(new Date());
  }
  const handleClose = () => {
    dispatch(setAdminDialogOpen({ isOpen: false, edit: false, text: "" }));
    clearStates();
  };
  async function vacationAction() {
    if (to_date < from_date) {
      return alert("Please Check Your Vacation Dates Dear Admin");
    }
    if (
      !description ||
      !price ||
      !imageQuery ||
      !destination ||
      !from_date ||
      !to_date
    ) {
      return alert("Please fill all fields");
    }
    if (edit) {
      editVacation = {
        id: editVacation.id,
        description: description,
        price: price,
        image: imageQuery,
        destination: destination,
        from_date: from_date,
        to_date: to_date,
      };
      editVacationAction(editVacation);
    } else {
      const vacation = {
        isFollow: false,
        id: -1,
        description: description,
        price: price,
        image: imageQuery,
        destination: destination,
        from_date: from_date,
        to_date: to_date,
        ammount_of_followers: 0,
      };
      createVacationAction(vacation);
    }
    handleClose();
  }
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        sx={{ textAlign: "center" }}
        open={isOpen}
        maxWidth="md"
        onClose={handleClose}
        scroll="paper"
      >
        <DialogTitle className={styles.dialogTitle}>
          Hello Dear Admin, please {text}
        </DialogTitle>
        <DialogContent className={styles.dialogContent}>
          <Box>
            <InputLabel className={styles.inputTitle}>Destination</InputLabel>
            <TextField
              inputProps={{ style: { color: "#fff" } }}
              placeholder="Destination"
              onFocus={foucsHandler}
              onBlur={blurHandler}
              className={styles.inputField}
              margin="dense"
              sx={{
                color: "#fff",
                border: "0.5px solid #fff",
                "& fieldset": { border: "none" },
                input: { color: "#fff" },
              }}
              id="Destination"
              type="text"
              variant="outlined"
              onChange={(e: any) => {
                setDestination(e.target.value);
              }}
            />
            <InputLabel className={styles.inputTitle}>Price</InputLabel>
            <TextField
              onFocus={foucsHandler}
              onBlur={blurHandler}
              className={styles.inputField}
              sx={{
                color: "#fff",
                border: "0.5px solid #fff",
                "& fieldset": { border: "none" },
                input: { color: "#fff" },
              }}
              placeholder="Price"
              InputProps={{
                endAdornment: <InputAdornment position="end">$</InputAdornment>,
              }}
              margin="dense"
              id="Price"
              type="number"
              variant="outlined"
              onKeyDown={(e: any) => {
                setPrice(e.target.value);
              }}
            />
            <InputLabel className={styles.inputTitle}>Image-Adress</InputLabel>
            <TextField
              onFocus={foucsHandler}
              onBlur={blurHandler}
              className={styles.inputField}
              placeholder="Image-Address"
              margin="dense"
              sx={{
                color: "#fff",
                border: "none",
                "& fieldset": { border: "none" },
                input: { color: "#fff" },
              }}
              id="Image"
              type="text"
              variant="outlined"
              onChange={(e: any) => {
                setImageQuery(e.target.value);
              }}
            />
            <Box
              component="div"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Box component="div" sx={{ marginRight: "5px" }}>
                <InputLabel className={styles.inputTitle}>From-Date</InputLabel>
                <TextField
                  onFocus={foucsHandler}
                  onBlur={blurHandler}
                  sx={{
                    color: "#fff",
                    border: "none",
                    "& fieldset": { border: "none" },
                    input: { color: "#fff" },
                  }}
                  onChange={(e: any) => {
                    setFromDate(e.target.value);
                  }}
                  onKeyDown={(e) => e.preventDefault()}
                  className={styles.inputField}
                  margin="dense"
                  id="from_date"
                  type="date"
                  variant="outlined"
                  inputProps={{ max: to_date }}
                />
              </Box>
              <Box component="div">
                <InputLabel className={styles.inputTitle}>To-Date</InputLabel>
                <TextField
                  onFocus={foucsHandler}
                  onBlur={blurHandler}
                  sx={{
                    color: "#fff",
                    border: "none",
                    "& fieldset": { border: "none" },
                    input: { color: "#fff" },
                  }}
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(e: any) => {
                    setToDate(e.target.value);
                  }}
                  className={styles.inputField}
                  margin="dense"
                  id="to_date"
                  inputMode="numeric"
                  type="date"
                  variant="outlined"
                  inputProps={{
                    min: from_date,
                  }}
                />
              </Box>
            </Box>
            <InputLabel className={styles.inputTitle}>Description</InputLabel>
            <TextField
              onFocus={foucsHandler}
              onBlur={blurHandler}
              sx={{
                color: "#fff",
                border: "none",
                "& fieldset": { border: "none" },
                input: { color: "#fff" },
              }}
              className={styles.inputField}
              placeholder="Description"
              margin="dense"
              id="description"
              type="text"
              onChange={(e: any) => {
                setDescription(e.target.value);
              }}
              variant="outlined"
            />
          </Box>
        </DialogContent>
        <DialogActions className={styles.dialogActions}>
          <Button className={styles.button} onClick={handleClose}>
            Cancel
          </Button>
          <Button className={styles.button} onClick={vacationAction}>
            {edit ? "edit" : "add"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
const foucsHandler = (e: any) => {
  e.target.style.backgroundColor = "#fff";
  e.target.style.color = "#000000";
};
const blurHandler = (e: any) => {
  e.target.style.backgroundColor = "";
  e.target.style.color = "";
};
