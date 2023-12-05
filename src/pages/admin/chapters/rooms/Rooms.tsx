import React, {useEffect, useState} from 'react';
import {Container, Grid} from "@mui/material";
import {FlexWrapper} from "../../../../components/decoration/FlexWrapper";
import {CurrentRoute} from "../../../../components/decoration/CurrentRoute";
import {MainTitle} from "../../../../components/decoration/MainTitle";
import {ComponentWrap} from "../../../../components/decoration/ComponentWrap";
import {ComponentTitle} from "../../../../components/decoration/ComponentTitle";
import {RoomsForm} from "./roomsForm/RoomsForm";
import {AuthWithToken, Token} from "../../../../App";
import {RoomsTable} from "./RoomsTable";
import axios from "axios";
import {S} from './Rooms_Style'


export type RoomRowsState = {
    setRow: (row: Room[]) => void
    rows: Room[]
}

export type Room = {
    select: boolean
    id: number
    places: number
    priceForDay: number
    isFree: boolean
}

export const Rooms: React.FC<AuthWithToken> = ({token}) => {

    const [rows, setRow] = useState<Room[]>([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/hotel_rooms/get_all').then((response) => {
            console.log(response['data'])
            setRow(response['data'].reverse().map((el: Room) => ({
                ...el,
                select: false,
            })))
        })
    }, [])

    return (
        <Container sx={{width: '1170px'}}>
            <FlexWrapper direction={'column'} align={'flex-start'} gap={'20px'}>
                <FlexWrapper direction={'column'} justify={'flex-start'} gap={'2px'}>
                    <CurrentRoute>Pages / Rooms</CurrentRoute>
                    <MainTitle>Rooms</MainTitle>
                </FlexWrapper>
                <Grid container spacing={2} columns={5}>
                    <Grid item xs={2}>
                        <FlexWrapper direction={'column'}>
                            <ComponentWrap height={'50vh'}>
                                <ComponentTitle>Add an rooms</ComponentTitle>
                                <RoomsForm token={token} rows={rows} setRow={setRow}/>
                            </ComponentWrap>
                            <ComponentWrap height={'24.2vh'} style={{padding: 0}}>
                                <S.RoomsBgc>
                                    <FlexWrapper align={'center'} justify={'flex-end'} style={{height: '100%'}}>
                                        <S.RoomsDecTitle>Trav<S.RoomsPartTitle>elss</S.RoomsPartTitle></S.RoomsDecTitle>
                                    </FlexWrapper>
                                </S.RoomsBgc>
                            </ComponentWrap>
                        </FlexWrapper>
                    </Grid>
                    <Grid item xs={3}>
                        <ComponentWrap height={'fit-content'}>
                            <ComponentTitle>List of rooms</ComponentTitle>
                            <RoomsTable setRow={setRow} rows={rows} token={token}/>
                        </ComponentWrap>
                    </Grid>
                </Grid>
            </FlexWrapper>
        </Container>
    );
};

