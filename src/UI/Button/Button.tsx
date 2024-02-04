import React from 'react'
import './Button.css'

type buttonType = {
    text: string
    type: 'button' | 'submit',
    actionHandler: () => void
}

const defaultFunction = () => {
    return
}

const Button:React.FC<buttonType> = (props) => {
    return (
        <button 
            onClick={props.type === "button" ? props.actionHandler: defaultFunction} 
            type={props.type}
        >
            {props.text}
        </button>
    )
}

export default Button