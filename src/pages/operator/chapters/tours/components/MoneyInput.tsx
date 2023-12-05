import React, {useState} from 'react';
import {TextField} from "@mui/material";
//@ts-ignore
import {NumericFormat, NumericFormatProps} from "react-number-format";
import {FormErrors} from "../../../../../App";


interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values: any) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
                valueIsNumericString
                prefix="$"
            />
        );
    },
);

type  Price = {
    price:  string
    setPrice: (price: string) => void
    errors: FormErrors
    setErrors: (errors: FormErrors) => void
    inputLabel: string
    color?: 'primary'
}

export const MoneyInput:React.FC<Price> = ({color, inputLabel, price, setPrice, errors, setErrors}) => {

    const [values, setValues] = useState(String(price));

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValues(event.target.value)
        setPrice(event.target.value)
        setErrors({...errors, price: false})
    };



    return (
        <TextField
            color={color ? color : 'secondary'}
            label={inputLabel}
            value={values}
            onChange={handleChange}
            disabled={errors.tourStart || errors.hotel}
            error={errors.priceForTour}
            placeholder={'100'}
            InputProps={{
                inputComponent: NumericFormatCustom as any,
            }}
            variant="standard"
        />

    );
};

