import React, {FormEvent, KeyboardEvent, useState} from 'react';
import {FlexWrapper} from "../../../../../components/decoration/FlexWrapper";
import {RoomsInput} from "../../../../operator/chapters/tours/components/RoomsInput";
import {MoneyInput} from "../../../../operator/chapters/tours/components/MoneyInput";
import {HotelInput} from "../../../../operator/chapters/tours/components/HotelInput";
import {SuperCountrySeclect} from "../../../../../components/universal/SuperCountrySeclect";
import {UniversalButton} from "../../../../../components/universal/SuperButton";
import {AuthWithToken, FormErrors} from "../../../../../App";
import {HotelInfo} from "../../../../operator/chapters/tours/TourForm";
import axios from "axios";
import {Room, RoomRowsState} from "../Rooms";

export type RoomsResponse = {
    hotelId: number
    id: number
    isFree: boolean
    places: number
    priceForDay: number
}
export const RoomsForm: React.FC<AuthWithToken & RoomRowsState> = ({token, rows, setRow}) => {

    const roomsItems = [5, 10, 15, 20, 25, 30]
    const [countryCode, setCountry] = useState('');
    const [priceForDay, setPriceForDay] = useState('')
    const [places, setPlaces] = useState(5)
    const [hotelId, setHotelId] = useState<HotelInfo>({})
    const [errors, setErrors] = useState<FormErrors>({
        countryCode: false,
        places: false,
        price: true,
        hotel: true
    })

    const test = {isFree: true, places, priceForDay, hotelId}
    const forceUpdate = (rooms: RoomsResponse) => {
        const newRoom: Room = {...rooms, select: false}
        setRow([newRoom, ...rows])// Изменить стейт, чтобы вызвать перерисовку
        setErrors({name: false, countryCode: false, price: true, hotel: true})


    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        const hotel_room = {isFree: true, places, priceForDay: Number(priceForDay), ...hotelId}
        axios.post('http://127.0.0.1:8000/hotel_rooms/create', {hotel_room, token}).then((response) => {
            forceUpdate(response['data'])
        })
        setCountry('')
        setPriceForDay('')
        setPlaces(5)
        setHotelId({})
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLFormElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };


    return (
        <form method={'post'} onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
            <FlexWrapper direction={'column'} gap={'30px'}>
                <SuperCountrySeclect
                    newItem={countryCode}
                    setItem={setCountry}
                    errors={errors}
                    setErrors={setErrors}
                />
                <HotelInput
                    countryCode={countryCode}
                    errors={errors}
                    setErrors={setErrors}
                    hotelInfo={hotelId}
                    setHotelInfo={setHotelId}/>
                <FlexWrapper gap={'50px'}>
                    <RoomsInput
                        inputLabel={'Places'}
                        errors={errors}
                        setErrors={setErrors}
                        roomsItems={roomsItems}
                        callback={setPlaces}
                    />
                    <MoneyInput
                        inputLabel={'Price for day'}
                        price={priceForDay}
                        setPrice={setPriceForDay}
                        errors={errors}
                        setErrors={setErrors}
                    />
                </FlexWrapper>
                <UniversalButton
                    title={'add rooms'}
                    variant={'outlined'}
                    height={'40px'}
                    buttonErrors={errors['price']}
                />

            </FlexWrapper>
        </form>
    );
};

