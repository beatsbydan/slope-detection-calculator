import React, { useState } from 'react'
import './Calculator.css'
import { PrevNav } from '../../UI/PrevNav/PrevNav';
import Transition from '../../UI/Transition/Transition';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Spans from './Spans/Spans';
import Separator from '../../UI/Separator/Separator';
import MiniOption from '../../UI/MiniOption/MiniOption';

type inputFieldsType = {
    supports: string,
    joints: string,
    spans: string,
    settlement: string,
    fixedFirstNode: string,
    fixedLastNode: string
}
type inputErrorsType = {
    supports: string,
    joints: string,
    spans: string,
    settlement: string,
    fixedFirstNode: string,
    fixedLastNode: string
}

const Calculator:React.FC = () => {
    const [inputFields, setInputFields] = useState<inputFieldsType>({
        supports: '',
        joints: '',
        spans: '',
        settlement: '',
        fixedFirstNode: '',
        fixedLastNode: ''
    })
    const [inputErrors, setInputErrors] = useState<inputErrorsType>({
        supports: '',
        joints: '',
        spans: '',
        settlement: '',
        fixedFirstNode: '',
        fixedLastNode: ''
    })
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setInputFields( prev => {
            return {...prev, [name]: value}
        })
    }
    const handleSettlementSelection = (value: string) => {
        setInputFields(prev => {
            return {...prev, settlement: value}
        })
    }
    const handleFixedFirstNodeSelection = (value: string) => {
        setInputFields(prev => {
            return {...prev, fixedFirstNode: value}
        })
    }
    const handleFixedLastNodeSelection = (value: string) => {
        setInputFields(prev => {
            return {...prev, fixedLastNode: value}
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(inputFields)
    }

    return (
        <div className='calculator'>
            <PrevNav/>
            <div className="calculatorBody">
                <h1>Please fill the necessary details</h1>
                <form action="" onSubmit={handleSubmit}>
                    <h2>Type in your values..</h2>
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
                    {
                        parseFloat(inputFields.spans) > 0 
                        &&
                        <Spans 
                            spanCount={parseFloat(inputFields.spans)} 
                            closeModal={handleOpen}
                        />
                    }
                    <div className="formInputs--lastSet">
                        <h2>Click <em>Yes</em> or <em>No</em> to select..</h2>
                        <div className="miniOptions">
                            <MiniOption
                                question="Any settlement"
                                handleSelection={handleSettlementSelection}
                                value={inputFields.settlement}
                            />
                            <Separator/>
                            <MiniOption
                                question="First Node fixed"
                                handleSelection={handleFixedFirstNodeSelection}
                                value={inputFields.fixedFirstNode}
                            />
                            <Separator/>
                            <MiniOption
                                question="Last Node fixed"
                                handleSelection={handleFixedLastNodeSelection}
                                value={inputFields.fixedLastNode}
                            />
                        </div>
                    </div>
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