import React from 'react';
import {LoginForm} from "./LoginForm";
import {FlexWrapper} from "../../components/decoration/FlexWrapper";
import {AuthWithToken} from "../../App";
import {S} from './Login_Styles'


export const LoginPage: React.FC<AuthWithToken> = ({token, setToken}) => {
    return (
        <S.LoginWrap>
            <FlexWrapper justify={'space-between'}>
                <LoginForm token={token} setToken={setToken}/>
                <S.LoginImage>
                    {[...Array(4)].map((item, index) => <S.DecorTitle key={index}>travel agency</S.DecorTitle>)}
                </S.LoginImage>
            </FlexWrapper>
        </S.LoginWrap>
    );
};

