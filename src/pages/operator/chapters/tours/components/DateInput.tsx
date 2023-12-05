import React from 'react';
import dayjs, {Dayjs} from "dayjs";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DateRange, DateRangePicker, DesktopDateRangePicker} from "@mui/x-date-pickers-pro";
import {TourState} from "../TourForm";
import {FormErrors} from "../../../../../App";


export const DateInput: React.FC<TourState & { errors: FormErrors
    setErrors: (errors: FormErrors) => void}> = ({date, setDate, errors, setErrors}) => {

    const [value, setValue] = React.useState<DateRange<Dayjs>>([
        dayjs('2023-12-01'),
        dayjs('2023-12-06'),
    ]);
    const onChangeHandler = (newValue: DateRange<Dayjs>) => {
        setValue(newValue)
        if (newValue[1] && newValue[0]) {
            setDate({...date, tourStart: newValue[0].toDate().toISOString(), tourEnd: newValue[1].toDate().toISOString()})
        }
        setErrors({...errors, tourStart: false})
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
                value={value}
                onChange={onChangeHandler}
                disabled={errors['rooms']}
            />
        </LocalizationProvider>
    );
};

