import React, { useContext } from 'react'
import { PrevNav } from '../../UI/PrevNav/PrevNav';
import Transition from '../../UI/Transition/Transition';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Spans from './Spans/Spans';
import Separator from '../../UI/Separator/Separator';
import MiniOption from '../../UI/MiniOption/MiniOption';
import { Context } from '../../Context/Context';
import {useNavigate} from 'react-router-dom'
import './Calculator.css'

const Calculator:React.FC = () => {
    const {
        spans,
        inputFields,
        isOpen,
        inputErrors,
        createSpansList,
        handleChange,
        handleSpanInputChange,
        handleSubmit,
        handleOpen,
        handleFixedFirstNodeSelection,
        handleFixedLastNodeSelection,
        handleSettlementSelection
    } = useContext(Context)

    const navigate = useNavigate()

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()
        handleSubmit()
        navigate('/result')
    }

    return (
        <div className='calculator'>
            <PrevNav/>
            <div className="calculatorBody">
                <h1>Please fill the necessary details</h1>
                <form action="" onSubmit={submitHandler}>
                    <h2>Type in your values..</h2>
                    <div className="formInputs--firstSet">
                        <Input
                            label='Number of Supports'
                            name='supports'
                            value={inputFields.supports}
                            error={inputErrors.supports}
                            onChange={handleChange}
                        />
                        <Separator/>
                        <Input
                            label='Number of Internal Joints'
                            name='joints'
                            value={inputFields.joints}
                            error={inputErrors.joints}
                            onChange={handleChange}
                        />
                        <Separator/>
                        <div className="spanEditor">
                            <Input
                                label='Number of Spans'
                                name='spans'
                                value={spans.spansCount}
                                error={inputErrors.spans}
                                onChange={handleSpanInputChange}
                            />
                            {
                                parseFloat(spans.spansCount) > 0 
                                &&
                                <button type="button" onClick={createSpansList}>Edit</button>
                            }
                        </div>
                    </div>
                    {
                        isOpen 
                        &&
                        <Spans 
                            spanCount={parseFloat(spans.spansCount)} 
                            isOpen={isOpen}
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
                            type='submit'
                            actionHandler={()=>{}}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Transition(Calculator)