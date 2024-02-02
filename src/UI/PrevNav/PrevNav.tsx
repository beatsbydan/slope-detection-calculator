import { IoIosArrowBack } from "react-icons/io";
import {useNavigate} from 'react-router-dom'

export const PrevNav = () => {
    const navigate = useNavigate()
    return(
        <IoIosArrowBack 
            size={35} 
            color='#413F3D' 
            cursor={"pointer"} 
            onClick={() => navigate(-1)} 
        />
    )
}