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
import axios from "axios";
import {RoomRowsState} from "./Rooms";
import {AuthWithToken} from "../../../../App";

export const RoomsTable: React.FC<RoomRowsState & AuthWithToken> = ({rows, setRow, token}) => {
    interface Column {
        id: 'id' | 'places' | 'priceForDay' | 'isFree'
        label: string;
        minWidth?: number;
        align?: 'right' | 'center' | 'left';
        format?: (value: number | boolean) => string;
    }

    const columns: readonly Column[] = [
        {id: 'id', label: 'ID', minWidth: 40},
        {id: 'places', label: 'Places', minWidth: 150, align: 'center'},
        {id: 'priceForDay', label: 'Price for day ($)', minWidth: 90, align: 'left'},
        {id: 'isFree', label: 'is Free', minWidth: 90, align: 'left'}
    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteSelectedRooms = () => {
        // почему нужно отправлять список из объектов с полями айдишками???
        const hotel_room_delete_list = rows.filter(el => el.select).map((el) => ({id: el.id}))
        console.log({hotel_room_delete_list, token})
        axios.post('http://127.0.0.1:8000/hotel_rooms/delete_list', {
            hotel_room_delete_list,
            token
        }).then((response) => {
            setRow(rows.filter(el => (!el.select)))
            setBigCheck(false)
        })
    }

    const selectAllRooms = () => {
        setRow(rows.map(el => (el.select ? el : {...el, select: !el.select})))
        if (rows.length) {
            setBigCheck(!bigCheck)
            bigCheck && setRow(rows.map(el => (el.select ? {...el, select: !el.select} : el)))
        }
    }

    const [bigCheck, setBigCheck] = useState(false)

    const deleteRoom = (id: number) => {
        const hotel_room_delete = {id}
        axios.post('http://127.0.0.1:8000/hotel_rooms/delete', {hotel_room_delete, token}).then((response) => {
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
                                <Checkbox onChange={selectAllRooms} checked={bigCheck} color={'secondary'}/>
                                <IconButton
                                    onClick={deleteSelectedRooms}
                                    sx={{marginLeft: '15px'}}
                                    color={'secondary'}
                                ><DeleteIcon/></IconButton>
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
                                    const deleteRoomHandler = () => {
                                        deleteRoom(row.id)
                                    }
                                    const changeSelectedStatusOnlyHandler = () => {
                                        changeSelectedStatusOnly(row.id)
                                    }
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <Checkbox
                                                sx={{marginLeft: '-20px'}}
                                                checked={row.select}
                                                color={'secondary'}
                                                onChange={changeSelectedStatusOnlyHandler}
                                                disabled={!row.isFree}
                                            />
                                            <IconButton
                                                onClick={deleteRoomHandler}
                                                sx={{marginLeft: '15px'}}
                                                        color={'secondary'}
                                                disabled={!row.isFree}
                                            ><DeleteIcon/></IconButton>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                // const onChangeItemHandlerFirst = (newTitle: string | number) => {
                                                //     onChangeItemHandler(newTitle, column.id, row.id)
                                                // }
                                                return (
                                                    <TableCell key={column.id} align={column.align} height={'50px'}
                                                               style={{color: typeof value === 'boolean' ? value ? 'green' : '#5d3dcf' : 'black'}}>
                                                        {column.format && typeof value === 'number' ? column.format(value) : typeof value === 'boolean' ? value ? 'FREE' : 'BOOKING' : value}
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
}