import React, {useState} from 'react';
import {
    Checkbox,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead, TablePagination,
    TableRow
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {EditableSpan} from "../../../../components/logic/EditableSpan";
import {Operator} from "./Operators";
import axios from "axios";
import {AuthWithToken} from "../../../../App";


export interface CommonColumnProperties {
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
}


export type TestOperatorsColumns = CommonColumnProperties & {
    id: 'id' | 'login' | 'password' | 'dateUpdate'
}

type SuperTable = {
    deleteSelectedURL: string
    deleteOneURL: string
    changeItemURL: string
    emptyWarning: string

    columns: TestOperatorsColumns[]
    rows: Operator[]
    setRow: (rows: Operator[]) => void
} & AuthWithToken


export const OperatorsTable: React.FC<SuperTable> = ({
                                                    deleteSelectedURL,
                                                    deleteOneURL,
                                                    changeItemURL,
                                                    emptyWarning,
                                                    columns,
                                                    rows,
                                                    setRow,
                                                    token

                                                }) => {


    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteSelected = () => {
        //почему нужно передавать массив из объектов {id: num} ??
        const operator_delete_list =  rows.filter(el => el.select).map(el => el.id)
        axios.post(`${deleteSelectedURL}`, {operator_delete_list, token}).then((response) => {
            setRow(rows.filter(el => (!el.select)))
            setBigCheck(false)
        })

    }


    const selectAll = () => {
        setRow(rows.map(el => (el.select ? el : {...el, select: !el.select})))
        if (rows.length) {
            setBigCheck(!bigCheck)
            bigCheck && setRow(rows.map(el => (el.select ? {...el, select: !el.select} : el)))
        }
    }
    const [bigCheck, setBigCheck] = useState(false)

    const deleteOne = (id: number) => {
        console.log({id})
        const operator_delete = {id}
        axios.post(`${deleteOneURL}`, {operator_delete, token}).then((response) => {
            console.log(response['data'])
        })
        setRow(rows.filter(el => el.id !== id))
    }

    const changeSelectedStatusOnly = (id: number) => {
        const newState = rows.map(el => (el.id === id ? {
            ...el,
            select: !el.select
        } : el))
        setRow(newState)

    }

    const onChangeItem = (newTitle: string | number, columnItem: string, id: number) => {
        const operator = {id: id, [columnItem]: newTitle}
        axios.post(`${changeItemURL}`, {operator, token}).then((response) => {
            setRow(rows.map(el => (el.id === id ? {
                ...response['data'],
                dateUpdate: new Date().toLocaleString() + ""
            } : el)))

        })
    }


    return (
        <Paper sx={{width: '100%', overflow: 'hidden', margin: '30px 0'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Checkbox onChange={selectAll} checked={bigCheck} color={'secondary'}/>
                                <IconButton onClick={deleteSelected} sx={{marginLeft: '15px'}}
                                            color={'secondary'}><DeleteIcon/></IconButton>
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth, fontFamily: 'DM Sans'}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.length ? rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    const deleteHandler = () => {
                                        deleteOne(row.id)
                                    }
                                    const changeSelectedStatusOnlyHandler = () => {
                                        changeSelectedStatusOnly(row.id)
                                    }
                                    const onChangeItemHandler = (newTitle: string | number, columnItem: string, id: number) => {
                                        onChangeItem(newTitle, columnItem, id)

                                    }

                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <Checkbox sx={{marginLeft: '-60px'}} checked={row.select} color={'secondary'}
                                                      onChange={changeSelectedStatusOnlyHandler}/>
                                            <IconButton onClick={deleteHandler} sx={{marginLeft: '15px'}}
                                                        color={'secondary'}><DeleteIcon/></IconButton>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                const onChangeItemHandlerFirst = (newTitle: string | number) => {
                                                    onChangeItemHandler(newTitle, column.id, row.id)
                                                }

                                                return (
                                                    <TableCell key={column.id} align={column.align} height={'50px'}>
                                                        {value === row.id || value === row.dateUpdate ? <>{value}</> :
                                                            <EditableSpan
                                                                oldTitle={column.format && typeof value === 'number'
                                                                    ? column.format(value) : value}
                                                                onChange={onChangeItemHandlerFirst}/>}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                }) :
                            <TableRow style={{
                                position: 'relative',
                                display: 'block',
                                right: '-140%',
                                margin: '17px 0',
                                textAlign: 'center'
                            }}>{emptyWarning}</TableRow>}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};


