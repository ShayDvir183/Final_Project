import { FormControlLabel, Grid, IconButton, Pagination, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../../../store';
import { getVacationsAction } from '../../../store/asyncFunction/vacations';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getTokenLS } from '../../../store/ls';
import { setIsModalOpen } from '../../../store/reducers/authReducer';
import { setAdminDialogOpen } from '../../../store/reducers/vacationsReducer';
import FormDialog from '../../ui-components/dialog';
import VacationCard from '../../ui-components/vacationsCard';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';


export default function Vacations() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const [vacationsDisplay, setVacationsDisplay] = useState(false)
    // const isOpen = useAppSelector((state: any) => state.vacations.adminDialogOpen);
    let tokenLS = getTokenLS()
    const isAdmin = localStorage.getItem("role")
    const { vacations } = useAppSelector((state: any) => state.vacations);

    console.log(vacations)
    useEffect(() => {
        if (!tokenLS) {
            navigate("/login");
        }
    }, [tokenLS])
    
    useEffect(() => {
        getVacationsAction();
    }, [])
    function addVacationHandler() {
        dispatch(setAdminDialogOpen( { isOpen: true,edit:false } ))

    }
    return (
        <Box p={1}>

            {isAdmin === "admin" && <div style={{ margin: "30px 0", textAlign: "center" }} >
                <label >Add-Vacation</label><br />
                <IconButton size='large' onClick={addVacationHandler}><AddIcon /></IconButton>    </div>
            }
            {isAdmin !== "admin" && <FormControlLabel
                control={
                    <Switch color="secondary" onClick={(e: any) => {
                        console.log(e.target.value)
                        setVacationsDisplay(!e.target.value)
                    }} name="gilad" />
                }
                label={`Followed vacations`}
            />}
            < Grid container spacing={8} sx={{ margin: "30px 0", width: "auto" }
            } >
                {vacations?.vacations?.map((v: any, index: number) => (
                    <Grid item xs key={index}>
                        <VacationCard vacation={v} />
                    </Grid>
                ))}
            </Grid >
            <FormDialog />

        </Box>
    )
}

