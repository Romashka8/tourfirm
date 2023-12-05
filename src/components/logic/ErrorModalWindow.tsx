import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import {IconButton} from "@mui/material";
import {FlexWrapper} from "../decoration/FlexWrapper";

type ErrorModalWindow = {
    setAuthError: (auth: boolean) => void
}
export const ErrorModalWindow: React.FC<ErrorModalWindow> = ({setAuthError}) => {

    const closeErrorWindow = () => {setAuthError(false)}

    return (
        <ErrorWrap>
            <Alert severity="error">
                <FlexWrapper align={'flex-start'} justify={'space-between'} style={{width: '100%'}} gap={'50px'}>
                    <FlexWrapper direction={'column'} gap={'5px'}>
                        <AlertTitle>Authorization error</AlertTitle>
                        <div>The user is not registered in the system — <strong>enter the correct data!</strong></div>
                    </FlexWrapper>
                    <IconButton onClick={closeErrorWindow}><CloseIcon/></IconButton>

                </FlexWrapper>
            </Alert>
        </ErrorWrap>

    );
};



const ErrorWrap = styled.div`
  width: 400px;
  text-align: left;
  position: fixed;
  bottom: 5vh;
  left: 13vw;
  z-index: 5;
`

