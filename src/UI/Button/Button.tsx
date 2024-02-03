import React from 'react'
import './Button.css'

type buttonType = {
    text: string
    type: 'button' | 'submit',
    actionHandler: () => void
}

const Button:React.FC<buttonType> = (props) => {
    return (
        <button 
            onClick={props.actionHandler} 
            type={props.type}
        >
            {props.text}
        </button>
    )
}

export default Button