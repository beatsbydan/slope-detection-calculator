import React, {useContext} from 'react'
import { Context } from '../../Context/Context'
import './Results.css'
import Transition from '../../UI/Transition/Transition'
import { PrevNav } from '../../UI/PrevNav/PrevNav'

const Results:React.FC = () => {
    const {results} = useContext(Context)

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
                        <p>Equation 1: <span>{results?.equilibrium?.equations?.equation1?.equation}</span></p>
                        <p>Equation 2: <span>{results?.equilibrium?.equations?.equation2?.equation}</span></p>
                    </div>
                    <div className="moments">
                        <h2></h2>
                    </div>
                    <div className="reactions">
                        <h2></h2>
                    </div>
                    <div className="shearForces">
                        <h2></h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Transition(Results)