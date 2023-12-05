import React, {ReactNode} from 'react';
import {Navigate} from "react-router-dom";
import { AuthWithToken} from "../../App";
import {Admin} from "../../pages/admin/Admin";
import {Operator} from "../../pages/operator/Operator";
import {LoginPage} from "../../pages/login/LoginPage";

type ProtectPages = {
    admin: ReactNode
    operator: ReactNode
    noAuth: ReactNode
}

//@ts-ignore
export const PrivateRoute: React.FC<AuthWithToken> = ({token, setToken}) => {

    const protectPages: ProtectPages = {
        admin: <Admin setToken={setToken} token={token}/>,
        operator: <Operator setToken={setToken} token={token}/>,
        noAuth: <LoginPage token={token} setToken={setToken}/>
    }
    if (token && token.access_token && token.role)
    {
        return protectPages[token.role]
    }
    return (<Navigate to={'/'}/>)
};


