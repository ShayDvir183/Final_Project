import { Box } from "@mui/material";
import MyImageList from "../../ui-components/imageList";
import styles from "./homePage.module.css";

export default function HomePage() {
  const pText = "Welcome To Pooking, We Will Help You Organize Your Vacations";
  return (
    <Box component={"div"} className={styles.box}>
      <h1 className={styles.text}>{pText}</h1>
      <MyImageList />
    </Box>
  );
}
