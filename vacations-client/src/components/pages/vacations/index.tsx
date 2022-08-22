import { FormControlLabel, Grid, IconButton, Pagination, Switch } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {  getVacationsAction } from '../../../store/asyncFunction/vacations';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getTokenLS } from '../../../store/ls';
import {  IVacation, setAdminDialogOpen, setFollowedVacations, setPaginationVacations } from '../../../store/reducers/vacationsReducer';
import FormDialog from '../../ui-components/dialog';
import VacationCard from '../../ui-components/vacationsCard';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/system';


export default function Vacations() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    let lsPage = localStorage.getItem("page");
    const [page, setPage] = useState(lsPage ? parseInt(lsPage) : 1);
    const [vacationsDisplay, setVacationsDisplay] = useState(false)
    const tokenLS = getTokenLS()
    const isAdmin = localStorage.getItem("role")
    let {vacations,followedVacations,paginationVacs}= useAppSelector((state: any) => state.vacations);
    let pagesCount = Number(Math.ceil(vacations.length / 10))
   useEffect(() => {
    dispatch(setPaginationVacations(page))
},[page])
useEffect(() => {
    const p = localStorage.getItem("page");
    if(p){setPage(parseInt(p)) }else{setPage(1)}
    getVacationsAction()
}, [])
    useEffect(() => {
        if (!tokenLS) {
            navigate("/login");
        }
    },[tokenLS])  
    useEffect(() => {
      if (vacationsDisplay) {
        dispatch(setFollowedVacations(paginationVacs))
      }
    }, [vacationsDisplay])
    function addVacationHandler() {
        dispatch(setAdminDialogOpen( { isOpen: true,edit:false,text:"add your desired vacation" } ))
    }
    return (
        <Box p={1} mb={5}>
            {isAdmin === "admin" && <div style={{ margin: "auto auto",marginTop:"30px" ,textAlign: "center" }} >
                <label style={{"color":"#ff1d58","fontSize":"larger"}} >Add-Vacation</label><br />
                <IconButton size='large' onClick={addVacationHandler} sx={{color:"#ff1d58"}}><AddIcon /></IconButton>    </div>
            }
            {isAdmin !== "admin" && <FormControlLabel
                control={
                    <Switch color="secondary" onClick={(e: any) => {
                        setVacationsDisplay(!vacationsDisplay)
                        if (vacationsDisplay) {
                            vacations = followedVacations
                        }else{
                            getVacationsAction()
                        }
                    }} />
                }
                label={`Followed vacations - Show Only Followed Vacations On This Page`}
            />}
            <span>We Will Remember For Your The Page You Stopped At </span>
            {vacationsDisplay&& < Grid container spacing={8} sx={{ margin: "30px 0", width: "auto" }
            } >
                {followedVacations?.map((v: IVacation, index: number) => {
                   return <Grid item xs key={index}>
                        <VacationCard key={v.image}  vacation={v} />
                    </Grid>
                })}
            </Grid >}
            
            {!vacationsDisplay&& < Grid container spacing={8} sx={{ margin: "auto auto", width: "100%" }
            } >
                {paginationVacs.map((v: any, index: number) => (
                    <Grid item xs key={index}>
                        <VacationCard key={v.image}  vacation={v} />
                    </Grid>
                ))}
            </Grid >
           }
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    
                }}>
                <Pagination sx={{display:"block",margin: "auto auto",mt:"10px"}}
                hideNextButton
                hidePrevButton
                shape="circular"
                page={Number(page)||1}
                 count={pagesCount} onChange={(e:any)=>{
                    window.scrollTo({top:0,behavior:"smooth"})
                    setPage(e.target.innerText)
                    localStorage.setItem("page", e.target.innerText)
                    }}  color="primary"/>
                </div>

            
            <FormDialog />

        </Box>
    )
}
