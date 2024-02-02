import React from 'react'
import './Button.css'

type buttonType = {
    text: string
}

const Button:React.FC<buttonType> = (props) => {
    return (
        <button type='submit'>{props.text}</button>
    )
}

export default Button