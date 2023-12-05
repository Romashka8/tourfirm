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
import {RowsHotelsState} from "./Hotels";
import axios from "axios";
import {AuthWithToken} from "../../../../App";


export const HotelsTable: React.FC<RowsHotelsState & AuthWithToken> = ({rows, setRow, token}) => {
    interface Column {
        id: 'id' | 'name' | 'countryCode' | 'luxury' | 'dateUpdate';
        label: string;
        minWidth?: number;
        align?: 'right' | 'center';
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        {id: 'id', label: 'ID', minWidth: 170},
        {id: 'name', label: 'Name', minWidth: 100},
        {id: 'countryCode', label: 'Country', minWidth: 170, align: 'center'},
        {id: 'luxury', label: 'Luxury', minWidth: 170, align: 'center'},
        {id: 'dateUpdate', label: 'DateUpdate', minWidth: 170, align: 'right'}
    ];

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const deleteSelectedHotels = () => {
        const hotel_delete_list = rows.filter(el => el.select).map(el => el.id)
        axios.post('http://127.0.0.1:8000/hotels/delete_list', {hotel_delete_list, token}).then((response) => {
            setRow(rows.filter(el => (!el.select)))
            setBigCheck(false)
        })
    }

    const selectAllHotels = () => {
        setRow(rows.map(el => (el.select ? el : {...el, select: !el.select})))
        if (rows.length) {
            setBigCheck(!bigCheck)
            bigCheck && setRow(rows.map(el => (el.select ? {...el, select: !el.select} : el)))
        }
    }

    const [bigCheck, setBigCheck] = useState(false)

    const deleteHotel = (id: number) => {
        const hotel_delete = {id}
        axios.post('http://127.0.0.1:8000/hotels/delete', {hotel_delete, token}).then((response) => {
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
        const hotel = {id: id, [columnItem]: newTitle}
        console.log({hotel, token})
        axios.post('http://127.0.0.1:8000/hotels/update', {hotel, token}).then((response) => {
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
                                <Checkbox onChange={selectAllHotels} checked={bigCheck} color={'secondary'}/>
                                <IconButton onClick={deleteSelectedHotels} sx={{marginLeft: '15px'}}
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
                                    const deleteHotelHandler = () => {
                                        deleteHotel(row.id)
                                    }
                                    const changeSelectedStatusOnlyHandler = () => {
                                        changeSelectedStatusOnly(row.id)
                                    }
                                    const onChangeItemHandler = (newTitle: string | number, columnItem: string, id: number) => {
                                        onChangeItem(newTitle, columnItem, id)

                                    }

                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <Checkbox sx={{marginLeft: '-28px'}} checked={row.select} color={'secondary'}
                                                      onChange={changeSelectedStatusOnlyHandler}/>
                                            <IconButton onClick={deleteHotelHandler} sx={{marginLeft: '15px'}}
                                                        color={'secondary'}><DeleteIcon/></IconButton>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                const onChangeItemHandlerFirst = (newTitle: string | number) => {
                                                    onChangeItemHandler(newTitle, column.id, row.id)
                                                }
                                                return (
                                                    <TableCell key={column.id} align={column.align} height={'50px'}>
                                                        {value === row.id || value === row.dateUpdate || value === row.luxury || value === row.countryCode ? <>{value}</> :
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

