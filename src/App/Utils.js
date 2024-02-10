// Loading conditions
export const loadingConditions = [
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

export const alphabets = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", 
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", 
    "U", "V", "W", "X", "Y", "Z"
] 

// FIXED END MOMENTS

// - Both ends fixed

export const FEMOptionsForBothEndsFixed = {
    // For point load
    1: {
        node: (load, length) => ((load * length) / 8),
        lastNode: (load, length) => ((load * length) / 8) 
    },
    // For point load at on equal distance
    2: {
        node: (load, length, a, b) => (load * b ** 2 * a) / (length ** 2),
        lastNode: (load, length, a, b) => (load * a ** 2 * b) / (length ** 2)
    },
    // 2 point load at equal distance
    3: {
        node: (load, length) => (2 * load * length) / 9 ,
        lastNode: (load, length) => (2 * load * length) / 9 
    },
    // 3 point load at equal distance
    4: {
        node: (load, length) => (15 * load * length) / 48,
        lastNode: (load, length) => (15 * load * length) / 48
    }, 
    // Uniformly distributed load
    5: {
        node: (load, length) => (load * length ** 2) / 12,
        lastNode: (load, length) => (load * length ** 2) / 12
    }, 
    // ULD at half distance
    6: {
        node: (load, length) => (11 * load * length ** 2) / 192,
        lastNode: (load, length) => (5 * load * length ** 2) / 192
    }, 
    // Uniformly varing load
    7: {
        node: (load, length) => (load * length ** 2) / 20 ,
        lastNode: (load, length) => (load * length ** 2) / 30
    }, 
    // uniformly triangle load variance
    8: {
        node: (load, length) => (5 * load * length ** 2) / 96,
        lastNode: (load, length) => (5 * load * length ** 2) / 96
    } 
}

// - One end fixed.

export const FEMOptionsForOneEndFixed = {
    1: (load, length)=> (3 * load * length) / 16,
    2: (load, length, a, b)=> (load / length ** 2) * ((b ** 2 * a) + (a ** 2 * b / 2)),
    3: (load, length)=> (load * length) / 3,
    4: (load, length)=> (45 * load * length / 96),
    5: (load, length)=> (load * length ** 2 / 8),
    6: (load, length)=> (9 * load * length ** 2 / 128),
    7: (load, length)=> (load * length ** 2 / 15),
    8: (load, length)=> ( 5 * load * length ** 2 / 64),
}

// SIMULTANEOUS EQN SOLVER
export const solveSimultaneousEquations = (eq1, eq2) => {
    const {totalFEM: c1, totalTheta1: a1, totalTheta2: b1, theta1, theta2} = eq1
    const {totalFEM: c2, totalTheta1: a2, totalTheta2: b2} = eq2
  // Extract coefficients and constants
    

  // Calculate determinants
  const det = (a1 * b2) - (a2 * b1);
  const detX = ((c1 * -1) * b2) - ((c2 * -1) * b1);
  const detY = (a1 * (c2 * -1)) - (a2 * (c1 * -1));

  // Check if the system has a unique solution
    if (det === 0) {
        return "No unique solution";
    }

  // Calculate solutions
    const result = [
        {
            theta: theta1,
            value: (detX / det).toFixed(2) * 1
        },
        {
            theta: theta2,
            value: (detY / det).toFixed(2) * 1
        }
    ]

    return result
}


// SLOPE DEFLECTION EQUATIONs

