import styled from "styled-components";
import {NavLink} from "react-router-dom";
import profileBg from '../../../../assets/admin/profileBgc.webp'


const ProfileCover = styled.div`
  background: url(${profileBg}), lightgray 50% / cover no-repeat;
  width: 34vw;
  border-radius: 16px;
  height: 17vh;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`

const Name = styled.span`
  color: #2B3674;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  line-height: 32px; /* 160% */
  letter-spacing: -0.4px;
`
const Status = styled.span`
  color: var(--secondary-grey-600, #A3AED0);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px; /* 171.429% */
  letter-spacing: -0.28px;
`
const NumRegals = styled.span`
  color: #2B3674;
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  line-height: 100%;
  letter-spacing: -0.48px;
`
const NameRegals = styled.span`
  color: var(--secondary-grey-600, #A3AED0);
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px; /* 142.857% */
  letter-spacing: -0.28px;
`

const RegalsList = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 340px;
  gap: 30px;
  margin-top: 26px;
`
const RegalsItem = styled.li`
  display: flex;
  flex-direction: column;
`

export const ProfileText = styled.p`
  color: var(--secondary-grey-600, #A3AED0);
  font-size: 16px;
  font-weight: 400;
  line-height: 26px; /* 162.5% */
  letter-spacing: -0.32px;
  text-align: left;
`

const ProfileImage = styled.img`
  width: 90px;
  height: 83px;
  border-radius: 10px;
`
const TaskTitle = styled.span`
  color: var(--secondary-grey-900, #2B3674);
  font-size: 16px;
  font-weight: 500;
  line-height: 100%; /* 16px */
  letter-spacing: -0.32px;
`

const TaskLink = styled(NavLink)`
  color: var(--primary-purple-blue-500-primary-color, #4318FF);
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px; 
  letter-spacing: -0.28px;
  text-decoration-line: underline;
`

const AboutText = styled.span`
  color: #2B3674;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.32px;
`

const DecorBorder = styled.div`
  border-bottom: 2px solid #4318FF;
  border-right: 2px solid #4318FF;
  margin: 0 auto;
`
export const S = {
    DecorBorder,
    AboutText,
    TaskLink,
    ProfileImage,
    ProfileText,
    RegalsItem,
    RegalsList,
    NameRegals,
    NumRegals,
    Status,
    Name,
    ProfileCover,
    TaskTitle
}