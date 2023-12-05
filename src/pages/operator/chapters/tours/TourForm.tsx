import React, {FormEvent, useState, KeyboardEvent} from 'react';
import {FlexWrapper} from "../../../../components/decoration/FlexWrapper";
import {SuperCountrySeclect} from "../../../../components/universal/SuperCountrySeclect";
import {AuthWithToken, FormErrors} from "../../../../App";
import {MoneyInput} from "./components/MoneyInput";
import {DateInput} from "./components/DateInput";
import {UniversalButton} from "../../../../components/universal/SuperButton";
import axios from "axios";
import {HotelInput} from "./components/HotelInput";
import {FullRoomsInput} from "./components/FullRoomsInput";
import {TourRowsState} from "./Tours";


export type TourState = {
    date: DateState
    setDate: (tour: DateState) => void
}

export type DateState = {
    tourStart?: string
    tourEnd?: string
}

export type HotelInfo = {
    [key: string]: number
}

export type HotelInfoState = {
    hotelInfo: HotelInfo
    setHotelInfo: (hotelInfo: HotelInfo) => void
}


export const TourForm: React.FC<AuthWithToken & TourRowsState> = ({token, setRow, rows}) => {
    const [countryCode, setCountry] = useState('');
    const [priceForTour, setPrice] = useState('')
    const [dateTour, setDate] = useState<DateState>({})
    const [hotelInfo, setHotelInfo] = useState<HotelInfo>({hotelId: 0, hotelRoomId: 0})
    const [errors, setError] = useState<FormErrors>(
        {
            countryCode: false,
            price: true,
            tourStart: true,
            hotel: true,
            rooms: true
        })

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (!countryCode.length) {
            setError({...errors, countryCode: !!countryCode.length})
            return;
        }

        axios.post('http://127.0.0.1:8000/tours/create', {
            countryCode,
            priceForTour: Number(priceForTour), ...dateTour,
            operatorId: token?.id, ...hotelInfo
        }).then((response) => {
            setRow([{
                ...response['data'], select: false,
                tourStart: response['data'].tourStart.slice(0, 10),
                tourEnd: response['data'].tourEnd.slice(0, 10)
            }, ...rows])
            setCountry('')

        })
        setError({
            countryCode: false,
            price: true,
            tourStart: true,
            hotel: true,
            rooms: true
        })

    }

    const handleKeyPress = (event: KeyboardEvent<HTMLFormElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    return (
        <form
            method={'post'}
            style={{margin: '10px auto'}}
            onSubmit={handleSubmit}
            onKeyDown={handleKeyPress}
        >
            <FlexWrapper direction={'column'} gap={'40px'}>
                <SuperCountrySeclect
                    newItem={countryCode}
                    setItem={setCountry}
                    setErrors={setError}
                    errors={errors}

                />
                <FlexWrapper gap={'40px'}>
                    <HotelInput
                        countryCode={countryCode}
                        setHotelInfo={setHotelInfo}
                        hotelInfo={hotelInfo}
                        errors={errors}
                        setErrors={setError}
                    />
                    <FullRoomsInput
                        hotelId={hotelInfo['hotelId']}
                        setHotelInfo={setHotelInfo}
                        hotelInfo={hotelInfo}
                        errors={errors}
                        setErrors={setError}
                    />
                </FlexWrapper>
                <DateInput
                    date={dateTour}
                    setDate={setDate}
                    setErrors={setError}
                    errors={errors}
                />
                <MoneyInput
                    inputLabel={'Tour price'}
                    price={priceForTour}
                    setPrice={setPrice}
                    errors={errors}
                    setErrors={setError}

                />


                <UniversalButton
                    title={'add tour'}
                    variant={"outlined"}
                    buttonErrors={errors['price']}
                />
            </FlexWrapper>
        </form>
    );
};