export const obtainAntiClockWiseSlopeDeflectionEquation = (fem, length, theta1, theta2, isSettlement) => {
    const deflectionEquation = {
        femValue: parseFloat(fem) * -1,
        theta1: theta1,
        theta2: theta2,
        coefficientOfEI: 0,
        coefficientOfTheta1: 2,
        coefficientOfTheta2: 1,
        equation: ''
    }
    if(isSettlement){
        if(theta1 === 0){

        }
        if(theta2 === 0){
    
        }
        if(theta1 === 0 && theta2 === 0){
    
        }
        if(theta1 !== 0 && theta2 !== 0){
    
        }
    }
    else{
        // for ends that are fixed or hinged
        if(theta1 === 0 && theta2 !== 0){
            deflectionEquation.coefficientOfEI = (2 / length).toFixed(2)
            deflectionEquation.equation =  `-${fem} + ${(2 / length).toFixed(2)}EI[${deflectionEquation.coefficientOfTheta2}${theta2}]`
            return deflectionEquation
        }
        if(theta2 === 0 && theta1 !== 0){
            deflectionEquation.coefficientOfEI = (2 / length).toFixed(2)
            deflectionEquation.equation = `-${fem} + ${(2 / length).toFixed(2)}EI[${deflectionEquation.coefficientOfTheta1}${theta1}]`
            return deflectionEquation
        }
        if(theta1 === 0 && theta2 === 0){
            deflectionEquation.equation = `${fem}`
            return deflectionEquation
        }
        if(theta1 !== 0 && theta2 !== 0){
            deflectionEquation.coefficientOfEI = (4 / length).toFixed(2)
            deflectionEquation.equation = `-${fem} + ${(4 / length).toFixed(2)}EI[${deflectionEquation.coefficientOfTheta1}${theta1} + ${deflectionEquation.coefficientOfTheta2}${theta2}]`
            return deflectionEquation
        }
    }
}

export const obtainClockWiseSlopeDeflectionEquation = (fem, length, theta1, theta2, isSettlement) => {
    const deflectionEquation = {
        femValue: parseFloat(fem) * 1,
        theta1: theta1,
        theta2: theta2,
        coefficientOfEI: 0,
        coefficientOfTheta1: 1,
        coefficientOfTheta2: 2,
        equation: ''
    }
    // settlement
    if(isSettlement){
        if(theta1 === 0){

        }
        if(theta2 === 0){
    
        }
        if(theta1 === 0 && theta2 === 0){
    
        }
        if(theta1 !== 0 && theta2 !== 0){
    
        }
    }
    else{
        // ends that are fixed or hinged
        if(theta1 === 0 && theta2 !== 0){
            deflectionEquation.coefficientOfEI = (2 / length).toFixed(2)
            deflectionEquation.equation = `${fem} + ${(2 / length).toFixed(2)}EI[${deflectionEquation.coefficientOfTheta2}${theta2}]`
            return deflectionEquation
        }
        if(theta2 === 0 && theta1 !== 0){
            deflectionEquation.coefficientOfEI = (2 / length).toFixed(2)
            deflectionEquation.equation = `${fem} + ${(2 / length).toFixed(2)}EI[${deflectionEquation.coefficientOfTheta1}${theta1}]`
            return deflectionEquation
        }
        if(theta1 === 0 && theta2 === 0){
            deflectionEquation.equation = `${fem}`
            return deflectionEquation
        }
        if(theta1 !== 0 && theta2 !== 0){
            deflectionEquation.coefficientOfEI = (4 / length).toFixed(2)
            deflectionEquation.equation = `${fem} + ${(4 / length).toFixed(2)}EI[${deflectionEquation.coefficientOfTheta1}${theta1} + ${deflectionEquation.coefficientOfTheta2}${theta2}]`
            return deflectionEquation
        }
    }
}

<<<<<<< HEAD
// constructs the equilibrium equation using these values and
//  returns an object containing the total fixed end moment,
//  rotational deflections, and the equilibrium equation as a string

