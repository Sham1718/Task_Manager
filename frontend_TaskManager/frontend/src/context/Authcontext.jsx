import { useContext,createContext,useState,useEffect } from "react";

const Authcontext =createContext(null);

export const Authprovider =({children})=>{

    const [token,setToken]=useState(null);
    const[loading,setLoading]=useState(true);
    const[username,setUsername]=useState(null);

    useEffect(()=>{
        const StoreToken=localStorage.getItem("token");
        const tokenUser=localStorage.getItem("username");

        if(StoreToken){
            setToken(StoreToken);
            setUsername(tokenUser);
        }

        setLoading(false)
    },[])

    const login=(token,username)=>{
        setToken(token);
        setUsername(username);
        localStorage.setItem("username",username)
        localStorage.setItem("token",token);
    }

    const logout=()=>{
        setToken(null);
        setUsername(null);
        localStorage.removeItem("token");
        localStorage.removeItem("username");
    }

    const value={
        token,
        login,
        logout,
        username,
        isAuthenticate : !!token
    }

    if(loading)return null;

    return(
        <Authcontext.Provider value={value}>
            {children}
        </Authcontext.Provider>
    )


}

export const useAuth=()=>useContext(Authcontext);