import React, {FocusEvent, useEffect, useState} from 'react';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {FlexWrapper} from "../../../../../components/decoration/FlexWrapper";
import {RoomsResponse} from "../../../../admin/chapters/rooms/roomsForm/RoomsForm";
import axios from "axios";
import {HotelInfo} from "../TourForm";
import {FormErrors} from "../../../../../App";

type FullRoomsInput = {
    hotelId: number
    setHotelInfo: (hotelInfo: HotelInfo) => void
    hotelInfo: HotelInfo
    errors: FormErrors
    setErrors: (errors: FormErrors) => void
}
export const FullRoomsInput: React.FC<FullRoomsInput> = ({errors, setErrors, hotelId, hotelInfo, setHotelInfo}) => {

    const [rooms, setRooms] = useState<RoomsResponse[]>([])
    const [selectedRoom, setSelectedRoom] = useState('')

    useEffect(() => {
        console.log(hotelId)
        axios.get('http://127.0.0.1:8000/hotel_rooms/get_by_hotel_id', {params: {hotel_id: hotelId}}).then((response) => {
            setRooms(response['data'].filter((el: RoomsResponse) => el.isFree))
        })
    }, [hotelId])


    const onChangeHandler = (e: SelectChangeEvent) => {
        setSelectedRoom(e.target.value)
    }

    const onBlurChange = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        setSelectedRoom(e.target.value)
    }

    const RoomsIdHandler = (roomsId: number) => {
        setHotelInfo({...hotelInfo, hotelRoomId: roomsId})
        setErrors({...errors, rooms: false})

    }

    return (
        <FormControl
            sx={{minWidth: 225}}
            size="small"
            disabled={errors['hotel']}
            color={'secondary'}
        >
            <InputLabel>
                Rooms
            </InputLabel>
            <Select
                value={selectedRoom}
                label="Hotels"
                onChange={onChangeHandler}
                onBlur={onBlurChange}
            >
                {rooms.map(c => {

                    const onChangeRoomsHandler = () => {
                        RoomsIdHandler(c.id)
                    }

                    return (
                        <MenuItem value={c.id} key={c.id} onClick={onChangeRoomsHandler}>
                            <FlexWrapper justify={'space-between'} style={{width: '100%'}}>
                                <span>price: {c.priceForDay}</span>
                                <span>places: {c.places}</span>
                            </FlexWrapper>
                        </MenuItem>
                    )
                })}
            </Select>
            <FormHelperText>
                {!rooms.length ? 'There are no available rooms' : 'Specify the rooms'}
            </FormHelperText>
        </FormControl>
    );
};

