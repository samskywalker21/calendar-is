import React, { useState, useRef, useEffect } from 'react';

import { TextField } from '@mui/material';

import axios from 'axios';

const EventListSearch = ({ setEventList }) => {
    const searchRef = useRef('');
    const [searchString, setString] = useState('');

    const handleChange = () => {
        setString(searchRef.current.value);
    };

    useEffect(() => {
        axios({
            method: 'GET',
            url: `http://${
                import.meta.env.VITE_BACKEND_ADD
            }/event/event/${searchString}`,
        }).then((res) => {
            setEventList(res.data);
        });
    }, [searchString]);

    return (
        <>
            <TextField
                variant='outlined'
                type='text'
                label='Search Event Name'
                size='small'
                onChange={handleChange}
                inputRef={searchRef}
                defaultValue={searchString}
            />
        </>
    );
};

export default EventListSearch;
