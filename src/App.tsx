import React, {useState} from 'react';
import './App.css';
import {LoginPage} from "./pages/login/LoginPage";
import {GlobalStyle} from "./styles/Global.styled";
import {Navigate, Route, Routes} from "react-router-dom";
import {PrivateRoute} from "./components/logic/PrivateRoute";


export type FormErrors = {
    [key: string]: boolean
}
export type Token = {
    access_token: string | null
    role: 'admin' | 'operator' | null
    id: number | null
}
export type AuthWithToken = {
    token?: Token
    setToken?: (token: Token) => void
}

function App() {
    //рефакторинг:
    // 1. Ликвидировать подвижную верстку с помощью написания собственного контейнера
    // 7. решить проблему с авторизацией пользователя, которого нет в системе

    const [token, setToken] = useState<Token>({access_token: null, role: null, id: null})

    return (
        <div className="App">
            <GlobalStyle/>
            <Routes>
                      <Route element={!token.access_token ? <LoginPage token={token} setToken={setToken}/> :
                          token.role === 'admin' ? <Navigate to={'admin/*'}/> : <Navigate to={'operator/*'}/> } path={'/'}/>
                      <Route element={<PrivateRoute token={token} setToken={setToken}/>} path={'admin/*'}/>
                      <Route element={<PrivateRoute token={token} setToken={setToken}/>} path={'operator/*'}/>
            </Routes>
        </div>
    );
}

export default App;
