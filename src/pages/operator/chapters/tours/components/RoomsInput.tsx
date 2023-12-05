import React, {useState} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {HotelInput} from "./HotelInput";

type RoomsInput = {
    roomsItems: number[]
    inputLabel: string
    color?: 'primary'
    callback?: (item: number) => void
}
export const RoomsInput: React.FC<HotelInput & RoomsInput> = ({
                                                                  callback,
                                                                  color,
                                                                  inputLabel,
                                                                  errors,
                                                                  setErrors,
                                                                  roomsItems
                                                              }) => {

    const [selectedRooms, setRooms] = useState(Math.min(...roomsItems))
    const onChangeHandler = (e: SelectChangeEvent) => {
        setRooms(Number(e.target.value))
        setErrors({...errors, rooms: false})
        if (callback) {
            callback(Number(e.target.value))
        }
    }

    return (
        <FormControl
            sx={{minWidth: 90}}
            size="small"
            disabled={errors.hotel}
            color={color ? color : 'secondary'}

        >
            <InputLabel>{inputLabel}</InputLabel>
            <Select
                value={String(selectedRooms)}
                label="Rooms"
                onChange={onChangeHandler}
                size={'small'}
            >
                {roomsItems.map((el) => {
                    return (
                        <MenuItem key={el} value={el}>{el}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>

    )
}

