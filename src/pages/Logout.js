import axios from "axios"
import React from "react"
import { useDispatch } from "react-redux"
import { useHistory } from "react-router"


const LogoutPage = ()=>{

    const hist = useHistory()
    const dispatcher = useDispatch()

    axios.get("http://localhost:8080/v1/logout", {
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("token").trim()
        }
    }).then(res=>{
        localStorage.removeItem("token")
        dispatcher({type:"LOGOUT",payload:null})
        hist.push("login")
    })

    return(
        <>
        </>
    )
}

export default LogoutPage;
