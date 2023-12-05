import roomsImage from '../../../../assets/admin/rooms.webp'
import styled from "styled-components";

export const RoomsBgc = styled.div`
  background: url(${roomsImage}), lightgray 50% / cover no-repeat;
  width: 70%;
  height: 100%;
  border-radius: 20px 0 0 20px;
`
const RoomsDecTitle = styled.span`
  font-size: 50px;
  margin-right: -115px;
  font-weight: 700;
  color: white;
  outline: 1px solid white;
  border-radius: 20px;
  padding: 15px;
`

const RoomsPartTitle = styled(RoomsDecTitle)`
  color: #8551da;
  margin-right: 0;
  padding: 0;
  outline: none;
`

export const S = {
    RoomsBgc,
    RoomsDecTitle,
    RoomsPartTitle
}