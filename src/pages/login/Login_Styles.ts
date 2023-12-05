import styled from "styled-components"
import loginImage from '../../assets/login/loginBgc.webp'

const Legend = styled.legend`
  color: #2B3674;
  font-family: DM Sans, sans-serif;
  font-size: 36px;
  font-weight: 700;
  line-height: 56px;
  letter-spacing: -0.72px;
`
const Comment = styled.span`
  color: var(--secondary-grey-600, #A3AED0);
  font-family: DM Sans, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 100%;
  letter-spacing: -0.32px;
`

const LoginWrap = styled.section`
  overflow: hidden;
`

const LoginImage = styled.div`
  background: url(${loginImage}), lightgray 50% / cover no-repeat;
  width: 50vw;
  border-radius: 0 0 0 125px;
  height: 100vh;
  display: flex;
  justify-content: center;
  overflow: hidden;
`

export const DecorTitle = styled.span`
  display: block;
  color: rgba(199, 155, 254, 0.32);
  font-weight: 700;
  font-size: 75px;
  letter-spacing: -3px;
  transform: rotate(-90deg);
  position: relative;
  left: 260px;
  margin: 0;

  &:nth-child(2n) {
    color: rgba(255, 255, 255, 0.42);
  }
`
export const S = {
    DecorTitle,
    LoginImage,
    LoginWrap,
    Comment,
    Legend
}