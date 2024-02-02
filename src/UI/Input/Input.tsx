import React from 'react'
import './Input.css'

type inputType = {
    label: string,
    name: string,
    error: string | null,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input:React.FC<inputType> = (props) => {
    return (
        <div className="formElement">
            <label htmlFor={props.label}>
                {`${props.label}:`}
                <small>{props.error}</small>
            </label>
            <input
                type="text"
                title={props.label}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
        
    )
}

export default Input