import React, {FormEvent, KeyboardEvent, useState} from 'react';
import {UniversalTextField} from "../../../../components/universal/SuperTextField";
import {UniversalButton} from "../../../../components/universal/SuperButton";
import {FlexWrapper} from "../../../../components/decoration/FlexWrapper";
import {RowsState} from "./Operators";
import axios from "axios";
import {AuthWithToken} from "../../../../App";

type Response = {
    id: number
    login: string
    password: string
}

export const OperatorsForm: React.FC<RowsState & AuthWithToken> = ({rows, setRow, token}) => {

    const [password, setPassword] = useState('')
    const [login, setLogin] = useState('')
    const [errors, setError] = useState({login: false, password: false})


    //некрасивая функция для вызова перерисовки после использования event.preventDefault()
    const forceUpdate = (dataForm: Response) => {
        console.log(dataForm)
        const newOperator = {...dataForm, select: false, dateUpdate: new Date().toLocaleString() + ""}
        setRow([newOperator, ...rows])// Изменить стейт, чтобы вызвать перерисовку
        setError({login: false, password: false})

    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (!login.length || !password.length) {
            setError({login: !login.length, password: !password.length})
            return;
        }
        const operator = {login, password}
        axios.post('http://127.0.0.1:8000/operators/create', {operator, token}).then((response) => {
            forceUpdate(response['data'])
        })
        setPassword('')
        setLogin('')
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLFormElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    return (
        <form method={'post'} onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
            <FlexWrapper direction={'column'} gap={'40px'}>
                <UniversalTextField
                    value={login}
                    label={'Login'}
                    variant={'standard'}
                    height={'15px'}
                    width={'26vw'}
                    size={'small'}
                    helperText={''}
                    callBack={setLogin}
                    errors={errors}
                    setErrors={setError}/>
                <UniversalTextField
                    value={password}
                    label={'Password'}
                    variant={'standard'}
                    height={'25px'}
                    width={'26vw'}
                    size={'small'}
                    helperText={''}
                    callBack={setPassword}
                    errors={errors}
                    setErrors={setError}/>
                <UniversalButton
                    title={'Add operator'}
                    variant={'outlined'}
                    width={'150px'}
                    height={'30px'}
                    fontSize={'12px'}
                />
            </FlexWrapper>
        </form>
    );
};

