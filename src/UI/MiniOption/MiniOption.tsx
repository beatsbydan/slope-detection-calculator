import React from 'react'
import './MiniOption.css'

type miniOptionType ={
    question: string,
    value: string,
    handleSelection: (value: string) => void
}
const MiniOption: React.FC<miniOptionType> = (props) => {
    return (
        <div className='miniOption'>
            {props.question}?
            <p className="optionSet">
                <span 
                    className={props.value.toLowerCase() === "yes" ? "currentSelection" : ""} 
                    onClick={()=>props.handleSelection('Yes')}
                >
                    Yes
                </span>
                &nbsp;&nbsp;
                /
                &nbsp;&nbsp;
                <span 
                    className={props.value.toLowerCase() === "no" ? "currentSelection" : ""} 
                    onClick={()=>props.handleSelection('No')}
                >
                    No
                </span>
            </p>
        </div>
    )
}

export default MiniOption