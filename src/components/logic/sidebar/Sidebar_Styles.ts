import styled from "styled-components";
import {MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";

const SideBarWrap = styled.nav`
  position: fixed;
  width: 100%;
  max-width: 16vw;
  background-color: white;
`
const LinkStyle = styled(NavLink)`
  width: 100%;
  display: flex;
  align-items: center;
`
const DesignItem = styled.span`
  color: var(--secondary-grey-600, #A3AED0);
  font-family: DM Sans, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 30px; 
  letter-spacing: -0.32px;
  margin-left: 10px;
`
const MenuItemStyle = styled(MenuItem)`
  display: flex;
  align-items: center;
  width: 100%;
  position: relative;
  
  &:after{
    content: '';
    position: absolute;
    width: 4px;
    height: 36px;
    background-color: #4318FF;
    border-radius: 25px;
    right: 0;
    display: none;
  }

  &:hover {
    ${DesignItem} {
      color: black;
    }
    &:after{
      display: block;
    }
  }
`

const Menu = styled.ol`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  gap: 12px;

  & > a.active{
    color: #61dafb;
    &:after{
      display: block;
    }
  }
`
const SideBarTitle = styled.h2`
  color: #2B3674;
  font-family: Poppins, sans-serif;
  font-size: 26px;
  font-weight: 700;
  line-height: 100%; 
  text-transform: uppercase;
  margin: 56px 0;
`

export const S = {
    SideBarTitle,
    Menu,
    MenuItemStyle,
    LinkStyle,
    SideBarWrap,
    DesignItem
}