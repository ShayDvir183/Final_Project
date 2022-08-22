import { Box } from "@mui/material"
import React from "react"
import MyImageList from "../../ui-components/imageList"





export default function HomePage() {
    const pText = "Welcome To Pooking, the best vacation site in the world!"
    return <Box component={"div"} sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <h1>Welcome To Pooking</h1>
        <MyImageList/>
    </Box>
}