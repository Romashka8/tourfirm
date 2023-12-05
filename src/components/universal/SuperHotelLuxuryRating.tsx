import React, {useState} from 'react';
import {Box, InputLabel, Rating} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";


type SuperHotelLuxuryRating = {
    value: number | null
    setValue: (value: number | null) => void
}
export const SuperRating: React.FC<SuperHotelLuxuryRating> = ({value, setValue}) => {
    const [hover, setHover] = useState(-1);

    const labels: { [index: string]: string } = {
        1: 'Budget',
        2: 'Tourist',
        3: 'Average',
        4: 'First',
        5: 'Highest',
    };

    function getLabelText(value: number) {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const superRating_styles = {
        width: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
    }

    return (
        <Box sx={superRating_styles}>
            <InputLabel>Luxury</InputLabel>
            <Rating
                value={value}
                precision={1}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.5 }} fontSize="inherit" />}
            />
            {value !== null && (
                <Box sx={{ ml: 1 }}>{labels[hover !== -0.1 ? hover : value]}</Box>
            )}
        </Box>
    );
};

