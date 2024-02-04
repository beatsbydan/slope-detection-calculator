export const Calculator = (data) => {
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
    
    // Calculate Fixed End Moments.
    for(let spanDetail of spanDetails){
        
    }
}