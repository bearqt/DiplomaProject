import { TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';


export default function MyTextField({...props}) {
    const [field, meta, helpers] = useField(props.name);
    return (
        // <label>{props.label}</label>
        //     <input {...field} {...props} />
        <TextField
            autoComplete='off'
            
            fullWidth
            {...props} {...field}
            helperText={Boolean(meta.error && meta.touched) ? meta.error : ""}
            variant='outlined'
            error={Boolean(meta.error && meta.touched)}
        />
    )
}