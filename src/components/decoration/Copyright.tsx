import React from 'react';
import styled from "styled-components";

type Copyright = {
    top?: string
}
export const Copyright: React.FC<Copyright> = ({top}) => {
    return (
        <CopyrightStyle top={top}>
            © 2023 User Interface. all rights reserved. Made in Moscow.
        </CopyrightStyle>
    );
};
const CopyrightStyle = styled.span<Copyright>`
  color: var(--secondary-grey-600, #A3AED0);
  font-size: 14px;
  font-weight: 500;
  line-height: 24px; /* 171.429% */
  letter-spacing: -0.28px;
  margin: 15px;
  display: inline-block;
  top: ${props => props.top || '130px'};
`
