// Constant values

export const Constants = {
    E: '',
    I: ''
}

// Fixed End Moments Formulas

export const FEMForPointLoadAtCenter = (load, length) => {
    return ((load * length) / 8)
}

export const FEMForPointLoadAtDistanceAFromLeftAndBFromRight = (load, length, a, b) => {
    return (load * b ** 2 * a) / (length ** 2)
}

export const FEMForTwoEqualPointLoadsSpacedAtOneThirdOfTotalLengthFromEachOther = (load, length) => {
    return (2 * load * length) / 9
}

export const FEMForThreeEqualPointLoadsSpacedAtOneFourthOfTotalLengthFromEachOther = (load, length) => {
    return (15 * load * length) / 48
}

export const FEMForUniformlyDistributedLoadOverTheWholeLength = (load, length) => {
    return (load * length ** 2) / 12
}

export const FEMForUniformlyDistributedLoadOveHalfOfTheSpanOnTheRightSide = (load, length) => {
    return (load * length ** 2) / 12
}

export const LeftFEMForUniformlyDistributedLoadOveHalfOfTheSpanOnTheLeftSide = (load, length) => {
    return (11 * load * length ** 2) / 192
}

export const RightFEMForUniformlyDistributedLoadOveHalfOfTheSpanOnTheLeftSide = (load, length) => {
    return (5 * load * length ** 2) / 192
}

export const LeftFEMForUniformlyDistributedLoadOveHalfOfTheSpanOnTheRightSide = (load, length) => {
    return (5 * load * length ** 2) / 192
}

export const RightFEMForUniformlyDistributedLoadOveHalfOfTheSpanOnTheRightSide = (load, length) => {
    return (11 * load * length ** 2) / 192
}

export const LeftFEMForVariablyDistributedLoadWithHighestPointAtLeftSide = (load, length) => {
    return (load * length ** 2) / 20
}

export const RightFEMForVariablyDistributedLoadWithHighestPointAtLeftSide = (load, length) => {
    return (load * length ** 2) / 30
}

export const LeftFEMForVariablyDistributedLoadWithHighestPointRightSide = (load, length) => {
    return (load * length ** 2) / 30
}

export const RightFEMForVariablyDistributedLoadWithHighestPointRightSide = () => {
    return (load * length ** 2) / 20
}

export const FEMForVariablyDistributedLoadWithHighestPointCentre = (load, length) => {
    return (5 * load * length ** 2) / 96
}

// Slope-detection-equation

export const calculateSlopeDeflection = (fem, length, thetaA, thetaB, angularDisplacement) => {
    const {E, I} = Constants
    return (fem + (((2 * E * I) / length) * (thetaA + (2 * thetaB) +((3 * angularDisplacement) / length))))
}

