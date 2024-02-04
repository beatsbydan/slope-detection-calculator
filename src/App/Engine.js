import {
    FEMOptionsForBothEndsFixed, 
    FEMOptionsForOneEndFixed, 
    obtainAntiClockWiseSlopeDeflectionEquation,
    obtainClockWiseSlopeDeflectionEquation
} from './Utils'

// SpanConditions
const loadingConditions = [
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


export const evaluate = (data) => {

    // Examine conditions.
    const { 
        fixedFirstNode, 
        fixedLastNode, 
        joints, 
        settlement, 
        spanDetails, 
        spansCount, 
        supports
    } = data

    const bothEndsFixed = fixedFirstNode.toLowerCase() === 'yes' && fixedLastNode.toLowerCase() === "yes"
    
    const results = {}

    // Calculate Fixed End Moments & Slope Deflection Equations.
    const fixedEndMomentsAndSlopeDeflectionEquations = []

    for(let spanDetail of spanDetails){

        // Fixed End Moments

        const {load, length, spanNumber, condition} = spanDetail

        const loadVal = parseFloat(load)
        const lengthVal = parseFloat(length)

        const conditionIndex = loadingConditions.findIndex(spanCondition => spanCondition === condition)
        
        let FEM

        if(bothEndsFixed){
            if(spanNumber === spansCount){
                FEM = FEMOptionsForBothEndsFixed[conditionIndex.toString()].lastNode(loadVal, lengthVal) 
            }
                FEM = FEMOptionsForBothEndsFixed[conditionIndex.toString()].node(loadVal, lengthVal).toFixed(2)
        }
        else{
            if(spanNumber === spansCount){
                FEM = FEMOptionsForOneEndFixed[conditionIndex.toString()].lastNode(loadVal, lengthVal).toFixed(2)
            }
                FEM = FEMOptionsForOneEndFixed[conditionIndex.toString()].node(loadVal, lengthVal).toFixed(2)
        }


        // Slope Deflection Equation

        let clockWiseEquation
        let antiClockWiseEquation
        let theta1
        let theta2
        let angularDisplacement
        const isSettlement = settlement.toLowerCase() === "yes"

        if(!isSettlement){
            angularDisplacement = 0
        }
        if(spanNumber !== '1' && spanNumber !== spansCount ){
            clockWiseEquation = obtainClockWiseSlopeDeflectionEquation(FEM, lengthVal, 'theta1', 'theta2', isSettlement )
            antiClockWiseEquation = obtainAntiClockWiseSlopeDeflectionEquation(FEM, lengthVal, 'theta1', 'theta2', isSettlement)
        }
        else if(spanNumber === '1'){
            theta1 = 0
            clockWiseEquation = obtainClockWiseSlopeDeflectionEquation(FEM, lengthVal, theta1, 'theta2', isSettlement )
            antiClockWiseEquation = obtainAntiClockWiseSlopeDeflectionEquation(FEM, lengthVal, theta1, 'theta2', isSettlement)
        }
        else{
            theta2 = 0
            clockWiseEquation = obtainClockWiseSlopeDeflectionEquation(FEM, lengthVal, 'theta1', theta2, isSettlement )
            antiClockWiseEquation = obtainAntiClockWiseSlopeDeflectionEquation(FEM, lengthVal, 'theta1', theta2, isSettlement)
        }

        const spanResult = {
            spanNumber: spanNumber,
            fixedEndMoments: {
                clockWise: FEM * 1 ,
                antiClockWise: FEM * -1
            },
            slopeDeflectionEquations: {
                clockWise: clockWiseEquation,
                antiClockWise: antiClockWiseEquation
            }
        }

        fixedEndMomentsAndSlopeDeflectionEquations.push(spanResult)
        results.fixedEndMoments = [...fixedEndMomentsAndSlopeDeflectionEquations]
        console.log(results)
    }
}