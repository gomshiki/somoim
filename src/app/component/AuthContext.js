import { useContext, createContext } from "react"

const AuthContext= createContext()

export const AuthContextProvider = ({children}) =>{
    return(
      <AuthContext.Provider value={"안녕 Auth에서 보냄"}>
        {children}
      </AuthContext.Provider>
    )
}

export const useAuth = ()=>{
  return useContext(AuthContext);
}