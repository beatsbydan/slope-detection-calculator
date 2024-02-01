import React from 'react'
import './Button.css'

type buttonType = {
    text: string,
    actionHandler: (e: React.FormEvent) => void
}

const Button:React.FC<buttonType> = (props) => {
    return (
        <button type='submit' onClick={props.actionHandler}>{props.text}</button>
    )
}

export default Button