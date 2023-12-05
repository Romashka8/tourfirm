import React, {FormEvent, useState, KeyboardEvent} from 'react';
import {FlexWrapper} from "../../../../components/decoration/FlexWrapper";
import {UniversalTextField} from "../../../../components/universal/SuperTextField";
import {UniversalButton} from "../../../../components/universal/SuperButton";
import {SuperCountrySeclect} from "../../../../components/universal/SuperCountrySeclect";
import {SuperRating} from "../../../../components/universal/SuperHotelLuxuryRating";
import axios from "axios";
import {RowsHotelsState} from "./Hotels";
import {AuthWithToken, FormErrors} from "../../../../App";

type ResponseHotel = {
    id: number
    name: string,
    countryCode: string,
    luxury: number
    rooms: any[]
}

export const HotelsForm: React.FC<RowsHotelsState & AuthWithToken> = ({rows, setRow, token}) => {

    const [name, setName] = useState('')
    const [luxury, setLuxury] = useState<number | null>(1);
    const [countryCode, setCountry] = useState('');

    const [errors, setError] = useState<FormErrors>(
        {
            name: false,
            countryCode: false,
        })
    const forceUpdate = (dataForm: ResponseHotel) => {
        const newHotel = {...dataForm, select: false, dateUpdate: new Date().toLocaleString() + ""}
        setRow([newHotel, ...rows])// Изменить стейт, чтобы вызвать перерисовку
        setError({name: false, countryCode: false})

    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (!name.length || !countryCode.length) {
            setError({name: !name.length, countryCode: !countryCode.length})
            return;
        }
        const hotel = {name, countryCode, luxury}
        console.log({hotel, token})
        if(luxury){
            axios.post('http://127.0.0.1:8000/hotels/create', {hotel, token}).then((response) => {
                forceUpdate(response['data'])
            })
            setName('')
            setCountry('')
            setLuxury(1)
        }
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLFormElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };


    return (
        <form method={'post'} onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
            <FlexWrapper direction={'column'} gap={'30px'}>
                <UniversalTextField
                    value={name}
                    label={'Name'}
                    variant={'outlined'}
                    size={'small'}
                    width={'400px'}
                    helperText={'Enter the name of the hotel'}
                    callBack={setName}
                    errors={errors}
                    setErrors={setError}/>
                <SuperCountrySeclect
                    newItem={countryCode}
                    setItem={setCountry}
                    setErrors={setError}
                    errors={errors}
                />
                <SuperRating
                    value={luxury}
                    setValue={setLuxury}
                />
                <UniversalButton
                    title={'add hotel'}
                    variant={'outlined'}
                    height={'30px'}/>
            </FlexWrapper>
        </form>
    );
};

