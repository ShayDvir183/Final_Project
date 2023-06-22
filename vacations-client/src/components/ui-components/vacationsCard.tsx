import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import {
  IVacation,
  setAdminDialogOpen,
  setPaginationVacations,
} from "../../store/reducers/vacationsReducer";
import moment from "moment";
import { Box, Popover } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  deleteVacationAction,
  followVacationAction,
  getVacationsAction,
} from "../../store/asyncFunction/vacations";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import styles from "./cssFiles/vacationCard.module.css";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function VacationCard(props: { vacation: IVacation }) {
  let { vacation } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [anchorEl1, setAnchorEl1] = useState<HTMLElement | null>(null);
  const [isFollowing, setIsFollowing] = useState(vacation.isFollowed);
  const { page } = useAppSelector((state: any) => state.vacations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setPaginationVacations(page));
  }, [isFollowing, page, dispatch]);
  const role = localStorage.getItem("role");
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl1(null);
  };
  const handlePopoverOpenAvatar = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handlePopoverCloseAvatar = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const favoriteHandler = async () => {
    setIsFollowing(!isFollowing);
    await followVacationAction(vacation, isFollowing ? false : true);
    getVacationsAction();
  };
  function deleteHandler() {
    deleteVacationAction(vacation.id);
    getVacationsAction();
  }
  function editHandler() {
    dispatch(
      setAdminDialogOpen({
        isOpen: true,
        edit: true,
        editVacation: vacation,
        text: `edit vacation ${vacation.destination}`,
      })
    );
    getVacationsAction();
  }
  return (
    <Card className={styles.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-owns={open ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpenAvatar}
            onMouseLeave={handlePopoverCloseAvatar}
            sx={{ bgcolor: "rgba(0,0,0,0.5)" }}
            aria-label="vacations"
          >
            {vacation.ammount_of_followers}
          </Avatar>
        }
        action={
          role === "admin" && (
            <Box>
              <IconButton style={{ color: "red" }} onClick={deleteHandler}>
                <DeleteForeverOutlinedIcon />
              </IconButton>
              <IconButton
                color="primary"
                aria-label="edit"
                onClick={editHandler}
              >
                <EditRoundedIcon />
              </IconButton>
            </Box>
          )
        }
        title={vacation.destination}
        titleTypographyProps={{ sx: { color: "#fff", fontSize: "x-large" } }}
      />
      <CardMedia
        component="img"
        height="194"
        image={vacation.image}
        alt="Vacation"
      />
      <CardContent>
        <Typography variant="subtitle1" className={styles.text}>
          {`From : ${moment(vacation.from_date).format(`Do MMMM YYYY`)}`}
        </Typography>
        <Typography variant="subtitle1" className={styles.text}>
          {`To : ${moment(vacation.to_date).format(`Do MMMM YYYY`)}`}
        </Typography>
        <Typography variant="subtitle1" className={styles.text}>
          {`Prices Starts At : ${vacation.price}`}$
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={favoriteHandler}
          sx={{
            pointerEvents: role === "admin" ? "none" : `auto`,
          }}
          aria-label="add to favorites"
        >
          <FavoriteIcon htmlColor={!isFollowing ? "black" : "red"} />
        </IconButton>

        <ExpandMore
          aria-owns={open ? "mouse-over-popover1" : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ wordBreak: "break-all", whiteSpace: "pre-wrap" }}>
          <Typography
            sx={{
              lineHeight: 1.6,
              fontFamily: "serif",
              fontSize: "large",
            }}
            variant="body1"
            color="#fff"
          >
            {vacation.description}
          </Typography>
        </CardContent>
      </Collapse>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>
          Amount Of Followers : {vacation.ammount_of_followers}
        </Typography>
      </Popover>
      <Popover
        id="mouse-over-popover1"
        sx={{
          pointerEvents: "none",
        }}
        open={open1}
        anchorEl={anchorEl1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 1 }}>Click For More Info</Typography>
      </Popover>
    </Card>
  );
}