export const generateEquilibriumEquations = (clockWiseEquation, anticlockwiseEquation) => {
=======
export const generateEquilibriumEquations = (clockWiseEquation, anticlockwiseEquation, nodeNumber) => {
>>>>>>> c8e717177d01af9e0d55b6d86c5157aabe160840
    const theta1 =  clockWiseEquation.theta1 === 0 ? anticlockwiseEquation.theta1 : clockWiseEquation.theta1
    const theta2 = anticlockwiseEquation.theta2 === 0 ? clockWiseEquation.theta2 : anticlockwiseEquation.theta2
        
    // total FEM
    const totalFEM = (clockWiseEquation.femValue) + (anticlockwiseEquation.femValue)
    let totalTheta1
    let totalTheta2

    if(nodeNumber === '2'){
        totalTheta1 = (parseFloat(clockWiseEquation.coefficientOfEI) * parseFloat(clockWiseEquation.coefficientOfTheta2)) + (parseFloat(anticlockwiseEquation.coefficientOfEI) * parseFloat(anticlockwiseEquation.coefficientOfTheta1))
        totalTheta2 = (parseFloat(anticlockwiseEquation.coefficientOfEI) * parseFloat(anticlockwiseEquation.coefficientOfTheta2))
    }
    else if(nodeNumber === '3'){
        totalTheta1 = (parseFloat(clockWiseEquation.coefficientOfEI) * parseFloat(clockWiseEquation.coefficientOfTheta1))
        totalTheta2 = (parseFloat(clockWiseEquation.coefficientOfEI) * parseFloat(clockWiseEquation.coefficientOfTheta2)) + (parseFloat(anticlockwiseEquation.coefficientOfEI) * parseFloat(anticlockwiseEquation.coefficientOfTheta1))
    
    }
    const equilibriumEquation = {
        totalFEM: totalFEM,
        theta1: theta1,
        theta2: theta2,
        totalTheta1: totalTheta1,
        totalTheta2: totalTheta2,
        equation: `${totalTheta1}EI${theta1} + ${totalTheta2}EI${theta2} + (${totalFEM}) = 0`
    }
    return equilibriumEquation
}

// Moments
export const obtainMoments = (span, theta1, theta2) => {
    if(span.theta1 === 0 && span.theta2 !== 0){
        return (span.femValue + (parseFloat(span.coefficientOfEI) * span.coefficientOfTheta2 * theta1)).toFixed(2)
    }
    if(span.theta2 === 0 && span.theta1 !== 0){
        return (span.femValue + (parseFloat(span.coefficientOfEI) * span.coefficientOfTheta1 * theta2)).toFixed(2)
    }
    if(span.theta1 === 0 && span.theta2 === 0){
        return span.femValue
    }
    if(span.theta1 !== 0 && span.theta2 !== 0){
        return (span.femValue + (parseFloat(span.coefficientOfEI) * span.coefficientOfTheta1 * theta1) + (parseFloat(span.coefficientOfEI) * span.coefficientOfTheta2 * theta2)).toFixed(2)
    }
}
<<<<<<< HEAD
// checking if there's no rotational deflection at one end (theta1 === 0)
//  but there is a non-zero rotational deflection at the other end (theta2 !== 0).
export const obtainClockwiseMoments = (span, theta1, theta2) => {
    if(theta1 === 0 && theta2 !== 0){
=======

// Reactions
export const obtainReactions = (spanMoment, currentSpan) => {
    const a  = parseFloat(currentSpan.a)
    const b  = parseFloat(currentSpan.b)
    const loadVal = parseFloat(currentSpan.load)
    const lengthVal = parseFloat(currentSpan.length) 
    const clockWiseValue = parseFloat(spanMoment.clockwise) 
    const antiClockWiseValue = parseFloat(spanMoment.antiClockWise)

    let r1, r2
    const conditionIndex = loadingConditions.findIndex(condition => condition === currentSpan.condition)

    if(conditionIndex === 1){
        r1 = (-1 * ((-1 * loadVal * lengthVal / 2) + clockWiseValue + antiClockWiseValue) / lengthVal).toFixed(2)
        r2 = (loadVal - r1)
    }
    else if(conditionIndex === 2){
        r1 = (-1 * ((-1 * loadVal * lengthVal * b) + clockWiseValue + antiClockWiseValue) / lengthVal).toFixed(2)
        r2 = (loadVal - r1)
    }
    else if(conditionIndex === 3){
        r1 = (-1 * ((-1 * loadVal * 2 * lengthVal / 3) + (-1 * loadVal * lengthVal / 3) + clockWiseValue + antiClockWiseValue) / lengthVal).toFixed(2)
        r2 = ((2 * loadVal) -  r1).toFixed(2)
    }
    else if(conditionIndex === 4){
        r1 = (-1 * ((-1 * loadVal * 3 * lengthVal / 4) + (-1 * loadVal * 2 * lengthVal / 4) + (-1 * loadVal * lengthVal / 4)  + clockWiseValue + antiClockWiseValue) / lengthVal).toFixed(2)
        r2 = ((3 * loadVal) -  r1).toFixed(2)
    }
    else if(conditionIndex === 5){
        r1 = (-1 * ((-1 * loadVal * lengthVal * lengthVal / 2) + clockWiseValue + antiClockWiseValue) / lengthVal).toFixed(2)
        r2 = ((lengthVal * loadVal) -  r1).toFixed(2)
    }
    else if(conditionIndex === 6){
        r1 = (-1 * ((-1 * loadVal * lengthVal / 2 * lengthVal / 4) + clockWiseValue + antiClockWiseValue)).toFixed(2)
        r2 = ((lengthVal * loadVal / 2) - r1).toFixed(2)
    }
    else if(conditionIndex === 7){
        r1 = (-1 * ((-1 * loadVal * lengthVal / 2 * lengthVal * 3 / 4) + clockWiseValue + antiClockWiseValue)).toFixed(2)
        r2 = ((lengthVal * loadVal / 2) - r1).toFixed(2)
    }
    else if(conditionIndex === 8){}
    else if(conditionIndex === 9){}
    else if(conditionIndex === 10){}
    else{
        
    }

    return {
        r1: r1,
        r2: r2
    }
}

const getForce = (currentSpan, spansCount) => {
    const loadVal = parseFloat(currentSpan.load)
    const lengthVal = parseFloat(currentSpan.length) 
    const conditionIndex = loadingConditions.findIndex(condition => condition === currentSpan.condition)
    
    if(conditionIndex === 1){
        return (-1 * loadVal).toFixed(2)
    }
    else if(conditionIndex === 2){
        return (-1 * loadVal).toFixed(2)
    }
    else if(conditionIndex === 3){
        return (-1 * (2 * loadVal)).toFixed(2)
    }
    else if(conditionIndex === 4){
        return (-1 * (3 * loadVal)).toFixed(2)
    }
    else if(conditionIndex === 5){
        return (-1 * (loadVal * lengthVal)).toFixed(2)
    }
    else if(conditionIndex === 6){
        return (-1 * (loadVal * lengthVal / 2)).toFixed(2)
    }
    else if(conditionIndex === 7){
        return (-1 * (loadVal * lengthVal / 2)).toFixed(2)
    }
    else if(conditionIndex === 8){}
    else if(conditionIndex === 9){}
    else if(conditionIndex === 10){}
    else{
>>>>>>> c8e717177d01af9e0d55b6d86c5157aabe160840

    }

}

export const obtainShearForces = (reactions, spansCount) => {
    const shearForces = []
    let calculatedForces = {}
    let newForce;
    let i = 0

    for(let reaction of reactions){
        const {spanNumber, currentSpanDetails, reactions} = reaction
        const r1Value = parseFloat(reactions.r1)
        const r2Value = parseFloat(reactions.r2)

        if(spanNumber === '1'){
            const currentForce = parseFloat(getForce(currentSpanDetails, spansCount))
            calculatedForces[i] = r1Value
            calculatedForces[i + 0.5] = parseFloat(calculatedForces[i]) + currentForce + r2Value
            newForce = {
                node: alphabets[i],
                value: calculatedForces[i]
            }
            shearForces.push(newForce)
        }
        else if(spanNumber === spansCount){
            const currentForce = parseFloat(getForce(currentSpanDetails, spansCount))
            console.log(currentForce, r2Value)
            calculatedForces[i] = parseFloat(calculatedForces[i - 0.5]) + r1Value
            console.log(calculatedForces[i])
            const lastNodeForce = parseFloat(calculatedForces[i]) + currentForce + r2Value
            console.log(lastNodeForce)
            const newForceNode1 = {
                node: alphabets[i],
                value: calculatedForces[i]
            }
            shearForces.push(newForceNode1)
            const newForceNode2 = {
                node: alphabets[i + 1],
                value: lastNodeForce.toFixed(2)
            }
            shearForces.push(newForceNode2)
        }
        else{
            const currentForce = parseFloat(getForce(currentSpanDetails, spansCount))
            calculatedForces[i] = parseFloat(calculatedForces[i - 0.5]) + r1Value
            calculatedForces[i + 0.5] = parseFloat(calculatedForces[i]) + currentForce + r2Value
            newForce = {
                node: alphabets[i],
                value: calculatedForces[i]
            }
            shearForces.push(newForce)
        }
        
        i++
    }

    return shearForces
}