import React, {ReactNode} from 'react';
import LogoutIcon from "@mui/icons-material/Logout";
import {AuthWithToken} from "../../../App";
import {S} from './Sidebar_Styles'

type SideBarObj = {
    menuItem: string
    path: string
    icon: ReactNode
}
type SideBar = {
    menu: SideBarObj[]
} & AuthWithToken

export const SideBar: React.FC<SideBar> = ({menu, setToken}) => {

    const logOut = () => {
        if (setToken) {
            setToken({role: null, access_token: null, id: 0})
        }
        console.log('exit!')
    }

    return (
        <S.SideBarWrap>
            <S.SideBarTitle>sidebar</S.SideBarTitle>
            <hr style={{borderTop: '#F4F7FE'}}/>
            <S.Menu>
                {menu.map((el: SideBarObj) => {
                    return (
                        <S.MenuItemStyle key={el.menuItem}>
                            <S.LinkStyle to={el.path}> {el.icon}
                                <S.DesignItem>{el.menuItem}</S.DesignItem></S.LinkStyle>
                        </S.MenuItemStyle>
                    )
                })}
                <S.MenuItemStyle onClick={logOut}>
                    <S.LinkStyle to={'/'} replace><LogoutIcon sx={{
                        marginRight: '10px',
                        color: '#4318ff'
                    }}/><S.DesignItem>{'Exit'}</S.DesignItem></S.LinkStyle>
                </S.MenuItemStyle>
            </S.Menu>
        </S.SideBarWrap>
    );
};


