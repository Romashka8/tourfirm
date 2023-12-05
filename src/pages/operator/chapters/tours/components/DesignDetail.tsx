import React from 'react';
import styled from "styled-components";
import {RoomsBgc} from "../../../../admin/chapters/rooms/Rooms_Style";
import decor from '../../../../../assets/operator/decor.webp'


export const DesignDetail = () => {
    return (
        <DecDetail>
            <DecTitle>good job!</DecTitle>
            <DecTitle>good job!</DecTitle>
            <DecTitle>good job!</DecTitle>
        </DecDetail>
    );
};
const DecDetail = styled(RoomsBgc)`
  background: url(${decor});
  background-size: cover;
  width: 100%;
  border-radius: 20px;
  filter: blur(1px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const DecTitle = styled.h4`
  color: white;
  font-size: 75px;
  font-weight: 800;
  text-transform: uppercase;
`;
