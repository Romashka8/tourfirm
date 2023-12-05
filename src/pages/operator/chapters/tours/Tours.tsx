import React, {useEffect, useState} from 'react';
import {Container, Grid} from "@mui/material";
import {FlexWrapper} from "../../../../components/decoration/FlexWrapper";
import {CurrentRoute} from "../../../../components/decoration/CurrentRoute";
import {MainTitle} from "../../../../components/decoration/MainTitle";
import {ComponentWrap} from "../../../../components/decoration/ComponentWrap";
import {ComponentTitle} from "../../../../components/decoration/ComponentTitle";
import {TourForm} from "./TourForm";
import {AuthWithToken} from "../../../../App";
import {TourTable} from "./TourTable";
import axios from "axios";
import {DesignDetail} from "./components/DesignDetail";

export type Tours = {
    select: boolean
    id: number
    countryCode: string
    hotelId: number
    priceForTour: string
    tourStart: string
    tourEnd: string
}

export type TourRowsState = {
    rows: Tours[]
    setRow: (rows: Tours[]) => void
}
export const Tours: React.FC<AuthWithToken> = ({token}) => {

    const [rows, setRow] = useState<Tours[]>([])


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/tours/get_all').then((response) => {
            console.log(response['data'])
            setRow(response['data'].reverse().map((el: Tours) => ({
                ...el,
                select: false,
                tourStart: el.tourStart.slice(0, 10),
                tourEnd: el.tourEnd.slice(0, 10)
            })))
        })
    }, [])


    return (
        <Container>
            <FlexWrapper direction={'column'} align={'flex-start'} gap={'20px'}>
                <FlexWrapper direction={'column'} justify={'flex-start'} gap={'2px'}>
                    <CurrentRoute>Pages / Tours</CurrentRoute>
                    <MainTitle>Tours</MainTitle>
                </FlexWrapper>
                <Grid container spacing={2} columns={5}>
                    <Grid item xs={2.6}>
                        <ComponentWrap height={'70vh'}>
                            <ComponentTitle>Add an tour</ComponentTitle>
                            <TourForm
                                token={token}
                                rows={rows}
                                setRow={setRow}
                            />
                        </ComponentWrap>
                    </Grid>
                    <Grid item xs={2.4}>
                        <ComponentWrap height={'70vh'}>
                            <DesignDetail/>
                        </ComponentWrap>
                    </Grid>
                    <Grid item xs={5}>
                        <ComponentWrap width={'80vw'} height={'fit-content'}>
                            <ComponentTitle>List of tours</ComponentTitle>
                            <TourTable
                                setRow={setRow}
                                rows={rows}
                                token={token}
                            />
                        </ComponentWrap>
                    </Grid>
                </Grid>
            </FlexWrapper>
        </Container>
    );
};


