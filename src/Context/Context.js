import { createContext } from "react";

export const Context = createContext({

})

export const ContextProvider = ({children}) => {

    const value = {
        
    }

    return(
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}

