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
    1: {
        node: (load, length) => ((load * length) / 8),
        lastNode: (load, length) => ((load * length) / 8) 
    },
    2: {
        node: (load, length, a, b) => (load * b ** 2 * a) / (length ** 2),
        lastNode: (load, length, a, b) => (load * a ** 2 * b) / (length ** 2)
    },
    3: {
        node: (load, length) => (2 * load * length) / 9 ,
        lastNode: (load, length) => (2 * load * length) / 9 
    },
    4: {
        node: (load, length) => (15 * load * length) / 48,
        lastNode: (load, length) => (15 * load * length) / 48
    }, 
    5: {
        node: (load, length) => (load * length ** 2) / 12,
        lastNode: (load, length) => (load * length ** 2) / 12
    }, 
    6: {
        node: (load, length) => (11 * load * length ** 2) / 192,
        lastNode: (load, length) => (5 * load * length ** 2) / 192
    }, 
    7: {
        node: (load, length) => (load * length ** 2) / 20 ,
        lastNode: (load, length) => (load * length ** 2) / 30
    }, 
    8: {
        node: (load, length) => (5 * load * length ** 2) / 96,
        lastNode: (load, length) => (5 * load * length ** 2) / 96
    } 
}

// - One end fixed

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


// SLOPE DEFLECTION EQUATIONs

export const obtainAntiClockWiseSlopeDeflectionEquation = (fem, length, theta1, theta2, isSettlement) => {
    const deflectionEquation = {
        femValue: fem,
        coefficientOfEI: 0,
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
        if(theta1 === 0 && theta2 !== 0){
            deflectionEquation.coefficientOfEI = (2 / length).toFixed(2)
            deflectionEquation.equation =  `-${fem} + ${(2 / length).toFixed(2)}EI[${theta2}]`
            return deflectionEquation
        }
        if(theta2 === 0 && theta1 !== 0){
            deflectionEquation.coefficientOfEI = (4 / length).toFixed(2)
            deflectionEquation.equation = `-${fem} + ${(4 / length).toFixed(2)}EI[${theta1}]`
            return deflectionEquation
        }
        if(theta1 === 0 && theta2 === 0){
            deflectionEquation.equation = `${fem}`
            return deflectionEquation
        }
        if(theta1 !== 0 && theta2 !== 0){
            deflectionEquation.coefficientOfEI = (2 / length).toFixed(2)
            deflectionEquation.equation = `-${fem} + ${(2 / length).toFixed(2)}EI[2${theta1} + ${theta2}]`
            return deflectionEquation
        }
    }
}

export const obtainClockWiseSlopeDeflectionEquation = (fem, length, theta1, theta2, isSettlement) => {
    const deflectionEquation = {
        femValue: fem,
        coefficientOfEI: 0,
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
        if(theta1 === 0 && theta2 !== 0){
            deflectionEquation.coefficientOfEI = (4 / length).toFixed(2)
            deflectionEquation.equation = `${fem} + ${(4 / length).toFixed(2)}EI[${theta2}]`
            return deflectionEquation
        }
        if(theta2 === 0 && theta1 !== 0){
            deflectionEquation.coefficientOfEI = (2 / length).toFixed(2).toFixed(2)
            deflectionEquation.equation = `${fem} + ${(2 / length).toFixed(2)}EI[${theta1}]`
            return deflectionEquation
        }
        if(theta1 === 0 && theta2 === 0){
            deflectionEquation.equation = `${fem}`
            return deflectionEquation
        }
        if(theta1 !== 0 && theta2 !== 0){
            deflectionEquation.coefficientOfEI = (2 / length).toFixed(2).toFixed(2)
            deflectionEquation.equation = `${fem} + ${(2 / length).toFixed(2)}EI[${theta1} + 2${theta2}]`
            return deflectionEquation
        }
    }
}

export const generateEquilibriumEquations = (clockWiseEquation, anticlockwiseEquation) => {
    const totalFEM = clockWiseEquation.femValue + anticlockwiseEquation.femValue
}
