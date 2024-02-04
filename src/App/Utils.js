// Fixed End Moments Formulas

export const FEMFormulas = {
    distributedLoadOverSpan: +-((w * l ** 2) / 12),
    pointLoadOverSpan: +-((-2 * p * l) / 9)
}

// Slope-detection-equation

export const SlopeDetectionEquation = {
    clockwise: clockwiseFEM + ((2 * E * I) / L) * ((2 * ThetaA) + (ThetaB) - ((3 * Triangle) / L)),
    antiClockwise: antiClockwiseFEM + ((2 * E * I) / L) * ((2 * ThetaA) + (ThetaB) - ((3 * Triangle) / L)),
}

// Constant values

export const Constants = {
    E: '',
    I: ''
}