import React, { useState } from 'react'
import './Calculator.css'
import { PrevNav } from '../../UI/PrevNav/PrevNav';
import Transition from '../../UI/Transition/Transition';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Spans from './Spans/Spans';
import Separator from '../../UI/Separator/Separator';

type inputFieldsType = {
    supports: string,
    joints: string,
    spans: string
}
type inputErrorsType = {

}

const Calculator:React.FC = () => {
    const [inputFields, setInputFields] = useState<inputFieldsType>({
        supports: '',
        joints: '',
        spans: ''
    })
    const [inputErrors, setInputErrors] = useState<inputErrorsType>({})
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setInputFields( prev => {
            return {...prev, [name]: value}
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
    }

    return (
        <div className='calculator'>
            <PrevNav/>
            <div className="calculatorBody">
                <h1>Please fill the necessary details</h1>
                <form action="" onSubmit={handleSubmit}>
                    <div className="formInputs--firstSet">
                        <Input
                            label='Number of Supports'
                            name='supports'
                            value={inputFields.supports}
                            error=''
                            onChange={handleChange}
                        />
                        <Separator/>
                        <Input
                            label='Number of Internal Joints'
                            name='joints'
                            value={inputFields.joints}
                            error=''
                            onChange={handleChange}
                        />
                        <Separator/>
                        <Input
                            label='Number of Spans'
                            name='spans'
                            value={inputFields.spans}
                            error=''
                            onChange={handleChange}
                        />
                    </div>
                    {parseFloat(inputFields.spans) > 0 && <Spans spanCount={parseFloat(inputFields.spans)} />}
                    <div className="formActions">
                        <Button
                            text='Evaluate'
                        />
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Transition(Calculator)