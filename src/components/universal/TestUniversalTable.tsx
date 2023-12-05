import React, {useState} from 'react';
import axios from "axios";
import {RowsState} from "../../pages/admin/chapters/operators/Operators";
import {
    Checkbox, IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {EditableSpan} from "../logic/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";

type SuperTable = {
    deleteSelectedURL: string
    deleteOneURL: string
    changeItemURL: string
    emptyWarning: string

    columns: any
    rows: any
    setRow: (obj: any) => void
}
export const TestUniversalTable: React.FC<RowsState> = ({rows, setRow}) => {
    interface Column {
        id: 'id' | 'login' | 'password' | 'dateUpdate';
        label: string;
        minWidth?: number;
        align?: 'right' | 'center';
        format?: (value: number) => string;
    }

    const columns: readonly Column[] = [
        {id: 'id', label: 'ID', minWidth: 170},
        {id: 'login', label: 'Login', minWidth: 100},
        {id: 'password', label: 'Password', minWidth: 170, align: 'center'},
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

    //удаление выбранных операторов
    const deleteSelectedOperators = () => {
        const selectedOperators = rows.filter(el => el.select).map(el => el.id)
        axios.post('http://127.0.0.1:8000/operators/delete_list', {id: selectedOperators}).then((response) => {
            console.log(response['data'])
        })
        setRow(rows.filter(el => (!el.select)))
        setBigCheck(false)
    }

    //выбор всех операторов из списка
    const selectAllOperators = () => {
        setRow(rows.map(el => (el.select ? el : {...el, select: !el.select})))
        if (rows.length) {
            setBigCheck(!bigCheck)
            bigCheck && setRow(rows.map(el => (el.select ? {...el, select: !el.select} : el)))
        }
    }
    const [bigCheck, setBigCheck] = useState(false)

    //удаление одного оператора из списка
    const deleteOperator = (id: number) => {
        axios.post('http://127.0.0.1:8000/operators/delete', {id}).then((response) => {
            console.log(response['data'])
        })
        setRow(rows.filter(el => el.id !== id))
    }

    //изменение значения чекбокса
    const changeSelectedStatusOnly = (id: number) => {
        const newState = rows.map(el => (el.id === id ? {
            ...el,
            select: !el.select
        } : el))
        setRow(newState)

    }


    //изменение логина или пароля

    const onChangeItem = (newTitle: string | number, columnItem: string, id: number) => {
        axios.post('http://127.0.0.1:8000/operators/update' , {id: id, [columnItem]: newTitle}).then((response) => {
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
                                <Checkbox onChange={selectAllOperators} checked={bigCheck} color={'secondary'}/>
                                <IconButton onClick={deleteSelectedOperators} sx={{marginLeft: '15px'}} color={'secondary'}><DeleteIcon/></IconButton>
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
                                    const deleteOperatorHandler = () => {
                                        deleteOperator(row.id)
                                    }
                                    const  changeSelectedStatusOnlyHandler = () => {
                                        changeSelectedStatusOnly(row.id)
                                    }
                                    const onChangeItemHandler = (newTitle: string | number, columnItem: string, id: number) => {
                                        onChangeItem(newTitle, columnItem, id)

                                    }

                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                            <Checkbox sx={{marginLeft: '-60px'}} checked={row.select} color={'secondary'}
                                                      onChange={changeSelectedStatusOnlyHandler}/>
                                            <IconButton onClick={deleteOperatorHandler} sx={{marginLeft: '15px'}} color={'secondary'}><DeleteIcon/></IconButton>
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
                            }}>The list of operators is empty!</TableRow>}
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

