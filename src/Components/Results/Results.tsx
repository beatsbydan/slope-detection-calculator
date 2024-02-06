import React, {useContext} from 'react'
import { Context } from '../../Context/Context'
import './Results.css'
import Transition from '../../UI/Transition/Transition'

const Results:React.FC = () => {
    const {} = useContext(Context)
    return (
        <div className='results'>
            <h1>Results..</h1>
            <div className="fixedEndMoments">
                <h2>Fixed-Moments</h2>
            </div>
            <div className="slopeDeflectionEquations">
                <h2>Slope-Deflection-Equations</h2>
            </div>
            <div className="equilibriumEquations">
                <h2>Equilibrium-Equations</h2>
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
    )
}

export default Transition(Results)