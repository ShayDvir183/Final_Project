import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { store } from '../../../store';
import { getVacationsAction } from '../../../store/asyncFunction/vacations';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { setIsModalOpen } from '../../../store/reducers/authReducer';
import VacationCard from '../../ui-components/vacationsCard';



export default function Vacations() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const { vacations } = useAppSelector((state: any) => state.vacations);
    const { followedVacations } = useAppSelector((state: any) => state.vacations);
    useEffect(() => {
        async function vacations() {
            const res = await getVacationsAction();
        }
        vacations()
    }, [])

    console.log(followedVacations)

    return (

        <Grid container spacing={8} sx={{ margin: 0, width: "auto" }} >
            {vacations?.vacations?.map((v: any, index: number) => (
                <Grid item xs key={index}>
                    <VacationCard vacation={v} />
                </Grid>
            ))}
        </Grid>
    )
}

