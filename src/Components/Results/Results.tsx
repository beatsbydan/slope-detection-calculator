import React, {useContext} from 'react'
import { Context } from '../../Context/Context'
import './Results.css'
import Transition from '../../UI/Transition/Transition'
import { PrevNav } from '../../UI/PrevNav/PrevNav'
import Diagram from '../../UI/Diagrams/Diagrams'

const Results:React.FC = () => {
    const {results} = useContext(Context)
    const shearForceLabels = results?.shearForces?.map((force: any) => force?.node)
    const shearForceValues = results?.shearForces?.map((force: any) => force?.value)

    const momentLabels = []
    const momentValues = []
    for(let moment of results?.moments){
        momentLabels.push('')
        momentLabels.push('')
        momentValues.push(parseFloat(moment.antiClockWise))
        momentValues.push(parseFloat(moment.clockwise))
    }
    
    return (
        <div className='results'>
            <PrevNav/>
            <div className="resultsBody">
                <h1>Results..</h1>
                <div className="resultValues">
                    <div className="fixedEndMomentsAndSlopeDeflectionEquations">
                        <h2>Fixed-Moments & Slope-Deflection-Equations</h2>
                        {results?.fixedEndMomentsAndSlopeDeflectionEquations?.map((value: any, index: number) => {
                            return(
                                <div className='spanResultItem' key={index}>
                                    <h4>Span <span><em>{value?.spanNumber}</em></span></h4>
                                    <h5>Fixed-End-Moments</h5>
                                    <div className="fixedEndMoment">
                                        <p>Clockwise: <span>{value?.fixedEndMoments?.clockWise}</span></p>
                                        <p>Anti-Clockwise: <span>{value?.fixedEndMoments?.antiClockWise}</span></p>
                                    </div>
                                    <h5>Slope Deflection Equations</h5>
                                    <div className="slopeDeflectionEquation">
                                        <p>Clockwise: <span>{value?.slopeDeflectionEquations?.clockWise?.equation}</span></p>
                                        <p>Anti-Clockwise: <span>{value?.slopeDeflectionEquations?.antiClockWise?.equation}</span></p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="equilibriumEquations">
                        <h2>Equilibrium-Equations</h2>
                        {results?.equilibrium?.equations?.map((value: any, index: number) => {
                            return (
                                <p key={index}>Equation{index + 1}: <span>{value?.equation}</span></p>
                            )
                        })}
                        
                        <h2>Equilibrium-Results</h2>
                        {results?.equilibrium?.result?.map((value: any, index: number)=>{
                            return (
                                <p key={index}>{value?.theta}: <span>{value?.value}</span></p>
                            )
                        })}
                    </div>
                    <div className="moments">
                        <h2>Moments</h2>
                        {results?.moments?.map((value: any, index: any) => {
                            return (
                                <div key={index} className='momentsList'>
                                    <h4>Span <span><em>{value?.spanNumber}</em></span></h4>
                                    <div>
                                        <p>Clockwise: <span>{value?.clockwise}KNm</span></p>
                                        <p>Anti-Clockwise: <span>{value?.antiClockWise}KNm</span></p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="reactions">
                        <h2>Reactions</h2>
                        {results?.reactions?.map((value: any, index: number) => {
                            return (
                                <div key={index} className = "reactionsList">
                                    <h4>Span <span><em>{value?.spanNumber}</em></span></h4>
                                    <div>
                                        <p>first-Node: <span>{value?.reactions?.r1}KN</span></p>
                                        <p>Last-Node: <span>{value?.reactions?.r2}KN</span></p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    <div className="shearForces">
                        <h2>ShearForces</h2>
                        {results?.shearForces?.map((value: any, index: number) => {
                            return (
                                <div key={index} className='shearForcesList'>
                                    <p>Node-<span>{value?.node}</span>: <span>{value?.value}KN</span></p>
                                </div>
                            )
                        })}
                    </div>
                    <div className="diagrams">
                        <div className="shearForceDiagrams">
                            <h2>Shear-Force-Diagram</h2>
                            <Diagram
                                labels={shearForceLabels}
                                data={shearForceValues}
                                label='Shear-Force'
                                text = 'Shear Force (KN)'    
                            />
                        </div>
                        <div className="bendingMomentDiagrams">
                            <h2>Bending-Moment-Diagram</h2>
                            <Diagram
                                labels={momentLabels}
                                data={momentValues}   
                                label='Bending-Moment'
                                text ='Bending Moment (KNm)' 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transition(Results)