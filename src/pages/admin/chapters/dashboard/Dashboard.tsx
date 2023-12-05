import React from 'react';
import styled from "styled-components";
import {Container} from "@mui/material";
import {CurrentRoute} from "../../../../components/decoration/CurrentRoute";
import {MainTitle} from "../../../../components/decoration/MainTitle";
import {FlexWrapper} from "../../../../components/decoration/FlexWrapper";
import error from '../../../../assets/admin/404-4 (1).webp'

export const Dashboard = () => {
    return (
        <Container>
            <FlexWrapper direction={'column'} align={'flex-start'} gap={'20px'}>
                <CurrentRoute>Pages / Dashboard</CurrentRoute>
                <MainTitle>Dashboard</MainTitle>
                <Image src={error}/>
            </FlexWrapper>
        </Container>
    );
};

const Image = styled.img`
  height: 74vh;
  margin: 0 auto;
`