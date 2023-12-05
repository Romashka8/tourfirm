import React, {FormEvent, KeyboardEvent, useState} from 'react';
import {UniversalTextField} from "../../components/universal/SuperTextField";
import {FlexWrapper} from "../../components/decoration/FlexWrapper";
import {UniversalButton} from "../../components/universal/SuperButton";
import {Copyright} from "../../components/decoration/Copyright";
import axios from "axios";
import Cookies from "js-cookie";
import {AuthWithToken} from "../../App";
import {ErrorModalWindow} from "../../components/logic/ErrorModalWindow";
import {S} from './Login_Styles'

export const LoginForm: React.FC<AuthWithToken> = ({token, setToken}) => {

    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [errors, setError] = useState({login: false, password: false})

    //некрасивая функция для вызова перерисовки после использования event.preventDefault()
    const forceUpdate = () => {
        setError({login: false, password: false})
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        if (!username.length || !password.length) {
            setError({login: !username.length, password: !password.length})
            return;
        }
        axios.post('http://127.0.0.1:8000/autorization/token', {username, password}).then((response) => {
            const accessToken = response['data']['access_token']
            Cookies.set('access', accessToken)
            if (accessToken && setToken) {
                setToken({...response['data']})
            }
        })

        forceUpdate()
        setPassword('')
        setUsername('')

    }

    const [authError, setAuthError] = useState(false)
    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            setAuthError(true);
        }
        return error;
    });

    const handleKeyPress = (event: KeyboardEvent<HTMLFormElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(event);
        }
    };

    return (
        <FlexWrapper justify={'center'} direction={'column'} align={'center'} style={{width: '60vw'}}>
            {authError && <ErrorModalWindow setAuthError={setAuthError}/>}
            <form method={'post'} onSubmit={handleSubmit} onKeyDown={handleKeyPress}>
                <FlexWrapper direction={'column'} align={'flex-start'}>
                    <S.Legend>Sign In</S.Legend>
                    <S.Comment>Enter your login and password to sign in!</S.Comment>
                    <hr/>
                    <FlexWrapper direction={'column'} gap={'50px'}>
                        <UniversalTextField
                            label={'Login'}
                            helperText={'Enter the login'}
                            callBack={setUsername}
                            errors={errors}
                            setErrors={setError}
                            variant={'outlined'}/>
                        <UniversalTextField
                            label={'Password'}
                            helperText={'Enter the password'}
                            callBack={setPassword}
                            type={'password'}
                            errors={errors}
                            setErrors={setError}
                            variant={'outlined'}/>
                        <UniversalButton title={'Sign In'} variant={'contained'}/>
                    </FlexWrapper>
                </FlexWrapper>
            </form>
            <Copyright/>
        </FlexWrapper>
    );
};


