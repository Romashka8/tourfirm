import React, {useEffect, useState} from 'react';
import {FlexWrapper} from "../../../../components/decoration/FlexWrapper";
import {CurrentRoute} from "../../../../components/decoration/CurrentRoute";
import {MainTitle} from "../../../../components/decoration/MainTitle";
import {Container, Grid} from "@mui/material";
import {ComponentWrap} from "../../../../components/decoration/ComponentWrap";
import {ComponentTitle} from "../../../../components/decoration/ComponentTitle";
import {HotelsForm} from "./HotelsForm";
import {HotelsTable} from "./HotelsTable";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import HotelIcon from '@mui/icons-material/Hotel';
import {Features, iconStyle} from "../../../../components/universal/Features";
import axios from "axios";
import {AuthWithToken} from "../../../../App";


export type RowsHotelsState = {
    setRow: (row: Hotels[]) => void
    rows: Hotels[]
}
export type Hotels = {
    select: boolean
    id: number
    name: string
    countryCode: string
    luxury: number
    dateUpdate: string
}

export const Hotels: React.FC<AuthWithToken> = ({token}) => {

    const [rows, setRow] = useState<Hotels[]>([])

    const features = [
        {action: 'Register a new hotel', icon: <HotelIcon sx={iconStyle}/>},
        {action: 'You can change the name of the hotel, but you have limited opportunities to change the country of the location of the hotel and its star rating', icon: <UpgradeIcon sx={iconStyle}/>},
        {action: 'Remove one, all, or several hotels from the list', icon: <PlaylistRemoveIcon sx={iconStyle}/>}
    ]

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/hotels/get_all').then((response) => {
            console.log(response['data'])
            setRow(response['data'].reverse().map((el: Hotels) => ({
                ...el,
                select: false,
                dateUpdate: new Date().toLocaleString() + ""
            })))
        })
    }, [])

    return (
        <Container>
            <FlexWrapper direction={'column'} align={'flex-start'} gap={'20px'}>
                <FlexWrapper direction={'column'} justify={'flex-start'} gap={'2px'}>
                    <CurrentRoute>Pages / Hotels</CurrentRoute>
                    <MainTitle>Hotels</MainTitle>
                </FlexWrapper>
                <Grid container spacing={2} columns={5}>
                    <Grid item xs={2}>
                        <ComponentWrap height={'43vh'}>
                            <ComponentTitle>Add an hotel</ComponentTitle>
                            <HotelsForm rows={rows} setRow={setRow} token={token}/>
                        </ComponentWrap>
                    </Grid>
                    <Grid item xs={3}>
                        <FlexWrapper align={'center'} style={{height: '100%'}}>
                            <Features features={features}/>
                        </FlexWrapper>

                    </Grid>
                    <Grid item xs={5}>
                        <ComponentWrap height={'fit-content'}>
                            <ComponentTitle>List of hotels</ComponentTitle>
                            <HotelsTable
                                token={token}
                                setRow={setRow}
                                rows={rows}
                            />
                        </ComponentWrap>
                    </Grid>
                </Grid>
            </FlexWrapper>
        </Container>
    );
};

