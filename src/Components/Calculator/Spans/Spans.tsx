import React, {useState} from 'react'
import { createPortal } from 'react-dom'
import './Spans.css'
import Input from '../../../UI/Input/Input'
import { Dropdown } from '../../../UI/Dropdown/Dropdown'

type spansType = {
    spanCount: number,
    closeModal: () => void
}

const loadingConditions: string[] = [
    'None.',
    'Point load at center.',
    'Point load at distance \'a\' from left end and \'b\' from the right end.',
    'Two equal point loads, spaced at 1/3 of the total length from each other.',
    'Three equal point loads, spaced at 1/4 of the total length from each other.',
    'Uniformly distributed load over the whole length.',
    'Uniformly distributed load over half of the span on the right side. ',
    'Uniformly distributed load over half of the span on the left side.',
    'Variably distributed load, with highest point on the right end.',
    'Variably distributed load, with highest point on the left end.',
    'Variably distributed load, with highest point at the centre.'
]

const Background = () => {
    return <div/>
}

const SpansBlock:React.FC<spansType> = (props) => {
    const ContentArr = Array.from({length: props.spanCount}, (_, index) => {
        return (
            <div className='spanItem' key={index}>
                <Input
                    label='Number of Spans'
                    name='spans'
                    value={''}
                    error=''
                    onChange={handleChange}
                />
                <Dropdown
                    error=''
                    list={loadingConditions}
                    onClick={()=>{}}
                />
                <Input
                    label='Magnitude of load'
                    name='load'
                    value={''}
                    error=''
                    onChange={handleChange}
                />
            </div>
        )
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
    }
    return (
        <div className='span'>
            {ContentArr}
        </div>
    )
}

const Spans:React.FC<spansType> = () => {
    return(
        <div/>
    )
}

export default Spans