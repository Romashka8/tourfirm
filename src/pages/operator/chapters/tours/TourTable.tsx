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
import {TourRowsState} from "./Tours";
import {AuthWithToken} from "../../../../App";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

export const TourTable: React.FC<TourRowsState & AuthWithToken> = ({rows, setRow, token}) => {

    interface Column {
        id: 'id' | 'countryCode' | 'hotelId' | 'priceForTour' | 'tourStart' | 'tourEnd'
        label: string;
        minWidth?: number;
        align?: 'right' | 'center' | 'left';
        format?: (value: number | boolean) => string;
    }

    const columns: readonly Column[] = [
        {id: 'id', label: 'ID', minWidth: 40},
        {id: 'countryCode', label: 'Country', minWidth: 150, align: 'center'},
        {id: 'hotelId', label: 'Hotel ID', minWidth: 90, align: 'center'},
        {id: 'priceForTour', label: 'Price ($)', minWidth: 90, align: 'left'},
        {id: 'tourStart', label: 'Tour start', minWidth: 90, align: 'left'},
        {id: 'tourEnd', label: 'Tour end', minWidth: 90, align: 'left'}
    ];

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteSelectedTours = () => {
        const tour_delete_list = rows.filter(el => el.select).map(el => el.id)
        axios.post('http://127.0.0.1:8000/tours/delete_list', {
            tour_delete_list,
            token
        }).then((response) => {

            setBigCheck(false)
        })
    }

    const selectAllTours = () => {
        setRow(rows.map(el => (el.select ? el : {...el, select: !el.select})))
        if (rows.length) {
            setBigCheck(!bigCheck)
            bigCheck && setRow(rows.map(el => (el.select ? {...el, select: !el.select} : el)))
        }
    }

    const [bigCheck, setBigCheck] = useState(false)

    const deleteTour = (id: number) => {
        const tour_delete = {id}
        axios.post('http://127.0.0.1:8000/tours/delete', {tour_delete, token}).then((response) => {
            setRow(rows.filter(el => el.id !== id))
        })
    }

    const changeSelectedStatusOnly = (id: number) => {
        const newState = rows.map(el => (el.id === id ? {
            ...el,
            select: !el.select
        } : el))
        setRow(newState)
    }

    return (
        <Paper sx={{width: '100%', overflow: 'hidden', margin: '0px 0'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{width: '150px'}}>
                                <Checkbox onChange={selectAllTours} checked={bigCheck} color={'secondary'}/>
                                <IconButton onClick={deleteSelectedTours} sx={{marginLeft: '15px'}}
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
                                    const deleteTourHandler = () => {
                                        deleteTour(row.id)
                                    }
                                    const changeSelectedStatusOnlyHandler = () => {
                                        changeSelectedStatusOnly(row.id)
                                    }


                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <Checkbox sx={{marginLeft: '-20px'}} checked={row.select} color={'secondary'}
                                                      onChange={changeSelectedStatusOnlyHandler}/>
                                            <IconButton onClick={deleteTourHandler} sx={{marginLeft: '15px'}}
                                                        color={'secondary'}><DeleteIcon/></IconButton>
                                            {columns.map((column) => {
                                                const value = row[column.id];

                                                return (
                                                    <TableCell key={column.id} align={column.align} height={'50px'}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : typeof value === 'boolean' ? value ? 'FREE' : 'yes' : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                }) :
                            <TableRow style={{
                                position: 'relative',
                                display: 'block',
                                right: '-190%',
                                margin: '17px 0',
                                textAlign: 'center'
                            }}>The list of hotels is empty!</TableRow>}
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

