import React, {useContext} from 'react';
import {Box, Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import {UIContext} from "../../context/ui";

const menuItems: string[] = [
    "Inbox",
    "Starred",
    "Send email",
    "Draft"
];

export const SideBar = () => {
    const {sideMenuOpen, closeSideMenu} = useContext(UIContext);
    return (
        <Drawer
            anchor="left"
            open={sideMenuOpen}
            onClose={() => closeSideMenu()}
        >
            <Box sx={{width: 250}}>
                <Box sx={{padding: "5px 10px"}}>
                    <Typography variant="h5">Menú</Typography>
                </Box>
                <List>
                    {
                        menuItems.map((item, index) => {
                            return (
                                <ListItem button key={item}>
                                    <ListItemIcon>
                                        {index % 2 ? <EmailOutlinedIcon/> : <InboxOutlinedIcon/>}
                                    </ListItemIcon>
                                    <ListItemText primary={item}/>
                                </ListItem>
                            )
                        })
                    }
                </List>
                <Divider/>
                <List>
                    {
                        menuItems.map((item, index) => {
                            return (
                                <ListItem button key={item}>
                                    <ListItemIcon>
                                        {index % 2 ? <EmailOutlinedIcon/> : <InboxOutlinedIcon/>}
                                    </ListItemIcon>
                                    <ListItemText primary={item}/>
                                </ListItem>
                            )
                        })
                    }
                </List>
            </Box>
        </Drawer>
    );
};


