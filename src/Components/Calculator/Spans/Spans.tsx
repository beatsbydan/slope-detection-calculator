import React, {useState} from 'react'
import './Spans.css'
import Input from '../../../UI/Input/Input'
import { Dropdown } from '../../../UI/Dropdown/Dropdown'

type spansType = {
    spanCount: number
}

const Spans:React.FC<spansType> = (props) => {
    const [spanDetails, setSpanDetails] = useState<Object>({})
    const spanCountArr = []
    for(let i = 1; i <= props.spanCount; i++){
        spanCountArr.push(true)
        setSpanDetails(prev => {
            return {...prev, [`span${i}`]: {
                lengthOfSpan: '',
                loadingCondition: ''
            } }
        })
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
    }
    return (
        <div className='span'>
            {spanCountArr.map((value, index)=>{
                return(
                    <div className='spanItem' key={index}>
                        <Input
                            label='Number of Spans'
                            name='spans'
                            value={spanDetails[index + 1]?.lengthOfSpan}
                            error=''
                            onChange={handleChange}
                        />
                        <Dropdown
                            error=''
                            list={}
                            onClick={}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default Spans