import {
    FEMOptionsForBothEndsFixed, 
    FEMOptionsForOneEndFixed, 
    obtainAntiClockWiseSlopeDeflectionEquation,
    obtainClockWiseSlopeDeflectionEquation,
    loadingConditions,
    generateEquilibriumEquations,
    alphabets
} from './Utils'


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
            clockWiseEquation = obtainClockWiseSlopeDeflectionEquation(FEM, lengthVal, `theta${alphabets[parseFloat(spanNumber) -1]}`, `theta${alphabets[parseFloat(spanNumber)]}`, isSettlement )
            antiClockWiseEquation = obtainAntiClockWiseSlopeDeflectionEquation(FEM, lengthVal, `theta${alphabets[parseFloat(spanNumber) -1]}`, `theta${alphabets[parseFloat(spanNumber)]}`, isSettlement)
        }
        else if(spanNumber === '1'){
            theta1 = 0
            clockWiseEquation = obtainClockWiseSlopeDeflectionEquation(FEM, lengthVal, theta1, `theta${alphabets[parseFloat(spanNumber)]}`, isSettlement )
            antiClockWiseEquation = obtainAntiClockWiseSlopeDeflectionEquation(FEM, lengthVal, theta1, `theta${alphabets[parseFloat(spanNumber)]}`, isSettlement)
        }
        else{
            theta2 = 0
            clockWiseEquation = obtainClockWiseSlopeDeflectionEquation(FEM, lengthVal, `theta${alphabets[parseFloat(spanNumber) -1]}`, theta2, isSettlement )
            antiClockWiseEquation = obtainAntiClockWiseSlopeDeflectionEquation(FEM, lengthVal, `theta${alphabets[parseFloat(spanNumber) -1]}`, theta2, isSettlement)
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
        results.fixedEndMomentsAndSlopeDeflectionEquations = [...fixedEndMomentsAndSlopeDeflectionEquations]
    }

    console.log(results)

    // Equilibrium Equation

    const NodeEquations = []

    for(let i = 1; i <= parseFloat(spansCount) + 1; i++){
        const NodeEquation = {
            nodeNumber: `${i}`,
            clockwise: null,
            antiClockwise: null 
        }
        NodeEquations.push(NodeEquation)
    }
    
    NodeEquations[NodeEquations.length -1].clockwise = results.fixedEndMomentsAndSlopeDeflectionEquations[results.fixedEndMomentsAndSlopeDeflectionEquations.length - 1].slopeDeflectionEquations.clockWise
    
    for(let spanResult of  results.fixedEndMomentsAndSlopeDeflectionEquations){
        const {spanNumber, slopeDeflectionEquations} = spanResult
        
        const prevSpan = results.fixedEndMomentsAndSlopeDeflectionEquations.find(span => parseFloat(span.spanNumber) === parseFloat(spanNumber)  - 1)
        
        const spanFirstNode = NodeEquations.find(node => node.nodeNumber === spanNumber)
        const spanLastNode = NodeEquations.find(node => (parseFloat(node.nodeNumber) + 1).toString() === (parseFloat(spanNumber) + 1).toString())
            
        if(spanNumber === '1'){
            spanFirstNode.antiClockwise = slopeDeflectionEquations.antiClockWise
        }
        else if(spanNumber === spansCount){
            spanLastNode.clockwise = prevSpan.slopeDeflectionEquations.clockWise
            spanFirstNode.antiClockwise = slopeDeflectionEquations.antiClockWise
        }
        else{
            spanFirstNode.antiClockwise = slopeDeflectionEquations.antiClockWise
            spanFirstNode.clockwise = prevSpan.slopeDeflectionEquations.clockWise
        }
    }

    const equilibriumEquations = {}

    let i = 1
    const evaluatingNodes = NodeEquations.filter(nodeEquation => (nodeEquation.nodeNumber !== '1' && nodeEquation.nodeNumber !== (parseFloat(spansCount)+ 1).toString()))
    
    for(let node of evaluatingNodes){
        equilibriumEquations[`equation${i}`]= generateEquilibriumEquations(node.clockwise, node.antiClockwise)
        i++;
    }

    // Moments

    // Reactions

    // ShearForce

}