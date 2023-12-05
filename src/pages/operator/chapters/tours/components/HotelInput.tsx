import React, {ChangeEvent, FocusEvent, useEffect, useState} from 'react';
import {FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {Hotels} from "../../../../admin/chapters/hotels/Hotels";
import axios from "axios";
import StarIcon from '@mui/icons-material/Star';
import {FlexWrapper} from "../../../../../components/decoration/FlexWrapper";
import {HotelInfoState} from "../TourForm";
import {FormErrors} from "../../../../../App";

type Hotel = {
    id: number
    name: string
    luxury: number
    countryCode: string
}

export type HotelInput = {
    countryCode?: string
    errors: FormErrors
    setErrors: (errors: FormErrors) => void
    color?: 'primary'
}
export const HotelInput: React.FC<HotelInput & HotelInfoState> = ({
                                                                      setErrors,
                                                                      errors,
                                                                      countryCode,
                                                                      setHotelInfo,

                                                                  }) => {

    const [hotels, setHotels] = useState<Hotel[]>([])
    const [selectedHotel, setSelectedHotel] = useState('')

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/hotels/get_all').then((response) => {
            setHotels(countryCode ? response['data'].reverse().filter((el: Hotel) => el.countryCode === countryCode) : response['data'].reverse())
        })
    }, [countryCode])


    const onChangeHandler = (e: SelectChangeEvent) => {
        setSelectedHotel(e.target.value)
        const hotelId = hotels.find((el) => el.name === selectedHotel)
        if (hotelId && setHotelInfo) {
            setHotelInfo({hotelId: hotelId.id})
        }
        setErrors({...errors, hotel: false})
    }

    const onBlurChange = (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        setSelectedHotel(e.target.value)
        //как сдеалать эту штуку красиво
        const hotelId = hotels.find((el) => el.name === selectedHotel)
        if (hotelId && setHotelInfo) {
            setHotelInfo({hotelId: hotelId.id})
        }
        setErrors({...errors, hotel: false})
    }


    return (

        <FormControl
            sx={{minWidth: 225}}
            size="small"
            disabled={!countryCode || !hotels.length}
            color={"secondary"}

        >
            <InputLabel>
                Hotels
            </InputLabel>
            <Select
                value={selectedHotel}
                label="Hotels"
                onChange={onChangeHandler}
                onBlur={onBlurChange}
            >
                {hotels.map(c => {
                    return (
                        <MenuItem value={c.name} key={c.name}>
                            <FlexWrapper justify={'space-between'} style={{width: '100%'}}>
                                <span>{c.name}</span>
                                <FlexWrapper align={'center'} gap={'2px'}>
                                    <span style={{opacity: 0.2}}>{c.luxury}</span>
                                    <StarIcon sx={{opacity: 0.2}}/>
                                </FlexWrapper>
                            </FlexWrapper>
                        </MenuItem>
                    )
                })}
            </Select>
            <FormHelperText>
                {countryCode ? hotels.length ? 'Available hotels' : 'No hotels available' : 'First, specify the country!'}
            </FormHelperText>
        </FormControl>
    );
};

