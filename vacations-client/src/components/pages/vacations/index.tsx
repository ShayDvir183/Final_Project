import {
  FormControlLabel,
  Grid,
  IconButton,
  Pagination,
  Switch,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getVacationsAction } from "../../../store/asyncFunction/vacations";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getTokenLS } from "../../../store/ls";
import {
  IVacation,
  setAdminDialogOpen,
  setFollowedVacations,
  setPaginationVacations,
} from "../../../store/reducers/vacationsReducer";
import FormDialog from "../../ui-components/dialog";
import VacationCard from "../../ui-components/vacationsCard";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import styles from "./index.module.css";

export default function Vacations() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  let lsPage = localStorage.getItem("page");
  const [page, setPage] = useState(lsPage ? parseInt(lsPage) : 1);
  const [vacationsDisplay, setVacationsDisplay] = useState(false);
  const tokenLS = getTokenLS();
  const isAdmin = localStorage.getItem("role");

  useEffect(() => {
    dispatch(setPaginationVacations(page));
  }, [page]);
  useEffect(() => {
    const p = localStorage.getItem("page");
    if (p) {
      setPage(parseInt(p));
    } else {
      setPage(1);
    }
    getVacationsAction();
  }, []);
  useEffect(() => {
    if (!tokenLS) {
      navigate("/login");
    }
  }, [tokenLS]);
  useEffect(() => {
    if (vacationsDisplay) {
      dispatch(setFollowedVacations(paginationVacs));
    }
  }, [vacationsDisplay]);
  let { vacations, followedVacations, paginationVacs } = useAppSelector(
    (state: any) => state.vacations
  );
  let pagesCount = Number(Math.ceil(vacations.length / 10));
  function addVacationHandler() {
    dispatch(
      setAdminDialogOpen({
        isOpen: true,
        edit: false,
        text: "Add your desired vacation",
      })
    );
  }
  return (
    <Box p={1} mb={5}>
      {isAdmin === "admin" && (
        <div className={styles.box}>
          <label className={styles.label}>Add-Vacation</label>
          <br />
          <IconButton
            size="large"
            onClick={addVacationHandler}
            id="back-to-top-anchor"
            sx={{ color: "#fff" }}
          >
            <AddIcon className={styles.icon} />
          </IconButton>
        </div>
      )}
      <div className={styles.box}>
        {isAdmin !== "admin" && (
          <FormControlLabel
            sx={{
              color: "#fff",
            }}
            control={
              <Switch
                color="error"
                size="medium"
                onClick={(e: any) => {
                  setVacationsDisplay(!vacationsDisplay);
                  if (vacationsDisplay) {
                    vacations = followedVacations;
                  } else {
                    getVacationsAction();
                  }
                }}
              />
            }
            labelPlacement="top"
            label={
              <span className={styles.label}>
                Followed Vacations - show only followed vacations on this page
              </span>
            }
          />
        )}
        <span className={styles.text}>
          We will remember for you the page you stopped at
        </span>
        {vacationsDisplay && (
          <Grid container spacing={8} className={styles.grid}>
            {followedVacations?.map((v: IVacation, index: number) => {
              return (
                <Grid item xs key={index}>
                  <VacationCard key={v.image} vacation={v} />
                </Grid>
              );
            })}
          </Grid>
        )}

        {!vacationsDisplay && (
          <Grid container spacing={8} className={styles.grid}>
            {paginationVacs.map((v: any, index: number) => (
              <Grid item xs key={index}>
                <VacationCard key={v.image} vacation={v} />
              </Grid>
            ))}
          </Grid>
        )}
        <div className={styles.wrap}>
          <Pagination
            className={styles.pagination}
            hideNextButton
            hidePrevButton
            shape="circular"
            page={Number(page) || 1}
            count={pagesCount}
            onChange={(e: any) => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setPage(e.target.innerText);
              localStorage.setItem("page", e.target.innerText);
            }}
            color="primary"
          />
        </div>
      </div>

      <FormDialog />
    </Box>
  );
}
