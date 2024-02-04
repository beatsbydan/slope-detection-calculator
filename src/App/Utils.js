// Constant values
const E = ''
const I = ''

// Fixed End Moments Formulas
// Both ends fixed

export const FEMOptionsForBothEndsFixed = {
    0: {
        firstNode: (load, length) => ((load * length) / 8),
        lastNode: (load, length) => ((load * length) / 8) 
    },
    1: {
        firstNode: (load, length, a, b) => (load * b ** 2 * a) / (length ** 2),
        lastNode: (load, length, a, b) => (load * a ** 2 * b) / (length ** 2)
    },
    2: {
        firstNode: (load, length) => (2 * load * length) / 9 ,
        lastNode: (load, length) => (2 * load * length) / 9 
    },
    3: {
        firstNode: (load, length) => (15 * load * length) / 48,
        lastNode: (load, length) => (15 * load * length) / 48
    }, 
    4: {
        firstNode: (load, length) => (load * length ** 2) / 12,
        lastNode: (load, length) => (load * length ** 2) / 12
    }, 
    5: {
        firstNode: (load, length) => (11 * load * length ** 2) / 192,
        lastNode: (load, length) => (5 * load * length ** 2) / 192
    }, 
    6: {
        firstNode: (load, length) => (load * length ** 2) / 20 ,
        lastNode: (load, length) => (load * length ** 2) / 30
    }, 
    7: {
        firstNode: (load, length) => (5 * load * length ** 2) / 96,
        lastNode: (load, length) => (5 * load * length ** 2) / 96
    } 
}

// One end fixed
export const FEMOptionsForOneEndFixed = {
    0: (load, length)=> (3 * load * length) / 16,
    1: (load, length, a, b)=> (load / length ** 2) * ((b ** 2 * a) + (a ** 2 * b / 2)),
    2: (load, length)=> (load * length) / 3,
    3: (load, length)=> (45 * load * length / 96),
    4: (load, length)=> (load * length ** 2 / 8),
    5: (load, length)=> (9 * load * length ** 2 / 128),
    6: (load, length)=> (load * length ** 2 / 15),
    7: (load, length)=> ( 5 * load * length ** 2 / 64),
}

// Slope-deflection-equation

export const calculateSlopeDeflection = (fem, length, thetaA, thetaB, angularDisplacement) => {
    return (fem + (((2 * E * I) / length) * (thetaA + (2 * thetaB) +((3 * angularDisplacement) / length))))
}

