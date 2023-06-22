import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import styles from "./cssFiles/footer.module.css";

function Copyright() {
  const text = `Pooking | Developed by Shay Dvir 2022 - ${new Date().getFullYear()}`;
  return (
    <Typography variant="body2" color="#fff">
      {"Copyright © "}
      <Link color="inherit" href="/">
        {text}
      </Link>
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box component="footer" className={styles.box}>
      <Container maxWidth="sm">
        <Typography variant="body1"></Typography>
        <Copyright />
      </Container>
    </Box>
  );
}
