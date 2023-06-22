import * as React from "react";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
export default function BackToTop(props: { children: React.ReactElement }) {
  const { children } = props;

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = (
      (event.target as HTMLDivElement).ownerDocument || document
    ).querySelector("#back-to-top-anchor");
    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
      });
    }
  };
  return (
    <Fade in={true}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}
