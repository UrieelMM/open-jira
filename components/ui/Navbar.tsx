import React, {useContext} from 'react';
import {AppBar, IconButton, Typography} from "@mui/material";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import {UIContext} from "../../context/ui";

export const Navbar = () => {
    const {openSideMenu} = useContext(UIContext);

    return (
        <AppBar sx={{flexDirection: "row", alignItems: "center"}} position="sticky" elevation={0}>
            <IconButton onClick={openSideMenu} size="large" edge="start" style={{maxWidth: "100px"}}>
                <MenuOutlinedIcon/>
            </IconButton>
            <Typography variant="h6">
                OpenJira
            </Typography>
        </AppBar>
    );
};

