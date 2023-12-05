import React, {ChangeEvent} from 'react';
import {TextField} from "@mui/material";

type SuperTextField = {
    value?: string
    label: string
    variant: 'outlined' | 'filled' |'standard'
    width?: string
    height?: string
    helperText: string
    callBack: (text: string) => void
    errors: any
    setErrors: (obj: any) => void
    type?: 'password' | any
    size?: 'small' | 'medium'
}
export const UniversalTextField: React.FC<SuperTextField> = ({value, label, variant, width, height, helperText, callBack, errors, setErrors, type, size}) => {

    const errorKey = label.toLowerCase()
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.value)
        setErrors({...errors, [errorKey]: !e.currentTarget.value.length})
    }

    return (
        <TextField
            value={value}
            label={label}
            helperText={helperText}
            onChange={onChangeHandler}
            type={type ? type : 'text'}
            variant={variant}
            color={'secondary'}
            sx={{width: width || '450px', height: height || '50px'}}
            size={size || 'medium'}
            error={errors[errorKey]}/>
    );
};

