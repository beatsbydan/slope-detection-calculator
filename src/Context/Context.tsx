import { useState, createContext, ReactNode } from "react";

type inputFieldsType = {
    supports: string,
    joints: string,
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

type contextType = {
    children: ReactNode
}

type spanDetailsType = {
    spanNumber: string,
    length: string,
    load: string,
    condition: string,
}

type spansType = {
    spansCount: string,
    spanDetails: spanDetailsType[]
}

type contextValueProps = {
    inputFields: {
        [key: string]: string
    },
    loadingConditions: string[],
    spans: spansType,
    inputErrors: {
        [key: string]: string
    },
    isOpen: boolean,
    handleOpen: () => void,
    createSpansList: () => void,
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSpanInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSettlementSelection: (value: string) => void,
    saveSpanDetails: (details: spanDetailsType) => void,
    handleFixedFirstNodeSelection: (value: string) => void,
    handleFixedLastNodeSelection: (value: string) => void,
    handleSubmit: (e: React.FormEvent) => void
}

export const Context = createContext<contextValueProps>({
    inputFields: {},
    spans: {
        spansCount: '',
        spanDetails: []
    },
    loadingConditions: [],
    inputErrors: {},
    isOpen: false,
    handleOpen: () => {},
    createSpansList: () => {},
    handleChange: () => {},
    saveSpanDetails: () => {},
    handleSpanInputChange: () => {},
    handleSettlementSelection: () => {},
    handleFixedFirstNodeSelection: () => {},
    handleFixedLastNodeSelection: () => {},
    handleSubmit: () => {}
})

export const ContextProvider:React.FC<contextType> = ({children}) => {
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
    
    const [inputFields, setInputFields] = useState<inputFieldsType>({
        supports: '',
        joints: '',
        settlement: '',
        fixedFirstNode: '',
        fixedLastNode: ''
    })

    const [spans, setSpans] = useState<spansType>({
        spansCount: '',
        spanDetails: []
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

    const createSpansList = () => {
        handleOpen()
        const newSpans: spanDetailsType[] = []
        for(let i = 1; i <= parseFloat(spans.spansCount); i++){
            const newSpanNode = {
                spanNumber: `${i}`,
                length: '',
                load: '',
                condition: ''
            }
            newSpans.push(newSpanNode)
        }
        setSpans(prev => {
            return {...prev, spanDetails: [...newSpans]}
        })
    }

    const saveSpanDetails = (details: spanDetailsType) => {
        const currentNode = spans.spanDetails.find(node => {
            return node?.spanNumber === details.spanNumber
        })
        currentNode!.length = details.length
        currentNode!.load = details.load
        currentNode!.condition = details.condition
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setInputFields( prev => {
            return {...prev, [name]: value}
        })
    }

    const handleSpanInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target
        setSpans(prev => {
            return {...prev, spansCount: value}
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
        const parameters = {
            ...inputFields,
            ...spans
        }
        console.log(parameters)
    }

    const value = {
        inputFields,
        spans,
        inputErrors,
        isOpen,
        loadingConditions,
        handleOpen,
        handleChange,
        createSpansList,
        saveSpanDetails,
        handleSpanInputChange,
        handleSettlementSelection,
        handleFixedFirstNodeSelection,
        handleFixedLastNodeSelection,
        handleSubmit
    }

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}