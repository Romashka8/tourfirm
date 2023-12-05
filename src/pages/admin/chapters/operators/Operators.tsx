import React, {useEffect, useState} from 'react';
import {CurrentRoute} from "../../../../components/decoration/CurrentRoute";
import {MainTitle} from "../../../../components/decoration/MainTitle";
import {Container, Grid} from "@mui/material";
import {ComponentWrap} from "../../../../components/decoration/ComponentWrap";
import {FlexWrapper} from "../../../../components/decoration/FlexWrapper";
import {ComponentTitle} from "../../../../components/decoration/ComponentTitle";
import {OperatorsForm} from "./OperatorsForm";
import {OperatorsTable, TestOperatorsColumns} from "./OperatorsTable";
import CreateIcon from '@mui/icons-material/Create';
import UpgradeIcon from '@mui/icons-material/Upgrade';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import {Features, iconStyle} from "../../../../components/universal/Features";
import axios from "axios";
import {AuthWithToken} from "../../../../App";
import {ErrorModalWindow} from "../../../../components/logic/ErrorModalWindow";

export type RowsState = {
    setRow: (row: Operator[]) => void
    rows: Operator[]
}

export type Operator = {
    select: boolean
    id: number
    login: string
    password: string
    dateUpdate: string
}

export const Operators: React.FC<AuthWithToken> = ({ token}) => {
    const [rows, setRow] = useState<Operator[]>([])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/operators/get_all').then((response) => {
            console.log(response['data'])
            setRow(response['data'].reverse().map((el: Operator) => ({
                ...el,
                select: false,
                dateUpdate: new Date().toLocaleString() + ""
            })))
        })
    }, [])

    const operatorsColumns: TestOperatorsColumns[] = [
        {id: 'id', label: 'ID', minWidth: 170},
        {id: 'login', label: 'Login', minWidth: 100},
        {id: 'password', label: 'Password', minWidth: 170, align: 'center'},
        {id: 'dateUpdate', label: 'DateUpdate', minWidth: 170, align: 'right'}
    ];

    const operatorsData = {
        deleteSelectedURL: 'http://127.0.0.1:8000/operators/delete_list',
        deleteOneURL: 'http://127.0.0.1:8000/operators/delete',
        changeItemURL: 'http://127.0.0.1:8000/operators/update',
        emptyWarning: 'The list of operators is empty!',
    }

    const features = [
        {action: 'Register a new operator', icon: <CreateIcon sx={iconStyle}/>},
        {action: 'Change the login or password of an already registered operator', icon: <UpgradeIcon sx={iconStyle}/>},
        {action: 'Remove one, all, or several operators from the list', icon: <PlaylistRemoveIcon sx={iconStyle}/>}
    ]

    return (
        <Container>
            <FlexWrapper direction={'column'} align={'flex-start'} gap={'20px'}>

                <FlexWrapper direction={'column'} justify={'flex-start'} gap={'2px'}>
                    <CurrentRoute>Pages / Operators</CurrentRoute>
                    <MainTitle>Operators</MainTitle>
                </FlexWrapper>
                <Grid container spacing={2} columns={5}>
                    <Grid item xs={2}>
                        <ComponentWrap height={'32vh'}>
                            <ComponentTitle>Add an operator</ComponentTitle>
                            <OperatorsForm
                                rows={rows}
                                setRow={setRow}
                                token={token}
                                //Зачем отправлять роль, если с опреаторами взаимодействует только админ?
                               />
                        </ComponentWrap>
                    </Grid>
                    <Grid item xs={3}>
                        <Features features={features}/>
                    </Grid>
                    <Grid item xs={5}>
                        <ComponentWrap width={'80vw'} height={'fit-content'}>
                            <ComponentTitle>List of operators</ComponentTitle>
                            <OperatorsTable
                                token={token}
                                deleteSelectedURL={operatorsData.deleteSelectedURL}
                                deleteOneURL={operatorsData.deleteOneURL}
                                changeItemURL={operatorsData.changeItemURL}
                                emptyWarning={operatorsData.emptyWarning}
                                columns={operatorsColumns}
                                rows={rows}
                                setRow={setRow}/>
                        </ComponentWrap>
                    </Grid>
                </Grid>
            </FlexWrapper>
        </Container>
    );
};

