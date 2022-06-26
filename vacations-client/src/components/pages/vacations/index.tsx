import { Grid } from '@mui/material';
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



export default function Vacations() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    // const isOpen = useAppSelector((state: any) => state.vacations.adminDialogOpen);
    let tokenLS = getTokenLS()
    const isAdmin = localStorage.getItem("role")
    const { vacations } = useAppSelector((state: any) => state.vacations);
    const token = useAppSelector((state: any) => state.auth.token);
    const { followedVacations } = useAppSelector((state: any) => state.vacations);


    useEffect(() => {
        if (!tokenLS) {
            navigate("/login");
        }
    }, [token, tokenLS])

    useEffect(() => {
        if (!tokenLS) {
            navigate("/login");
        }

        async function vacations() {
            const res = await getVacationsAction();
        }
        vacations()
    }, [])
    function addVacationHandler() {
        dispatch(setAdminDialogOpen(true))

    }
    return (
        <div>
            {isAdmin === "admin" && <div style={{ margin: "30px 0", textAlign: "center", backgroundColor: "yellow" }} >
                <button style={{ margin: "auto auto" }} onClick={addVacationHandler}>Add Vacation</button>    </div>

            }
            < Grid container spacing={8} sx={{ margin: "30px 0", width: "auto" }
            } >
                {vacations?.vacations?.map((v: any, index: number) => (
                    <Grid item xs key={index}>
                        <VacationCard vacation={v} />
                    </Grid>
                ))}
            </Grid >
            <FormDialog />
        </div >
    )
}

