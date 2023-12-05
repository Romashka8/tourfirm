import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpan = {
    oldTitle: string | number
    onChange: (newTitle: string | number) => void
}
export const EditableSpan: React.FC<EditableSpan> = ({oldTitle, onChange}) => {

    const [title, setTitle] = useState(oldTitle)
    const [editMode, setEditMode] = useState(false)
    const [error, setError] = useState('')
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.currentTarget.value)
        e.currentTarget.value.length === 0 ? setError('введите текст!') : setError('')
    }
    const activateEditMode = () => {
        setEditMode(true)
    }
    const activateViewMode = () => {
        if(typeof title === 'string' && !title.length){
            return
        }
            setEditMode(false)
            onChange(title)

    }
    return (
        <div>
            {editMode ? <TextField color={'secondary'} sx={{width: '100%'}} variant={"standard"} autoFocus value={title}
                                   onChange={onChangeTitleHandler} onBlur={activateViewMode} error={!!error} helperText={error}/> :
                <span onDoubleClick={activateEditMode}>{title}</span>}
        </div>
    );
};
