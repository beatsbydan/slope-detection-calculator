import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
import Transition from '../../UI/Transition/Transition'

const Home:React.FC = () => {
    return (
        <div className='home'>
            <h1>WELCOME!</h1>
            <p>This application would help in evaluating slope detection in beams. </p>
            <Link to={"/calculate"}>Get Started</Link>
        </div>
    )
}

export default Transition(Home)