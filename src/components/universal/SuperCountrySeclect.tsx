import React from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {FormErrors} from "../../App";


type SuperSelect = {
    newItem: string
    setItem: (newItem: string) => void
    errors: FormErrors
    setErrors: (obj: FormErrors) => void
}
export const SuperCountrySeclect: React.FC<SuperSelect> = ({
                                                         newItem,
                                                         setItem,
                                                         errors,
                                                         setErrors,
                                                     }) => {

    const countries = ['Turkey', 'Egypt', 'Cyprus', 'Sochi', 'Yaroslavl', 'Nagore']
    const handleChange = (e: SelectChangeEvent) => {
        setItem(e.target.value);
        setErrors({...errors, countryCode: !e.target.value.length})
    };
    return (
        <FormControl
            sx={{minWidth: 400}}
            size="small"
            color={'secondary'}
            error={errors.countryCode}>
            <InputLabel>Country</InputLabel>
            <Select
                value={newItem}
                label="Country"
                onChange={handleChange}
                required={true}
            >
                {countries.map(c => {
                    return (
                        <MenuItem value={c} key={c}>{c}</MenuItem>
                    )
                })}
            </Select>
        </FormControl>
    );
};

