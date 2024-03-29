import React, {ReactNode, useEffect, useState, useContext} from 'react'
import ReactDOM from 'react-dom'
import './Spans.css'
import Input from '../../../UI/Input/Input'
import { Dropdown } from '../../../UI/Dropdown/Dropdown'
import Button from '../../../UI/Button/Button'
import Separator from '../../../UI/Separator/Separator'
import { Context } from '../../../Context/Context'

type spansType = {
    isOpen: boolean,
    spanCount: number,
    closeModal: () => void
}

type modalType = {
    isOpen: boolean,
    closeModal: () => void,
    children: ReactNode
}

const SpansModal:React.FC<modalType> = (props) => {
    const [modalElement] = useState(document.createElement('div'))
    
    const saveSpanDetails = () => {
        props.closeModal()
    }
    
    useEffect(()=>{
        document.body.appendChild(modalElement)

        return () => {
            document.body.removeChild(modalElement)
        }

    },[modalElement])

    return props.isOpen ?
        ReactDOM.createPortal(
            <React.Fragment>
                <div className="modalOverlay" onClick={props.closeModal}/>
                <div className="modalContent">
                    <h1>Type in and select where necessary..</h1>
                    {props.children}
                    <Button
                        text='Save'
                        type='button'
                        actionHandler={saveSpanDetails}
                    />
                </div>
            </React.Fragment>
            ,
            modalElement
        )
        :
        null
}

const SpanItem:React.FC<{span: number}> = (props) => {
    const {loadingConditions, saveSpanDetails} = useContext(Context)
    const [spanInputs, setSpanInputs] = useState({
        length: '',
        load: '',
        condition: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setSpanInputs({...spanInputs, [name]: value})
    }
    const selectSpanCondition = (value: string) => {
        setSpanInputs({
            ...spanInputs,
            condition: value
        })
    }
    const saveSpanCondition = () => {
        const spanConditions = {
            ...spanInputs,
            spanNumber: props.span.toString()
        }
        saveSpanDetails(spanConditions)

    }
    return(
        <div className='spanItem'>
            <h4> Span <span><em>{props.span}</em></span></h4>
            <div className="spanItem--input">
                <Input
                    label='Length of Span'
                    name='length'
                    value={spanInputs.length}
                    error=''
                    onChange={handleChange}
                />
                <Separator/>
                <Input
                    label='Magnitude of load'
                    name='load'
                    value={spanInputs.load}
                    error=''
                    onChange={handleChange}
                />
            </div>
            <Dropdown
                error=''
                list={loadingConditions}
                onClick={selectSpanCondition}
            />
            <Button text='Add' type='button' actionHandler={saveSpanCondition}/>
        </div>
    )
}

const Spans:React.FC<spansType> = (props) => {
    const ContentArr = []
    for(let i = 1; i <= props.spanCount; i++){
        ContentArr.push(i)
    }

    return (
        <div className='span'>
            <SpansModal
                isOpen={props.isOpen}
                closeModal={props.closeModal}
            >
                {ContentArr.map((value => {
                    return(
                        <SpanItem key={value} span={value}/>
                    )
                }))}
            </SpansModal>
        </div>
    )
}


export default Spans