import React, {useEffect, useState, useRef} from 'react'
import {BiChevronDown, BiChevronUp} from 'react-icons/bi'
import './Dropdown.css'

type DropdownType = {
  error: string,
  list: string[],
  onClick: (value: string) => void
}

export const Dropdown:React.FC<DropdownType> = (props) => {
  const dropdownRef = useRef<HTMLDivElement| null>(null)
  const [value, setValue] = useState<string>('Loading condition on span')
  const [open, setOpen] = useState<boolean>(false)
  const handleClick = (value: string) => {
    setValue(value)
    props.onClick(value)
    setOpen(false)
  }
    useEffect(() => {
        const closeDropdownOnOutsideClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
    
        document.addEventListener('click', closeDropdownOnOutsideClick);
    
        return () => {
            document.removeEventListener('click', closeDropdownOnOutsideClick);
        };
    }, []);
  
  return (
    <div className='dropdown' ref={dropdownRef}>
      <div onClick={()=>setOpen(!open)} className={props.error ? "errorField optionBlock" : "optionBlock"}>
        <span className="option">{value}</span>
        {open ? <BiChevronUp color={'#413F3D'} size={30}/>: <BiChevronDown color='#413F3D' size={30}/> }
      </div>
      {open && 
        <ul className="menu">
          {
            props.list.map((value, index)=>{
              return (
                  <li key={index} onClick={()=>handleClick(value)} className="item">{value}</li>
                )
              }
            )
          }
        </ul>
      }
    </div>
  )
}
