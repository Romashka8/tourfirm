import React from 'react';
import {Grid} from "@mui/material";
import {SideBar} from "../../components/logic/sidebar/SideBar";
import {CabWrap} from "../../components/decoration/CabWrap";
import {Navigate, Route, Routes} from "react-router-dom";
import {Copyright} from "../../components/decoration/Copyright";
import {iconStyle} from "../../components/universal/Features";
import TravelExploreIcon from "@mui/icons-material/TravelExplore"
import {Tours} from "./chapters/tours/Tours";
import {AuthWithToken} from "../../App";

export const Operator: React.FC<AuthWithToken> = ({setToken, token}) => {

    const operatorMenuItems = [
        {menuItem: 'Tours', path: 'tours', icon: <TravelExploreIcon sx={iconStyle}/>},
    ]

    return (
        <Grid container spacing={0} columns={6}>
            <Grid item xs={1}>
                <SideBar menu={operatorMenuItems} setToken={setToken} token={token}/>
            </Grid>
            <Grid item xs={5}>
                <CabWrap>
                    <Routes>
                        <Route element={<Navigate to={'tours'}/>}  path={'*'}/>
                        <Route element={<Tours token={token}/>} path={'tours'}/>
                    </Routes>
                    <Copyright top={'15px'}/>
                </CabWrap>
            </Grid>
        </Grid>
    );
};

