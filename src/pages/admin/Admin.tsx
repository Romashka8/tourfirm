import React from 'react';
import {CabWrap} from "../../components/decoration/CabWrap";
import {Operators} from "./chapters/operators/Operators";
import {Copyright} from "../../components/decoration/Copyright";
import {Navigate, Route, Routes} from "react-router-dom";
import {Hotels} from "./chapters/hotels/Hotels";
import {Profile} from "./chapters/profile/Profile";
import {Grid} from "@mui/material";
import {SideBar} from "../../components/logic/sidebar/SideBar";
import {Dashboard} from "./chapters/dashboard/Dashboard";
import Person2Icon from '@mui/icons-material/Person2';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import TourIcon from '@mui/icons-material/Tour';
import LuggageIcon from '@mui/icons-material/Luggage';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';import {iconStyle} from "../../components/universal/Features";
import { AuthWithToken} from "../../App";
import {Rooms} from "./chapters/rooms/Rooms";
export const Admin: React.FC<AuthWithToken> = ({setToken, token}) => {

    const adminMenuItems = [
        {menuItem: 'Profile', path: 'profile', icon: <Person2Icon sx={iconStyle}/>},
        {menuItem: 'Dashboard', path: 'dashboard', icon: <EqualizerIcon sx={iconStyle}/>},
        {menuItem: 'Operators', path: 'operators', icon: <TourIcon sx={iconStyle}/>},
        {menuItem: 'Hotels', path: 'hotels', icon: <LuggageIcon sx={iconStyle}/>},
        {menuItem: 'Rooms', path: 'rooms', icon: <MeetingRoomIcon sx={iconStyle}/>},
    ]

    return (
        <Grid container spacing={0} columns={6}>
            <Grid item xs={1}>
                <SideBar menu={adminMenuItems} setToken={setToken}/>
            </Grid>
            <Grid item xs={5}>
                <CabWrap>
                    <Routes>
                        <Route element={<Navigate to={'profile'}/>} path={'*'}/>
                        <Route element={<Operators token={token}/>} path={'operators'}/>
                        <Route element={<Hotels token={token}/>} path={'hotels'}/>
                        <Route element={<Profile/>} path={'profile'}/>
                        <Route element={<Dashboard/>} path={'dashboard'}/>
                        <Route element={<Rooms token={token}/>} path={'rooms'}/>
                    </Routes>
                    <Copyright top={'15px'}/>
                </CabWrap>
            </Grid>
        </Grid>
    );
};

