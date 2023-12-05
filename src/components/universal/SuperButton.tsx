import React from 'react';
import {Button} from "@mui/material";

type SuperButton = {
    title: string
    variant?: 'contained' | 'outlined' | 'text'
    width?: string
    height?: string
    fontSize?: string
    buttonErrors?: boolean
}
export const UniversalButton: React.FC<SuperButton> = ({buttonErrors, title, variant, width, height, fontSize}) => {

   const superButton_styles = {
       backgroundColor: variant === 'contained' ? '#4318ff' : 'transparent',
       width: width || '100%',
       height: height || '54px',
       fontSize: fontSize || '15px',
       '&:hover': '#826cff',
       opacity: 0.8,
       fontFamily: 'DM Sans'
   }

    return (
        <Button variant={variant || 'contained'}
                color={"secondary"}
                type={'submit'}
                disabled={buttonErrors ? buttonErrors : false}
                sx={superButton_styles}>{title}</Button>
    );
};

